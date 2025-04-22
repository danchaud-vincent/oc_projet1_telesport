import { Component, OnInit } from '@angular/core';
import { catchError, filter, of, take } from 'rxjs';
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
      filter(olympics => olympics.length > 0),
      take(1),
      catchError(error => {
      
        console.error(error);

        this.olympicService.setErrorMessage(error.message)

        this.router.navigateByUrl(`error`);

        return of([])
      })
    ).subscribe();
  }
 
}
