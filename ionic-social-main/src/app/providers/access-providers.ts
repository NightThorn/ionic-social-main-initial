import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import 'rxjs-compat/add/operator/timeout';
import 'rxjs-compat/add/operator/map';

@Injectable()
export class AccessProviders{


server: string = 'https://ggs.tv/';
constructor(
    public http: HttpClient
) {}
    postData(body, file){

        let headers = new HttpHeaders({

            'Content-Type': 'application/json; charset=UTF-8'

        });
            let options = {
                headers: headers
            }

            return this.http.post(this.server + file, JSON.stringify(body), options)
            .timeout(59000)
            .map(res => res);
    }

}