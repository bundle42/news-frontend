import client from "./client";
import type { Board } from "../types/board";

export const getBoards = async (): Promise<Board[]> => {
  const res = await client.get<Board[]>("/api/board");
  return res.data;
};
