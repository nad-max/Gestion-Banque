import { Component, OnInit } from '@angular/core';
import { Carte } from '../../models/carte.model';
import { Chequier } from '../../models/chequier.model';
import { first } from 'rxjs/operators';
import { DemandeService } from '../../service/demande.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.scss']
})
export class DemandesComponent implements OnInit {

  chequiers?: Chequier[];
  cartes?: Carte[];

    constructor(private demandeService: DemandeService) {}

    ngOnInit() {
        this.demandeService.getAllCheck()
            .pipe(first())
            .subscribe(chequier => {this.chequiers = chequier;
            console.log(chequier);});

        this.demandeService.getAllCard()
            .pipe(first())
            .subscribe(carte => {this.cartes = carte;
            console.log(carte);});

        console.log(localStorage);
        
          }

}
