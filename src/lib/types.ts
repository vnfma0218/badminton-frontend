export type User = {
  id: string;
  email: string;
};

export type Post = {
  id: string;
  content: string;
  user: User;
  myPostYn: boolean;
};
