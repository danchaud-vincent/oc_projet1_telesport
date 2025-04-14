import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    NgxChartsModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {

  @Input() chartData: any[] = [];
  @Input() view: [number, number]= [700, 400];
  chartOptions = {
    showLegend: true,
    showLabels: true,
    explodeSlices: false,
    doughnut: false,
    animations: true
  };

  constructor(private router: Router) {}

  onSelect(event: any): void{
    
    if (event){
      const url_end = event.name || event;
      this.router.navigateByUrl(`${url_end}`);
    }
    
  }
}
