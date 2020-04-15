HTMLWidgets.widget({

  name: 'sngl_img_viewer',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.

        let spcs_idntfctns_scndry_img = new ViewerComponent(
                                            "spcs_idntfctn_id_rf_2",
                                            "img_idntfctn_scndry.csv"),
            spcs_idntfctns_prmry_img = new ViewerComponent(
                                            "spcs_idntfctn_id_rf_1",
                                            "img_idntfctn_prmry.csv");


        Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_1",
                function(mesg) {

                  spcs_idntfctns_prmry_img.restart();
                  spcs_idntfctns_prmry_img.fetchServerData("img_idntfctn_prmry.csv");
                }
        );

         Shiny.addCustomMessageHandler("spcs_idntfctn_extrt_id_button_rf_2",
                function(mesg) {
                  spcs_idntfctns_scndry_img.restart();
                  spcs_idntfctns_scndry_img.fetchServerData("img_idntfctn_scndry.csv");
                }
        );

        // Handle previous image buttons
        Shiny.addCustomMessageHandler("spcs_idntfctn_prev_button_rf_1",
                function(mesg) {
                   spcs_idntfctns_prmry_img.prev();
                }
        );
        Shiny.addCustomMessageHandler("spcs_idntfctn_prev_button_rf_2",
                function(mesg) {
                    spcs_idntfctns_scndry_img.prev();
                }
        );

        // Hanle reset buttons
        Shiny.addCustomMessageHandler("spcs_idntfctn_reset_button_rf_1",
                function(mesg) {
                   spcs_idntfctns_prmry_img.reset();

                }
        );
        Shiny.addCustomMessageHandler("spcs_idntfctn_reset_button_rf_2",
                function(mesg) {
                     spcs_idntfctns_scndry_img.reset();

                }
        );

        // Hamdle next image buttons
        Shiny.addCustomMessageHandler("spcs_idntfctn_next_button_rf_1",
                function(mesg) {
                   spcs_idntfctns_prmry_img.next();

                }
        );
        Shiny.addCustomMessageHandler("spcs_idntfctn_next_button_rf_2",
                function(mesg) {
                   spcs_idntfctns_scndry_img.next();

                }
        );

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
