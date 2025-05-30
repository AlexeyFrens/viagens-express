import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private apiUrl = 'https://viagens-express-backend.onrender.com/enderecos';

  constructor(private http: HttpClient) {}

  getEnderecos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  adicionar(endereco: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, endereco);
  }

  atualizar(id: string, endereco: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, endereco);
  }

  deletar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
