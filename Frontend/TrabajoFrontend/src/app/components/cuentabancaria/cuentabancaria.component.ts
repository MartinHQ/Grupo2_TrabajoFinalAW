import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarCuentabancariaComponent } from './listar-cuentabancaria/listar-cuentabancaria.component';

@Component({
  selector: 'app-cuentabancaria',
  standalone: true,
  imports: [RouterOutlet, ListarCuentabancariaComponent],
  templateUrl: './cuentabancaria.component.html',
  styleUrl: './cuentabancaria.component.css'
})
export class CuentabancariaComponent {
  constructor(public route:ActivatedRoute){}

}
