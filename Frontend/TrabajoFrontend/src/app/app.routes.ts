import { Routes } from '@angular/router';
import { PreguntafrecuenteComponent } from './components/preguntafrecuente/preguntafrecuente.component';
import { RegistrarPreguntafrecuenteComponent } from './components/preguntafrecuente/registrar-preguntafrecuente/registrar-preguntafrecuente.component';
import { CreareditarCategoriatranxComponent } from './components/categoriatranx/creareditar-categoriatranx/creareditar-categoriatranx.component';
import { CategoriatranxComponent } from './components/categoriatranx/categoriatranx.component';
import { ConsejoComponent } from './components/consejo/consejo.component';
import { RegistrarConsejoComponent } from './components/consejo/registrar-consejo/registrar-consejo.component';
import { TipometaComponent } from './components/tipometa/tipometa.component';
import { CreareditarTipometaComponent } from './components/tipometa/creareditar-tipometa/creareditar-tipometa.component';
import { RolComponent } from './components/rol/rol.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';
import { CreareditarTransaccionComponent } from './components/transaccion/creareditar-transaccion/creareditar-transaccion.component';
import { CuentabancariaComponent } from './components/cuentabancaria/cuentabancaria.component';
import { CreaeditarCuentabancariaComponent } from './components/cuentabancaria/creaeditar-cuentabancaria/creaeditar-cuentabancaria.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { segGuard } from './guard/security.guard';
import { MetadeahorroComponent } from './components/metadeahorro/metadeahorro.component';
import { CreaeditaMetadeahorroComponent } from './components/metadeahorro/creaedita-metadeahorro/creaedita-metadeahorro.component';
import { RegisterComponent } from './components/register/register.component';
import { RegistrarUsuarioComponent } from './components/usuario/registrar-usuario/registrar-usuario.component';

export const routes: Routes = [
  {
    //ruta por defecto
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    //ruta para el login
    path: 'login',
    component: LoginComponent,
  },
    //ruta para el register
  {
    path: 'register',
    component: RegisterComponent,
  },
    //fin ruta register
  {
    //ruta para el home
    path: 'homes',
    component: HomeComponent,
    canActivate: [segGuard],
  },
  //pregunta frecuente
  {
    path: 'preguntafrecuente',
    component: PreguntafrecuenteComponent,
    children: [
      {
        path: 'nuevo',
        component: RegistrarPreguntafrecuenteComponent,
      },
      {
        path: 'ediciones/:id',
        component: RegistrarPreguntafrecuenteComponent,
      },
    ],
    canActivate: [segGuard],
  },
  //fin de ruta Pregunta Frecuente
  //categoria tranx
  {
    path: 'categoriatranx',
    component: CategoriatranxComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarCategoriatranxComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditarCategoriatranxComponent,
      },
    ],
    canActivate: [segGuard],
  },
  //Fin de ruta Categoria Tranx
  //consejo
  {
    path: 'consejos',
    component: ConsejoComponent,
    children: [
      {
        path: 'registro',
        component: RegistrarConsejoComponent,
      },
      {
        path: 'editar/:id',
        component: RegistrarConsejoComponent,
      },
    ],
    canActivate: [segGuard],
  },
  //fin de ruta categoria consejo
  //TipoMeta
  {
    path: 'tipometa',
    component: TipometaComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarTipometaComponent,
      },
      {
        path: 'editar/:id',
        component: CreareditarTipometaComponent,
      },
    ],
    canActivate: [segGuard],
  },
  //fin de ruta TipoMeta
  // rol
  {
    path: 'rol',
    component: RolComponent,
    canActivate: [segGuard],
  },
  //fin de ruta Rol
  //usuarios
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      {
        path: 'registrarAdmin',
        component: RegistrarUsuarioComponent
      }
    ],
    canActivate: [segGuard],
  },
  //fin de ruta Usuario
  //reutilizando componente para editar perfil
  {
    path: 'editarPerfil',
    component: RegistrarUsuarioComponent,
    data: {edit: true}
    //para diferenciar de componente llamado en ruta registrarAdmin
  },
  //transacciones
  {
    path: 'transaccion',
    component: TransaccionComponent,
    children: [
      {
        path: 'nuevo',
        component: CreareditarTransaccionComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreareditarTransaccionComponent,
      },
    ],
    canActivate: [segGuard],
  },
  //Fin de ruta Categoria Tranx
  //Cuenta Bancaria
  {
    path: 'cuentabancaria',
    component: CuentabancariaComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditarCuentabancariaComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditarCuentabancariaComponent,
      },
    ],
    canActivate: [segGuard],
  },
  //fin de Cuenta Bancaria
  //Meta de Ahorros
  {
    path: 'metadeahorro',
    component: MetadeahorroComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaMetadeahorroComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaMetadeahorroComponent,
      },
    ],
  },
 //fin de Meta de Ahorros
];
