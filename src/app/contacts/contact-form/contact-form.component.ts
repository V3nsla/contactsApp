import { Component, OnInit } from '@angular/core';
import { AbstractContactsService } from '../contact-service/abstract-contacts.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Contact } from '../contact';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneNumber } from '../../components/phone-numbers/phone-number';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  contact: Contact;
  id: number;
  editMode: boolean;

  get phoneNumbers() {
    return this.contactForm.get('phoneNumbers') as FormArray;
  }

  constructor(
    private contactService: AbstractContactsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contactService.getById(+params['id']).subscribe(contact => {
        if (contact) {
          this.contact = contact;
          this.id = +params['id'];
          this.initEditForm(contact);
          this.editMode = true;
        } else {
          this.initNewForm();
        }
      });
    });
  }

  addPhoneNumber() {
    this.phoneNumbers.push(this.fb.group({ label: [''], number: [''] }));
  }

  deletePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  saveContact() {
    if (this.editMode) {
      this.contactService.update(this.contactForm.value);
    } else {
      this.contactService.save(this.contactForm.value);
    }
    this.navigateToContactList();
  }

  private initNewForm() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      favorite: [false],
      phoneNumbers: this.fb.array([this.fb.group({ label: [''], number: [''] })])
    });
  }

  private initEditForm(contact: Contact) {
    this.contactForm = this.fb.group({
      id: [this.id],
      firstName: [contact.firstName, Validators.required],
      lastName: [contact.lastName, Validators.required],
      email: [contact.email, Validators.email],
      favorite: [contact.favorite],
      phoneNumbers: this.initPhonesArray(contact.phoneNumbers)
    });
  }

  private initPhonesArray(phoneNumbers: PhoneNumber[]): FormArray {
    const phones = this.fb.array([this.fb.group({ label: [''], number: [''] })]);
    if (phoneNumbers) {
      phones.removeAt(0);
      phoneNumbers.forEach(phone => {
        phones.push(this.fb.group({ label: [phone.label], number: [phone.number] }));
      });
    }
    return phones;
  }

  deleteContact() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want delete this contact?',
      accept: () => {
        this.contactService.deleteById(this.contact.id);
        this.navigateToContactList();
      }
    });
  }

  private navigateToContactList() {
    this.router.navigateByUrl('/');
  }
}
