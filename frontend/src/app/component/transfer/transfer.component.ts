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

  ngOnInit(): void {let user = JSON.parse(localStorage.getItem('user')!);

  this.form = this.formBuilder.group({
    idUser: user.id.toString(),
    ribFrom: ['', Validators.required], 
    ribTo: ['', Validators.required],
    montant: ['', Validators.required],
  })
  }

  get f() { return this.form.controls; }

  transfer(){

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
  }
    
      this.submitted = true;

        this.loading = true;
        this.accountService.transfer(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Transfert Effectué', { keepAfterRouteChange: true });
                    this.router.navigate(['../account'], { relativeTo: this.route });
                },
                error: (error: string) => {
                  this.alertService.error(error);
                  this.loading = false;
                }
            });
  }
}
