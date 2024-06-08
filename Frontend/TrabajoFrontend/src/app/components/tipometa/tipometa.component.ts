import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarTipometaComponent } from './listar-tipometa/listar-tipometa.component';
@Component({
  selector: 'app-tipometa',
  standalone: true,
  imports: [RouterOutlet,ListarTipometaComponent],
  templateUrl: './tipometa.component.html',
  styleUrl: './tipometa.component.css'
})
export class TipometaComponent {
  constructor(public route: ActivatedRoute) {}
}
