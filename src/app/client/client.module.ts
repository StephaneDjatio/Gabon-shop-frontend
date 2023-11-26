import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthGuard } from '../auth.guard';

const clientRoutes: Routes = [
  {
    path: 'client',
    component: ClientLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path:'dashboard', component: DashboardComponent},
      { path:'shopping-list', component: ShoppingListComponent},
      { path:'profile', component: ProfileComponent},
    ]
  }
];

@NgModule({
  declarations: [
    ClientLayoutComponent,
    DashboardComponent,
    ProfileComponent,
    ShoppingListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(clientRoutes)
  ]
})
export class ClientModule { }
