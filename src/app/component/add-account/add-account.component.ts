import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { first } from 'rxjs/operators';

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
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: Math.floor(1000000000000 + Math.random() * 9000000000000),
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
                    this.router.navigate(['../account'], { relativeTo: this.route });
                },
                error: error => {
                    this.loading = false;
                }
            });
  }

}
