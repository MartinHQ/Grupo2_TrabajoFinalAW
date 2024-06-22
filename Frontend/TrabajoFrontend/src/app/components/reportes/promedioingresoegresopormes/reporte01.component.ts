import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { LoginService } from '../../../services/login.service';
import { Usuario } from '../../../models/Usuario';
import { TransaccionService } from '../../../services/transaccion.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChangeDetectorRef } from '@angular/core';

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

  constructor(private tS: TransaccionService, private lS: LoginService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.usuariologeado = this.lS.getCurrentUser()!;
    this.tS.getIngresosEgresosPorMes(this.usuariologeado.usuario_id).subscribe((data) => {
      console.log(data); // Verifica los datos recibidos
      this.barChartLabels = data.map((item) => item.mes);
      this.barChartData = [
        {
          data: data.map((item) => item.promedio_ingresos),
          label: 'promedio_ingresos',
          backgroundColor: ['#2925F3'],
          borderWidth: 1,
        },
        {
          data: data.map((item) => item.promedio_egresos),
          label: 'promedio_egresos',
          backgroundColor: ['#F32525'],
          borderWidth: 1,
        },
        
      ];
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
    
  }
}
