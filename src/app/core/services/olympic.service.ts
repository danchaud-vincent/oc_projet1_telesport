import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  loadInitialData(): Observable<Olympic[]> {

    // Check if navigator is online
    if(!navigator.onLine){
      return throwError(() => new Error("offline"));
    }

    // get the data with http request
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        // check if the json format is valid
        if(Array.isArray(value)){
          throw new Error('format json');
        }

        this.olympics$.next(value)

      }),
      catchError(error => {

        this.olympics$.next([]);

        return throwError(() => new Error(error.message));
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympicByName(name: string): Observable<Olympic | undefined> {

    const foundOlympic = this.getOlympics().pipe(
      map((olympics: Olympic[]) => {
        const result = olympics.find(ol => ol.country.toLowerCase() === name.toLowerCase());
        
        if(!result){
          throw new Error(`Erreur: Aucun pays trouvé pour ${name}`);
        }
       
        return result;
      }),
      catchError(err => {
        console.log(err);

        return of(undefined);
      })
    );

    return foundOlympic
  }

}
