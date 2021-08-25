import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BreadcrumbComponentComponent} from './components/breadcrumb-component/breadcrumb-component.component';
import {CategoriesComponentComponent} from './components/categories-component/categories-component.component';
import {QuestionComponentComponent} from './components/question-component/question-component.component';
import {QuestionItemComponentComponent} from './components/question-item-component/question-item-component.component';
import {AnswerComponentComponent} from './components/answer-component/answer-component.component';
import {ModalComponentComponent} from './components/modal-component/modal-component.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponentComponent,
    CategoriesComponentComponent,
    QuestionComponentComponent,
    QuestionItemComponentComponent,
    AnswerComponentComponent,
    ModalComponentComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatChipsModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
