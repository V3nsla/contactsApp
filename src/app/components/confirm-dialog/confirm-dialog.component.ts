import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @Input()
  title: string = 'Delete';

  @Input()
  message: string = 'Are you sure you want to delete this contact?';

  @Input()
  label: string = 'Delete';

  @Input()
  displayDialog: boolean;

  @Output()
  canceled: EventEmitter<void> = new EventEmitter();

  @Output()
  confirmed: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  cancel() {
    this.canceled.emit();
  }

  confirm() {
    this.confirmed.emit();
  }
}
