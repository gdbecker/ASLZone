import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }  from './components/login/login.component';
import { RegisterComponent }  from './components/register/register.component';
import { UserDetailsComponent }  from './components/user-details/user-details.component';
import { SignsAlphabetComponent }  from './components/signs-alphabet/signs-alphabet.component';
import { SignsAnimalsComponent }  from './components/signs-animals/signs-animals.component';
import { SignsNumbersComponent }  from './components/signs-numbers/signs-numbers.component';
import { QuizComponent }  from './components/quiz/quiz.component';
import { AddSignComponent }  from './components/add-sign/add-sign.component';
import { EditSignComponent }  from './components/edit-sign/edit-sign.component';
import { AddCategoryComponent }  from './components/add-category/add-category.component';
import { EditCategoryComponent }  from './components/edit-category/edit-category.component';
import { ManageSignsComponent }  from './components/manage-signs/manage-signs.component';
import { ManageCategoriesComponent }  from './components/manage-categories/manage-categories.component';
import { SettingsComponent }  from './components/settings/settings.component';
import { NotFoundComponent }  from './components/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';

const routes: Routes = [
  { path: '', component: SignsAlphabetComponent, canActivate:[AuthGuard] },
  { path: 'animals', component: SignsAnimalsComponent, canActivate:[AuthGuard] },
  { path: 'numbers', component: SignsNumbersComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserDetailsComponent, canActivate:[AuthGuard] },
  { path: 'quiz', component: QuizComponent, canActivate:[AuthGuard] },
  { path: 'signs/add', component: AddSignComponent, canActivate:[AuthAdminGuard] },
  { path: 'signs/edit/:id', component: EditSignComponent, canActivate:[AuthAdminGuard] },
  { path: 'signs/manage', component: ManageSignsComponent, canActivate:[AuthAdminGuard] },
  { path: 'categories/add', component: AddCategoryComponent, canActivate:[AuthAdminGuard] },
  { path: 'categories/edit/:id', component: EditCategoryComponent, canActivate:[AuthAdminGuard] },
  { path: 'categories/manage', component: ManageCategoriesComponent, canActivate:[AuthAdminGuard] },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthAdminGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthAdminGuard]
})
  
export class AppRoutingModule { }
