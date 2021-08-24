export class Answer {
  id: number;
  questionId: number;
  title: string;
  like: number;
  dislike: number;

  constructor(id: number, questionId: number, title: string, like: number, dislike: number) {
    this.id = id;
    this.questionId = questionId;
    this.title = title;
    this.like = like;
    this.dislike = dislike;
  }
}
