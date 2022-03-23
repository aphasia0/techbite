(self["webpackChunktechbite"] = self["webpackChunktechbite"] || []).push([["src_app_blog_blog_module_ts"],{

/***/ 3622:
/*!*********************************************!*\
  !*** ./src/app/blog/blog-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlogRoutingModule": () => (/* binding */ BlogRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _blog_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blog.component */ 8716);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);




const routes = [
    {
        path: ':slug',
        component: _blog_component__WEBPACK_IMPORTED_MODULE_0__.BlogComponent,
    },
    {
        path: '**',
        component: _blog_component__WEBPACK_IMPORTED_MODULE_0__.BlogComponent,
    }
];
class BlogRoutingModule {
}
BlogRoutingModule.ɵfac = function BlogRoutingModule_Factory(t) { return new (t || BlogRoutingModule)(); };
BlogRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: BlogRoutingModule });
BlogRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](BlogRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 8716:
/*!****************************************!*\
  !*** ./src/app/blog/blog.component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlogComponent": () => (/* binding */ BlogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @scullyio/ng-lib */ 6938);
/* harmony import */ var _common_page_header_page_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/page-header/page-header.component */ 5602);



class BlogComponent {
    constructor(scully) {
        this.scully = scully;
        scully.getCurrent().subscribe(x => {
            this.title = x.title;
            this.subtitle = x.subtitle;
            this.image = x.image;
            console.log(x.subtitle);
        });
    }
    ngOnInit() { }
}
BlogComponent.ɵfac = function BlogComponent_Factory(t) { return new (t || BlogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_2__.ScullyRoutesService)); };
BlogComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: BlogComponent, selectors: [["app-blog"]], decls: 6, vars: 3, consts: [[3, "title", "subtitle", "image"]], template: function BlogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, "\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-page-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "\n\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "scully-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\n\n");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("title", ctx.title)("subtitle", ctx.subtitle)("image", ctx.image);
    } }, directives: [_common_page_header_page_header_component__WEBPACK_IMPORTED_MODULE_0__.PageHeaderComponent, _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_2__.ScullyContentComponent], styles: ["h1[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  margin-bottom: 1.5rem;\n  border-radius: 0.375rem;\n  background-color: rgba(25,238,118,0.78);\n}\n\n.dark[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  --tw-bg-opacity: 1;\n  background-color: rgba(249, 250, 251, var(--tw-bg-opacity));\n}\n\nh1[_ngcontent-%COMP%] {\n  font-size: 1.875rem;\n  line-height: 2.25rem;\n  font-weight: 800;\n}\n\n.dark[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  --tw-text-opacity: 1;\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\n}\n\nh2[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  margin-bottom: 0.75rem;\n  margin-left: 2.5rem;\n  font-style: italic;\n  --tw-text-opacity: 1;\n  color: rgba(17, 24, 39, var(--tw-text-opacity));\n}\n\np[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  margin-bottom: 0.75rem;\n}\n\na[_ngcontent-%COMP%] {\n  text-decoration: underline;\n}\n\nli[_ngcontent-%COMP%] {\n  list-style-type: disc;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2cuY29tcG9uZW50LnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdGFpbHdpbmRjc3MvbGliL2xpYi9zdWJzdGl0dXRlQ2xhc3NBcHBseUF0UnVsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUNFQSxrQkFBbUI7RUFBbkIscUJBQW1CO0VBQW5CLHVCQUFtQjtFQUFuQix1Q0FBbUI7QURBbkI7O0FDQUE7RUFBQSxrQkFBbUI7RUFBbkI7QUFBbUI7O0FBQW5CO0VBQUEsbUJBQW1CO0VBQW5CLG9CQUFtQjtFQUFuQjtBQUFtQjs7QUFBbkI7RUFBQSxvQkFBbUI7RUFBbkI7QUFBbUI7O0FERW5CO0VDRkEsbUJBQW1CO0VBQW5CLHNCQUFtQjtFQUFuQixtQkFBbUI7RUFBbkIsa0JBQW1CO0VBQW5CLG9CQUFtQjtFQUFuQiwrQ0FBbUI7QURJbkI7O0FBRUE7RUNOQSxtQkFBbUI7RUFBbkIsc0JBQW1CO0FEUW5COztBQUNBO0VDVEEsMEJBQW1CO0FEWW5COztBQUNBO0VDYkEscUJBQW1CO0FEZ0JuQiIsImZpbGUiOiJibG9nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaDEge1xuICBAYXBwbHkgdGV4dC0zeGwgYmctcHJpbWFyeWxpZ2h0ICBkYXJrOnRleHQtd2hpdGUgZGFyazpiZy1ncmF5LTUwIGZvbnQtZXh0cmFib2xkIG10LTYgbWItNiByb3VuZGVkLW1kXG59XG5cbmgyIHtcbiAgQGFwcGx5IG10LTMgbWItMyBtbC0xMCB0ZXh0LWdyYXktOTAwIGl0YWxpY1xufVxuXG5we1xuICBAYXBwbHkgbXQtMyBtYi0zXG59XG5he1xuICBAYXBwbHkgdW5kZXJsaW5lXG59XG5cbmxpe1xuICBAYXBwbHkgbGlzdC1kaXNjIFxufVxuIiwiQHRhaWx3aW5kIGJhc2U7XG5AdGFpbHdpbmQgY29tcG9uZW50cztcbkB0YWlsd2luZCB1dGlsaXRpZXM7Il19 */"] });


/***/ }),

/***/ 797:
/*!*************************************!*\
  !*** ./src/app/blog/blog.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlogModule": () => (/* binding */ BlogModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @scullyio/ng-lib */ 6938);
/* harmony import */ var _blog_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blog-routing.module */ 3622);
/* harmony import */ var _blog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blog.component */ 8716);
/* harmony import */ var ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-zorro-antd/grid */ 6704);
/* harmony import */ var _common_common_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/common.module */ 9174);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);







class BlogModule {
}
BlogModule.ɵfac = function BlogModule_Factory(t) { return new (t || BlogModule)(); };
BlogModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: BlogModule });
BlogModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _blog_routing_module__WEBPACK_IMPORTED_MODULE_0__.BlogRoutingModule, _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__.ScullyLibModule, ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_6__.NzGridModule, _common_common_module__WEBPACK_IMPORTED_MODULE_2__.AppCommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](BlogModule, { declarations: [_blog_component__WEBPACK_IMPORTED_MODULE_1__.BlogComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _blog_routing_module__WEBPACK_IMPORTED_MODULE_0__.BlogRoutingModule, _scullyio_ng_lib__WEBPACK_IMPORTED_MODULE_5__.ScullyLibModule, ng_zorro_antd_grid__WEBPACK_IMPORTED_MODULE_6__.NzGridModule, _common_common_module__WEBPACK_IMPORTED_MODULE_2__.AppCommonModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_blog_blog_module_ts.js.map