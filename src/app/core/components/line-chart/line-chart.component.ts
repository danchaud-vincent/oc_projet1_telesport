import { Component, HostListener, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartData } from '../../models/line-chart-data';

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

  @Input() chartData: LineChartData[] = [];
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  view: [number, number]= [window.innerWidth * 0.9, window.innerHeight * 0.7];
  chartOptions = {
    showLegend: false,
    showLabels: true,
    animations: true,
    xAxis: true,
    yAxis: true,
    showYAxisLabel: true,
    showXAxisLabel: true,
  };

  @HostListener('window:resize', ['$event'])
    onResize(){
      this.updateView();
  }
  
  updateView(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.view = [width * 0.9, height * 0.7];
  }

}
