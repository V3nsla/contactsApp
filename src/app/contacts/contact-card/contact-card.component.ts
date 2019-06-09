import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  @Input()
  contact: Contact;

  @Output()
  favorited = new EventEmitter<Contact>();

  @Output()
  deleted = new EventEmitter<Contact>();

  @Output()
  clicked = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  favorite() {
    this.contact.favorite = !this.contact.favorite;
    this.favorited.emit(this.contact);
  }

  delete() {
    this.deleted.emit(this.contact);
  }

  click() {
    this.clicked.emit(this.contact.id);
  }
}
