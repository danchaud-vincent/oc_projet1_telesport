import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit{

  errorMessage: string | null = null;

  constructor(
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.errorMessage = this.olympicService.getErrorMessage();
  }
}
