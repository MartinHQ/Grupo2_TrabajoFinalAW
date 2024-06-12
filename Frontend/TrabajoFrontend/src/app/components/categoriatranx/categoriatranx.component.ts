import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListarCategoriatranxComponent } from './listar-categoriatranx/listar-categoriatranx.component';



@Component({
  selector: 'app-categoriatranx',
  standalone: true,
  imports: [RouterOutlet, ListarCategoriatranxComponent, MatSnackBarModule],
  templateUrl: './categoriatranx.component.html',
  styleUrl: './categoriatranx.component.css',
})
export class CategoriatranxComponent {
  constructor(public route: ActivatedRoute) {}
}
