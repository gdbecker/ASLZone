import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignsAlphabetComponent } from './components/signs-alphabet/signs-alphabet.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddSignComponent } from './components/add-sign/add-sign.component';
import { EditSignComponent } from './components/edit-sign/edit-sign.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ManageSignsComponent } from './components/manage-signs/manage-signs.component';
import { ManageCategoriesComponent } from './components/manage-categories/manage-categories.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { SignsAnimalsComponent } from './components/signs-animals/signs-animals.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { SignsNumbersComponent } from './components/signs-numbers/signs-numbers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    SignsAlphabetComponent,
    QuizComponent,
    SettingsComponent,
    AddSignComponent,
    EditSignComponent,
    AddCategoryComponent,
    ManageSignsComponent,
    ManageCategoriesComponent,
    EditCategoryComponent,
    SignsAnimalsComponent,
    UserDetailsComponent,
    SignsNumbersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'aslzone'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
