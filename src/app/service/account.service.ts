import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Compte } from '../models/compte.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private compteSubject: BehaviorSubject<Compte | null>;
  public compte: Observable<Compte | null>;


  constructor(
    private router: Router,
    private http: HttpClient
    ) { 
      this.compteSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('compte')!));
      this.compte = this.compteSubject.asObservable();
    }

  create(compte: Compte ) {
    return this.http.post(`${environment.apiUrl}/component/add-account`, compte);

}

  getAll() {
    return this.http.get<Compte[]>(`${environment.apiUrl}/component/account`);
}

update( ) {
  // return this.http.put(`${environment.apiUrl}/component/transfer/${idFrom}/${idTo}`, params)
  //     .pipe(map(x => {
          
  //             // update local storage
  //             const compte = { ...this.compteValue, ...params };
  //             localStorage.setItem('compte', JSON.stringify(compte));

  //             // publish updated user to subscribers
  //             this.compteSubject.next(compte);
          
  //         return x;
  //     }));
}

}
