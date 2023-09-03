export interface PostInterface {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    image: string;
  };
  comments?: {
    id: string;
    message: string;
    createdAt: string;
  };
}
