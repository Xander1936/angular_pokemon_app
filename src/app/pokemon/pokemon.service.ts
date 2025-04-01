import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

// @Injectable({
  // On fournit notre pokemonService a 
  // l'ensemble de l'application grace a l'injecteur racine 'root' a partir de privideIn.
  // providedIn: 'root'  
// })
@Injectable()
export class PokemonService {

  constructor(private http: HttpClient) {}
  // Observable<Pokemon[]> : On va retourner un flux qui contient un tableau de pokemons. 
  getPokemonList(): Observable<Pokemon[]> {
    // Le HttpClient renvoie des flux. 'api/pokemons' renvoie des pokemons.
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      // L'opérateur tap a la meme valeur que console.log() pour les Observables
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    ); // anciennement constante POKEMONS.find(pokemon => pokemon.id == pokemonId);
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    // L'utilisateur doit taper au moins 02 lettres 
    if(term.length <= 1) {
      return of([]);
    } 

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  private log(response: any) {
    console.table(response);
  }
  // On prend une error: du type Error 
  // et en 2nd parametre la valeur par defaut errorValue de type any car sa peut etre des donnees completement differentes.
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  // string[] veut dire "retourne un tableau de chaines de caracteres" 
  getPokemonTypeList(): string[] {
    return [
      'Plante', 
      'Feu', 
      'Eau', 
      'Insecte',
      'Normal',
      'Electrik', 
      'Poison', 
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ];
  }

}
