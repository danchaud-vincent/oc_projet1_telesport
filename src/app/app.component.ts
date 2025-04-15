import { Component, OnInit } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { AlertService } from './core/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private olympicService: OlympicService,
    private alertService: AlertService

  ) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(
      take(1),
      catchError(error => {

        if (error.message === "offline"){
          // SnackBar: show the user the error
          this.alertService.showError(`Erreur: Vous êtes actuellement hors ligne. Veuillez vérifier votre connexion.`);
        
          console.error("Vous êtes actuellement hors ligne. Veuillez vérifier votre connexion.", error)
        }
        else if (error.message === "format json"){
          // SnackBar: show the user the error
          this.alertService.showError(`Erreur: Erreur du format des données!`);
   
          console.error("Le fichier JSON n’a pas la bonne structure", error)
        }
        else{
          // SnackBar: show the user the error
          this.alertService.showError("Une erreur est survenue! Erreur lors du chargement des données!");
   
          console.error(error)
        }
        
        return of([])
      })
    ).subscribe();
  }
 
}
