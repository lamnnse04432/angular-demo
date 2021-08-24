import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../models/category.model';
import {QuestionService} from '../../service/question.service';
import {Question} from '../models/question.model';
import {ModalComponentComponent} from '../modal-component/modal-component.component';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-question-component',
  templateUrl: './question-component.component.html',
  styleUrls: ['./question-component.component.scss']
})
export class QuestionComponentComponent implements OnInit {

  category: Category;
  categoryId: number;
  value: string;
  questions$: Observable<Question[]>;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private questionService: QuestionService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = Number(params.categoryId);
    });
    console.log(this.categoryId);
    this.category = this.categoryService.getCategoryById(this.categoryId);
    this.questionService.getQuestionByCategoryId(this.categoryId);
    this.questions$ = this.questionService.question$;
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponentComponent, {data: {type: 1, content: ''}});

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.value = value.content;
        this.questionService.addQuestion(this.categoryId, this.value);
      }
    });
  }

  updateLike(id: number, type: number) {
    this.questionService.updateLike(id, type, this.categoryId);
  }

  delete(id: number) {
    this.questionService.delete(id, this.categoryId);
  }

}
