import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import { DemandeService } from '../../service/demande.service';
import { Carte } from '../../models/carte.model';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  loading = false;
  types: any = ['','Carte Classique','Carte Gold','Carte Tawfir','Carte Sayedati'];
  carte!: Carte;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private demandeService: DemandeService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user')!);

    this.form = this.formBuilder.group({
      rib: ['', Validators.required],
      idUser: user.id.toString(),
      etat: 'en cours'
    })
    
  }

  get f() { return this.form.controls; }


  commander(type: string){
    this.form.addControl('type', this.formBuilder.control(type)); 

    // const carte = undefined;
    // this.carte = carte || {type:type, etat:'en cours'};
    // this.carte.type=type;
    
  }

  confirmer(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
  }
  this.loading = true;
    this.demandeService.sendCard(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Demande de carte envoyée', { keepAfterRouteChange: true });
                    this.router.navigate(['../demandes'], { relativeTo: this.route });
                },
                error: error => {
                  this.alertService.error(error);
                }
            });
  }
}
