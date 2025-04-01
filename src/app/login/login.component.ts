import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  message: string = 'Vous êtes déconnecté. (pikachu/pikachu)'
  name: string;
  password: string;
  auth: AuthService;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth = this.authService;
  }

  setMessage() {
    if(this.auth.isLoggedIn) {
      this.message = 'Vous êtes connecté.';
    } else {
      this.message = 'Identifiant ou mot de passe incorrect.';
    }
  }

  login() {
    this.message = 'Tentative de connexion en cours ...';
    // Je prends les infos du user et je l'envoies a mon authService pour savoir ce qui se passe
    this.auth.login(this.name, this.password)
      .subscribe((isLoggedIn: boolean) =>{
        // Je mets d'abord a jour le msg
        this.setMessage();
        // Rediriger les users vers la liste de tous les pokémons seulement si il est connecté:
        if(isLoggedIn) {
          this.router.navigate(['/pokemons']);
        } else {
          // Je reinitialise le password du user au cas ou
          this.password = '';
          // Je redirige le user vers la page de login
          this.router.navigate(['/login']);
        }
      })
  }

  logout() {
    this.auth.logout();
    this.message = 'Vous êtes déconnecté.';
  }

}
