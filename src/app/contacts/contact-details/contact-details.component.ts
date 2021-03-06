import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { AbstractContactsService } from '../contact-service/abstract-contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;
  bigScreen = false;

  get name(): string {
    return this.contact.firstName + ' ' + this.contact.lastName;
  }
  constructor(
    private contactService: AbstractContactsService,
    private route: ActivatedRoute,
    private router: Router,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contactService.getById(+params['id']).subscribe(contact => (this.contact = contact));
    });
    this.breakpointObserver.observe(['(max-width: 991px)']).subscribe(result => {
      if (result.matches) {
        this.bigScreen = false;
      } else {
        this.bigScreen = true;
      }
    });
  }

  favorite() {
    this.contact.favorite = !this.contact.favorite;
    this.contactService.update(this.contact).subscribe();
  }

  editContact() {
    this.router.navigateByUrl('/contact-form/' + this.contact.id);
  }
}
