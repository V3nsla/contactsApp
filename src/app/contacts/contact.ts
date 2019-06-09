import { PhoneNumber } from '../components/phone-numbers/phone-number';

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  email: string;
  favorite: boolean;
  phoneNumbers: PhoneNumber[];
}
