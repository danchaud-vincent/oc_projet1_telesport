import { Component, OnInit } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { AlertService } from './core/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private olympicService: OlympicService,
    private alertService: AlertService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(
      take(1),
      catchError(error => {
        let errMessage = "Une erreur est survenue! Erreur lors du chargement des données!";
        
        if (error.message === "offline"){
          errMessage = "Vous êtes actuellement hors ligne. Veuillez vérifier votre connexion.";
        }
        else if (error.message === "format json"){
          errMessage = "Le fichier JSON n’a pas la bonne structure";
        }

        // SnackBar: show the user the error
        this.alertService.showError(errMessage);
        
        console.error(errMessage, error);

        this.router.navigateByUrl(`error/${errMessage}`);

        console.log("after router")

        return of([])
      })
    ).subscribe();
  }
 
}
