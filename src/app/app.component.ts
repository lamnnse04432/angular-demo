import {Component, OnInit} from '@angular/core';
import {CategoryService} from './service/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'project-management';

  tags = ['a', 'b'];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.addCategory('https://angular.io/generated/images/marketing/concept-icons/cli.svg', 'Angular 9',
      'description ', this.tags);
    this.categoryService.fetchFromLocalStorage();
  }
}
