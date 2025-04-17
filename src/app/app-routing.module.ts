import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'not-found', 
    component: NotFoundComponent,
  },
  {
    path: ':name',
    component: DetailComponent,
  },
  {
    path: '**', // wildcard
    redirectTo: 'NotFoundComponent',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
