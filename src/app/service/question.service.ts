import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {Question} from '../components/models/question.model';
import {AnswerService} from './answer.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private static readonly QuestionStorageKey = 'question';

  private questions: Question[];
  private displayQuestionSubject: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
  question$: Observable<Question[]> = this.displayQuestionSubject.asObservable();

  constructor(private storageService: LocalStorageService,
              private answerService: AnswerService) {
    this.questions = [];
  }

  fetchFromLocalStorage() {
    this.questions = this.storageService.getValue<Question[]>(QuestionService.QuestionStorageKey) || [];
    this.displayQuestionSubject.next(this.questions);
  }

  addQuestion(categoryId: number, title: string) {
    const date = new Date(Date.now()).getTime();
    const newQuestion = new Question(date, categoryId, title, 0, 0);
    this.questions.unshift(newQuestion);
    this.storageService.setObject(QuestionService.QuestionStorageKey, this.questions);
    this.getQuestionByCategoryId(categoryId);
  }

  getQuestionByCategoryId(categoryId: number) {
    this.questions = this.storageService.getValue<Question[]>(QuestionService.QuestionStorageKey) || [];
    this.questions = this.questions.filter(q => q.categoryId === categoryId);
    this.questions.map(x => {
      x.countAnswer = this.answerService.getSizeAnswerByQuestionId(x.id);
    });
    this.storageService.setObject(QuestionService.QuestionStorageKey, this.questions);
    this.displayQuestionSubject.next(this.questions);
  }

  getQuestionById(id: number) {
    this.questions = this.storageService.getValue<Question[]>(QuestionService.QuestionStorageKey) || [];
    return this.questions.find(q => q.id === id);
  }

  updateLike(id: number, type: number, categoryId: number) {
    this.questions = this.storageService.getValue<Question[]>(QuestionService.QuestionStorageKey) || [];

    const index = this.questions.findIndex(t => t.id === id);
    const question = this.questions[index];
    if (type === 1) {
      question.like = question.like + 1;
    } else {
      if (question.like > 0) {
        question.dislike = question.dislike + 1;
      }
    }
    this.questions.splice(index, 1, question);
    this.storageService.setObject(QuestionService.QuestionStorageKey, this.questions);
    this.getQuestionByCategoryId(categoryId);
  }

  delete(id: number, categoryId: number) {
    this.questions = this.storageService.getValue<Question[]>(QuestionService.QuestionStorageKey) || [];
    const index = this.questions.findIndex(t => t.id === id);
    this.questions.splice(index, 1);
    this.storageService.setObject(QuestionService.QuestionStorageKey, this.questions);
    this.getQuestionByCategoryId(categoryId);
  }
}
