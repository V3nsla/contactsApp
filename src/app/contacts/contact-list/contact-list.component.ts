import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { AbstractContactsService } from '../contact-service/abstract-contacts.service';
import { Subject, Observable } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  filter$ = new Subject<string>();
  favorites = false;

  constructor(
    private contactsService: AbstractContactsService,
    private filterService: FilterService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.contactsService.getAll().subscribe(contacts => {
      this.contacts = contacts;
    });
    this.filterService.filter(this.filter$).subscribe(results => {
      this.contacts = results;
    });
  }

  favorite(contact: Contact) {
    this.contactsService.update(contact);
  }

  click(id: number) {
    this.router.navigate(['/contact-details/' + id]);
  }

  delete(contact: Contact) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want delete this contact?',
      accept: () => {
        this.contactsService.deleteById(contact.id);
        this.contacts = this.contacts.filter(c => c !== contact);
      }
    });
  }

  favoriteEvent() {
    this.favorites = !this.favorites;
  }
}
