import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../../service/alert.service';
import { DemandeService } from '../../service/demande.service';

@Component({
  selector: 'app-add-check',
  templateUrl: './add-check.component.html',
  styleUrls: ['./add-check.component.scss']
})
export class AddCheckComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  loading = false;
  
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
      idUser: user.id.toString(),
      rib: ['', Validators.required],
      nbCheck: ['', Validators.required],
      barre: ['', Validators.required],
      etat:'en cours'
    })
  }

  get f() { return this.form.controls; }

  send(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.demandeService.send(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Demande de chéquier envoyée', { keepAfterRouteChange: true });
                    this.router.navigate(['../demandes'], { relativeTo: this.route });
                },
                error: error => {
                  this.alertService.error(error);
                  this.loading = false;
                }
            });

  }

}
