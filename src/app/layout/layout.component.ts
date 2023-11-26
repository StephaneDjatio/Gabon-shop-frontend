import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
declare var M: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
  ]
})
export class LayoutComponent implements OnInit, AfterViewInit{
  isConnected: boolean = false;

  constructor(private appService: AppService) {}

  ngAfterViewInit(): void {
    let elems = document.querySelectorAll('.dropdown-trigger');
    let options = {
      constrainWidth: false
    };
    const instances = M.Dropdown.init(elems, options);
  }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      this.isConnected = true;
    }
  }

  logout() {
    this.appService.logout();
  }
}
