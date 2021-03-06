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
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  faHeart as fasHeart,
  faEnvelope,
  faPhone,
  faEdit,
  faTrashAlt,
  faUser,
  faPlusCircle,
  faArrowLeft,
  faTimes,
  faPlus,
  faUpload
} from '@fortawesome/free-solid-svg-icons';
import { PhoneNumbersComponent } from './components/phone-numbers/phone-numbers.component';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { DividerComponent } from './components/divider/divider.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ProfilePictureUploadComponent } from './components/profile-picture-upload/profile-picture-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactCardComponent,
    ContactDetailsComponent,
    HeaderComponent,
    LabelComponent,
    PhoneNumbersComponent,
    ContactFormComponent,
    DividerComponent,
    ConfirmDialogComponent,
    ProfilePictureUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    CardModule,
    FontAwesomeModule,
    DialogModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: AbstractContactsService, useClass: ContactsLSService }, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(farHeart, fasHeart, faPhone, faEnvelope, faEdit, faTrashAlt, faUser, faPlus, faTimes, faPlusCircle, faArrowLeft, faUpload);
  }
}
