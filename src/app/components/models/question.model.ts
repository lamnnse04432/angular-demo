export class Question {
  id: number;
  categoryId: number;
  title: string;
  like: number;
  dislike: number;
  countAnswer: number;

  constructor(id: number, categoryId: number, title: string, like: number, dislike: number) {
    this.id = id;
    this.categoryId = categoryId;
    this.title = title;
    this.like = like;
    this.dislike = dislike;
    this.countAnswer = 0;
  }
}
