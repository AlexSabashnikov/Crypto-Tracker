import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http : HttpClient) { }

  getCurrency(currency:string){
    return this.http.get<any>
    (`/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`)
  }
  getGrpahicalCurrencyData(coinId:string, currency:string, days: number){
    return this.http.get<any>
    (`/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`)
  }
  getCurrencyById(coinId:string){
    return this.http.get<any>
    (`/api/v3/coins/${coinId}`)
  }
}
