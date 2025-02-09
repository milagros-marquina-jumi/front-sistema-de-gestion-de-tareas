import { Component, inject } from '@angular/core';
import { AlertaService } from '../../../core/service/alerta.service';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorMessageComponent } from '../../../shared/form-error-message/form-error-message.component';

@Component({
  selector: 'app-login',
  imports: [
    FormErrorMessageComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private alerta = inject(AlertaService);
  private authService = inject(AuthService);
  private router = inject(Router);

  usuario: any = {
    correo: '',
    password: ''
  }

  fnLogin(){
    if(this.usuario.correo == ''){
      this.alerta.error('El correo eletrónico es requerido');
      return;
    }
    if(this.usuario.password == ''){
      this.alerta.error('La contraseña es requerido');
      return;
    }

    let params = {
      'username': this.usuario.correo,
      'password': this.usuario.password
    }

    this.authService.login(params).subscribe({
      next: (response: any) => {

        if(response.data != null){
          this.alerta.success('Bienvenido!');
          this.authService.setAuth(response);
          this.router.navigate(['/tarea/listar']);
        }else{
          this.alerta.error(response.message);
        }
      }, error: (e) => {
        this.alerta.error('Correo y/o contraseña incorrecto.');
        console.log(e);
      }
    })

  }
}
