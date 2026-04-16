import client from "./client";
import type { Member } from "../types/member";

export const login = async (email: string, password: string) => {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);

  return client.post("/member/login", params, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getMe = async (): Promise<Member> => {
  const res = await client.get<Member>("/api/member/me");
  return res.data;
};

export const logout = async () => {
  await client.post("/member/logout", null, {
    withCredentials: true,
  });
};
