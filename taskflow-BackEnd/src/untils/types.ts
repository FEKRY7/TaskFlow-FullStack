export type JWTPayloadType = {
  id: number;
  role: string;
  userName: string;
  email: string;
};

export type AccessTokenType = {
  accessToken: string;
};
