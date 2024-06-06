import { Routes } from '@angular/router';
import { PreguntafrecuenteComponent } from './components/preguntafrecuente/preguntafrecuente.component';
import { RegistrarPreguntafrecuenteComponent } from './components/preguntafrecuente/registrar-preguntafrecuente/registrar-preguntafrecuente.component';
import { CreareditarCategoriatranxComponent } from './components/categoriatranx/creareditar-categoriatranx/creareditar-categoriatranx.component';
import { CategoriatranxComponent } from './components/categoriatranx/categoriatranx.component';

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
        component: RegistrarPreguntafrecuenteComponent
      }
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
        path:'ediciones/:id',component:CreareditarCategoriatranxComponent
      }
    ],
  },
  //Fin de ruta Categoria Tranx
];
