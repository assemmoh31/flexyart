// functions/api/themes.ts

// This is a Cloudflare Pages Function that handles the POST request for creating a new theme.
// It receives a multipart/form-data request containing the file and metadata.
// It uploads the file to Cloudflare R2 and saves the metadata to Cloudflare D1.

interface Env {
  R2_BUCKET: R2Bucket;
  D1_DATABASE: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const request = context.request;
    const formData = await request.formData();

    // 1. Extract File and Metadata from FormData
    const file = formData.get('file') as File | null;
    const metadataString = formData.get('metadata') as string | null;

    if (!metadataString) {
      return new Response(JSON.stringify({ error: 'Missing metadata' }), { status: 400 });
    }

    const metadata = JSON.parse(metadataString);

    let previewUrl = '';

    // 2. Handle R2 Upload if a file is provided
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const fileExtension = file.name.split('.').pop();
      const fileName = `themes/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

      // Upload to R2 Bucket
      await context.env.R2_BUCKET.put(fileName, arrayBuffer, {
        httpMetadata: {
          contentType: file.type,
        },
      });

      // Construct the public URL (assuming you have a custom domain mapped to your R2 bucket)
      // Replace 'https://cdn.flexyart.com' with your actual public R2 domain
      previewUrl = `https://cdn.flexyart.com/${fileName}`;
    }

    // 3. Prepare Data for D1 Database
    // Ensure tags are stored as a JSON array and colors as a JSON array
    const tagsJson = JSON.stringify(metadata.tags || []);
    const colorsJson = JSON.stringify(metadata.colors || []);

    // 4. Insert into D1 Database
    const stmt = context.env.D1_DATABASE.prepare(`
      INSERT INTO themes (
        title, game, price, link, type, rarity, colors, tags, preview_url, status, created_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP
      )
    `);

    const result = await stmt.bind(
      metadata.title,
      metadata.game,
      metadata.price,
      metadata.link || null,
      metadata.type,
      metadata.rarity,
      colorsJson,
      tagsJson,
      previewUrl || metadata.preview, // Use uploaded URL or fallback
      'Active'
    ).run();

    if (result.success) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Theme created successfully',
        themeId: result.meta.last_row_id,
        previewUrl
      }), { 
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      throw new Error('Database insertion failed');
    }

  } catch (error: any) {
    console.error('Error creating theme:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal Server Error', 
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
