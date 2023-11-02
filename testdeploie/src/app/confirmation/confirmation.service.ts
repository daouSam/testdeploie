import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ComfirmationComponent } from './confirmation.component';
import { ConfirmData } from '../models/confirm.data';

@Injectable({
  providedIn: 'root'
})
export class ConfirmetionService {

  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmData): Observable<boolean> {
    return this.dialog
      .open(ComfirmationComponent, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }
}