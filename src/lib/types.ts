export type User = {
  id: string;
  email: string;
  name: string;
};

export type Post = {
  id: string;
  content: string;
  title: string;
  user: User;
  myPostYn: boolean;
  comments: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  created_at: string;
  user: User;
  isMine: boolean;
};
