<<<<<<< HEAD
import { CategoryProvider } from "./../../providers/category/category";
import { CartPage } from "./../cart/cart";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  Events
} from "ionic-angular";
import { ProductsProvider } from "../../providers/products/products";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
=======
import { CategoryProvider } from './../../providers/category/category';
import { CartPage } from './../cart/cart';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

>>>>>>> 619d4fad3a0cc76ae28e9cc2985b6b384a15bbc4
export class HomePage {
  promoSliders: any[];
  products: any[];
  productRows: any;
  categories: any[];
  categoryRows: any;
  promoImagesLoaded: boolean = false;
<<<<<<< HEAD
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductsProvider,
    private categoryService: CategoryProvider,
    private loadingCtrl: LoadingController,
    private events: Events
  ) {}
=======
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductsProvider,
    private categoryService: CategoryProvider,
    private loadingCtrl: LoadingController,
    private events: Events,
    private nativePageTransitions: NativePageTransitions) {
  }
>>>>>>> 619d4fad3a0cc76ae28e9cc2985b6b384a15bbc4

  ionViewWillEnter() {
    this.loadPromo();
    this.loadCategories();
  }

  ionViewDidLeave() {
<<<<<<< HEAD
    this.events.unsubscribe("promoLoaded");
  }

  ionViewWillLeave() {}

  ionViewDidLoad() {}

  loadPromo() {
    let loader = this.loadingCtrl.create({
      content: "Loading Products.."
=======
    this.events.unsubscribe('promoLoaded');
  }


  ionViewWillLeave() {

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

    this.nativePageTransitions.slide(options)
      .then(() => {

      })
      .catch((err) => {

      });

  }



  ionViewDidLoad() {

  }

  loadPromo() {
    let loader = this.loadingCtrl.create({
      content: 'Loading Products..'
>>>>>>> 619d4fad3a0cc76ae28e9cc2985b6b384a15bbc4
    });
    loader.present();
    this.productService.getPromoSlider();

<<<<<<< HEAD
    this.events.subscribe("promoLoaded", () => {
=======
    this.events.subscribe('promoLoaded', () => {
>>>>>>> 619d4fad3a0cc76ae28e9cc2985b6b384a15bbc4
      this.promoSliders = this.productService.promos;
      if (this.promoSliders.length > 0) {
        this.promoImagesLoaded = true;
      }
      loader.dismiss();
<<<<<<< HEAD
    });
=======
    })
>>>>>>> 619d4fad3a0cc76ae28e9cc2985b6b384a15bbc4
  }

  loadCategories() {
    this.categoryService.getCategories();
<<<<<<< HEAD
    this.events.subscribe("categoryLoaded", () => {
      this.categories = this.categoryService.categories;
      this.categoryRows = Array.from(
        Array(Math.ceil(this.categories.length / 2)).keys()
      );
    });
=======
    this.events.subscribe('categoryLoaded', () => {
      this.categories = this.categoryService.categories;
      this.categoryRows = Array.from(Array(Math.ceil(this.categories.length / 2)).keys());

    })
>>>>>>> 619d4fad3a0cc76ae28e9cc2985b6b384a15bbc4
  }

  // go to cart
  goToCart() {
    this.navCtrl.push(CartPage);
  }

  showDetails(category) {
<<<<<<< HEAD
    this.navCtrl.push("CategoryPage", { category: category });
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
    this.navCtrl.push("CategoryPage", { category: category });
  }

>>>>>>> 619d4fad3a0cc76ae28e9cc2985b6b384a15bbc4
}
