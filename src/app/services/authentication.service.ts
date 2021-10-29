import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
}
