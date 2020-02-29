import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { AboutPage } from './../pages/about/about';
import { ContactPage } from './../pages/contact/contact';
import { LoginPage } from './../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

import { AngularFireModule } from '@angular/fire';

import { config } from './../config/app.config';
import * as firebase from 'firebase';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ProductsProvider } from '../providers/products/products';
import { AuthProvider } from '../providers/auth/auth';
import { CartProvider } from '../providers/cart/cart';
import { CategoryProvider } from '../providers/category/category';
import { OrderProvider } from '../providers/order/order';

firebase.initializeApp(config.firebasConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CartPage,
    LoginPage,
    ContactPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
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
    LoginPage,
    ContactPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductsProvider,
    AuthProvider,
    CartProvider,
    CategoryProvider,
    NativePageTransitions,
    OrderProvider
  ]
})
export class AppModule { }
