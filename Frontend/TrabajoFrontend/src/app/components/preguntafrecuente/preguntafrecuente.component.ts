import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarPreguntafrecuenteComponent } from './listar-preguntafrecuente/listar-preguntafrecuente.component';

@Component({
  selector: 'app-preguntafrecuente',
  standalone: true,
  imports: [RouterOutlet, ListarPreguntafrecuenteComponent],
  templateUrl: './preguntafrecuente.component.html',
  styleUrl: './preguntafrecuente.component.css',
})
export class PreguntafrecuenteComponent {
  constructor(public route: ActivatedRoute) {}
}
