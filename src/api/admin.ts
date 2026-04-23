import client from "./client";

export const getMembers = async () => {
  const res = await client.get("/api/admin/members", {
    withCredentials: true,
  });
  return res.data;
};

export const deleteMember = async (id: number) => {
  return await client.delete(`/api/admin/members/${id}`, {
    withCredentials: true,
  });
};

export const changeRole = async (id: number, role: string) => {
  return await client.patch(
    `/api/admin/members/${id}/role`,
    { role },
    { withCredentials: true },
  );
};
