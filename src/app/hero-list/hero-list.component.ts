import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
  providers: [HeroService]
})
export class HeroListComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private serivce: HeroService) { }

  ngOnInit(): void {
    this.heroes = this.serivce.getHeroes();
  }

  selectHero(hero: Hero) { this.selectedHero = hero;}

}
