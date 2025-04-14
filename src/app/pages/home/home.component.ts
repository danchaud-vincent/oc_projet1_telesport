import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { PieChartComponent } from 'src/app/core/components/pie-chart/pie-chart.component';
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
  public chartData$: Observable<any[]> = of([]);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.chartData$= this.olympicService.getOlympics().pipe(
      map(olympics => this.preparedDataForPieChart(olympics))
    );

    console.log(this.chartData$)
  }

  preparedDataForPieChart(olympicsData: Olympic[]): any[]{

    console.log(olympicsData)
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
