import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      RouterLink
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  private authService = inject(AuthService);
  private router = inject(Router);
  usuario: any = null;

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }

  fnLogout(){
    this.authService.removerAuth();
    this.router.navigate(['login']);
  }
}
