import { RegistrationsComponent } from './registrations/registrations.component';
import { LoginComponent } from './login/login.component';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { CoinListComponent } from './coin-list/coin-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo :'login', pathMatch:'full'},
  {path:'register', component: RegistrationsComponent},
  {path:'login', component: LoginComponent},
  {path:'coin-list', component: CoinListComponent},
  {path:'coin-detail/:id', component: CoinDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
