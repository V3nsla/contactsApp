import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';

const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'contact-details/:id', component: ContactDetailsComponent },
  { path: 'contact-form/:id', component: ContactFormComponent },
  { path: 'contact-form', component: ContactFormComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
