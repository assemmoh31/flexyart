export interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
  STEAM_API_KEY: string;
  JWT_SECRET: string;
}

export interface Artwork {
  id: number;
  title: string;
  creator: string;
  price: string;
  image: string;
  type: string;
  category: string;
  created_at: string;
}

export interface User {
  id: number;
  steam_id: string;
  username: string;
  avatar: string;
  created_at: string;
}
