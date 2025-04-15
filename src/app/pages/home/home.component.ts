import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { PieChartComponent } from 'src/app/core/components/pie-chart/pie-chart.component';
import { PieChartData } from 'src/app/core/models/chart-data';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

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

  constructor(private olympicService: OlympicService) {}

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
      map(olympics => this.transformOlympicsToChartData(olympics))
    );
  }

  transformOlympicsToChartData(olympicsData: Olympic[]): PieChartData[]{
    const chartData = olympicsData.map(olympic => {
      return {
        name: olympic.country,
        label: olympic.country,
        value: (olympic.participations || []).reduce( (sum, p) => sum + p.medalsCount ,0)
      }
    })

    return chartData
  }
}
