import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroes: Hero[] = [];

  constructor(
    //private backend: BackendService,
    private logger: Logger
  ) { }

  getHeroes() {
    return HEROES;

    // this.backend.getAll(Hero).hen((heroes: Hero[])=>{
    //   this.logger.log('Fetched ${heroes.length} heroes.');
    //   this.heroes.push(...heroes);  // 캐시에 저장
    // });
    // return this.heroes;
  }
}
