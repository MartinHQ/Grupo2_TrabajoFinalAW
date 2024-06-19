import { Component, OnInit } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { LoginService } from '../../../services/login.service';
import { Usuario } from '../../../models/Usuario';
import { TransaccionService } from '../../../services/transaccion.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reporte01',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte01.component.html',
  styleUrl: './reporte01.component.css',
})
export class Reporte01Component implements OnInit {
  usuariologeado: Usuario = new Usuario();

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];

  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private tS: TransaccionService, private lS: LoginService) {}
  ngOnInit(): void {
    this.usuariologeado = this.lS.getCurrentUser()!;
    this.tS.getIngresosEgresosPorMes(this.usuariologeado.usuario_id).subscribe((data) => 
      {
        this.barChartLabels = data.map((item) => item.mes);
        this.barChartData = [
          {
            data: data.map((item) => item.promedio_egresos),
            label: 'promedio_egresos',
            backgroundColor: ['#0094d3', '#4169c7'],
            borderWidth: 1,
          },
          {
            data: data.map((item) => item.promedio_ingresos),
            label: 'promedio_ingresos',
            backgroundColor: ['#f39c12', '#e74c3c'],
            borderWidth: 1,
          },
        ];
      });
  }
}
