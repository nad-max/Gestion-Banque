import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  loading = false;

  constructor() { }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }

}
