import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';
import { SignService } from '../../services/sign.service';
import { ScoresService } from '../../services/scores.service';
import { Category } from '../../models/Category';
import { Score } from '../../models/Score';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['../../../styles.css', './user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  loggedInUser: string;
  categories!: Set<Category>;
  scores?: Score[];
  loaded: boolean = false;
  
  constructor(
    private authService: AuthService,
    private signService: SignService,
    private categoryService: CategoryService,
    private scoresService: ScoresService,
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;
        this.scoresService.getScoresByEmail(auth.email).subscribe(scores => {
          scores.forEach(score => {
            this.categoryService.getCategory(score.category.id).subscribe(category => {
              score.category = category;

              this.signService.getSignsByCategory(category.name).subscribe(signs => {
                score.category.signCount = signs.length;
              });
              
            });
          });
          this.scores = scores;
          this.loaded = true;
        });
      } else {
        this.loggedInUser = '';
      }
    });

    this.categoryService.getCategories().subscribe(category => {
      this.categories = new Set(category);
    });
  }

  categoryHasScore(category: Category, scores: Score[]) {
    return scores.some(score => score.category.id === category.id);
  }
}
