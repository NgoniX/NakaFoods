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

export class HomePage {
  promoSliders: any[];
  products: any[];
  productRows: any;
  categories: any[];
  categoryRows: any;
  promoImagesLoaded: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductsProvider,
    private categoryService: CategoryProvider,
    private loadingCtrl: LoadingController,
    private events: Events,
    private nativePageTransitions: NativePageTransitions) {
  }

  ionViewWillEnter() {
    this.loadPromo();
    this.loadCategories();
  }

  ionViewDidLeave() {
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
    });
    loader.present();
    this.productService.getPromoSlider();

    this.events.subscribe('promoLoaded', () => {
      this.promoSliders = this.productService.promos;
      if (this.promoSliders.length > 0) {
        this.promoImagesLoaded = true;
      }
      loader.dismiss();
    })
  }

  loadCategories() {
    this.categoryService.getCategories();
    this.events.subscribe('categoryLoaded', () => {
      this.categories = this.categoryService.categories;
      this.categoryRows = Array.from(Array(Math.ceil(this.categories.length / 2)).keys());

    })
  }

  // go to cart
  goToCart() {
    this.navCtrl.push(CartPage);
  }

  showDetails(category) {
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

}
