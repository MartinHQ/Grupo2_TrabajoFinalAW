import { Component, OnInit } from '@angular/core';
import { PreguntafrecuenteService } from '../../../services/preguntafrecuente.service';
import { PreguntaFrecuente } from '../../../models/PreguntaFrecuente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-listar-preguntafrecuente',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButton,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './listar-preguntafrecuente.component.html',
  styleUrl: './listar-preguntafrecuente.component.css',
})
export class ListarPreguntafrecuenteComponent implements OnInit {
  constructor(private pfS: PreguntafrecuenteService) {}

  listaPreguntasFrecuentes: PreguntaFrecuente[] = [];
  ngOnInit(): void {
    this.pfS.listar().subscribe((data) => {
      this.listaPreguntasFrecuentes = data;
    });
    this.pfS.getListaCambio().subscribe((data) => {
      this.listaPreguntasFrecuentes = data;
    });
  }

  eliminar(id: number) {
    this.pfS.eliminar(id).subscribe(() => {
      this.pfS.listar().subscribe((data) => {
        this.pfS.setListaCambio(data);
      });
    });
  }
}
