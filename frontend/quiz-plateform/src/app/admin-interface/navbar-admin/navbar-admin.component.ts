import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbaradminComponent {
  @Input() isCollapsed: boolean | undefined;
}
