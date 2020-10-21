import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const heroId = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(heroId)
        .subscribe(hero => this.hero = hero);
  }

  gotoItems(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if availabe
    // so that the HeroList component can select that item.
    this.router.navigate(['/heroes', {id: heroId}]);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
  }
}
