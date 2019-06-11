import { Injectable } from '@angular/core';
import { AbstractContactsService } from './abstract-contacts.service';
import { Contact } from '../contact';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactsLSService extends AbstractContactsService {
  CONTACTS_KEY = 'contacts';

  constructor() {
    super();
  }

  getAll(): Observable<Contact[]> {
    if (localStorage.getItem(this.CONTACTS_KEY)) {
      return of(JSON.parse(localStorage.getItem(this.CONTACTS_KEY)) as Contact[]);
    }
    return of(new Array<Contact>());
  }

  getById(id: number): Observable<Contact> {
    return this.getAll().pipe(map(contacts => contacts.find(epic => epic.id === id)));
  }

  save(contact: Contact): Observable<Contact> {
    const contactsCopy = this.contacts.slice();
    contact.id = this.getNextId();
    contactsCopy.push(contact);
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contactsCopy));
    return of(contact);
  }

  update(contact: Contact): Observable<Contact> {
    const contactsCopy = this.contacts.slice();
    this.contacts.map((c, i) => {
      if (c.id === contact.id) {
        contactsCopy[i] = contact;
      }
    });
    this.saveAll(contactsCopy);
    return of(contact);
  }

  deleteById(id: number): Observable<{}> {
    const contactsCopy = this.contacts.slice();
    this.saveAll(contactsCopy.filter(c => c.id !== id));
    return of({});
  }

  private get contacts() {
    return JSON.parse(localStorage.getItem(this.CONTACTS_KEY)) as Contact[];
  }

  private saveAll(contacts: Contact[]) {
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contacts));
  }

  private getNextId(): number {
    let nextId = 0;
    this.getAll().subscribe(contacts =>
      contacts.forEach(contact => {
        if (contact.id > nextId) {
          nextId = contact.id;
        }
      })
    );
    return nextId + 1;
  }
}
