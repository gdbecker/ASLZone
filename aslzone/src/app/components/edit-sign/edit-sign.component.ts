import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SignService } from '../../services/sign.service';
import { CategoryService } from '../../services/category.service';
import { Sign } from '../../models/Sign';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-edit-sign',
  templateUrl: './edit-sign.component.html',
  styleUrls: ['../../../styles.css', './edit-sign.component.css']
})

export class EditSignComponent implements OnInit {
  id: string;
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(category => {
      this.categories = new Set(category);
    });

    // get id from url
    this.id = this.route.snapshot.params['id'];

    // get sign from service
    this.signService.getSign(this.id).subscribe(sign => {
      this.sign = sign;
      console.log(sign)
    });
  }

  onSubmit({ value, valid }: { value: Sign; valid: boolean }) {
    if (!valid) {
      // show error
      alert("Please fill out all fields correctly");
    } else {
      // add category reference
      let cat = Array.from(this.categories).find(c => c.id === value.category);
      delete value.category;
      value.category = cat;

      // add old id
      value.id = this.sign.id;

      // add new sign
      this.signService.updateSign(value);

      // show message
      confirm("ASL sign updated");

      // redirect to alphabet page
      // this.router.navigate(['/']);
    }
  }
}