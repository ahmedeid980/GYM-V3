import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(private http: HttpClient, private router: Router) { }

  URI = 'http://localhost:7172/BackGYM/auth/'; //localhost:8080/demo-0.0.1-SNAPSHOT
  URLIntegration = 'http://localhost:7172/serviceIntegration/';
  // URI = 'http://localhost:8083/GYMWAR/BackGYM/auth/'; //localhost:8080/demo-0.0.1-SNAPSHOT
  // URLIntegration = 'http://localhost:8083/GYMWAR/serviceIntegration/';

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
    return this.http.post(this.URI+'login',loginRequest).pipe(
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
    return this.http.post(this.URLIntegration+'registerUserAdmin', user, requestOptions).pipe(
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
  getGenderLookup(token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(this.URLIntegration+'getGenderLookup', requestOptions).pipe(
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

  // get subType lookup
  getSubtypeLookup(token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(this.URLIntegration+'getSubtypeLookup', requestOptions).pipe(
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
    return this.http.get(this.URLIntegration+'getExerciseLookup', requestOptions).pipe(
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

    return this.http.post(this.URLIntegration+'addNewPlayer/' + userId ,player ,requestOptions).pipe(
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
    return this.http.get(this.URLIntegration+'getPlayerByCodeOrPlayerName/'+codeOrPlayerName, requestOptions).pipe(
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
  getPlayerByCode(code: any, token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(this.URLIntegration+'getPlayerByCode/'+code, requestOptions).pipe(
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
    return this.http.post(this.URLIntegration+'updatePlayerImage' , formData, requestOptions).pipe(
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

    return this.http.put(this.URLIntegration+'updatePlayer/'+ code ,player ,requestOptions).pipe(
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
    return this.http.put(this.URLIntegration+'renewPlayerSubscription/'+ code ,subscription ,requestOptions).pipe(
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
    return this.http.put(this.URLIntegration+'updatePlayerHulfMonthNOByCode/'+ code ,hulfMonthNO ,requestOptions).pipe(
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

    return this.http.post(this.URLIntegration+'checkPasswordValidation/'+userId , password, requestOptions).pipe(
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
  getPlayerListOfInSuscription(token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(`${this.URLIntegration}getplayerListOfInSubscriptionOrOut/1`, null, requestOptions).pipe(
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
  getPlayerListOfOutSuscription(token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(`${this.URLIntegration}getplayerListOfInSubscriptionOrOut/2`, null, requestOptions).pipe(
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

  // update Player amount rest By Code ...
  updatePlayerAmountRestByCode(code: number, token: String) {
    const headerDict = {
      'Authorization': 'bearer '+token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post(`${this.URLIntegration}updatePlayerAmountRestByCode/${code}` ,null ,requestOptions).pipe(
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
