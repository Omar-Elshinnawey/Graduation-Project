webpackJsonp([0],{111:function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(380)),n(r(381)),n(r(382)),n(r(383)),n(r(384)),n(r(385))},112:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=r(19),a=r(63),c=function(){function e(e){this.http=e,this.url="/auth"}return e.prototype.login=function(e,t){var r=new i.Headers({"Content-Type":"application/json"}),n=new i.RequestOptions({headers:r});return this.http.post(this.url+"/login",{username:e,password:t},n).map(this.extractUser).catch(this.handleError)},e.prototype.logout=function(){return localStorage.clear(),this.http.get(this.url+"/logout").map(function(e){return e.text()})},e.prototype.extractUser=function(e){if(200===e.status)return JSON.parse(e.text())},e.prototype.handleError=function(e){return a.Observable.throw(JSON.parse(e.text()).message)},e.prototype.isLoggedIn=function(){return this.http.get(this.url+"/isAuth").map(function(e){return e.text()}).catch(function(e){return a.Observable.throw(e.text())})},e}();c=n([s.Injectable(),o("design:paramtypes",[i.Http])],c),t.AuthService=c},113:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i};Object.defineProperty(t,"__esModule",{value:!0});var o=r(4),s=function(){function e(){}return e.prototype.create=function(e,t,r){void 0===r&&(r=3e3),t+=" rounded",Materialize.toast(e,r,t)},e}();s=n([o.Injectable()],s),t.ToastService=s},114:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ROLES=Object.freeze({CUSTOMER:1,PROVIDER:2,DELIVERY:3})},116:function(e,t,r){"use strict";function n(e){return new u.TranslateHttpLoader(e,"/assets/i18n/",".json")}var o=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=r(17),a=r(59),c=r(40),u=r(60);r(62);var f=r(61),l=r(19),p=r(111),h=r(16),d=r(379);t.createTranslateLoader=n;var v=function(){function e(){}return e}();v=o([s.NgModule({imports:[i.BrowserModule,a.FormsModule,f.MaterializeModule,d.AppRoutingModule,l.HttpModule,c.TranslateModule.forRoot({loader:{provide:c.TranslateLoader,useFactory:n,deps:[l.Http]}})],declarations:[p.LoginComponent,p.DashboardComponent,p.AppComponent,p.HeaderComponent,p.OrdersComponent,p.UsersComponent],bootstrap:[p.AppComponent],providers:[h.HeaderService,h.TranslationService,h.AuthService,h.AuthGuard,h.OrderService,h.ToastService,h.UsersService]})],v),t.AppModule=v},16:function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(387)),n(r(112)),n(r(388)),n(r(389)),n(r(113)),n(r(390)),n(r(391))},379:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i};Object.defineProperty(t,"__esModule",{value:!0});var o=r(4),s=r(11),i=r(111),a=r(16),c=[{path:"login",component:i.LoginComponent},{path:"login/:error",component:i.LoginComponent},{path:"dashboard",component:i.DashboardComponent,canActivate:[a.AuthGuard]},{path:"orders",component:i.OrdersComponent,canActivate:[a.AuthGuard]},{path:"users",component:i.UsersComponent,canActivate:[a.AuthGuard]},{path:"",redirectTo:"/login",pathMatch:"full"}],u=function(){function e(){}return e}();u=n([o.NgModule({imports:[s.RouterModule.forRoot(c)],exports:[s.RouterModule]})],u),t.AppRoutingModule=u},380:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i};Object.defineProperty(t,"__esModule",{value:!0});var o=r(4),s=function(){function e(){}return e}();s=n([o.Component({selector:"my-app",template:'\n    <nav-bar></nav-bar>\n    <div class="container">\n      <router-outlet></router-outlet>    \n    </div>\n  '})],s),t.AppComponent=s},381:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=r(11),a=r(16),c=r(57),u=function(){function e(e,t,r){this.router=e,this.header=t,this.translate=r,this.categories=c.CATEGORIES}return e.prototype.ngOnInit=function(){this.header.show()},e.prototype.logout=function(){localStorage.removeItem("currentUser"),this.router.navigate([""])},e}();u=n([s.Component({selector:"dashboard",templateUrl:"/assets/views/dashboard.component.html",styleUrls:["assets/css/dashboard.component.css"]}),o("design:paramtypes",[i.Router,a.HeaderService,a.TranslationService])],u),t.DashboardComponent=u},382:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=r(11),a=r(16),c=function(){function e(e,t,r,n){this.router=e,this.header=t,this.translate=r,this.auth=n,this.sideNav=new s.EventEmitter,this.subs=new Array}return e.prototype.changeLang=function(e){this.closeSideNav(),this.translate.changeLang(e)},e.prototype.logout=function(){this.closeSideNav(),this.subs.push(this.auth.logout().subscribe()),this.router.navigate([""])},e.prototype.closeSideNav=function(){this.sideNav.emit({action:"sideNav",params:["hide"]})},e.prototype.onresize=function(){this.closeSideNav()},e.prototype.ngOnDestroy=function(){this.subs.forEach(function(e){return e.unsubscribe()})},e}();c=n([s.Component({selector:"nav-bar",templateUrl:"/assets/views/header.component.html",styleUrls:["assets/css/header.component.css"]}),o("design:paramtypes",[i.Router,a.HeaderService,a.TranslationService,a.AuthService])],c),t.HeaderComponent=c},383:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=r(11),a=r(16),c=function(){function e(e,t,r,n,o){this.router=e,this.header=t,this.translate=r,this.auth=n,this.toast=o,this.model={username:"",password:""},this.subs=new Array}return e.prototype.ngOnInit=function(){this.header.hide(),localStorage.getItem("currentUser")&&this.router.navigate(["/dashboard"])},e.prototype.onsubmit=function(){var e=this,t=this.auth.login(this.model.username,this.model.password).subscribe(function(t){localStorage.setItem("currentUser",t.username),e.router.navigate(["/dashboard"])},function(t){e.toast.create(t,"danger")});this.subs.push(t)},e.prototype.ngOnDestroy=function(){this.subs.forEach(function(e){return e.unsubscribe()})},e}();c=n([s.Component({selector:"login",templateUrl:"/assets/views/login.component.html",styleUrls:["assets/css/login.component.css"]}),o("design:paramtypes",[i.Router,a.HeaderService,a.TranslationService,a.AuthService,a.ToastService])],c),t.LoginComponent=c},384:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=r(11),a=r(16),c=r(57),u=function(){function e(e,t,r,n,o){this.router=e,this.header=t,this.translate=r,this.orderService=n,this.toast=o,this.selectAction=new s.EventEmitter,this.orders=[],this.categories=c.CATEGORIES,this.subs=new Array}return e.prototype.ngOnInit=function(){this.header.show()},e.prototype.getOrders=function(e){var t=this,r=this.orderService.getOrdersInCategory(e).subscribe(function(e){e&&0!==e.length?t.orders=e:t.toast.create("No orders in this category","warning",2e3)},function(e){t.toast.create(e,"danger")});this.subs.push(r)},e.prototype.ngOnDestroy=function(){this.subs.forEach(function(e){return e.unsubscribe()})},e}();u=n([s.Component({selector:"dashboard",templateUrl:"/assets/views/orders.component.html",styleUrls:["assets/css/orders.component.css"]}),o("design:paramtypes",[i.Router,a.HeaderService,a.TranslationService,a.OrderService,a.ToastService])],u),t.OrdersComponent=u},385:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=r(16),a=r(57),c=function(){function e(e,t,r,n){this.header=e,this.usersService=t,this.toast=r,this.translate=n,this.ROLES=a.ROLES,this.params={position:"top",delay:50,tooltip:"Click to view detail"},this.subs=new Array}return e.prototype.ngOnInit=function(){var e=this;this.header.show();var t=this.usersService.getUsers().subscribe(function(t){e.users=t},function(t){e.toast.create(t,"danger")});this.subs.push(t)},e.prototype.toggleBan=function(e){var t=this,r=this.usersService.toggleBan(e).subscribe(function(t){e.isbanned=!e.isbanned},function(e){t.toast.create(e,"danger")});this.subs.push(r)},e.prototype.viewDetail=function(e){var t=this,r=this.usersService.getUserDetail(e).subscribe(function(t){return e.average=t},function(e){return t.toast.create(e,"danger")});this.subs.push(r)},e.prototype.setSelectedUser=function(e){this.selectedUser=e,this.action=e.isbanned?"UNBAN":"BAN"},e.prototype.ngOnDestroy=function(){this.subs.forEach(function(e){return e.unsubscribe()})},e}();c=n([s.Component({selector:"users",templateUrl:"/assets/views/users.component.html",styleUrls:["assets/css/users.component.css"]}),o("design:paramtypes",[i.HeaderService,i.UsersService,i.ToastService,i.TranslationService])],c),t.UsersComponent=c},386:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(41),o=r(116);n.platformBrowserDynamic().bootstrapModule(o.AppModule)},387:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=r(11),a=r(112),c=r(113),u=function(){function e(e,t,r){this.auth=e,this.router=t,this.toast=r}return e.prototype.canActivate=function(){var e=this;return this.auth.isLoggedIn().toPromise().then(function(e){return!0}).catch(function(t){return e.toast.create(JSON.parse(t).message,"danger"),e.router.navigate(["/login"]),localStorage.clear(),!1})},e}();u=n([s.Injectable(),o("design:paramtypes",[a.AuthService,i.Router,c.ToastService])],u),t.AuthGuard=u},388:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=function(){function e(){this.visible=!1}return e.prototype.hide=function(){this.visible=!1},e.prototype.show=function(){this.visible=!0},e.prototype.toggle=function(){this.visible=!this.visible},e}();i=n([s.Injectable(),o("design:paramtypes",[])],i),t.HeaderService=i},389:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=r(19),a=r(11),c=function(){function e(e,t){this.http=e,this.router=t}return e.prototype.getOrdersInCategory=function(e){return this.http.get("/orders/"+e).map(this.extractOrders).catch(this.handleError)},e.prototype.extractOrders=function(e){return JSON.parse(e.text())},e.prototype.handleError=function(e){return 401===e.status&&this.router.navigate(["/login"]),JSON.parse(e.text()).message},e}();c=n([s.Injectable(),o("design:paramtypes",[i.Http,a.Router])],c),t.OrderService=c},390:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=r(40),a=function(){function e(e){this.translate=e,this.dir="ltr",this.LANGUAGES=["en","ar"],this.translate.addLangs(this.LANGUAGES),this.translate.setDefaultLang(this.LANGUAGES[0]),this.translate.use(this.LANGUAGES[0])}return e.prototype.changeLang=function(e){this.translate.use(e),e==this.LANGUAGES[0]?this.dir="ltr":this.dir="rtl"},e.prototype.getCurrentLang=function(){return this.translate.currentLang},e}();a=n([s.Injectable(),o("design:paramtypes",[i.TranslateService])],a),t.TranslationService=a},391:function(e,t,r){"use strict";var n=this&&this.__decorate||function(e,t,r,n){var o,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(i=(s<3?o(i):s>3?o(t,r,i):o(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var s=r(4),i=r(19),a=r(11),c=function(){function e(e,t){this.http=e,this.router=t}return e.prototype.getUsers=function(){return this.http.get("/auth/users").map(this.extractUsers).catch(this.handleError)},e.prototype.toggleBan=function(e){var t="/auth/"+(e.isbanned?"unban":"ban")+"/"+e.username;return this.http.post(t,null).map(function(e){return e.text()}).catch(this.handleError)},e.prototype.getUserDetail=function(e){return this.http.get("/providers/"+e.username).map(function(e){return JSON.parse(e.text()).average}).catch(this.handleError)},e.prototype.extractUsers=function(e){return JSON.parse(e.text())},e.prototype.handleError=function(e){return 401===e.status&&this.router.navigate(["/login"]),JSON.parse(e.text()).message},e}();c=n([s.Injectable(),o("design:paramtypes",[i.Http,a.Router])],c),t.UsersService=c},393:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CATEGORIES=["FOOD","HANDCRAFT","FASHION","ACCESSORY","PAINTING"]},394:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){}return e}();t.Order=n},395:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(114),o=function(){function e(e,t,r,o){this.username=e,this.role=t,this.isbanned=r,t===n.ROLES.PROVIDER&&(this.average=o)}return e}();t.User=o},57:function(e,t,r){"use strict";function n(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}Object.defineProperty(t,"__esModule",{value:!0}),n(r(393)),n(r(394)),n(r(395)),n(r(114))}},[386]);
//# sourceMappingURL=bundle.js.map