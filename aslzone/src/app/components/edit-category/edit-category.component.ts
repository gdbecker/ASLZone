import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SignService } from '../../services/sign.service';
import { CategoryService } from '../../services/category.service';
import { Sign } from '../../models/Sign';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-category-sign',
  templateUrl: './edit-category.component.html',
  styleUrls: ['../../../styles.css', './edit-category.component.css']
})

export class EditCategoryComponent implements OnInit {
  id: string;
  category: Category = {
    id: '',
    name: ''
  };

  @ViewChild('categoryForm') form: any;

  constructor(
    private signService: SignService, 
    private categoryService: CategoryService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // get id from url
    this.id = this.route.snapshot.params['id'];

    // get sign from service
    this.categoryService.getCategory(this.id).subscribe(category => {
      this.category = category;
    });
  }

  onSubmit({ value, valid }: { value: Category; valid: boolean }) {
    if (!valid) {
      // show error
      alert("Please fill out all fields correctly");
    } else {
      value.id = this.category.id;
      
      // update category
      this.categoryService.updateCategory(value);

      // show message
      confirm("Category updated");

      // redirect to alphabet page
      this.router.navigate(['/']);
    }
  }
}
