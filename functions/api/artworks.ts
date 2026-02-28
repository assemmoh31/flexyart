import type { Env, Artwork } from '../types';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM artworks ORDER BY created_at DESC"
    ).all<Artwork>();

    return Response.json(results);
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const data = await request.json() as Omit<Artwork, 'id' | 'created_at'>;

    // Validate data (basic example)
    if (!data.title || !data.creator || !data.price || !data.image) {
      return new Response("Missing required fields", { status: 400 });
    }

    const { success } = await env.DB.prepare(
      "INSERT INTO artworks (title, creator, price, image, type, category) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .bind(data.title, data.creator, data.price, data.image, data.type, data.category)
    .run();

    if (success) {
      return new Response("Artwork created successfully", { status: 201 });
    } else {
      return new Response("Failed to create artwork", { status: 500 });
    }
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
};
