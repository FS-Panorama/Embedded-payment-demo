import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestjigComponent } from './component/test-jig/test-jig.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ThankYouComponent } from './component/thank-you/thank-you.component';

export const routes: Routes = ([
  { path: '', redirectTo: 'demo', pathMatch: 'full' }, //default route
  { path: 'demo', component: TestjigComponent, pathMatch: 'full' },
  { path: 'thankyou', component: ThankYouComponent },
  { path: '**', component: PageNotFoundComponent }]) as any;


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
