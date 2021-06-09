import { ServicesPage } from "./../pages/services/services";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { CartPage } from "../pages/cart/cart";
import { AboutPage } from "./../pages/about/about";
import { ContactPage } from "./../pages/contact/contact";
import { LoginPage } from "./../pages/login/login";
import { DeliveryPage } from './../pages/delivery/delivery';

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { IonicStorageModule } from "@ionic/storage";

import { File } from "@ionic-native/file";
import { FileTransfer } from "@ionic-native/file-transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireModule } from "@angular/fire";

import { config } from "./../config/app.config";
import * as firebase from "firebase";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ProductsProvider } from "../providers/products/products";
import { AuthProvider } from "../providers/auth/auth";
import { CartProvider } from "../providers/cart/cart";
import { CategoryProvider } from "../providers/category/category";
import { OrderProvider } from "../providers/order/order";
import { ServicesProvider } from "../providers/services/services";
import { SettingsProvider } from "../providers/settings/settings";
import { ServiceListProvider } from '../providers/service-list/service-list';
import { AddLogisticsProvider } from '../providers/add-logistics/add-logistics';
import { HttpClientModule } from '@angular/common/http';
import { AddPurchasesProvider } from '../providers/add-purchases/add-purchases';
import { ContactProvider } from '../providers/contact/contact';
import { CalculateProvider } from '../providers/calculate/calculate';


firebase.initializeApp(config.firebasConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ServicesPage,
    CartPage,
    DeliveryPage,
    LoginPage,
    ContactPage,
    AboutPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config.firebasConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CartPage,
    DeliveryPage,
    ServicesPage,
    LoginPage,
    ContactPage,
    AboutPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductsProvider,
    File,
    FileTransfer,
    Camera,
    FilePath,
    Geolocation,
    AuthProvider,
    CartProvider,
    CategoryProvider,
    OrderProvider,
    ServicesProvider,
    SettingsProvider,
    ServiceListProvider,
    AddLogisticsProvider,
    AddPurchasesProvider,
    ContactProvider,
    CalculateProvider,
  ],
})
export class AppModule {}
