import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebaradminComponent } from '../sidebar-admin/sidebar-admin.component';
import { NavbaradminComponent } from '../navbar-admin/navbar-admin.component';
import { Test } from '../../models/test';
import { TestResult } from '../../models/testResult';
import { TestResultService } from '../../services/test-result.service';
import { TestService } from '../../services/test.service';
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule,FormsModule,SidebaradminComponent,NavbaradminComponent],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  
  tests: Test[] = [];
  selectedTest: Test | null = null;
  testResults: TestResult[] = [];

  constructor(private testService: TestService, private testResultService: TestResultService) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(): void {
    this.testService.getAllTests().subscribe(
      (tests) => {
        this.tests = tests;
        this.tests.sort((a, b) => b.date.getTime() - a.date.getTime()); // Tri par date décroissante
      },
      (error) => {
        console.error('Erreur lors du chargement des tests', error);
      }
    );
  }

  selectTest(test: Test): void {
    this.selectedTest = test;
    this.loadTestResults(test.id);
  }

  loadTestResults(testId: number): void {
    this.testResultService.getTestResultsByTest(testId).subscribe(
      (results) => {
        this.testResults = results;
        this.testResults.sort((a, b) => b.score - a.score); // Tri par score décroissant
      },
      (error) => {
        console.error('Erreur lors du chargement des résultats', error);
      }
    );
  }

  backToTests(): void {
    this.selectedTest = null;
  }
}