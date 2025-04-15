import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

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
