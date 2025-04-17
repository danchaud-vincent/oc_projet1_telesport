import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {  map, Observable, of, tap } from 'rxjs';
import { LineChartComponent } from 'src/app/core/components/line-chart/line-chart.component';
import { LineChartData } from 'src/app/core/models/line-chart-data';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { KeyDataHeaderComponent } from "../../core/components/key-data-header/key-data-header.component";
import { keyDataHeader } from 'src/app/core/models/key-data-header';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    LineChartComponent,
    RouterLink,
    KeyDataHeaderComponent
],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  public chartData$: Observable<LineChartData[]> = of([]);
  public keyDataChart: keyDataHeader = {title: "", values: []};
  public nameCountry: string = "";
  public nbEntries: number = 0;
  public nbMedals: number = 0;
  public nbAthletes: number = 0;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {

    const countryName: string = this.route.snapshot.params["name"].trim();

    this.chartData$ = this.olympicService.getOlympicByName(countryName).pipe(
      tap(olympic => {
        if (!olympic){
          this.router.navigateByUrl("not-found");
        }
      }),
      map(olympic => {

        if(!olympic){
          
          return []
        }

        // set the key data header
        this.keyDataChart = this.getKeyDataFromOlympic(olympic);
       
        return this.transformOlympicToChartData(olympic)
        
      })
    );
  }

  private transformOlympicToChartData(olympicData: Olympic): LineChartData[]{

    return [
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
  }

  private getKeyDataFromOlympic(olympic: Olympic):  keyDataHeader{
    return {
      title: olympic.country,
      values:[
        {
          name: "Number of entries",
          value: olympic.participations.length
        },
        {
          name: "Total number medals",
          value: olympic.participations.reduce((sum, currP) => sum + currP.medalsCount, 0)
        },
        {
          name: "Total number of athletes",
          value: olympic.participations.reduce((sum, currP) => sum + currP.athleteCount, 0)
        }
      ]
    };
  }
  
}
