import { AsyncPipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { LineChartComponent } from 'src/app/core/components/line-chart/line-chart.component';
import { LineChartData } from 'src/app/core/models/chart-data';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    LineChartComponent,
    RouterLink
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  public chartData$: Observable<LineChartData[]> = of([]);
  public nameCountry: string = "";
  public nbEntries: number = 0;
  public nbMedals: number = 0;
  public nbAthletes: number = 0;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ){}

  ngOnInit(): void {
    
    const countryName: string = this.route.snapshot.params["name"].trim();
    
    this.chartData$ = this.olympicService.getOlympicByName(countryName).pipe(
      tap(olympic => {
        if (!olympic){
          console.log("not found")
          this.router.navigateByUrl("not-found");
          return
        }
        
        this.nameCountry = olympic.country;
        this.nbEntries = olympic.participations.length;
        this.nbMedals = olympic.participations.reduce((sum, currP) => sum + currP.medalsCount, 0);
        this.nbAthletes = olympic.participations.reduce((sum, currP) => sum + currP.athleteCount, 0);

      }),
      map(olympic => {
        
        if (olympic){
          return this.transformOlympicToChartData(olympic)
        }

        return []
      })
    );

  }

  transformOlympicToChartData(olympicData: Olympic): LineChartData[]{

    const chartData = [
      {
        name: olympicData.country,
        series: olympicData.participations.map(p => {
          return {
            name: p.year.toString(),
            value: p.medalsCount
          }
        })
      }
    ];
    
    return chartData;
  }

  goBack(): void{
    this.location.back();
  }

  
}
