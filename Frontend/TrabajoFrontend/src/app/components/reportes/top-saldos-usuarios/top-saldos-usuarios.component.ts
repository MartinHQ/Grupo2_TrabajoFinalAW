import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TransaccionService } from '../../../services/transaccion.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { SaldosPorUsuarioDTO } from '../../../models/SaldosPorUsuarioDTO';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-top-saldos-usuarios',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepicker,
    BaseChartDirective,
    NgFor,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    MatButtonModule    
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './top-saldos-usuarios.component.html',
  styleUrl: './top-saldos-usuarios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopSaldosUsuariosComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartData: ChartDataset[] = [];

  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();

  constructor(private tS: TransaccionService) {}

  ngOnInit(): void {
    //this.updateChart();
  }

  updateChart(): void {

    console.log(this.fechaInicio, this.fechaFin);

    this.tS.getTopSaldoPorTiempo(this.fechaInicio, this.fechaFin).subscribe(
      (data: SaldosPorUsuarioDTO[]) => {
        this.barChartLabels = data.map((item) => item.nombreUsuario);
        this.barChartData = [
          {
            data: data.map((item) => item.saldoTotal),
            label: 'Saldo Total',
            backgroundColor: ['#C0504D', '#8064A2', '#4BACC6'],
            borderWidth: 1,
          },
        ];
      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  onDateChange(): void {
    
  }
}
