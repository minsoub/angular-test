import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
  providers: [HeroService]
})
export class HeroListComponent implements OnInit {
  //heroes: Hero[];
  heroes$: Observable<any>;
  selectedId: number;
  heroes = HEROES;
  selectedHero: Hero;

  constructor(private serivce: HeroService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.heroes = this.serivce.getHeroes();
    this.heroes$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.serivce.getHeroes();
      })
    );
  }

  selectHero(hero: Hero) { this.selectedHero = hero;}

}
