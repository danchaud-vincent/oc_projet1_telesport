import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(`Erreur lors du chargement des données:`, error);
        
        this.snackBar.open('Une erreur est survenue.', 'Fermer', {
          duration: 4000, // en ms
        });

        this.olympics$.next([]);

        return of([]);
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
          console.warn(`Aucun pays trouvé pour ${name}`);
          return undefined;
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
