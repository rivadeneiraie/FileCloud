import { jwtDecode } from "jwt-decode";

export type JwtPayload = {
  sub: string;
  email: string;
  jti: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string[];
  exp: number;
  iss: string;
  aud: string;
};

export function decodeToken(token: string): JwtPayload {
  return jwtDecode<JwtPayload>(token);
}