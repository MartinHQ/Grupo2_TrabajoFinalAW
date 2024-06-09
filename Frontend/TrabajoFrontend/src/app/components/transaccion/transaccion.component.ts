import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarTransaccionComponent } from './listar-transaccion/listar-transaccion.component';

@Component({
  selector: 'app-transaccion',
  standalone: true,
  imports: [RouterOutlet, ListarTransaccionComponent],
  templateUrl: './transaccion.component.html',
  styleUrl: './transaccion.component.css'
})
export class TransaccionComponent {
  constructor(public route: ActivatedRoute) {}

}
