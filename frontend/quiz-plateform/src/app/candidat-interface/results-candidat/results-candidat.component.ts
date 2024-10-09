import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestResultService } from '../../services/test-result.service';
import { TestResult } from '../../models/testResult';

@Component({
  selector: 'app-results-candidat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-candidat.component.html',
  styleUrl: './results-candidat.component.css'
})
export class ResultsCandidatComponent implements OnInit {
  testResultId!: number;
  testResult!: TestResult;

  constructor(private router: Router,private route:ActivatedRoute,private testResultService:TestResultService ) { }

  ngOnInit(): void {
    this.testResultId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTestResult();
  }
  loadTestResult(): void {
    this.testResultService.getTestResultById(this.testResultId).subscribe(
      (data: TestResult) => {
        this.testResult = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du test', error);
      }
    );
  }

  goHome(): void {
    this.router.navigate(['/home-candidat']);
  }
}
