import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chequier } from '../models/chequier.model';
import { Carte } from '../models/carte.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(
    private http: HttpClient

  ) { }

  send(chequier: Chequier ) {
    console.log(chequier);
    return this.http.post(`${environment.apiUrl}/demandeschequier/add`, chequier);
}

  sendCard(carte: Carte ) {
  return this.http.post(`${environment.apiUrl}//demandescarte/add`, carte);
}

getAllCheck() {
  let user = JSON.parse(localStorage.getItem('user')!);
  return this.http.get<Chequier[]>(`${environment.apiUrl}/demandeschequier/${user.id}`);
}

getAllCard() {
  let user = JSON.parse(localStorage.getItem('user')!);
  return this.http.get<Carte[]>(`${environment.apiUrl}/demandescarte/${user.id}`);
}

}
