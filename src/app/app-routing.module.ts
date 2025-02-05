import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'offboarding', pathMatch: 'full' },
  { path: 'offboarding', loadChildren: () => import('./modules/offboarding/offboarding.module').then(m => m.OffboardingModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
