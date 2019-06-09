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

  save(contact: Contact) {
    this.getAll().subscribe(contacts => {
      contact.id = this.getNextId();
      contacts.push(contact);
      localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contacts));
    });
  }

  saveAll(contacts: Contact[]) {
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(contacts));
  }

  update(contact: Contact) {
    this.getAll().subscribe(contacts => {
      contacts.map((c, i) => {
        if (c.id === contact.id) {
          contacts[i] = contact;
        }
      });
      this.saveAll(contacts);
    });
  }

  deleteById(id: number) {
    this.getAll().subscribe(contacts => {
      this.saveAll(contacts.filter(c => c.id !== id));
    });
  }

  deleteAll() {
    localStorage.removeItem(this.CONTACTS_KEY);
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
