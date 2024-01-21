import { Component, OnInit } from '@angular/core';
import { SignService } from '../../services/sign.service';
import { CategoryService } from '../../services/category.service';
import { Sign } from '../../models/Sign';

@Component({
  selector: 'app-manage-signs',
  templateUrl: './manage-signs.component.html',
  styleUrls: ['../../../styles.css', './manage-signs.component.css']
})
export class ManageSignsComponent implements OnInit {
  signs!: Sign[];
  loaded: boolean = false;
  
  constructor(
    private signService: SignService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.signService.getSigns().subscribe(signs => {
      signs.forEach(sign => {
        this.categoryService.getCategory(sign.category.id).subscribe(category => {
          sign.category = category;
        });
      });
      this.signs = signs;
      this.loaded = true;
    });
  }

  deleteSign(id: string) {
    if (confirm('Are you sure you want to delete this ASL sign?')) {
      this.signService.deleteSign(id);
    }
  }
}
