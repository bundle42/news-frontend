export type Board = {
  id: number;
  boardTitle: string;
  boardContents: string;
  boardHits: number;
  createdAt: string;
  updatedAt: string;

  memberId: number;
  memberName: string;
  memberEmail: string;

  label: string;
  confidence: number;
  sentimentScore: number;

  storedFileName?: string; // 저장된 파일 이름, fileAttached가 1일 때만 존재
  fileAttached: number; // 0 or 1

  newsLink: string;
  pubDate: string;
  searchQuery: string;
};
