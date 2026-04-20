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
