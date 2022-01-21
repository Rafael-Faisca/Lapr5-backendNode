export default interface ICreatePostDTO {
  id: string;
  description: string;
  postTag: string;
  userId: string;
  like: string[];
  dislike: string[];
}
