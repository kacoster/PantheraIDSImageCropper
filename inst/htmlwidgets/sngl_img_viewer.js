HTMLWidgets.widget({

  name: 'sngl_img_viewer',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        console.log(" x " + JSON.stringify(x));
        let spcs_idntfctns_scndry_img = new ViewerComponent("spcs_idntfctn_id_rf_2","img_idntfctn_scndry.csv"),
            spcs_idntfctns_prmry_img = new ViewerComponent("spcs_idntfctn_id_rf_1","img_idntfctn_prmry.csv");


        //let spcs_idntfctns_prmry_img = new ViewerComponent("img_clssfctn_ud");
        //spcs_idntfctns_prmry_img.fetchServerData(x.filepath,x.targetId);
        Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_1",
                function(mesg) {
                   console.log("Handler spcs_idntfctn_extrt_id_button_rf_1");

                  //console.log("Data 1 : " + loadFile('img_idntfctn_prmry.csv'));
                  spcs_idntfctns_prmry_img.fetchServerData("img_idntfctn_prmry.csv");
                  //resetProps();
                }
        );

         Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_2",
                function(mesg) {
                  console.log("Handler spcs_idntfctn_extrt_id_button_rf_2");
                   //onsole.log("Data 2 : " + loadFile('img_idntfctn_scndry.csv'));
                  spcs_idntfctns_scndry_img.fetchServerData("img_idntfctn_scndry.csv");
                  // nextPrevClicked("1");
                  //resetProps(); spcs_idntfctns_prmry_img
                }
        );

        // Handle previous image buttons
        Shiny.addCustomMessageHandler("spcs_idntfctn_prev_button_rf_1",
                function(mesg) {
                   console.log("Msg : " + mesg );

                   spcs_idntfctns_prmry_img.prev();
                  //let spcs_idntfctns_prmry_img = new ViewerComponent("spcs_idntfctn_id_rf_1","img_idntfctn_prmry.csv");
                  //console.log("Data 1 : " + loadFile('img_idntfctn_prmry.csv'));
                  //spcs_idntfctns_prmry_img.fetchServerData("img_idntfctn_prmry.csv");
                  //resetProps();
                }
        );
        Shiny.addCustomMessageHandler("spcs_idntfctn_prev_button_rf_2",
                function(mesg) {
                   console.log("Msg : " + mesg );
                    spcs_idntfctns_scndry_img.prev();
                  //let spcs_idntfctns_prmry_img = new ViewerComponent("spcs_idntfctn_id_rf_1","img_idntfctn_prmry.csv");
                  //console.log("Data 1 : " + loadFile('img_idntfctn_prmry.csv'));
                  //spcs_idntfctns_prmry_img.fetchServerData("img_idntfctn_prmry.csv");
                  //resetProps();
                }
        );

        // Hanle reset buttons
        Shiny.addCustomMessageHandler("spcs_idntfctn_reset_button_rf_1",
                function(mesg) {
                   console.log("Msg : " + mesg );
                   spcs_idntfctns_prmry_img.reset();
                  //let spcs_idntfctns_prmry_img = new ViewerComponent("spcs_idntfctn_id_rf_1","img_idntfctn_prmry.csv");
                  //console.log("Data 1 : " + loadFile('img_idntfctn_prmry.csv'));
                  //spcs_idntfctns_prmry_img.fetchServerData("img_idntfctn_prmry.csv");
                  //resetProps();
                }
        );
        Shiny.addCustomMessageHandler("spcs_idntfctn_reset_button_rf_2",
                function(mesg) {
                   console.log("Msg : " + mesg );
                     spcs_idntfctns_scndry_img.reset();
                  //let spcs_idntfctns_prmry_img = new ViewerComponent("spcs_idntfctn_id_rf_1","img_idntfctn_prmry.csv");
                  //console.log("Data 1 : " + loadFile('img_idntfctn_prmry.csv'));
                  //spcs_idntfctns_prmry_img.fetchServerData("img_idntfctn_prmry.csv");
                  //resetProps();
                }
        );

        // Hamdle next image buttons
        Shiny.addCustomMessageHandler("spcs_idntfctn_next_button_rf_1",
                function(mesg) {
                   console.log("Msg : " + mesg );
                   spcs_idntfctns_prmry_img.next();
                  //let spcs_idntfctns_prmry_img = new ViewerComponent("spcs_idntfctn_id_rf_1","img_idntfctn_prmry.csv");
                  //console.log("Data 1 : " + loadFile('img_idntfctn_prmry.csv'));
                  //spcs_idntfctns_prmry_img.fetchServerData("img_idntfctn_prmry.csv");
                  //resetProps();
                }
        );
        Shiny.addCustomMessageHandler("spcs_idntfctn_next_button_rf_2",
                function(mesg) {
                   console.log("Msg : " + mesg );
                   spcs_idntfctns_scndry_img.next();
                  //let spcs_idntfctns_prmry_img = new ViewerComponent("spcs_idntfctn_id_rf_1","img_idntfctn_prmry.csv");
                  //console.log("Data 1 : " + loadFile('img_idntfctn_prmry.csv'));
                  //spcs_idntfctns_prmry_img.fetchServerData("img_idntfctn_prmry.csv");
                  //resetProps();
                }
        );


         Shiny.addCustomMessageHandler("spcs_idntfctn_fltr_imgs_button_rf_1",
                function(mesg) {
                   console.log("Msg : " + JSON.stringify(mesg) );
                   //spcs_idntfctns_scndry_img.next();
                  //let spcs_idntfctns_prmry_img = new ViewerComponent("spcs_idntfctn_id_rf_1","img_idntfctn_prmry.csv");
                  //console.log("Data 1 : " + loadFile('img_idntfctn_prmry.csv'));
                  //spcs_idntfctns_prmry_img.fetchServerData("img_idntfctn_prmry.csv");
                  //resetProps();
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
