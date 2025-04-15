import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { PieChartComponent } from 'src/app/core/components/pie-chart/pie-chart.component';
import { PieChartData } from 'src/app/core/models/chart-data';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Router } from '@angular/router';
import { KeyDataHeaderComponent } from "../../core/components/key-data-header/key-data-header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PieChartComponent,
    AsyncPipe,
    KeyDataHeaderComponent
], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public chartData$: Observable<PieChartData[]> = of([]);
  public keyDataChart: any;

  constructor(
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.chartData$= this.olympicService.getOlympics().pipe(
      tap(olympics => {
        
        // get the numbers of JOs
        const yearsJOs: Number[] = []

        olympics.forEach(olympic => {
          olympic.participations.forEach(participation => {
            if (!yearsJOs.includes(participation.year)){
              yearsJOs.push(participation.year)
            }
          })
        })

        // set key data header
        this.keyDataChart = {
          title: "Medals per Country",
          values: [
            {
              name: "Number of JOs",
              value: yearsJOs.length
            },
            {
              name: "Number of countries",
              value: olympics.length
            }
          ]
        };

      }),
      map(olympics => this.transformOlympicsToChartData(olympics)),
      catchError(error => {
        console.error(error);
  
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
