import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbaradminComponent } from "../navbar-admin/navbar-admin.component";
import { SidebaradminComponent } from "../sidebar-admin/sidebar-admin.component";
import { Router, RouterLink} from '@angular/router';
import { Test } from '../../models/test';
import { TestService } from '../../services/test.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-test-home',
    standalone: true,
    templateUrl: './test-home.component.html',
    styleUrl: './test-home.component.css',
    imports: [NavbaradminComponent, SidebaradminComponent,CommonModule,RouterLink,FormsModule]
})
export class TesthomeComponent {
  tests: Test[] = [];
  filteredTests: Test[] = [];
  searchTerm: string = '';
 

  constructor(private testService: TestService,private router:Router) {}

  ngOnInit(): void {
    this.getTests();
  }

  getTests(): void {
    this.testService.getAllTests().subscribe(
      (data: Test[]) => {
        this.tests = data;
        this.filteredTests = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des tests', error);
      }
    );
  }

  searchTests(): void {
    if (this.searchTerm) {
      this.filteredTests = this.tests.filter(test =>
        test.titre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredTests = this.tests;
    }
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.filteredTests = this.tests;
  }

  getCandidatesCount(test: Test): number {
    return test.users ? test.users.length : 0;
  }

  inviteCandidate(testId: number) {
    this.router.navigate([`/invitecandidat/${testId}`]);
  }
  viewTestDetails(testId: number) {
    this.router.navigate([`/testdetails/${testId}`]);
  }

  deleteTest(id: number, event: Event) {
    event.stopPropagation();
    this.testService.deleteTest(id).subscribe(
      () => {
        this.tests = this.tests.filter(test => test.id !== id);
        this.filteredTests = this.tests;
        const deletedTest = this.tests.find(test => test.id === id);
        Swal.fire(
           'Succès',
        `Le test  est supprimé avec succès`,
         'success'
        );
      },
      (error) => {
        console.error('Erreur lors de la suppression du test', error);
      }
    );
  }

  
}