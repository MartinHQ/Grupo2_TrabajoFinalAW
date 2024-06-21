import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../services/transaccion.service';
import { LoginService } from '../../../services/login.service';
import { MaxMontoByCategoriaDTO } from '../../../models/MaxMontoByCategoriaDTO';
import { NgFor } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-maxmontobycategoria',
  standalone: true,
  imports: [
    NgFor,
    BaseChartDirective,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './maxmontobycategoria.component.html',
  styleUrl: './maxmontobycategoria.component.css',
})
export class MaxmontobycategoriaComponent implements OnInit {
  months = [
    { name: 'Enero', value: 0 },
    { name: 'Febrero', value: 1 },
    { name: 'Marzo', value: 2 },
    { name: 'Abril', value: 3 },
    { name: 'Mayo', value: 4 },
    { name: 'Junio', value: 5 },
    { name: 'Julio', value: 6 },
    { name: 'Agosto', value: 7 },
    { name: 'Septiembre', value: 8 },
    { name: 'Octubre', value: 9 },
    { name: 'Noviembre', value: 10 },
    { name: 'Diciembre', value: 11 }
  ];
  selected:string='0';

  form: FormGroup= new FormGroup({});
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(
    private tS: TransaccionService,
    private lS: LoginService,
    private cdr: ChangeDetectorRef,
    private formBuilder:FormBuilder,
  ) {}

  currentYear = new Date().getFullYear();
  fechaInicio = new Date(this.currentYear, this.form.value.mes, 1);
  fechaFin = new Date(this.currentYear, this.form.value.mes + 1, 0);
  idUsuario = this.lS.getCurrentUser().usuario_id;
  esIngreso = false;

  ngOnInit(): void {
    this.selected='0';

    this.mostrar(this.fechaInicio, this.fechaFin,this.idUsuario, this.esIngreso);
  }
  mostrar(fechaInicio:Date, fechaFin:Date, idUsuario:number, esIngreso:boolean){
    this.tS
      .getMaxMontoByCategoria(fechaInicio, fechaFin, idUsuario, esIngreso)
      .subscribe(
        (data) => {
          this.barChartLabels = data.map((item) => item.tituloCategoria);
          this.barChartData = [
            {
              data: data.map((item) => item.maxMontoCategoria),
              label: 'Monto Máximo',
              backgroundColor: ['#C0504D', '#8064A2', '#4BACC6'],
              borderWidth: 1,
            },
          ];
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error al obtener datos', error);
        }
      );

  }
}
