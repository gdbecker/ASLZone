import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Score } from '../models/Score';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  scoreCollection: AngularFirestoreCollection<Score>;
  scoreDoc!: AngularFirestoreDocument<Score>;
  scores!: Observable<Score[]>;
  score!: Observable<Score>;

  constructor(private afs: AngularFirestore) {
    this.scoreCollection = this.afs.collection<Score>('scores', (ref) =>
      ref.orderBy('user_email', 'asc'),
    );
  }

  getScores(): Observable<Score[]> {
    this.scores = this.scoreCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Score;
          data.id = action.payload.doc.id;
          return data;
        });
      }),
    );

    return this.scores;
  }

  getScoresByCategory(category: string): Observable<Score[]> {
    this.scores = this.scoreCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Score;
          data.id = action.payload.doc.id;
          return data;
        });
      }),
      map((scores) => {
        return scores.filter((score) => score.category.id === category.toLowerCase());
      }),
    );

    return this.scores;
  }

  getScoresByEmail(email: string): Observable<Score[]> {
    this.scores = this.scoreCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Score;
          data.id = action.payload.doc.id;
          return data;
        });
      }),
      map((scores) => {
        return scores.filter((score) => score.user_email === email);
      }),
    );

    return this.scores;
  }

  getScore(id: string): Observable<Score> {
    this.scoreDoc = this.afs.doc<Score>(`scores/${id}`);
    this.score = this.scoreDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Score;
          data.id = action.payload.id;
          return data;
        }
      }),
    );

    return this.score;
  }

  addScore(score: Score) {
    // make category reference
    let category = this.afs.doc<Category>(`categories/${score.category.id}`);
     score.category = category.ref;

    // add to firestore
    this.scoreCollection.add(score);
  }

  updateScore(score: Score) {
    this.scoreDoc = this.afs.doc(`scores/${score.id}`);
    this.scoreDoc.update(score);
  }

  deleteScore(id: string) {
    this.scoreDoc = this.afs.doc(`scores/${id}`);
    this.scoreDoc.delete();
  }

  deleteScoresByCategory(category: string) {
    let scores = this.getScoresByCategory(category).subscribe(scores => {
      scores.forEach(score => {
        this.deleteScore(score.id);
      });
    });
  }
}