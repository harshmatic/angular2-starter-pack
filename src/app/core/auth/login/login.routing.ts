import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { EsplLoginFormComponent } from './login-form/login-form.component';

const loginRoutes: Routes = [
  { path: 'login', component: EsplLoginFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
   // AuthGuard,
    AuthService
  ]
})
export class LoginRouting { }
