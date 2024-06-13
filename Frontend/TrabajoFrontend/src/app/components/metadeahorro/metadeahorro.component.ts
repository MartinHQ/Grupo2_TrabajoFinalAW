import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarMetadeahorroComponent } from './listar-metadeahorro/listar-metadeahorro.component';
@Component({
  selector: 'app-metadeahorro',
  standalone: true,
  imports: [RouterOutlet,ListarMetadeahorroComponent],
  templateUrl: './metadeahorro.component.html',
  styleUrl: './metadeahorro.component.css'
})
export class MetadeahorroComponent {
  constructor(public route: ActivatedRoute) {}
}
