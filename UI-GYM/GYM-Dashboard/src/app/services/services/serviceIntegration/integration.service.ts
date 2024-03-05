import { ENV } from './../security/store-storage';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Gender, Player } from '../interfaces/classification';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(private http: HttpClient, private router: Router) { }

  private getServerErrorMessage(error: HttpErrorResponse): string {

    switch (error.status) {

      case 404: {
        this.router.navigate(['**']);
        return `Not Found: ${error.message}`;
      }
      case 403: {
        // this.router.navigate(['/gym.system/login']);
        localStorage.clear();
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        this.router.navigate(['**']);
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        this.router.navigate(['**']);
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }


  login(loginRequest: any) {
    return this.http.post(ENV.URI+'login',loginRequest).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // register admin user
  registerUserAdmin(user: any, token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(ENV.URLIntegration+'registerUserAdmin', user, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // get gender lookup
  getGenderLookup(token: String):Observable<Gender[]> {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get<Gender[]>(ENV.URLIntegration+'getGenderLookup', requestOptions)
  }

  // get subType lookup
  getSubtypeLookup(token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(ENV.URLIntegration+'getSubtypeLookup', requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // get exercise type lookup
  getExerciseLookup(token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(ENV.URLIntegration+'getExerciseLookup', requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // save new player
  addNewPlayer(player: any ,userId: number  ,token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(ENV.URLIntegration+'addNewPlayer/' + userId ,player ,requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // get player by code ...
  getPlayerByCodeOrPlayerName(codeOrPlayerName: String, token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(ENV.URLIntegration+'getPlayerByCodeOrPlayerName/'+codeOrPlayerName, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // get player by code ...
  getPlayerByCode(code: any, token: String): Observable<Player> {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get<Player>(ENV.URLIntegration+'getPlayerByCode/'+code, requestOptions);
  }

  // change-player-subscriptions-strategy/{subtypeId}/{codeId}
  changePlayerSubscriptionStrategy(subtypeId: any, code: any, token: String): Observable<Player> {
    const headerDict = {
      'Authorization': 'bearer '+token
    }
    
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get<Player>
    (ENV.URLIntegration+'changePlayerSubscriptionsStrategy/'
    +subtypeId+'/'+code, requestOptions);
  }

  // change player image ...
  changePlayerImage(image: any, code: any, token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    let formData = new FormData();
    formData.append('code' , code);
    formData.append('file' , image);
    return this.http.post(ENV.URLIntegration+'updatePlayerImage' , formData, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // save new player ...
  updatePlayer(player: any, code: any, token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.put(ENV.URLIntegration+'updatePlayer/'+ code ,player ,requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // register admin user
  reigsterUserAdmin(user: any, token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(ENV.URLIntegration+'registerUserAdmin', user, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // save new player ...
  getDate(token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get(ENV.URLIntegration+'date' ,requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // Renew player Subscription ...
  renewPlayerSubscription(subscription: any, code: any, token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.put(ENV.URLIntegration+'renewPlayerSubscription/'+ code ,subscription ,requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // update Player Hulf Month NO By Code ...
  updatePlayerHulfMonthNOByCode(hulfMonthNO: any, code: any, token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.put(ENV.URLIntegration+'updatePlayerHulfMonthNOByCode/'+ code ,hulfMonthNO ,requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // check Password Validation ...
  checkPasswordValidation(password: String, userId: number, token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(ENV.URLIntegration+'checkPasswordValidation/'+userId , password, requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

  // check Password Validation ...
  getPlayerListOfInSuscription(token: String): Observable<Player[]> {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post<Player[]>(`${ENV.URLIntegration}getplayerListOfInSubscriptionOrOut/1`, null, requestOptions);
  }

  // check Password Validation ...
  getPlayerListOfOutSuscription(token: String): Observable<Player[]>{
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post<Player[]>(`${ENV.URLIntegration}getplayerListOfInSubscriptionOrOut/2`, null, requestOptions);
  }

  // update Player amount rest By Code ...
  updatePlayerAmountRestByCode(code: number, token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(`${ENV.URLIntegration}updatePlayerAmountRestByCode/${code}` ,null ,requestOptions).pipe(
      catchError(error => {
        let errorMsg: string = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        return errorMsg;
      })
    );
  }

}
