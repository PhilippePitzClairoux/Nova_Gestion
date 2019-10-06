import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  // TODO change this url for a valid one
  private authentificationUrl = 'http://localhost:1000/api/authentification';

  constructor() { }

  public loginUser() {
    // TODO make a request to the server
  }
}
