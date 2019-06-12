import { Component, OnInit, Input } from '@angular/core';
import { PhoneNumber } from './phone-number';

@Component({
  selector: 'app-phone-numbers',
  templateUrl: './phone-numbers.component.html',
  styleUrls: ['./phone-numbers.component.scss']
})
export class PhoneNumbersComponent implements OnInit {
  @Input() phoneNumbers: PhoneNumber[];

  @Input() colLabel = 6;
  @Input() colPhone = 6;

  constructor() {}

  ngOnInit() {}
}
