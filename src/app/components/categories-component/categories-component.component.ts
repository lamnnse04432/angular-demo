import {Component, OnInit} from '@angular/core';
import {Category} from '../models/category.model';
import {Observable} from 'rxjs';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-categories-component',
  templateUrl: './categories-component.component.html',
  styleUrls: ['./categories-component.component.scss']
})
export class CategoriesComponentComponent implements OnInit {

  categories$: Observable<Category[]>;


  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.category$;
  }

}
