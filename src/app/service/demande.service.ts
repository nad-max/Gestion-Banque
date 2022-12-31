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
    return this.http.post(`${environment.apiUrl}/component/add-check`, chequier);
}

  sendCard(carte: Carte ) {
  return this.http.post(`${environment.apiUrl}/component/add-card`, carte);
}

}
