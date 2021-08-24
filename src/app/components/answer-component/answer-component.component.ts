import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Question} from '../models/question.model';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../../service/question.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponentComponent} from '../modal-component/modal-component.component';
import {Answer} from '../models/answer.model';
import {AnswerService} from '../../service/answer.service';

@Component({
  selector: 'app-answer-component',
  templateUrl: './answer-component.component.html',
  styleUrls: ['./answer-component.component.scss']
})
export class AnswerComponentComponent implements OnInit {

  question: Question;
  questionId: number;
  value: string;
  answers$: Observable<Answer[]>;
  isUpdate: boolean;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private answerService: AnswerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.questionId = Number(params.questionId);
    });
    this.question = this.questionService.getQuestionById(this.questionId);
    this.answerService.getAnswerByQuestionId(this.questionId);
    this.answers$ = this.answerService.answer$;
  }

  openModal(id: number, title: string) {
    let dataModal;
    if (title) {
      dataModal = {type: 2, content: title};
      this.isUpdate = true;
    } else {
      dataModal = {type: 2};
      this.isUpdate = false;
    }
    const dialogRef = this.dialog.open(ModalComponentComponent, {data: dataModal});
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.value = value.content;
        if (this.isUpdate) {
          this.answerService.updateAnswer(id, this.value, this.questionId);
        } else {
          this.answerService.addAnswer(this.questionId, this.value);
        }
        console.log(this.value);
      }
    });
  }

  updateLike(id: number, type: number) {
    this.answerService.updateLike(id, type, this.questionId);
  }

  delete(id: number) {
    this.answerService.delete(id, this.questionId);
  }
}
