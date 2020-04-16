HTMLWidgets.widget({

  name: 'imageCropper',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        console.log("imageCropper new");

        if (typeof  Cropper != "undefined") {
           alert(" Cropper Exist in imageCropper");
           Cropper.noConflict();
        }
        else{
          alert(" Cropper NOT Exist main");
        }



        // TODO: code to render the widget, e.g.
        //el.innerText = x.message;

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
