import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympicByName(name: string): Observable<Olympic | undefined> {

    const foundOlympic = this.getOlympics().pipe(
      map((olympics: Olympic[]) => olympics.filter(ol => ol.country.toLowerCase() === name.toLowerCase())[0]),
      tap((filtered: Olympic) => {
        if (!filtered){
          throw new Error(`Aucun pays trouvé pour ${name}`)
        }
      }),
      catchError(err => {
        console.log(err)
        return of(undefined)
      })
    
    );

    return foundOlympic
  }
}
