import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbaradminComponent } from '../navbar-admin/navbar-admin.component';
import { SidebaradminComponent } from "../sidebar-admin/sidebar-admin.component";
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-test-details',
  standalone: true,
  imports: [CommonModule,NavbaradminComponent,SidebaradminComponent,FormsModule],
  templateUrl: './test-details.component.html',
  styleUrl: './test-details.component.css'
})
export class TestdetailsComponent implements OnInit {
  testDetails!: Test;
  editedTitre = '';
  editedDuree = '';
  editMode: keyof Test | null = null;
  langue = 'Français';
  securite = 'Anti-Triche';
  skillsString = '';
  quizzesString = '';
  usersString = '';

  constructor(private route: ActivatedRoute, private testService: TestService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.testService.getTestById(id).subscribe((test: Test) => {
      this.testDetails = test;
      this.skillsString = this.testDetails.skills.map(skill => skill.skill).join(', ');
      this.quizzesString = this.testDetails.quizzes.map(quiz => quiz.titre).join(', ');
      this.usersString = this.testDetails.users.map(user => user.email).join(', ');
    });
  }

  enterEditMode(field: keyof Test) {
    this.editMode = field;
    if (field === 'titre') {
      this.editedTitre = this.testDetails[field];
    } else if (field === 'duree') {
      this.editedDuree = this.testDetails[field];
    }
  }

  saveField(field: keyof Test) {
    if (this.editMode === field) {
      if (field === 'titre') {
        this.testDetails.titre = this.editedTitre;
      } else if (field === 'duree') {
        this.testDetails.duree = this.editedDuree;
      }
      this.testDetails.date = new Date();
      // Call updateTest service method to save changes to the server
      this.testService.updateTest(this.testDetails.id, this.testDetails).subscribe((updatedTest: Test) => {
        // Update local test details with response from server
        this.testDetails = updatedTest;
        // Update the precomputed strings
        this.skillsString = this.testDetails.skills.map(skill => skill.skill).join(', ');
        this.quizzesString = this.testDetails.quizzes.map(quiz => quiz.titre).join(', ');
        this.usersString = this.testDetails.users.map(user => user.email).join(', ');
      });

      this.editMode = null;
    }
  }

 
}