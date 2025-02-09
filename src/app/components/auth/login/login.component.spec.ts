import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AlertaService } from '../../../core/service/alerta.service';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';

class MockAlertaService {
  success(message: string) {}
  error(message: string) {}
}

class MockAuthService {
  login(params: any) {
    return of({ data: { token: 'dummy_token' } });
  }
  setAuth(response: any) {}
}

class MockRouter {
  navigate(url: string) {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let alertaService: AlertaService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule, CommonModule],
      providers: [
        { provide: AlertaService, useClass: MockAlertaService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    alertaService = TestBed.inject(AlertaService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should call alerta.error if the correo is empty', () => {
    spyOn(alertaService, 'error');
    component.usuario.correo = '';
    component.fnLogin();
    expect(alertaService.error).toHaveBeenCalledWith('El correo eletrónico es requerido');
  });

  it('should call alerta.error if the password is empty', () => {
    spyOn(alertaService, 'error');
    component.usuario.password = '';
    component.fnLogin();
    expect(alertaService.error).toHaveBeenCalledWith('La contraseña es requerido');
  });

  it('should call authService.login and navigate to tasks list on success', () => {
    spyOn(authService, 'login').and.callThrough();
    spyOn(router, 'navigate');
    component.usuario.correo = 'prueba@gmail.com';
    component.usuario.password = '123456';
    component.fnLogin();
    expect(authService.login).toHaveBeenCalledWith({ username: 'prueba@gmail.com', password: '123456' });
    expect(router.navigate).toHaveBeenCalledWith(['/tarea/listar']);
  });

  it('should call alerta.error when login fails with invalid credentials', () => {
    spyOn(authService, 'login').and.returnValue(throwError(() => new Error('Credenciales inválidas')));
    spyOn(alertaService, 'error');
    component.usuario.correo = 'test@gmail.com';
    component.usuario.password = 'wrongpassword';
    component.fnLogin();
    expect(alertaService.error).toHaveBeenCalledWith('Usuario y/o contraseña incorrecto.');
  });
});
