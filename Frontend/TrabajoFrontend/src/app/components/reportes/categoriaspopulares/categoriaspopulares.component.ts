import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../services/transaccion.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-categoriaspopulares',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './categoriaspopulares.component.html',
  styleUrl: './categoriaspopulares.component.css',
})
export class CategoriaspopularesComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = [];

  barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  //barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private tS: TransaccionService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.tS.getCategoriasPopulares().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.categoria);
      this.barChartData = [
        {
          data: data.map((item) => item.total_transacciones),
          label: 'transacciones con esta categoria',
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
        },
      ];
      this.cdr.detectChanges();
    });
  }
}
