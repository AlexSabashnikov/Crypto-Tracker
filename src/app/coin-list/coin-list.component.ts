import { ApiService } from './../service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})

export class CoinListComponent implements OnInit {
  currency : string = "USD"
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_24h', 'market_cap'];
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api: ApiService, private router : Router) { }

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    this.api.getCurrency(this.currency)
      .subscribe(res => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Ошибка при получении данных:', error);
      })
  }
  Filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  gotoDetails(row: any) {
    this.router.navigate(['coin-detail',row.id])
  }
}
