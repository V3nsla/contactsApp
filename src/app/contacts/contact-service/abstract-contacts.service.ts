import { Injectable } from '@angular/core';
import { Contact } from '../contact';
import { Observable } from 'rxjs';

@Injectable()
export abstract class AbstractContactsService {
  abstract getAll(): Observable<Contact[]>;

  abstract getById(id: number): Observable<Contact>;

  abstract save(contact: Contact);

  abstract saveAll(contacts: Contact[]);

  abstract update(contact: Contact);

  abstract deleteById(id: number);

  abstract deleteAll();
}
