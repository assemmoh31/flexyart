import type { Env } from '../types';

export const onRequestPut: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const key = new URL(request.url).searchParams.get('key');

    if (!key) {
      return new Response("Missing key parameter", { status: 400 });
    }

    // In a real app, you'd check authentication here (e.g., verify JWT or session)
    // const user = await verifyUser(request);
    // if (!user) return new Response("Unauthorized", { status: 401 });

    // Assuming the body contains the file content
    const fileContent = await request.arrayBuffer();

    // Upload to R2
    await env.BUCKET.put(key, fileContent, {
      httpMetadata: {
        contentType: request.headers.get('Content-Type') || 'application/octet-stream',
      },
    });

    return new Response(`Successfully uploaded ${key}`, { status: 200 });
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
};
