import { HomePage } from "./../pages/home/home";
import { ServicesPage } from "./../pages/services/services";
import { AuthProvider } from "./../providers/auth/auth";
import { AboutPage } from "./../pages/about/about";
import { ContactPage } from "./../pages/contact/contact";
import { LoginPage } from "./../pages/login/login";
import { CartPage } from "./../pages/cart/cart";
import { CategoryProvider } from "./../providers/category/category";
import { SettingsProvider } from "./../providers/settings/settings";
import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, Events } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  selectedTheme: any;

  toggleState: string;

  rootPage: any = HomePage;

  pages: Array<{ title: string; component: any; icon: string }>;

  categories: any[];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private categoryService: CategoryProvider,
    public auth: AuthProvider,
    private settings: SettingsProvider,
    private events: Events
  ) {
    this.settings
      .getActiveTheme()
      .subscribe((val) => (this.selectedTheme = val));

    // set active theme from local storage
    this.selectedTheme = localStorage.getItem("activeTheme");

    this.toggleState = localStorage.getItem("toggleState");

    localStorage.removeItem("firebase:previous_websocket_failure");

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", component: HomePage, icon: "home" },
      { title: "My Cart", component: CartPage, icon: "ios-cart" },
      {
        title: "Naka Services",
        component: ServicesPage,
        icon: "people",
      },
      { title: "Contact Us", component: ContactPage, icon: "contact" },
      { title: "About Us", component: AboutPage, icon: "information-circle" },
    ];

    this.getCategories();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);
      // set status bar to shade of red
      this.statusBar.backgroundColorByHexString("#d8232a");

      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goToCategory(category) {
    this.nav.push("CategoryPage", { category: category });
  }

  getCategories() {
    this.categoryService.getCategories();

    this.events.subscribe("categoryLoaded", () => {
      this.categories = this.categoryService.categories;
    });
  }

  toggleAppTheme() {
    if (this.selectedTheme === "light-theme") {
      this.settings.setActiveTheme("dark-theme");

      localStorage.setItem("toggleState", "true");
    } else {
      this.settings.setActiveTheme("light-theme");

      localStorage.setItem("toggleState", "false");
    }
    localStorage.setItem("activeTheme", this.selectedTheme);

    // console.log(localStorage.getItem("activeTheme"));
  }

  login() {
    this.nav.push(LoginPage);
  }

  logout() {
    this.auth.logout();
  }
}
