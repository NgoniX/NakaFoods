import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { ProductsProvider } from "../../providers/products/products";

@IonicPage()
@Component({
  selector: "page-category",
  templateUrl: "category.html",
})
export class CategoryPage {
  products: any[];
  productRows: any;
  categoryName: string;
  public alertPresented: any;
  public term;
  isEmpty: boolean;

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
    this.navCtrl.push("SinglePage", { product: product });
  }
}
