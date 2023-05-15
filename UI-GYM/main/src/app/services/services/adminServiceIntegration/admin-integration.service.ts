import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminIntegrationService {
  constructor(private http: HttpClient, private router: Router) {}

  URI = 'http://localhost:7172/adminServiceIntegration/'; //localhost:8080/demo-0.0.1-SNAPSHOT
  // URI = 'http://localhost:8083/GYMWAR/adminServiceIntegration/'; //localhost:8080/demo-0.0.1-SNAPSHOT

  private getServerErrorMessage(error: HttpErrorResponse): string {

    switch (error.status) {

      case 404: {
        this.router.navigate(['**']);
        return `Not Found: ${error.message}`;
      }
      case 403: {
        this.router.navigate(['/gym.system/login']);
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


  // get list of exercise type
  getSysExerciseTypeList(token: String) {
    const headerDict = {
      Authorization: 'bearer ' + token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get(this.URI + 'getSysExerciseTypeList', requestOptions).pipe(
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

  // get list of users
  getusersList(token: String) {
    const headerDict = {
      Authorization: 'bearer ' + token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get(this.URI + 'getUsersList', requestOptions).pipe(
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

  // get list of players
  getPlayersList(token: String) {
    const headerDict = {
      Authorization: 'bearer ' + token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get(this.URI + 'getPlayersList', requestOptions).pipe(
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

  // delete of player
  deletePlayerById(id: number, token: String) {
    const headerDict = {
      Authorization: 'bearer ' + token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.delete(this.URI + 'deletePlayer/' + id, requestOptions).pipe(
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

  // get user By Id
  getUserById(id: number, token: String) {
    const headerDict = {
      Authorization: 'bearer ' + token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(this.URI + 'getUserById/'+id, requestOptions).pipe(
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

  // get user By Id
  updateUserAdmin(id: number, userUI: any, token: String) {
    const headerDict = {
      Authorization: 'bearer ' + token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.put(this.URI + 'updateUserAdmin/'+id, userUI, requestOptions).pipe(
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

  // delete of user
  deleteUserAdminById(id: number, token: String) {
    const headerDict = {
      Authorization: 'bearer ' + token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.delete(this.URI + 'deleteUserAdmin/' + id, requestOptions).pipe(
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

  updateUserPassword(changePassword: String, id: number, token: String) {
    const headerDict = {
      Authorization: 'bearer ' + token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.put(this.URI + 'updateUserPassword/'+id, changePassword, requestOptions).pipe(
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
