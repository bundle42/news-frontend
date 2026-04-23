export type Comment = {
  id: number;
  memberId: number;
  memberEmail: string;

  commentContents: string;
  boardId: number;
  commentCreatedTime: string;
};
