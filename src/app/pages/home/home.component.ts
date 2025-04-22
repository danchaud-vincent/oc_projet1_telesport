import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { PieChartComponent } from 'src/app/core/components/pie-chart/pie-chart.component';
import { PieChartData } from 'src/app/core/models/pie-chart-data';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { KeyDataHeaderComponent } from "../../core/components/key-data-header/key-data-header.component";
import { keyDataHeader } from 'src/app/core/models/key-data-header';

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
  public keyDataChart: keyDataHeader = {title: "", values: []};

  constructor(
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.chartData$= this.olympicService.getOlympics().pipe(
      map(olympics => {
        // set key data header
        this.keyDataChart = this.getKeyDataFromOlympics(olympics);
        
        return this.transformOlympicsToChartData(olympics)
      }),
      catchError(error => {
        console.error(error);
  
        return of([]);
      })
    
    );
  }

  private transformOlympicsToChartData(olympicsData: Olympic[]): PieChartData[]{
    return olympicsData.map(olympic => {
      return {
        name: olympic.country,
        label: olympic.country,
        value: (olympic.participations || []).reduce( (sum, p) => sum + p.medalsCount ,0)
      }
    })
  }

  private getKeyDataFromOlympics(olympics: Olympic[]): keyDataHeader{
    // get the numbers of JOs
    const yearsJOs: number[] = []

    olympics.forEach(olympic => {
      olympic.participations.forEach(participation => {
        if (!yearsJOs.includes(participation.year)){
          yearsJOs.push(participation.year)
        }
      })
    })
    
    return {
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
  }
}
