import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { AbstractContactsService } from './contacts/contact-service/abstract-contacts.service';
import { ContactsLSService } from './contacts/contact-service/contacts-ls.service';
import { ContactCardComponent } from './contacts/contact-card/contact-card.component';
import { CardModule } from 'primeng/card';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { HeaderComponent } from './components/header/header.component';
import { LabelComponent } from './components/label/label.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as fasHeart,
  faEnvelope,
  faPhone,
  faEdit,
  faTrashAlt,
  faUser,
  faMinusCircle,
  faPlusCircle,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { PhoneNumbersComponent } from './components/phone-numbers/phone-numbers.component';
import { NameComponent } from './components/name/name.component';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DividerComponent } from './components/divider/divider.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactCardComponent,
    ContactDetailsComponent,
    HeaderComponent,
    LabelComponent,
    PhoneNumbersComponent,
    NameComponent,
    ContactFormComponent,
    DividerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    CardModule,
    FontAwesomeModule,
    ConfirmDialogModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: AbstractContactsService, useClass: ContactsLSService }, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(farHeart, fasHeart, faPhone, faEnvelope, faEdit, faTrashAlt, faUser, faMinusCircle, faPlusCircle, faArrowLeft);
  }
}
