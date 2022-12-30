import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  types: any = ['','Carte Classique','Carte Gold','Carte Tawfir','Carte Sayedati'];
  constructor() { 
   
  }

  ngOnInit(): void {
  }

}
