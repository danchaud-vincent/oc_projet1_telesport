import { Component, OnInit } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private olympicService: OlympicService,
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
        
        console.error(errMessage, error);

        this.router.navigateByUrl(`error/${errMessage}`);

        return of([])
      })
    ).subscribe();
  }
 
}
