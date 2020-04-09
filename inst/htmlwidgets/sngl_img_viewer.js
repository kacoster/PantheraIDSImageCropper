HTMLWidgets.widget({

  name: 'sngl_img_viewer',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        console.log(" x " + JSON.stringify(x));


        //let spcs_idntfctns_prmry_img = new ViewerComponent("img_clssfctn_ud");
        //spcs_idntfctns_prmry_img.fetchServerData(x.filepath,x.targetId);
        Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_1",
                function(mesg) {
                   console.log("Handler spcs_idntfctn_extrt_id_button_rf_1");
                  let spcs_idntfctns_prmry_img = new ViewerComponent(x.targetId,x.filepath);
                  spcs_idntfctns_prmry_img.fetchServerData();
                  //resetProps();
                }
        );

         Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_2",
                function(mesg) {
                  console.log("Handler spcs_idntfctn_extrt_id_button_rf_2");
                  let spcs_idntfctns_scndry_img = new ViewerComponent(x.targetId,x.filepath);
                  spcs_idntfctns_scndry_img.fetchServerData();
                  // nextPrevClicked("1");
                  //resetProps(); spcs_idntfctns_prmry_img
                }
        );

        // TODO: code to render the widget, e.g.
        //el.innerText = x.message;

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});