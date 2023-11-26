import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ConstantComponent } from 'src/app/constant/constant.component';
declare var M: any;

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit{

  shopName: string;
  shopDescription: string;
  shopLogo: string;
  shelves: any[] = [];
  shopShelveProducts: any[] = [];
  cartList: any[] = [];
  montantTotal: number = 0;
  commissions: number = 0;
  totalAPayer: number = 0;
  protected apiUrl = ConstantComponent.url;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appservice: AppService
  ) {}

  ngAfterViewInit(): void {
    // Initialize the modal
    var modalElements = document.querySelectorAll('.modal');
    const options = {
      // dismissible: false
      preventScrolling: false
    }
    var modalInstances = M.Modal.init(modalElements, options);
  }

  ngOnInit(): void {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);

    const shopId: string|null = this.route.snapshot.paramMap.get('id');
    if (shopId) {
      this.appservice.getShopById(+shopId)
        .subscribe((data) => {
          // console.log(data.shop_name);
          this.shopName = data.shop_name;
          this.shopDescription = data.shop_description;
          this.shopLogo = `${this.apiUrl}/${data.shop_logo}`
        }
      );
      this.appservice.getShopShelves(+shopId)
        .subscribe((data) => {
          // console.log(data);
          this.shelves = data;   
          // for (let index = 0; index < data.length; index++) {
          //   // console.log(data[index].shelve);
          //   this.shelves.push(data[index].shelve);   
          // }

          this.appservice.getShopShelveProducts(data[0].id)
            .subscribe((data) => {
              // console.log(data);
              this.shopShelveProducts = data;
              
            }
          );

          
          
        }
      );

    }
  }

  goToShopShelveProducts(id: number) {
    this.appservice.getShopShelveProducts(id)
      .subscribe((data) => {
        // console.log(data);
        this.shopShelveProducts = data;
        
      }
    );
  }

  addProductToCart(id: number) {
    // console.log(this.shopShelveProducts)
    let product = this.shopShelveProducts.find(i => i.id === id);
    this.montantTotal += product.product_price;
    this.commissions = Math.floor(this.montantTotal * 0.05);

    this.totalAPayer = this.commissions + this.montantTotal + ConstantComponent.fraiLivraison;
    // console.log(product);
    let list = {
      'count': 1,
      'element': product
    };

    let data = this.cartList.find(i => i.element.id === id);
    
    if (data != undefined) {
      // console.log('Prime text')
      let qty = data.count + 1;
      let list = {
        'count': qty,
        'element': product
      };
      const index: number = this.cartList.indexOf(data);
      // console.log(index)
      if (index !== -1) {
          this.cartList.splice(index, 1);
      }
      this.cartList.splice(index, 0, list);
    } else {
      this.cartList.push(list);
    }
    
    // console.log(this.cartList)
    // this.cartList.push(product);
  }

  showBill() {
    const elem = document.getElementById('clientBill');
    var instance = M.Modal.getInstance(elem);
    instance.open();
  }

}
