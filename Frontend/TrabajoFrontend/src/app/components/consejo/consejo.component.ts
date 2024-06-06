import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarConsejoComponent } from './listar-consejo/listar-consejo.component';

@Component({
  selector: 'app-consejo',
  standalone: true,
  imports: [RouterOutlet, ListarConsejoComponent],
  templateUrl: './consejo.component.html',
  styleUrl: './consejo.component.css'
})
export class ConsejoComponent {
  constructor(public route: ActivatedRoute){}
}
