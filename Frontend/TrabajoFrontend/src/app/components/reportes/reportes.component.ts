import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Reporte01Component } from './promedioingresoegresopormes/reporte01.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, Reporte01Component],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit{

  constructor(public route : ActivatedRoute) { }
  ngOnInit(): void {
      
  }

}
