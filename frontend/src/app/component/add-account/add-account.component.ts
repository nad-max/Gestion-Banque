import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  loading = false;
  types: any = ['','courant','épargne'];
  gests: any = ['','carte','carnet'];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    let id = Math.floor(1000000000000 + Math.random() * 9000000000000);
    let user = JSON.parse(localStorage.getItem('user')!);

    this.form = this.formBuilder.group({
      rib: id.toString(),
      idUser: user.id.toString(),
      type: ['', Validators.required],
      gest: ['', Validators.required],
      solde: 0
    })
  }

  get f() { return this.form.controls; }

  create(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.accountService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Compte créé', { keepAfterRouteChange: true });
                    this.router.navigate(['../account'], { relativeTo: this.route });
                },
                error: error => {
                    this.loading = false;
                }
            });
  }
}
