import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor(private http: HttpClient) { }

    getHeaders() {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        return headers;
    }

    makeHttpGetCall(url) {
        let headers: any;
        headers = this.getHeaders();
        return this.http.get(url, { headers: headers, observe: 'response' }).pipe(map((res: any) => {
            return res.body;
        }))
    }

    makeHttpPostCall(url, data) {
        let headers: any;
        headers = this.getHeaders();
        return this.http.post(url, data, { headers: headers }).pipe(map((res: any) => {
            return res;
        }))
    }

    makeHttpDeleteCall(url) {
        let headers: any;
        headers = this.getHeaders();
        return this.http.delete(url, { headers: headers }).pipe(map((res: any) => {
            return res;
        }))
    }

    getTask() {
        let url = 'https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks';
        return this.makeHttpGetCall(url);
    }

    addTask(request) {
        let url = 'https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks';
        return this.makeHttpPostCall(url,request);
    }

    deleteTask(request) {
        let url = 'https://firestore.googleapis.com/v1beta1/projects/angular-task-e7f39/databases/(default)/documents/tasks/' + request;
        return this.makeHttpDeleteCall(url);
    }
}
