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
};
