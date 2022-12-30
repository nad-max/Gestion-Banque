import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../service/account.service';

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
  beneficiaires: any = ['','moi','parent','frère ou soeur','fille ou fils'];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      
    })
  }

  get f() { return this.form.controls; }

  envoyer(){}

  ajouter(){}
}
