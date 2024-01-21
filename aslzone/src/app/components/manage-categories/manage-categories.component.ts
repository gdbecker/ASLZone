import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service'
import { Category } from '../../models/Category';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['../../../styles.css', './manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  categories!: Category[];
  loaded: boolean = false;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loaded = true;
    });
  }

  deleteCategory(category: Category) {
    if (confirm('DANGER! All ASL signs in this category will be deleted! Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(category);
    }
  }
}
