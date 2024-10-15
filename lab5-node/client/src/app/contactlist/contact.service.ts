import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Contact} from './contact';
import {API_HOST} from '../cfg/config.json'

@Injectable()
export class ContactService {
  private APIUrl =  API_HOST + '/v1/contact'; // путь для сервиса
  constructor(private httpClient: HttpClient) {
  }

  createContact(newContact: Contact): Promise<Contact> {
    return this.httpClient.post(this.APIUrl, newContact)
      .toPromise()
      .catch(this.handleError) as Promise<Contact>;
  }

  getContacts(): Promise<Contact[]> {
    // @ts-ignore
    return this.httpClient.get(this.APIUrl)
      .toPromise()
      .then((res) => (res as {data: Contact[]}).data)
      .catch(this.handleError) as Promise<Contact[]>;
  }

  deleteContact(delContactId: String): Promise<String> {
    return this.httpClient.delete(this.APIUrl + '/' + delContactId)
      .toPromise()
      .catch(this.handleError) as Promise<String>;
  }

  updateContact(putContact: Contact): Promise<Contact> {
    var putUrl = this.APIUrl + '/' + putContact._id;
    return this.httpClient.put(putUrl, putContact)
      .toPromise()
      .catch(this.handleError) as Promise<Contact>;
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} – ${error.statusText}` : 'Ошибка сервера';
    console.error(errMsg); // Вывод сообщения в консоль браузера
  }
}
