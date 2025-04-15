import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

    // Check if navigator is online
    if(!navigator.onLine){

      // SnackBar: show the user the error
      this.showError("Vous êtes actuellement hors ligne. Veuillez vérifier votre connexion.");
   
      console.warn('Appel annulé: utilisateur hors ligne.');

      this.olympics$.next([]);

      return of([])
    }

    // get the data with http request
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        // check if the json format is valid
        if(!Array.isArray(value)){
          throw new Error('Le fichier JSON n’a pas la bonne structure');
        }

        this.olympics$.next(value)

      }),
      catchError(error => {
        console.error(`Erreur lors du chargement des données:`, error);
        
        // SnackBar: show the user the error
        this.showError("Une erreur est survenue! Erreur lors du chargement des données!");
   
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
          throw new Error(`Erreur: Aucun pays trouvé pour ${name}`);
        }
       
        return result;
      }),
      catchError(err => {
        console.log(err);

        // SnackBar: show the user the error
        this.showError(`Erreur: Aucun pays n'a été trouvé pour ${name}`);
   
        return of(undefined);
      })
    );

    return foundOlympic
  }


  showError(errorMessage: string): void{
    this.snackBar.open(
      errorMessage, 
      'Fermer', 
      {
      duration: 4000, // en ms
      }
    );
  }
}
