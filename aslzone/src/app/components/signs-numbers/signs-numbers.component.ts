import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service';
import { CategoryService } from '../../services/category.service';
import { Sign } from '../../models/Sign';

@Component({
  selector: 'app-signs-numbers',
  templateUrl: './signs-numbers.component.html',
  styleUrl: './signs-numbers.component.css'
})

export class SignsNumbersComponent implements OnInit {
  signs!: Sign[];

  constructor(
    private signService: SignService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.signService.getSignsByCategory('Numbers').subscribe(signs => {
      signs.forEach(sign => {
        this.categoryService.getCategory(sign.category.id).subscribe(category => {
          sign.category = category;
        });
      });
      this.signs = signs;
    });
  }
}
