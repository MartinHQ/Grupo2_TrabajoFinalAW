import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/Usuario';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MetadeahorroService } from '../../../services/metadeahorro.service';
import { LoginService } from '../../../services/login.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-reporte02',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reporte02.component.html',
  styleUrl: './reporte02.component.css',
})
export class Reporte02Component implements OnInit {
  usuariologeado: Usuario = new Usuario();

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  //barChartLabels: string[] = [];

  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  barChartLabels: string[] = [];

  constructor(
    private maS: MetadeahorroService,
    private lS: LoginService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuariologeado = this.lS.getCurrentUser()!;
    this.maS
      .getcantidadmetasiynocumplidas(this.usuariologeado.usuario_id)
      .subscribe((data) => {
        console.log(data);

        this.barChartLabels = data.map((item) => item.estado_meta);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad),
            backgroundColor: [
              'rgba(37, 243, 229, 0.6)', // Variación de azul verdoso pastel
              'rgba(41, 37, 243, 0.6)', // Azul principal pastel
            ],

            borderWidth: 1,
          },
        ];
        this.barChartLabels = ['metas cumplidas', 'metas no cumplidas'];
        this.cdr.detectChanges(); //forzar la detencion de cambios
      });
  }
}
