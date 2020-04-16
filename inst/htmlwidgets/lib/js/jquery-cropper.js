// v 1.0.1

console.log("jquery-cropper.js");
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery'), require('cropperjs')) :
  typeof define === 'function' && define.amd ? define(['jquery', 'cropperjs'], factory) :
  (global = global || self, factory(global.jQuery, global.Cropper));
}(this, function ($, Cropper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Cropper = Cropper && Cropper.hasOwnProperty('default') ? Cropper['default'] : Cropper;

  if ($ && $.fn && Cropper) {
    var AnotherCropper = $.fn.cropperr;
    var NAMESPACE = 'cropperr';

    $.fn.cropperr = function jQueryCropper(option) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var result;
      this.each(function (i, element) {
        var $element = $(element);
        var isDestroy = option === 'destroy';
        var cropperr = $element.data(NAMESPACE);

        if (!cropperr) {
          if (isDestroy) {
            return;
          }

          var options = $.extend({}, $element.data(), $.isPlainObject(option) && option);
          cropperr = new Cropper(element, options);
          $element.data(NAMESPACE, cropperr);
        }

        if (typeof option === 'string') {
          var fn = cropperr[option];

          if ($.isFunction(fn)) {
            result = fn.apply(cropperr, args);

            if (result === cropperr) {
              result = undefined;
            }

            if (isDestroy) {
              $element.removeData(NAMESPACE);
            }
          }
        }
      });
      return result !== undefined ? result : this;
    };

    $.fn.cropperr.Constructor = Cropper;
    $.fn.cropperr.setDefaults = Cropper.setDefaults;

    $.fn.cropperr.noConflict = function noConflict() {
      $.fn.cropperr = AnotherCropper;
      return this;
    };
  }

}));
