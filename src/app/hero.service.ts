import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';   // 웹 API 형식의 URL 사용

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  private heroes: Hero[] = [];

  constructor(
    private http: HttpClient, 
    private messageService: MessageService,
    private logger: Logger
  ) { }

  getHeroes(): Observable<Hero[]> {
    this.logger.log('Fetch backendservice');
    
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')), 
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }
  getHero(id: number): Observable<Hero>{
    //return HEROES[heroId];
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)), 
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  addHero(hero: Hero) : Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
        .pipe(
          tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
          catchError(this.handleError<Hero>('addHero'))
        );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero: hero.id;
    const url = `${this.heroesUrl}/${id}`

    return this.http.delete<Hero>(url, this.httpOptions) 
        .pipe(
          tap(_ => this.log(`deleted hero id=${id}`)), 
          catchError(this.handleError<Hero>('deleteHero'))
        );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions) 
        .pipe(
          tap(_ => this.log(`updated hero id=${hero.id}`)), 
          catchError(this.handleError<any>('updateHero'))
        );
  }

  /* GET: 입력된 문구가 이름에 포함된 히어로 목록을 반환합니다. */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // 입력된 내용이 없으면 빈 배열을 반환합니다.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
    /**
   * HTTP 요청이 실패한 경우를 처리합니다.
   * 애플리케이션 로직 흐름은 그대로 유지됩니다.
   * @param operation - 실패한 동작의 이름
   * @param result - 기본값으로 반환할 객체
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: 리모트 서버로 에러 메시지 보내기
      console.log(error); // 지금은 콘솔에 로그를 출력합니다.

      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }

  /** HeroService에서 보내는 메시지는 MessageService가 화면에 표시합니다. */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
