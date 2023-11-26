import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
declare var M: any;

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements AfterViewInit, OnInit{

  username: String = '';

  constructor(
    private router: Router,
    private appService: AppService
  ){}

  ngAfterViewInit(): void {
    let elems = document.querySelectorAll('.dropdown-trigger');
    let options = {
      constrainWidth: false
    };
    const instances = M.Dropdown.init(elems, options);
  }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.username = userData.user.username;
    console.log(userData);
  }

  logout(){
    this.appService.logout();
  }

}
