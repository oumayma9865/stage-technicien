import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebaradminComponent } from '../sidebar-admin/sidebar-admin.component';
import { NavbaradminComponent } from '../navbar-admin/navbar-admin.component';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../models/skill';
import { Quiz } from '../../models/quiz';
import { Test } from '../../models/test';
import { QuizService } from '../../services/quiz.service';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-add-test',
  standalone: true,
  imports: [NavbaradminComponent, SidebaradminComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddtestComponent implements OnInit {

  testName: string = '';
  roles: string[] = ['Front-end', 'Back-end', 'Full-stack', 'Mobile', 'Data engineer', 'Data scientist', 'SRE / DevOps', 'Cybersecurity', 'Embedded', 'Other'];
  skills: Skill[] = [];
  displayedSkills: Skill[] = [];
  selectedRole: string = '';  // Initialisation avec une chaîne vide
  selectedExperience: string = '';
  selectedSkills: Skill[] = [];
  searchQuery: string = '';
  quizzes: Quiz[] = [];

  constructor(
    private router: Router,
    private testService: TestService,
    private quizService: QuizService,
    private skillService: SkillService
  ) {
    this.loadInitialSkills();
  }

  ngOnInit() {}

  loadInitialSkills() {
    this.skillService.getAllSkills().subscribe((skills: Skill[]) => {
      this.skills = skills;
      this.displayedSkills = skills.slice(0, 3);
    });
  }

  selectRole(role: string) {
    this.selectedRole = this.selectedRole === role ? '' : role;  // Utilisation de chaîne vide
  }

  selectExperience(experience: string) {
    this.selectedExperience = experience;
  }

  selectSkill(skill: Skill) {
    const index = this.selectedSkills.findIndex(s => s.id === skill.id);
    if (index > -1) {
      this.selectedSkills.splice(index, 1);
    } else {
      this.selectedSkills.push(skill);
    }
  }

  searchSkill() {
    if (this.searchQuery.trim()) {
      this.skillService.getSkillByName(this.searchQuery.trim()).subscribe((skill: Skill | null) => {
        if (skill && !this.displayedSkills.some(s => s.id === skill.id)) {
          this.displayedSkills.push(skill);
        }
      });
    }
  }

  // Méthode pour correspondre l'expérience sélectionnée avec la difficulté du quiz
  getMatchingDifficulty(experience: string): string {
    switch (experience) {
      case 'Junior':
        return 'Débutant';
      case 'Senior':
        return 'Intermédiaire';
      case 'Expert':
        return 'Avancé';
      default:
        return ''; // Par défaut, renvoyez une chaîne vide ou gérez selon votre logique
    }
  }

  // Convertir les minutes totales en format HH:MM:SS
  convertMinutesToHHMMSS(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = 0; // Les secondes sont toujours 0 dans ce cas

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  createTest() {
    const skillIds = this.selectedSkills.map(skill => skill.id);
    const matchingDifficulty = this.getMatchingDifficulty(this.selectedExperience);

    // Fetch quizzes matching the selected skills and matching difficulty level
    this.quizService.getAllQuizzes().subscribe((allQuizzes: Quiz[]) => {
      const selectedQuizzes = allQuizzes.filter(quiz => 
        skillIds.includes(quiz.skill.id) && quiz.difficulte === matchingDifficulty
      );
      console.log(selectedQuizzes);

      let totalTime = selectedQuizzes.reduce((acc, quiz) => acc + parseInt(quiz.temps, 10), 0); // Summing up the time for quizzes

      const formattedTime = this.convertMinutesToHHMMSS(totalTime);

      const newTest = new Test(
        0, // Assuming the ID will be set by the backend
        this.testName,
        this.selectedRole,
        this.selectedExperience,
        formattedTime, // Use formatted time
        new Date(), // Current date as ISO string
        this.selectedSkills,
        selectedQuizzes, // Assign the selected quizzes
        [], // Assuming users will be added later
        []  // Assuming test results will be added later
      );

      this.testService.createTest(newTest).subscribe(
        (createdTest: Test) => {
          console.log('Test created successfully:', createdTest);
          this.router.navigate(['/invitecandidat', createdTest.id]); // Navigate to the next step
        },
        error => {
          console.error('Error creating test:', error);
        }
      );
    });
  }
}
