import { Component } from '@angular/core';

@Component({
  selector: 'app-constant',
  template: `
    <p>
      constant works!
    </p>
  `,
  styles: [
  ]
})
export class ConstantComponent {
  // public static url: string = 'http://127.0.0.1:8000/';
  public static url: string = 'https://gabon-eshop-api.onrender.com/';
  public static fraiLivraison: number = 3000;
}
