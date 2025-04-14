import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { LineChartComponent } from 'src/app/core/components/line-chart/line-chart.component';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    LineChartComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  public olympic$: Observable<Olympic | undefined> = of(undefined) ;
  public chartData$: Observable<any[]> = of([]);

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    
    const countryName: string = this.route.snapshot.params["name"].trim();
    
    this.chartData$ = this.olympicService.getOlympicByName(countryName).pipe(
      tap(olympic => console.log(olympic)),
      map(olympic => {
        if (olympic){
          return this.preparedDateForLineChart(olympic)
        }

        return []
      })
    );

  }

  preparedDateForLineChart(olympicData: Olympic){

    const chartData = [
      {
        name: olympicData.country,
        series: olympicData.participations.map(p => {
          return {
            value: p.medalsCount,
            name: p.year
          }
        })
      }
    ];
    
    return chartData;
    
  }

  
}
