// services/appliance.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appliance } from '../models/appliance.model';

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {
  private baseUrl = 'http://localhost:8080/api/appliances'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getAllAppliances(): Observable<Appliance[]> {
    return this.http.get<Appliance[]>(this.baseUrl);
  }

  getApplianceById(id: number): Observable<Appliance> {
    return this.http.get<Appliance>(`${this.baseUrl}/${id}`);
  }

  createAppliance(appliance: Appliance): Observable<Appliance> {
    return this.http.post<Appliance>(this.baseUrl, appliance);
  }

  updateAppliance(id: number, appliance: Appliance): Observable<Appliance> {
    return this.http.put<Appliance>(`${this.baseUrl}/${id}`, appliance);
  }

  deleteAppliance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
