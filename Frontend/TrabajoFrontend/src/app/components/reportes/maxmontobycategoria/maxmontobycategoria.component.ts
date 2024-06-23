import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../services/transaccion.service';
import { LoginService } from '../../../services/login.service';
import { NgFor } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableDataSource } from '@angular/material/table';
import { Consejo } from '../../../models/Consejo';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ConsejoService } from '../../../services/consejo.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-maxmontobycategoria',
  standalone: true,
  imports: [
    NgFor,
    BaseChartDirective,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    CommonModule,
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
    { name: 'Diciembre', value: 11 },
  ];
  selectedMonth: number = new Date().getMonth();
  selectedTransactionType: boolean = true;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];

  constructor(
    private tS: TransaccionService,
    private lS: LoginService,
    private cdr: ChangeDetectorRef,
    private cS: ConsejoService
  ) {}

  ngOnInit(): void {
    this.mostrarDatosPorMes(this.selectedMonth, this.selectedTransactionType);
  }
  onMonthChange(event: any) {
    this.selectedMonth = event.value;
    this.mostrarDatosPorMes(this.selectedMonth, this.selectedTransactionType);
    if (this.selectedTransactionType == false) {
      this.cS.listConsejosByCategoria(this.fechaInicio, this.fechaFin, this.idUsuario).subscribe((data) => {
        this.datasource = new MatTableDataSource(data);
        console.log(data);
        this.obs= this.datasource.connect();
      });
    }
  }

  onTransactionTypeChange(event: any): void {
    this.selectedTransactionType = event.value;
    this.mostrarDatosPorMes(this.selectedMonth, this.selectedTransactionType);
    if (this.selectedTransactionType == false) {
      this.cS.listConsejosByCategoria(this.fechaInicio, this.fechaFin, this.idUsuario).subscribe((data) => {
        this.datasource = new MatTableDataSource(data);
        console.log(data);
        this.obs= this.datasource.connect();
      });
    }
  }

  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  idUsuario: number = 0;
  obs?: Observable<any>;

  mostrarDatosPorMes(mes: number, esIngreso: boolean) {
    this.fechaInicio = new Date(new Date().getFullYear(), mes, 1);
    this.fechaFin = new Date(new Date().getFullYear(), mes + 1, 0);
    this.idUsuario = this.lS.getCurrentUser().usuario_id;

    this.mostrar(this.fechaInicio, this.fechaFin, this.idUsuario, esIngreso);
  }
  mostrar(
    fechaInicio: Date,
    fechaFin: Date,
    idUsuario: number,
    esIngreso: boolean
  ) {
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

  //Mostrar consejos relacionados a este reporte
  datasource: MatTableDataSource<Consejo> = new MatTableDataSource();
}
