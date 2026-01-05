import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface FrequentlyQuestion {
  id?: number;
  question: string;
  answer: string;
  category: string;
  keywords?: string;
  usersRole?: string;
  frequently?: number;
  updateDate?: Date;
  isOpen?: boolean; // For UI state
}

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private apiUrl = `${environment.apiUrl}/api/FrequentlyQuestions`;

  constructor(private http: HttpClient) { }

  getFaqs(): Observable<FrequentlyQuestion[]> {
    return this.http.get<FrequentlyQuestion[]>(this.apiUrl);
  }

  getFaqsByCategory(category: string): Observable<FrequentlyQuestion[]> {
    return this.http.get<FrequentlyQuestion[]>(`${this.apiUrl}/Category/${category}`);
  }

  getFaq(id: number): Observable<FrequentlyQuestion> {
    return this.http.get<FrequentlyQuestion>(`${this.apiUrl}/${id}`);
  }

  createFaq(faq: FrequentlyQuestion): Observable<FrequentlyQuestion> {
    return this.http.post<FrequentlyQuestion>(this.apiUrl, faq);
  }

  updateFaq(id: number, faq: FrequentlyQuestion): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, faq);
  }

  deleteFaq(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
