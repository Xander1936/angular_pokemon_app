import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
// import { AddPokemonComponent } from './pokemon/add-pokemon/add-pokemon.component';



const routes: Routes = [
  // Du haut vers le bas toujours 
  // declarer les routes specifiques en haut et les routes globales en bas 
  // { path: 'add-pokemon', component: AddPokemonComponent },
  { path:'', redirectTo:'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path:'**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
