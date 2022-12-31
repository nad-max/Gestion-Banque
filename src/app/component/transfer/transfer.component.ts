import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import { first } from 'rxjs/operators';
import { TransferService } from '../../service/transfer.service';
import { AccountService } from '../../service/account.service';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  comptes!: any[];
  form!: FormGroup;
  submitted = false;
  loading = false;



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private transferService: TransferService,
    private alertService: AlertService,
    private accountService: AccountService
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ribFrom: ['', Validators.required], 
      ribTo: ['', Validators.required],
      montant: ['', Validators.required],
    })

    this.accountService.getAll()
            .pipe(first())
            .subscribe(compte => this.comptes = compte);
  }

  get f() { return this.form.controls; }

  transfer(){
    let from = false;
    let to = false;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
  }
    
    this.comptes.forEach((compte) => {
      if (compte.id == this.form.value.ribFrom) 
        from = true;
      if (compte.id == this.form.value.ribTo) 
        to = true;
    });

    if(from && to)
    {
      this.submitted = true;

        this.loading = true;
        this.transferService.transfer(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Transfert Effectué', { keepAfterRouteChange: true });
                    this.router.navigate(['../account'], { relativeTo: this.route });
                },
                error: error => {
                  this.alertService.error(error);
                  this.loading = false;
                }
            });
    }
    else 
    this.alertService.error("Veuillez vérifier les RIB");
  }
}
