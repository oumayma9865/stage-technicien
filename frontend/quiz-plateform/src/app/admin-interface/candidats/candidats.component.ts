import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbaradminComponent } from "../navbar-admin/navbar-admin.component";
import { SidebaradminComponent } from "../sidebar-admin/sidebar-admin.component";
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-candidats',
  standalone: true,
  imports: [CommonModule, NavbaradminComponent, SidebaradminComponent,FormsModule],
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit {
  candidates: User[] = [];
  filteredCandidates: User[] = [];
  searchText: string = '';
  


 
  constructor(private userService: UserService,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadAllCandidates();
  }

  loadAllCandidates(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.candidates = users.filter(user => user.role && user.role.rolename === 'User');
        this.filteredCandidates = this.candidates;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  search(): void {
    if (this.searchText) {
      this.filteredCandidates = this.candidates.filter(candidate => candidate.username.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      this.filteredCandidates = this.candidates;
    }
  }

  reset(): void {
    this.searchText = '';
    this.filteredCandidates = this.candidates;
  }
  toggleLock(candidate: User) {
    const updatedLockStatus = !candidate.locked;
    const updatedEnabledStatus = !updatedLockStatus;
  
    this.userService.updateUserInfo(candidate.id, { ...candidate, locked: updatedLockStatus , enabled: updatedEnabledStatus }).subscribe(
      () => {
        // Mettre à jour l'état du candidat dans la liste
        candidate.locked = updatedLockStatus;
        candidate.enabled = updatedEnabledStatus;
        Swal.fire(
          updatedLockStatus ?  'Bloqué!':'Débloqué!'  ,
          `Le statut du candidat a été ${updatedLockStatus ? 'bloqué' : 'débloqué'}.`,
          'success'
        );
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut du candidat', error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour du statut.', 'error');
      }
    );
  }
  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.candidates = this.candidates.filter(candidate => candidate.id !== userId);
        this.filteredCandidates = this.filteredCandidates.filter(candidate => candidate.id !== userId);
      }, error => {
        console.error('Error deleting user', error);
      });
    }
  }
  getCVUrl(cv: string): SafeUrl {
    if (cv) {
      const byteCharacters = atob(cv);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' }); // Assurez-vous que le type MIME est correct
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    }
    return '';
  }

 
}