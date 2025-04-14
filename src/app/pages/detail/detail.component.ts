import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {


  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    const countryName = this.route.snapshot.params["name"];
    console.log(countryName)
  }

}
