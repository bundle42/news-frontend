import client from "./client";
import type { Member } from "../types/member";

export const login = async (email: string, password: string) => {
  return client.post(
    "/api/member/login",
    {
      memberEmail: email,
      memberPassword: password,
    },
    {
      withCredentials: true,
    },
  );
};

export const signup = async (email: string, password: string, name: string) => {
  return client.post("/api/member/signup", {
    memberEmail: email,
    memberPassword: password,
    memberName: name,
  });
};

export const getMe = async (): Promise<Member> => {
  const res = await client.get<Member>("/api/member/me", {
    withCredentials: true,
  });
  return res.data;
};

export const logout = async () => {
  await client.post("/api/member/logout", null, {
    withCredentials: true,
  });
};
