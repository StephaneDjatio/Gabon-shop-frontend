import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ConstantComponent } from 'src/app/constant/constant.component';
declare var M: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  items: any[];
  isLoading: boolean = true;
  protected apiUrl = ConstantComponent.url;

  constructor(
    private router: Router,
    private appservice: AppService
  ) {}

  ngOnInit() {
    // Initialize your data here or fetch it from a service
    var carousels = document.querySelectorAll('.carousel');

    var options = {
      indicators: true
    }

    var instances = M.Carousel.init(carousels, options);
    // setInterval(function() {
    //   instances.next();
    // }, 10000)

    var elems = document.querySelectorAll('.materialboxed');
    var materialboxedInstances = M.Materialbox.init(elems);

    // $('.materialboxed').materialbox();
    this.loadItems();
  }

  loadItems() {
    // Load or populate your items array here (e.g., from an API)
    this.appservice.getShopList().subscribe((data) => {
      // console.table(data)
      this.items = data;
    });
  }

  selectShop(item: any) {
    console.log('company '+item+' click');
    this.router.navigate(['shop', item.id]);
  }

}
