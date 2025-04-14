import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {

  @Input() chartData: any[] = [];
  @Input() view: [number, number]= [700, 400];
  chartOptions = {
    showLabels: true,
    explodeSlices: false,
    doughnut: false,
    animations: true
  };


}
