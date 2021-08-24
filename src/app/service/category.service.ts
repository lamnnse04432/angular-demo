import {Injectable} from '@angular/core';
import {Category} from '../components/models/category.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private static readonly CategoryStorageKey = 'category';

  private categories: Category[];
  private displayCategorySubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  category$: Observable<Category[]> = this.displayCategorySubject.asObservable();

  constructor(private storageService: LocalStorageService) {
    this.categories = [];
  }

  fetchFromLocalStorage() {
    this.categories = this.storageService.getValue<Category[]>(CategoryService.CategoryStorageKey) || [];
    this.displayCategorySubject.next(this.categories);
  }

  addCategory(imagesUrl: string, title: string, description: string, tags: Array<string>) {
//    const date = new Date(Date.now()).getTime();
    const date = 1;
    const newCategory = new Category(date, imagesUrl, title, description, tags);
    this.categories.unshift(newCategory);
    this.storageService.setObject(CategoryService.CategoryStorageKey, this.categories);
    this.displayCategorySubject.next(this.categories);
  }

  getCategoryById(id: number) {
    this.categories = this.storageService.getValue<Category[]>(CategoryService.CategoryStorageKey) || [];
    return this.categories.find(c => c.id === id);
  }
}
