<<<<<<< HEAD
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { ProductsProvider } from "../../providers/products/products";

@IonicPage()
@Component({
  selector: "page-category",
  templateUrl: "category.html"
})
export class CategoryPage {
  products: any[];
  productRows: any;
=======
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  products: any[];
  productRows:any;
>>>>>>> 619d4fad3a0cc76ae28e9cc2985b6b384a15bbc4
  categoryName: string;
  public alertPresented: any;

  isEmpty: boolean;

<<<<<<< HEAD
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductsProvider,
    private events: Events
  ) {}

  ionViewDidLoad() {
    this.alertPresented = false;
    this.loadProducts(this.navParams.get("category").id);
    this.categoryName = this.navParams.get("category").name;
  }

  loadProducts(catId) {
    this.productService.getProductByCategory(catId);
    this.events.subscribe("productsLoaded", () => {
      this.isEmpty = false;
      if (this.productService.products.length) {
        this.products = this.productService.products;
        this.productRows = Array.from(
          Array(Math.ceil(this.products.length / 2)).keys()
        );

        console.log(this.productService.products.length);
      } else {
        this.isEmpty = true;
      }
    });
=======
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService:ProductsProvider,private events: Events,
    private nativePageTransitions: NativePageTransitions) {
    
  }

  ionViewDidLoad() {
    this.alertPresented = false
    this.loadProducts(this.navParams.get('category').id);
    this.categoryName = this.navParams.get('category').name;
  }



  loadProducts(catId) {
    this.productService.getProductByCategory(catId);
    this.events.subscribe('productsLoaded', () => {
      this.isEmpty = false;
      if (this.productService.products.length) {
        
        this.products = this.productService.products;
        this.productRows = Array.from(Array(Math.ceil(this.products.length/2)).keys());
        
        console.log(this.productService.products.length);
      }
      else{
        this.isEmpty = true;
      }
      
    })
>>>>>>> 619d4fad3a0cc76ae28e9cc2985b6b384a15bbc4
  }

  // presentAlert() {
  //   let vm = this
  //   let alert = this.alertCtrl.create({
  //     title: 'Nothing Found',
  //     subTitle: 'No products found',
  //     buttons: ['Dismiss']
  //   });
  //   if(!vm.alertPresented) {
  //     vm.alertPresented = true
  //     alert.present();
  //   }
  // }

  showDetails(product) {
<<<<<<< HEAD
    this.navCtrl.push("SinglePage", { product: product });
  }
=======
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    };
    this.nativePageTransitions.slide(options);
    this.navCtrl.push("SinglePage", { product: product });
  }

>>>>>>> 619d4fad3a0cc76ae28e9cc2985b6b384a15bbc4
}
