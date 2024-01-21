import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SignService } from '../../services/sign.service';
import { CategoryService } from '../../services/category.service';
import { SettingsService } from '../../services/settings.service';
import { Sign } from '../../models/Sign';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-add-sign',
  templateUrl: './add-sign.component.html',
  styleUrls: ['../../../styles.css', './add-sign.component.css']
})

export class AddSignComponent implements OnInit {
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
  categories!: Set<Category>;

  @ViewChild('signForm') form: any;

  constructor(
    private signService: SignService, 
    private categoryService: CategoryService, 
    private settingsService: SettingsService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(category => {
      this.categories = new Set(category);
    });
  }

  onSubmit({ value, valid }: { value: Sign; valid: boolean }) {
    if (!valid) {
      // show error
      alert("Please fill out all fields correctly");
    } else {
      // console.log(value)

      // add category reference
      let cat = Array.from(this.categories).find(c => c.id === value.category);
      delete value.category;
      value.category = cat;

      // add id
      value.id = value.label;
      
      // add new sign
      this.signService.addSign(value);

      // show message
      confirm("New ASL sign added successfully");

      // redirect to alphabet page
      this.router.navigate(['/']);
    }
  }
}