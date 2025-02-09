import { Routes } from '@angular/router';
import { NoAuthGuard } from './core/guard/no-auth.guard';
import { UsuarioGuard } from './core/guard/usuario.guard';
import { TareaListarComponent } from './components/tarea/tarea-listar/tarea-listar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TareaRegistrarComponent } from './components/tarea/tarea-registrar/tarea-registrar.component';

export const routes: Routes = [
  { path: 'login' , component: LoginComponent, canActivate:[NoAuthGuard]},
  { path: '' , component: LoginComponent, canActivate:[NoAuthGuard]},
  {
    path: 'tarea',
    children: [
      { path: 'listar', component: TareaListarComponent, canActivate:[UsuarioGuard]},
      { path: 'nuevo', component: TareaRegistrarComponent , canActivate:[UsuarioGuard]},
      { path: 'editar', component: TareaRegistrarComponent, canActivate:[UsuarioGuard] },
      //{ path: 'editar/:id', component: TareaRegistrarComponent, canActivate:[UsuarioGuard] },
    ]
  },
  { path: '**' , pathMatch: 'full' , redirectTo: 'login' }
];
