import { Component } from '@angular/core';
import { ContactsLSService } from './contacts/contact-service/contacts-ls.service';
import { AbstractContactsService } from './contacts/contact-service/abstract-contacts.service';
import { Contact } from './contacts/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}
}
