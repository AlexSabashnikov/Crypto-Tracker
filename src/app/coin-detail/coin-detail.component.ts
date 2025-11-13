import { ApiService } from './../service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {

  coinData : any;
  coinId !: string;
  days : number = 30;
  currency : string = "USD";
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Цена`,
        backgroundColor: '#282828',
        borderColor: '#3aff41',
        pointBackgroundColor: '#3aff41',
        pointBorderColor: '#3aff41',
        pointHoverBackgroundColor: '#3aff41',
        pointHoverBorderColor: '#3aff41',
      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {
        grid: {
          color: '#363749'
        },
        ticks: {
          color: '#eff9ff'
        }
      },
      y: {
        grid: {
          color: '#363749'
        },
        ticks: {
          color: '#eff9ff'
        }
      }
    },
    elements: {
      point: {
        radius: 1
      }
    },
    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(private api : ApiService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.coinId = val['id'];
    });
    this.getCoinData();
    this.getGraphData(this.days);
  }

  getCoinData(){
    this.api.getCurrencyById(this.coinId)
    .subscribe(res=>{
      console.log(this.coinData);
      res.market_data.current_price.inr = res.market_data.current_price.usd;
      res.market_data.market_cap.inr = res.market_data.market_cap.usd;
      this.coinData = res;
    })
  }
  getGraphData(days:number){
    this.days = days
    this.api.getGrpahicalCurrencyData(this.coinId,this.currency,this.days)
    .subscribe(res=>{
      setTimeout(() => {
        this.myLineChart.chart?.update();
      }, 200);
      this.lineChartData.datasets[0].data = res.prices.map((a:any)=>{
        return a[1];
      });
      this.lineChartData.labels = res.prices.map((a:any)=>{
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` :
        `${date.getHours()}: ${date.getMinutes()} AM`
        return this.days <= 1 ? time : date.toLocaleDateString();
      })
    })
  }
}
