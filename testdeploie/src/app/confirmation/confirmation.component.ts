import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmData } from '../models/confirm.data';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})

export class ComfirmationComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmData) {}

  datas : ConfirmData
  ngOnInit(): void {
   this.datas = this.data
  }
}
