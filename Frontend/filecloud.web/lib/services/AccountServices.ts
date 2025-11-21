
import { fetchClient } from "@/lib/api/fetchClient";

export interface AccountDTO {
  accessToken: string;
  refreshToken: string;
}

export async function postLogin(email: string, password: string): Promise<AccountDTO> {
  return fetchClient<AccountDTO>("Account/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  );
}