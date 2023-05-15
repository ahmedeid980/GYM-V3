import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { } 

////   /[~`!#\\\/$%\^/&*()+=@.\-\[\]\\';,{}|\\":<>\?]/g
  // no special chars ...
  userNameOrEmailControl(value: string): boolean {
    const regexPattern = new RegExp(
      /[~`!#\\\/$%\^&*()+=@\-\[\]\\\s';,{}|\\":<>\?]/g
    ); //unacceptable chars
    if (regexPattern.test(value)) {
      return true;
    }
    return false;
  }

  private playerCode = new BehaviorSubject(null);
  playerCodeSubscription = this.playerCode.asObservable();
  changePlayerCodeStatus(code: any) {
    this.playerCode.next(code);
  }

}
