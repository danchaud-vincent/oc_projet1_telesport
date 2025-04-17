import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, finalize, first, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  private loadingOlympics = new BehaviorSubject<boolean>(true);
  loadingOlympics$ = this.loadingOlympics.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  loadInitialData(): Observable<Olympic[]> {
    
    // Start of loading
    this.loadingOlympics.next(true);  

    // Check if navigator is online
    if(!navigator.onLine){
      return throwError(() => new Error("offline"));
    }

    // get the data with http request
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        // check if the json format is valid
        if(!Array.isArray(value)){
          throw new Error('format json');
        }

        this.olympics$.next(value)

      }),
      catchError(error => {

        this.olympics$.next([]);

        // End of loading
        this.loadingOlympics.next(false);  

        // throw the error in the component to display the
        return throwError(() => new Error(error.message));
      }),
      finalize(() => this.loadingOlympics.next(false)) // end of loading, error or not
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympicByName(name: string): Observable<Olympic | null> {

    const foundOlympic = this.getOlympics().pipe(
      filter(olympics => olympics.length > 0),
      first(),
      map((olympics: Olympic[]) => {
        
        const result = olympics.find(ol => ol.country.toLowerCase() === name.toLowerCase());
        
        return result || null;
      }),
      catchError(err => {
        console.error('Erreur lors de la récupération des données :', err);

        return of(null)
      })
    );

    return foundOlympic
  }

}
