import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignService } from '../../services/sign.service';
import { CategoryService } from '../../services/category.service';
import { ScoresService } from '../../services/scores.service';
import { Sign } from '../../models/Sign';
import { Category } from '../../models/Category';
import { Score } from '../../models/Score';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['../../../styles.css', './quiz.component.css']
})
  
export class QuizComponent implements OnInit {
  loggedInUser: string;
  sign: Sign = {
    id: '',
    category: {
      id: '',
      name: ''
    },
    description: '',
    label: '',
    url: ''
  };
  signs!: Sign[];
  selectedCategory!: Category;
  categories!: Set<Category>;
  scores!: Score[];
  
  inGame: boolean = false;
  signIndex: number = 0;
  submittedAnswer!: string;
  currentScore: number = 0;
  finishedGame: boolean = false;

  @ViewChild('activateForm') form1: any;
  @ViewChild('gameForm') form2: any;
  
  constructor(
    private authService: AuthService,
    private signService: SignService,
    private categoryService: CategoryService,
    private scoresService: ScoresService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;
        this.scoresService.getScoresByEmail(auth.email).subscribe(scores => {
          scores.forEach(score => {
            this.categoryService.getCategory(score.category.id).subscribe(category => {
              score.category = category;
            });
          });
          this.scores = scores;
        });
      } else {
        this.loggedInUser = '';
      }
    });
    
    this.categoryService.getCategories().subscribe(category => {
      this.categories = new Set(category);
    });
  }

  onActivateSubmit({ value, valid }: { value: any; valid: boolean }) {
    if (!valid) {
      // show error
      alert("Select a category to start the quiz!");
    } else {
      // get signs for chosen category
      this.signService.getSignsByCategory(value.category).subscribe(signs => {
        signs.forEach(sign => {
          this.categoryService.getCategory(sign.category.id).subscribe(category => {
            sign.category = category;
          });
        });
        // randomly shuffle
        signs = this.shuffle(signs);

        // assign first sign
        this.sign = signs[this.signIndex];

        // assign shuffled signs to list
        this.signs = signs;
      });
      
      // activate quiz
      this.inGame = true;
      
    }
  }

  onGameSubmit({ value, valid }: { value: any; valid: boolean }) {
    if (!valid) {
      // show error
      alert("Type in your answer");
    } else {
      console.log(value.answer)
      // test if answer is correct
      const correct = value.answer.toLowerCase() === this.sign.label.toLowerCase();

      // if correct, add score and get next sign
      // if wrong, exit game and save score
      if (correct) {
        confirm(`You got it right! The answer was '${this.sign.label}'`);
        this.currentScore++;
        this.signIndex++;
        this.submittedAnswer = null;

        if (this.signIndex < this.signs.length) {
          this.sign = this.signs[this.signIndex];
        }
        
      } else {
        confirm(`Sorry, that is incorrect. The right answer was '${this.sign.label}'`);
        this.endGame();
      }

      // if all signs are answered, exit game and save score
      if (this.signIndex >= this.signs.length) {
        this.endGame();
      }

    }
  }

  endGame() {
    this.inGame = false;
    this.finishedGame = true;

    // check if there's an existing score for the category, if so then update
    // else, add a new score
    const userScore: Score = this.scores.find(score => score.category.id === this.sign.category.id);

    if (userScore) {
      // update score only if new one is higher
      if (this.currentScore > userScore.score) {
        userScore.score = this.currentScore;
        this.scoresService.updateScore(userScore);
      }
    } else {
      const newScore: Score = {
        user_email: this.loggedInUser,
        category: this.sign.category,
        score: this.currentScore
      };
      this.scoresService.addScore(newScore);
    }
  }

  restart() {
    this.finishedGame = false;
    this.submittedAnswer = null;
  }

  shuffle(array: Sign[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  
}
