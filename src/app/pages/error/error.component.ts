import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit{

  errorMessage: string = 'Une Erreur est survenue';

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.errorMessage = this.route.snapshot.params["errorMessage"].trim();
  }
}
