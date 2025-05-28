import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViagemService {
  private apiUrl = 'http://gueto.nodes.hyperpowered.net:64566/viagens';

  constructor(private http: HttpClient) {}

  getViagens(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  adicionar(viagem: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, viagem);
  }

  atualizar(id: string, viagem: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, viagem);
  }

  deletar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
