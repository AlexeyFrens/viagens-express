import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustosService {
  private apiUrl = 'https://viagens-express-backend.onrender.com/custos';

  constructor(private http: HttpClient) {}

  getCustos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  adicionar(custo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, custo);
  }

  atualizar(id: string, custo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, custo);
  }

  deletar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
