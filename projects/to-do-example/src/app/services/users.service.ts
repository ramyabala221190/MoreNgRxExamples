import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../users/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersUrl:string="api/users"

  constructor(private http:HttpClient) { }

  fetchUsers():Observable<UserModel[]>{
    console.log("fetching users");
    return this.http.get<UserModel[]>(this.usersUrl);
  }
}
