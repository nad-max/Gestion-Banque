import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
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
    private accountService: AccountService) { }

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
    this.comptes.forEach((compte) => {
      if (compte.id == this.form.value.ribFrom) 
        from = true;
      if (compte.id == this.form.value.ribTo) 
        to = true;
    })
    //if(from && to)


    
  }

}
