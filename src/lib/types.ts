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

export type Club = {
  _id: string;
  address: {
    jibun: string;
    loadAddress: string;
  };
  location: {
    coordinates: [number, number];
  };
  name: string;
};
