import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  public olympic$!: Observable<Olympic>;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    const countryName: string = this.route.snapshot.params["name"].trim();
    this.olympic$ = this.olympicService.getOlympicByName(countryName);
  }

}
