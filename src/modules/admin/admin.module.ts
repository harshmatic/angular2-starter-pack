import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRouting } from './admin.routing';
import { SharedModule } from '../../app/shared/shared.module';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { UserRoleComponent } from './components/user/user-role/user-role.component';
import { AppModuleComponent } from './components/appModule/appModule.component';
import { UserEffects } from './store/user/user.effects';
import { UserService } from './services/user.service';
import { RoleEffects } from './store/role/role.effects';
import { RoleService } from './services/role.service';
import { AppModuleEffects } from './store/appModule/appModule.effects';
import { AppModuleService } from './services/appModule.service';
@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AdminRouting,
    EffectsModule.run(UserEffects),
    EffectsModule.run(RoleEffects),
    EffectsModule.run(AppModuleEffects),
    EffectsModule.run(AppModuleEffects),
  ],
  declarations: [
    UserListComponent,UserRoleComponent,RoleListComponent,AppModuleComponent
  ],
  providers:[UserService,RoleService,AppModuleService]
})
export class AdminModule { }
