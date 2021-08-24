export class Category {
  id: number;
  imagesUrl: string;
  title: string;
  description: string;
  tags: Array<string>;

  constructor(id: number, imagesUrl: string, title: string, description: string, tags: Array<string>) {
    this.id = id;
    this.imagesUrl = imagesUrl;
    this.title = title;
    this.description = description;
    this.tags = tags;
  }
}
