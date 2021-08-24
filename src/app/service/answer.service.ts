import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {Answer} from '../components/models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private static readonly AnswerStorageKey = 'answer';

  private answers: Answer[];
  private displayAnswerSubject: BehaviorSubject<Answer[]> = new BehaviorSubject<Answer[]>([]);
  answer$: Observable<Answer[]> = this.displayAnswerSubject.asObservable();
  private answersFilter: Answer[];

  constructor(private storageService: LocalStorageService) {
    this.answers = [];
  }

  fetchFromLocalStorage() {
    this.answers = this.storageService.getValue<Answer[]>(AnswerService.AnswerStorageKey) || [];
    this.displayAnswerSubject.next(this.answers);
  }

  addAnswer(questionId: number, title: string) {
    const date = new Date(Date.now()).getTime();
    const newAnswer = new Answer(date, questionId, title, 0, 0);
    this.answers.unshift(newAnswer);
    this.storageService.setObject(AnswerService.AnswerStorageKey, this.answers);
    this.getAnswerByQuestionId(questionId);
  }

  getAnswerByQuestionId(questionId: number) {
    console.log(JSON.stringify(questionId));
    this.answers = this.storageService.getValue<Answer[]>(AnswerService.AnswerStorageKey) || [];
    this.answers = this.answers.filter(q => q.questionId === questionId);
    console.log(JSON.stringify(this.answers));
    this.displayAnswerSubject.next(this.answers);
  }

  getSizeAnswerByQuestionId(questionId: number) {
    this.answers = this.storageService.getValue<Answer[]>(AnswerService.AnswerStorageKey) || [];
    this.answers = this.answers.filter(q => q.questionId === questionId);
    return this.answers.length;
  }

  updateLike(id: number, type: number, questionId: number) {
    this.answers = this.storageService.getValue<Answer[]>(AnswerService.AnswerStorageKey) || [];

    const index = this.answers.findIndex(t => t.id === id);
    const answer = this.answers[index];
    if (type === 1) {
      answer.like = answer.like + 1;
    } else {
      if (answer.like > 0) {
        answer.dislike = answer.dislike + 1;
      }
    }
    this.answers.splice(index, 1, answer);
    this.storageService.setObject(AnswerService.AnswerStorageKey, this.answers);
    this.getAnswerByQuestionId(questionId);
  }

  delete(id: number, questionId: number) {
    this.answers = this.storageService.getValue<Answer[]>(AnswerService.AnswerStorageKey) || [];
    const index = this.answers.findIndex(t => t.id === id);
    this.answers.splice(index, 1);
    this.storageService.setObject(AnswerService.AnswerStorageKey, this.answers);
    this.getAnswerByQuestionId(questionId);
  }

  updateAnswer(id: number, content: string, questionId: number) {
    this.answers = this.storageService.getValue<Answer[]>(AnswerService.AnswerStorageKey) || [];
    const index = this.answers.findIndex(t => t.id === id);
    const answer = this.answers[index];
    answer.title = content;

    this.answers.splice(index, 1, answer);
    this.storageService.setObject(AnswerService.AnswerStorageKey, this.answers);
    this.getAnswerByQuestionId(questionId);
  }
}
