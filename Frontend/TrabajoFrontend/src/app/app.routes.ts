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

export const routes: Routes = [
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
  },
  //fin de ruta TipoMeta
  // rol
  {
    path: 'rol',
    component: RolComponent,
  },
  //fin de ruta Rol
  //usuarios
  {
    path: 'usuarios',
    component: UsuarioComponent,
  },
  //fin de ruta Usuario

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
  },
  //fin de Cuenta Bancaria
];
