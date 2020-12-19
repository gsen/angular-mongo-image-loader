import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login= ()=>{
    this.http.post('http://localhost:3000/login',{username:this.username, password: this.password}).subscribe(user=>{
      localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/'])
    })
  }

}
