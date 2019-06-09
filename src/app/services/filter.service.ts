import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { AbstractContactsService } from '../contacts/contact-service/abstract-contacts.service';
import { Contact } from '../contacts/contact';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private contactService: AbstractContactsService) {}

  filter(filter: Observable<string>): Observable<Contact[]> {
    return filter.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(filterText => this.filterByText(filterText))
    );
  }

  filterByText(filterText: string): Observable<Contact[]> {
    return this.contactService.getAll().pipe(
      map(contacts => {
        return contacts.filter(item => {
          return Object.keys(item).some(k => {
            if (typeof item[k] === 'string') {
              return item[k].toLowerCase().includes(filterText.toLowerCase());
            }
          });
        });
      })
    );
  }
}
