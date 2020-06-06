webpackHotUpdate("main",{

/***/ "./src/assets/paystack.svg":
/*!*********************************!*\
  !*** ./src/assets/paystack.svg ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/paystack.a9a73e6a.svg";

/***/ }),

/***/ "./src/components/CheckOut.js":
/*!************************************!*\
  !*** ./src/components/CheckOut.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/index.js");
/* harmony import */ var _material_ui_core_colors___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/colors/ */ "./node_modules/@material-ui/core/esm/colors/index.js");
/* harmony import */ var _assets_paystack_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/paystack.svg */ "./src/assets/paystack.svg");
/* harmony import */ var _assets_paystack_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_paystack_svg__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/home/kosy/Desktop/kosyWork/Web/five-chow-react/src/components/CheckOut.js";






const useStyles = Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_3__["makeStyles"])(theme => {
  return {
    checkout: {
      fontStyle: "italic",
      color: _material_ui_core_colors___WEBPACK_IMPORTED_MODULE_4__["grey"]
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginLeft: theme.spacing(1)
    },
    btn: {
      backgroundColor: 'rgb(11, 164, 219)'
    },
    iconContainer: {
      backgroundColor: 'white',
      display: 'inline-block',
      padding: '5px',
      marginRight: '8px',
      borderRaduis: '50%',
      width: '24px',
      height: '24px'
    }
  };
});
let defaultProps = {
  amount: 500
};

function CheckOut(props = {
  amount: 500
}) {
  const classes = useStyles();
  let amount = 500;
  if (props) amount = props.amount;else amount = 500;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Card"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CardHeader"], {
    title: "Confirm Transaction",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CardContent"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
    variant: "p",
    className: classes.checkout,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 11
    }
  }, "You are about to confirm transaction of N", amount.toString())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CardActions"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    className: classes.btn,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.iconContainer,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 10
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Avatar"], {
    src: _assets_paystack_svg__WEBPACK_IMPORTED_MODULE_5___default.a,
    variant: "square",
    className: classes.small,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 13
    }
  })), "Pay with Paystack"))));
}

/* harmony default export */ __webpack_exports__["default"] = (CheckOut);

/***/ })

})
//# sourceMappingURL=main.030d90740d5aeb7f93f8.hot-update.js.map