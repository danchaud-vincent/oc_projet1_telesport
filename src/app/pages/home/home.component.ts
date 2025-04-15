import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { PieChartComponent } from 'src/app/core/components/pie-chart/pie-chart.component';
import { PieChartData } from 'src/app/core/models/chart-data';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PieChartComponent,
    AsyncPipe
  ], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public chartData$: Observable<PieChartData[]> = of([]);
  nbCountries: number = 0;
  nbOfJOs: number = 0;

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chartData$= this.olympicService.getOlympics().pipe(
      tap(olympics => {
        this.nbCountries = olympics.length

        // get the numbers of JOs
        const yearsJOs: Number[] = []

        olympics.forEach(olympic => {
          olympic.participations.forEach(participation => {
            if (!yearsJOs.includes(participation.year)){
              yearsJOs.push(participation.year)
            }
          })
        })
        
        this.nbOfJOs = yearsJOs.length;

      }),
      map(olympics => this.transformOlympicsToChartData(olympics)),
      catchError(error => {
        console.error("Messagz1", error);
  
        if (error.message === 'offline') {
          console.log("Message", error.message)
          // this.router.navigateByUrl('/error');
        }
  
        return of([]);
      })
    
    );
  }

  transformOlympicsToChartData(olympicsData: Olympic[]): PieChartData[]{
    return olympicsData.map(olympic => {
      return {
        name: olympic.country,
        label: olympic.country,
        value: (olympic.participations || []).reduce( (sum, p) => sum + p.medalsCount ,0)
      }
    })
    
  }
}
