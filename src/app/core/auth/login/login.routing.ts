import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { EsplLoginFormComponent } from './login-form/login-form.component';
import { ForgotPwdComponent } from './forgotPwd/forgot-pwd.component';
import { LoginPageComponent} from '../login/login-page/login-page.component';

const loginRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: EsplLoginFormComponent },
  { path: 'forgot', component: ForgotPwdComponent },
  { path: 'loginPage', component: LoginPageComponent }
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
