import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Member {

  // 🔥 LIVE BACKEND URL (IMPORTANT)
  private apiUrl = 'https://nested-tree-backend.onrender.com/api/members';

  constructor(private http: HttpClient) {}

  // ✅ GET members
  getMembers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // ✅ ADD member
  addMember(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}