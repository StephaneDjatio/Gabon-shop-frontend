import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MagasinComponent } from './pages/magasin/magasin.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'shop/:id', component: MagasinComponent},
  {path:'shop', component: MagasinComponent},
  {path:'signup', component: ConnexionComponent},
  { path:'', redirectTo:'home', pathMatch:'full'},
  // Other top-level routes
  // { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path:'**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
