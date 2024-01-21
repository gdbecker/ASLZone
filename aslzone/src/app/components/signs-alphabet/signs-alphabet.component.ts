import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service';
import { CategoryService } from '../../services/category.service';
import { Sign } from '../../models/Sign';

@Component({
  selector: 'app-signs-alphabet',
  templateUrl: './signs-alphabet.component.html',
  styleUrl: './signs-alphabet.component.css'
})
  
export class SignsAlphabetComponent implements OnInit {
  signs!: Sign[];
  
  constructor(
    private signService: SignService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.signService.getSignsByCategory('Alphabet').subscribe(signs => {
      signs.forEach(sign => {
        this.categoryService.getCategory(sign.category.id).subscribe(category => {
          sign.category = category;
        });
      });
      this.signs = signs;
    });
  }
}
