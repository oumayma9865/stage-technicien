import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test';

@Component({
  selector: 'app-guide-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guide-test.component.html',
  styleUrls: ['./guide-test.component.css']
})
export class GuideTestComponent implements OnInit {
  testId!: number;
  testDetails!: Test;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTestDetails();
  }

  loadTestDetails(): void {
    this.testService.getTestById(this.testId).subscribe(
      (data: Test) => {
        this.testDetails = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du test', error);
      }
    );
  }

  startTest() {
    this.router.navigate(['/test-candidat', this.testId]);
  }
}
