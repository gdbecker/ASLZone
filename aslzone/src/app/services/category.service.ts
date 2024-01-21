import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/Category';
import { SignService } from './sign.service';
import { ScoresService } from './scores.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryCollection: AngularFirestoreCollection<Category>;
  categoryDoc!: AngularFirestoreDocument<Category>;
  categories!: Observable<Category[]>;
  category!: Observable<Category>;

  constructor(
    private afs: AngularFirestore,
    private signService: SignService,
    private scoresService: ScoresService
  ) {
    this.categoryCollection = this.afs.collection<Category>('categories', (ref) =>
      ref.orderBy('name', 'asc'),
    );
  }

  getCategories(): Observable<Category[]> {
    this.categories = this.categoryCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Category;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return this.categories;
  }

  getCategory(id: string) {
    this.categoryDoc = this.afs.doc<Category>(`categories/${id}`);
    this.category = this.categoryDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Category;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.category;
  }

  addCategory(category: Category) {
    // add to firestore
    this.categoryCollection.doc(category.id).set(category);
  }

  updateCategory(category: Category) {
    this.categoryDoc = this.afs.doc(`categories/${category.id}`);
    this.categoryDoc.update(category);
  }

  deleteCategory(category: Category) {
    // find category
    this.categoryDoc = this.afs.doc(`categories/${category.id}`);

    // manually cascade delete all signs with references to the category
    this.signService.deleteSignsByCategory(category.name);

    // manually cascade delete all scores with references to the category
    this.scoresService.deleteScoresByCategory(category.name);

    // delete category from firestore
    this.categoryDoc.delete();
  }
}
