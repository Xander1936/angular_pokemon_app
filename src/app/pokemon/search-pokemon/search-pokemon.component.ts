import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
})
export class SearchPokemonComponent implements OnInit {
  // Exemple de recherche {..."a"..."ab"..."abz"..."abc"}
  searchTerms = new Subject<string>();
  // On consomme les donnees provenant d'un oBservable ou on subscribe 
  // {...pokemonList(a)...pokemonList(ab)....}
  // pokemons$ est une variable qui contient un flux de donnees
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {..."a"..."ab"..."abz"..."abc"}
      // Elimine des requetes dont on a pas besoin
      debounceTime(300),
      // {..."ab"..."ab"..."abc"}
      distinctUntilChanged(),
      // {....."ab"..."abc"}
      // {.....Observable<"ab">...Observable<"abc">}
      // Retourne les pokemons a l'interieur du tableau provenant du flux Observable
      // concatMap / mergeMap / SwitchMap
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // {....pokemonList(ab)....pokemonList(abc)}
    );
  }
  // Methode Search pour rechercher des pokemons
  search(term: string) {
    // A chaque fois que le user va taper un terme dans le template, 
    // on va appeler la methode search()
    // on va pousser le terme dans la methode next()
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
