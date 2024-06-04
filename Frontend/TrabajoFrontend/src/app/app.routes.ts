import { Routes } from '@angular/router';
import { PreguntafrecuenteComponent } from './components/preguntafrecuente/preguntafrecuente.component';
import { RegistrarPreguntafrecuenteComponent } from './components/preguntafrecuente/registrar-preguntafrecuente/registrar-preguntafrecuente.component';

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
    ],
  },
  //fin de ruta Pregunta Frecuente

  //categoria tranx
  {
    path: 'categoriatranx',
    component: PreguntafrecuenteComponent,
    children: [
      {
        path: 'nuevo',
        component: RegistrarPreguntafrecuenteComponent,
      },
    ],
  }
];
