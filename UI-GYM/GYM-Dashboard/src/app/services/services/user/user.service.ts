import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../interfaces/classification';

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

  private unsubscriptionPlayer = new BehaviorSubject(null);
  playerOfUnsubscription = this.unsubscriptionPlayer.asObservable();
  changePlayerUnsubscriptionStatus(status: any) {
    this.unsubscriptionPlayer.next(status);
  }

  private playerSubscription = new BehaviorSubject(null);
  playerSubscriptionAsObservable = this.playerSubscription.asObservable();
  changePlayerSubscription(status: any) {
    this.playerSubscription.next(status);
  }

  private playerUpdate = new BehaviorSubject(null);
  playerUpdateAsObservable = this.playerUpdate.asObservable();
  changePlayerUpdate(status: any) {
    this.playerUpdate.next(status);
  }

}
