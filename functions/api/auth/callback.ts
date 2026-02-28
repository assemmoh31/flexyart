import type { Env, User } from '../../types';
import { SignJWT } from 'jose';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const params = url.searchParams;

  // 1. Verify the signature
  const verificationParams = new URLSearchParams();
  for (const [key, value] of params.entries()) {
    verificationParams.append(key, value);
  }
  verificationParams.set('openid.mode', 'check_authentication');

  // Strip Cf- headers to avoid 403 Forbidden from Steam
  const headers = new Headers();
  headers.set('Content-Type', 'application/x-www-form-urlencoded');

  const verificationResponse = await fetch('https://steamcommunity.com/openid/login', {
    method: 'POST',
    headers: headers,
    body: verificationParams.toString(),
  });

  const verificationText = await verificationResponse.text();

  if (!verificationText.includes('is_valid:true')) {
    return new Response('Steam authentication failed', { status: 401 });
  }

  // 2. Extract SteamID
  const claimedId = params.get('openid.claimed_id');
  if (!claimedId) {
    return new Response('Missing claimed_id', { status: 400 });
  }

  const steamIdMatch = claimedId.match(/https:\/\/steamcommunity\.com\/openid\/id\/(\d+)/);
  if (!steamIdMatch) {
    return new Response('Invalid Steam ID format', { status: 400 });
  }
  const steamId = steamIdMatch[1];

  // 3. Check/Create User in D1
  let user: User | null = await env.DB.prepare('SELECT * FROM users WHERE steam_id = ?').bind(steamId).first<User>();

  if (!user) {
    // Fetch user details from Steam Web API
    if (!env.STEAM_API_KEY) {
      return new Response('Missing STEAM_API_KEY', { status: 500 });
    }

    const steamApiResponse = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${env.STEAM_API_KEY}&steamids=${steamId}`
    );
    const steamData: any = await steamApiResponse.json();
    const player = steamData.response?.players?.[0];

    if (!player) {
      return new Response('Failed to fetch Steam user details', { status: 500 });
    }

    const username = player.personaname;
    const avatar = player.avatarfull;

    const result = await env.DB.prepare(
      'INSERT INTO users (steam_id, username, avatar) VALUES (?, ?, ?) RETURNING *'
    )
      .bind(steamId, username, avatar)
      .first<User>();
      
    if (!result) {
        return new Response('Failed to create user', { status: 500 });
    }
    user = result;
  }

  // 4. Create Session (JWT)
  if (!env.JWT_SECRET) {
    return new Response('Missing JWT_SECRET', { status: 500 });
  }

  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const token = await new SignJWT({ sub: user.id.toString(), steam_id: user.steam_id })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  // 5. Set Cookie and Redirect
  const headersResponse = new Headers();
  headersResponse.append(
    'Set-Cookie',
    `session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${7 * 24 * 60 * 60}`
  );
  headersResponse.append('Location', '/'); // Redirect to home

  return new Response(null, {
    status: 302,
    headers: headersResponse,
  });
};
