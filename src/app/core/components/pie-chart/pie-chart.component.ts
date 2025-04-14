import { Component, Input } from '@angular/core';
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


}
