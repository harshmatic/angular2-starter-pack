import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';

import { HeroesRouting } from './heroes.routing';
import { SharedModule, TwainService, WelcomeComponent } from '../../app/shared';
import { UserService } from '../../app/core/services/user.service';
import { HeroesPage } from './heroes.page';
import { CrisisCenterModule } from './crisis-center/crisis-center.module';
import { HeroModule } from './hero/hero.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HeroEffects, CrisisEffects } from '../../app/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroesRouting,
    EffectsModule.run(HeroEffects),
    EffectsModule.run(CrisisEffects),
    CrisisCenterModule,
    HeroModule,
    DashboardModule,
    SharedModule,
  ],
  declarations: [HeroesPage],
  providers: [TwainService, UserService]
})
export class HeroesModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
