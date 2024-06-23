import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { TransaccionService } from '../../../services/transaccion.service';
import { ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { BaseChartDirective } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reporte-promediotransaccion',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCalendar,
    MatCardModule,
    NgIf,
    NgFor,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './reporte-promediotransaccion.component.html',
  styleUrl: './reporte-promediotransaccion.component.css',
})
export class ReportePromediotransaccionComponent implements OnInit {
  // Variables para las fechas seleccionadas
  fechainicio: Date | null = null;
  fechafin: Date | null = null;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  barChartLabels: string[] = [];

  constructor(private tS: TransaccionService, private lS: LoginService) {}
  ngOnInit(): void {
    const hoy = new Date();
    this.fechainicio = new Date(
      hoy.getFullYear() - 1,
      hoy.getMonth(),
      hoy.getDate()
    );
    this.fechafin = hoy;
    this.mostrarPromedioTransaccion(); // Inicializa con el mes actual
  }
  // Método para mostrar el promedio de transacciones
  mostrarPromedioTransaccion(): void {
    console.log(this.fechainicio, this.fechafin);
    if (this.fechainicio && this.fechafin) {
      this.tS
        .getPromedioTransaccion(this.fechainicio, this.fechafin)
        .subscribe((data) => {
          console.log(data);
          this.barChartLabels = data.map((item) => this.getNombreMes(item.mes));
          this.barChartData = [
            {
              data: data.map((item) => item.promedio),
              label: 'Promedio de Transacciones',
              backgroundColor: [
                'rgba(41, 37, 243, 0.6)', // Azul principal pastel
                'rgba(41, 127, 243, 0.6)', // Variación de azul pastel
                'rgba(37, 243, 229, 0.6)', // Variación de azul verdoso pastel
                'rgba(116, 37, 243, 0.6)', // Variación de púrpura pastel
                'rgba(41, 37, 153, 0.6)', // Variación de azul oscuro pastel
              ],
              fill: false,
            },
          ];
        });
    }
  }
  // Método para obtener el nombre del mes basado en el número
  private getNombreMes(mes: number): string {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return meses[mes - 1];
  }
}
