import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import { DemandeService } from '../../service/demande.service';
import { Carte } from '../../models/carte.model';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  types: any = ['','Carte Classique','Carte Gold','Carte Tawfir','Carte Sayedati'];
  carte!: Carte;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demandeService: DemandeService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    console.log(localStorage);
  }

  commander(type: string){
    const carte = undefined;
    this.carte = carte || {type:type};
    this.carte.type=type;
    this.demandeService.sendCard(this.carte)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Demande de carte '+type+' envoyée', { keepAfterRouteChange: true });
                    this.router.navigate(['../add-card'], { relativeTo: this.route });
                },
                error: error => {
                  this.alertService.error(error);
                }
            });
  }
}
