import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbaradminComponent } from "../navbar-admin/navbar-admin.component";
import { SidebaradminComponent } from "../sidebar-admin/sidebar-admin.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TestService } from '../../services/test.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-invite-candidat',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbaradminComponent, SidebaradminComponent, RouterLink],
  templateUrl: './invite-candidat.component.html',
  styleUrls: ['./invite-candidat.component.css']
})
export class InviteCandidatComponent implements OnInit {
  filteredUsers: User[] = []; // Liste des utilisateurs à afficher
  testId!: number;
  selectedEmails: Set<string> = new Set<string>(); // Ensemble pour suivre les emails sélectionnés

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.testId = +params['id'];
      this.loadUsers();
    });
  }

  loadUsers() {
    // Charger tous les utilisateurs
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        // Filtrer les utilisateurs dont le rôle est 'User'
        const filteredByRole = this.filterUsersByRole(users, 'User');
        
        // Charger les détails du test
        this.testService.getTestById(this.testId).subscribe(
          test => {
            const existingEmails = new Set(test.users.map(user => user.email));
            
            // Filtrer pour obtenir les utilisateurs qui ne sont pas déjà associés au test
            this.filteredUsers = filteredByRole.filter(user => !existingEmails.has(user.email));
          },
          error => {
            console.error('Error fetching test:', error);
          }
        );
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  filterUsersByRole(users: User[], roleName: string): User[] {
    return users.filter(user => user.role && user.role.rolename === roleName);
  }

  toggleEmail(email: string) {
    if (this.selectedEmails.has(email)) {
      this.selectedEmails.delete(email);
    } else {
      this.selectedEmails.add(email);
    }
  }

  invite() {
    const validEmails = Array.from(this.selectedEmails);
    if (validEmails.length > 0) {
      this.testService.getTestById(this.testId).subscribe(
        test => {
          if (!test.users) {
            test.users = [];
          }

          const userObservables = validEmails.map(email => 
            this.userService.findByEmail(email)
          );

          Promise.all(userObservables.map(obs => obs.toPromise()))
            .then(users => {
              users.forEach(user => {
                if (user && !test.users.some(existingUser => existingUser.email === user.email)) {
                  test.users.push(user);
                }
              });
              test.date = new Date();
              this.testService.updateTest(this.testId, test).subscribe(
                updatedTest => {
                  console.log('Test updated successfully:', updatedTest);
                  this.router.navigate(['/loading']);
                },
                error => {
                  console.error('Error updating test:', error);
                }
              );
            })
            .catch(error => {
              console.error('Error fetching users:', error);
            });
        },
        error => {
          console.error('Error fetching test:', error);
        }
      );
    }
  }
}
