import {Component, Input} from '@angular/core';
import {Contact} from '../contact';
import {ContactService} from '../contact.service';
import {ContactListComponent} from '../contact-list/contact-list.component';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  imports: [
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class ContactDetailsComponent {
  @Input({required: true})
  contact!: Contact;
  @Input()
  createHandler?: Function;
  @Input()
  updateHandler?: Function;
  @Input()
  deleteHandler?: Function;

  constructor(private contactService: ContactService) {
  }

  createContact(contact?: Contact) {
    if (!contact) return;

    this.contactService.createContact(contact).then((newContact:
                                                       Contact) => {
      this.createHandler?.(newContact);
    });
  }

  updateContact(contact?: Contact): void {
    if (!contact) return;
    this.contactService.updateContact(contact).then((updatedContact:
                                                       Contact) => {
      this.updateHandler?.(updatedContact);
    });
  }

  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: String) => {
        this.deleteHandler?.(deletedContactId);
      }
    );
  }
}
