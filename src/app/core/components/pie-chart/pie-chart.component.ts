import { Component, HostListener, Input } from '@angular/core';
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
  view: [number, number]= [window.innerWidth * 1, window.innerHeight * 0.7];
  chartOptions = {
    showLegend: false,
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

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.updateView();
  }

  updateView(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.view = [width * 1, height * 0.7];
  }
}
