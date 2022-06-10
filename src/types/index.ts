export type VideoTypes = {
  id: string;
  artist: string;
  title: string;
  urlId: string;
}

export type PlaylistTypes = {
  id: string;
  name: string;
  videos?: VideoTypes[];
}

export type PlaylistVideoTypes = {
  id: string;
  playlistId: string;
  videoId: string;
}

export type UserTypes = {
  email: string;
  id: string;
  name: string;
  language?: 'en' | 'pt' | 'es'
}

export type RefreshTokenTypes = {
  expiresIn: number;
  id: string;
  userId: string;
}

export interface UserAuthInterface {
  refreshToken: RefreshTokenTypes;
  user: UserTypes;
  token: string;
}

