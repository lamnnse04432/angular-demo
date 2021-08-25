import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesComponentComponent} from './components/categories-component/categories-component.component';
import {QuestionComponentComponent} from './components/question-component/question-component.component';
import {AnswerComponentComponent} from './components/answer-component/answer-component.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';


const routes: Routes = [
  // {path: 'questions/about/:categoryId', component: QuestionComponentComponent , data: {breadcrumb: 'Answer'}},
  // {path: 'answer/:questionId', component: AnswerComponentComponent , data: {breadcrumb: 'Question'}},
  // {path: '', component: CategoriesComponentComponent, data: {breadcrumb: 'Category'}}

  {
    path: '',
    component: DashboardComponent,
    data: {
      breadcrumb: 'Dashboard',
    },
    children: [
      {
        path: 'category',
        component: CategoriesComponentComponent,
        data: {
          breadcrumb: 'Category',
        },
        children: [
          {
            path: 'questions/:categoryId',
            component: QuestionComponentComponent,
            data: {
              breadcrumb: 'Question',
            },
            children: [
              {
                path: 'answer/:questionId',
                component: AnswerComponentComponent,
                data: {
                  breadcrumb: 'Answer',
                },
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
