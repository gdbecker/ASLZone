import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sign } from '../models/Sign';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class SignService {
  signCollection: AngularFirestoreCollection<Sign>;
  signDoc!: AngularFirestoreDocument<Sign>;
  signs!: Observable<Sign[]>;
  sign!: Observable<Sign>;

  constructor(private afs: AngularFirestore) {
    this.signCollection = this.afs.collection<Sign>('signs', (ref) =>
      ref.orderBy('label', 'asc'),
    );
  }

  getSigns(): Observable<Sign[]> {
    this.signs = this.signCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Sign;
          data.id = action.payload.doc.id;
          return data;
        });
      }),
    );

    return this.signs;
  }

  getSignsByCategory(category: string): Observable<Sign[]> {
    this.signs = this.signCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Sign;
          data.id = action.payload.doc.id;
          return data;
        });
      }),
      map((signs) => {
        return signs.filter((sign) => sign.category.id === category.toLowerCase());
      }),
    );

    return this.signs;
  }

  getSign(id: string): Observable<Sign> {
    this.signDoc = this.afs.doc<Sign>(`signs/${id}`);
    this.sign = this.signDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Sign;
          data.id = action.payload.id;
          return data;
        }
      }),
    );

    return this.sign;
  }

  addSign(sign: Sign) {
    // make category reference
    let category = this.afs.doc<Category>(`categories/${sign.category.id}`);
    sign.category = category.ref;

    // add to firestore
    this.signCollection.doc(sign.id).set(sign);
  }

  updateSign(sign: Sign) {
    this.signDoc = this.afs.doc(`signs/${sign.id}`);
    this.signDoc.update(sign);
  }

  deleteSign(id: string) {
    this.signDoc = this.afs.doc(`signs/${id}`);
    this.signDoc.delete();
  }

  deleteSignsByCategory(category: string) {
    let signs = this.getSignsByCategory(category).subscribe(signs => {
      signs.forEach(sign => {
        this.deleteSign(sign.id);
      });
    });
  }
}
