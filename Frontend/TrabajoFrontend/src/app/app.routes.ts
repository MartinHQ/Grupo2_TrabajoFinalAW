import { Routes } from '@angular/router';
import { PreguntafrecuenteComponent } from './components/preguntafrecuente/preguntafrecuente.component';
import { RegistrarPreguntafrecuenteComponent } from './components/preguntafrecuente/registrar-preguntafrecuente/registrar-preguntafrecuente.component';
import { CreareditarCategoriatranxComponent } from './components/categoriatranx/creareditar-categoriatranx/creareditar-categoriatranx.component';
import { CategoriatranxComponent } from './components/categoriatranx/categoriatranx.component';
import { ConsejoComponent } from './components/consejo/consejo.component';
import { RegistrarConsejoComponent } from './components/consejo/registrar-consejo/registrar-consejo.component';

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
  //consejo
  {
    path:'consejos',
    component:ConsejoComponent,
    children:[
        {
            path:'registro',component:RegistrarConsejoComponent
        },
        {
            path:'editar/:id', component:RegistrarConsejoComponent
        }
    ]
},
  //fin de ruta categoria consejo
  // rol
  {
    path: 'rol',
    component: RolComponent
  }
  //fin de ruta Rol
];
