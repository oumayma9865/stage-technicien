import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { TestService } from '../../services/test.service';
import { TestResultService } from '../../services/test-result.service';

@Component({
  selector: 'app-home-candidat',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './home-candidat.component.html',
  styleUrls: ['./home-candidat.component.css']
})
export class HomeCandidatComponent implements OnInit {
  tests: any[] = [];
  userTests: any[] = [];
  currentUser: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private testService: TestService,
    private testResultService: TestResultService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUserTests();
  }

  loadCurrentUserTests(): void {
    this.currentUser = this.loginService.getUserDetails();
    if (this.currentUser) {
      this.testService.getAllTests().subscribe(
        (tests: any[]) => {
          this.tests = tests;
          this.userTests = this.tests.filter(test =>
            test.users.some((user: any) => user.id === this.currentUser.id)
          );
          this.userTests.forEach(test => {
            this.testResultService.getTestResultsByTest(test.id).subscribe(
              (results) => {
                test.results = results; // Sauvegarder les résultats pour chaque test
                test.status = results.length > 0 ? 'Passé' : 'Non passé';
              },
              (error) => {
                console.error(`Error fetching test results for test ${test.id}`, error);
                test.status = 'Non passé'; // Assuming no results if there's an error
              }
            );
          });
          console.log('Filtered User Tests:', this.userTests);
        },
        error => {
          console.error('Error fetching tests', error);
        }
      );
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/auth']); // Redirige vers la page d'authentification
  }

  startTest(test: any): void {
    this.router.navigate(['/guide', test.id]);
  }

  viewResults(test: any): void {
    if (test.results && test.results.length > 0) {
      const latestResult = test.results[0]; // Assumes the latest result is the first one in the array
      this.router.navigate(['/results-candidat', latestResult.id]);
    } else {
      console.warn('No results available for this test');
    }
  }
  getInitials(username: string): string {
    return username.length >= 2 ? username.substring(0, 2).toUpperCase() : username.toUpperCase();
  }
}
