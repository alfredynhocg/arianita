import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invitado {
  id: number;
  nombre: string;
  fecha: string;
  fechaLegible: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  invitados?: Invitado[];
  total?: number;
  count?: number;
  invitado?: Invitado;
}

@Injectable({
  providedIn: 'root'
})
export class InvitadosService {
  // URL del backend en Railway - actualiza esto con tu dominio real
  private apiUrl = 'https://arianita-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  // Obtener número de invitados confirmados
  getCount(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/invitados/count`);
  }

  // Confirmar asistencia
  confirmarAsistencia(nombre: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/invitados/confirmar`, { nombre });
  }

  // Obtener lista completa (requiere contraseña)
  getInvitados(password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/admin/invitados`, { password });
  }

  // Eliminar un invitado
  eliminarInvitado(id: number, password: string): Observable<ApiResponse> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { password }
    };
    return this.http.delete<ApiResponse>(`${this.apiUrl}/admin/invitados/${id}`, options);
  }

  // Limpiar todos los invitados
  limpiarTodos(password: string): Observable<ApiResponse> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { password }
    };
    return this.http.delete<ApiResponse>(`${this.apiUrl}/admin/invitados`, options);
  }
}
