import { Component, ViewChild } from "@angular/core";
import { ApexDataLabels, ApexLegend, ApexPlotOptions, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  colors: string[]; 
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [65, 34, 45, 12],
      chart: {
        type: "donut",
        width: 380,
      },
      colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"],
      labels: ["Desktop", "Tablet", "Mobile", "Unknown"],
      legend: {
        show: false,
        position: "bottom",
      },
  
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            background: "transparent",
          },
        },
      },
  
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    };
  }
}
