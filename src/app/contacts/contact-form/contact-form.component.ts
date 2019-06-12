import { Component, OnInit } from '@angular/core';
import { AbstractContactsService } from '../contact-service/abstract-contacts.service';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
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
  displayDialog = false;

  get phoneNumbers(): FormArray {
    return this.contactForm.get('phoneNumbers') as FormArray;
  }

  get pictureUrl(): FormControl {
    return this.contactForm.get('pictureUrl') as FormControl;
  }

  constructor(
    private contactService: AbstractContactsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
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
    this.phoneNumbers.push(this.fb.group({ label: ['', Validators.required], number: ['', Validators.required] }));
  }

  deletePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  saveContact() {
    this.mapToContact(this.contactForm);
    if (this.editMode) {
      this.contactService.update(this.contact).subscribe(() => this.navigateToContactList());
    } else {
      this.contactService.save(this.contact).subscribe(() => this.navigateToContactList());
    }
    this.navigateToContactList();
  }

  private initNewForm() {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pictureUrl: [''],
      favorite: [false],
      phoneNumbers: this.fb.array([this.fb.group({ label: [''], number: [''] })])
    });
  }

  private initEditForm(contact: Contact) {
    let fullName = contact.firstName;
    if (contact.lastName) {
      fullName += ' ' + contact.lastName;
    }

    this.contactForm = this.fb.group({
      id: [this.id],
      fullName: [fullName, Validators.required],
      email: [contact.email, [Validators.required, Validators.email]],
      pictureUrl: [contact.pictureUrl],
      favorite: [contact.favorite],
      phoneNumbers: this.initPhonesArray(contact.phoneNumbers)
    });
  }

  private initPhonesArray(phoneNumbers: PhoneNumber[]): FormArray {
    const phones = this.fb.array([this.fb.group({ label: ['', Validators.required], number: ['', Validators.required] })]);
    if (phoneNumbers) {
      phones.removeAt(0);
      phoneNumbers.forEach(phone => {
        phones.push(this.fb.group({ label: [phone.label, Validators.required], number: [phone.number, Validators.required] }));
      });
    }
    return phones;
  }

  private mapToContact(formGroup: FormGroup) {
    this.contact = formGroup.value;
    const fullName = formGroup.get('fullName').value as string;
    delete this.contact['fullName'];
    this.contact.firstName = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1];

    if (lastName) {
      this.contact.lastName = lastName;
    }
  }

  delete() {
    this.displayDialog = true;
  }

  deleteCanceled() {
    this.displayDialog = false;
  }

  deleteContact() {
    this.contactService.deleteById(this.contact.id).subscribe();
    this.displayDialog = false;
    this.navigateToContactList();
  }

  private navigateToContactList() {
    this.router.navigateByUrl('/');
  }
}
