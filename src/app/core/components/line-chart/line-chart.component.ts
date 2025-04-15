import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    NgxChartsModule
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {

  @Input() chartData: any[] = [];
  @Input() view: [number, number] = [700, 400];
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  chartOptions = {
    showLegend: true,
    showLabels: true,
    animations: true,
    xAxis: true,
    yAxis: true,
    showYAxisLabel: true,
    showXAxisLabel: true,
  };

}
