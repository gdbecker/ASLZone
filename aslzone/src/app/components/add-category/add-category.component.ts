import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { SettingsService } from '../../services/settings.service';
import { Sign } from '../../models/Sign';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['../../../styles.css', './add-category.component.css']
})

export class AddCategoryComponent implements OnInit {
  category: Category = {
    id: '',
    name: ''
  };

  @ViewChild('categoryForm') form: any;

  constructor(
    private categoryService: CategoryService, 
    private settingsService: SettingsService, 
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  onSubmit({ value, valid }: { value: Category; valid: boolean }) {
    if (!valid) {
      // show error
      alert("Please fill out all fields correctly");
    } else {
      // add id
      value.id = value.name.toLowerCase();

      // add new sign
      this.categoryService.addCategory(value);

      // show message
      confirm("New category added successfully");

      // redirect to alphabet page
      this.router.navigate(['/']);
    }
  }
}