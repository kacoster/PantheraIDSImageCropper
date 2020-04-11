class ViewerComponent {

      constructor(moduleId,csvfile)
      {
        this.csvfile = csvfile;
        this.moduleId =moduleId;
        this.imgArray = [];
        this.currentIndex = 0;
        this.result = [];
        this.errorImg = '/srv/shiny-server/www/PantheraIDS_image_not_found_2.jpg';
      }
      // fetchServerData

      fetchServerData(file)
      {
        console.log("In fetchServerData moduleId : " + this.moduleId);
         loadFile(file).then(data => this.readServerData(data));
      }


      processImgSrc(arry){

          let tempArray = [];
          arry.forEach(function(item){
            //console.log("item : " + item);
            let src  = ((item.trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
            //console.log("item src : " + src);
              tempArray.push(src);
          });

          return tempArray;
      }

      displayImage(){

        console.log("first img exist : " + this.imgexist(this.imgArray[0]));
        if(this.imgexist(this.imgArray[0]) == false){
            this.imgArray[0] = this.errorImg;
        }
        if(this.moduleId === "spcs_idntfctn_id_rf_1"){
          setCanvas( this.moduleId,this.imgArray[0]);
          console.log("ModuleID : " + $('.rf_1_container').attr('id'));
        }
        if(this.moduleId === "spcs_idntfctn_id_rf_2"){
          setCanvas( this.moduleId,this.imgArray[0]);
          console.log("ModuleID : " + $('.rf_2_container').attr('id'));
        }

        this.sendDataToShinny();

      }

      restart(){
        this.imgArray.length = 0;
        this.currentIndex = 0;
      }


      readServerData(response) {
        let respArray = [];
        //console.log("In readServerData response : " + response);
        if(response === null )
        {
          alert(" Error in reading your images.Please check if all requirements are provided.");
        }
        else{
          respArray = response.split(',');
          respArray.splice(0, 1);
          respArray[0] = respArray[0].replace("Source", "");
          respArray[0] = respArray[respArray.length - 1] + respArray[0];
          respArray.splice(respArray.length - 1, 1);
          this.imgArray =  this.processImgSrc(respArray);
          this.displayImage();

        }
        //this.imgloop(this.displayImages(this.imgNumb,0));
      }

      // $('div.event img').attr('src', '/anything');
      reset(){
         this.currentIndex = 0;
         this.sendDataToShinny();
         $('#'+this.moduleId+' img' ).attr('src', this.imgArray[this.currentIndex] );

      }

      next() {

        if(this.currentIndex == this.imgArray.length-1){

          // last image

        }
        else{
            //console.log("In Next Array : " + this.imgArray);
           console.log("Before next : " + $('#'+this.moduleId+' img' ).attr('src'));
           if(this.imgexist(this.imgArray[this.currentIndex+1]) == false){
             this.imgArray[this.currentIndex+1] = this.errorImg;
           }
           $('#'+this.moduleId+' img' ).attr('src', this.imgArray[this.currentIndex+1] );
           console.log("After next : " + $('#'+this.moduleId+' img' ).attr('src'));
           this.currentIndex++;
           this.sendDataToShinny();
        }

    }

    prev() {
        if(this.currentIndex == 0){
          // first image
        }else{
             console.log("Before prev : " + $('#'+this.moduleId+' img' ).attr('src'));
             $('#'+this.moduleId+' img' ).attr('src', this.imgArray[this.currentIndex-1] );
             console.log("After prev : " + $('#'+this.moduleId+' img' ).attr('src'));
             this.currentIndex--;
             this.sendDataToShinny();

        }

    }


    imgexist(image_url){

     console.log("In imgexist : " +  image_url);
          let xmlhttp = new XMLHttpRequest();
          xmlhttp.open("GET", image_url, false);
          xmlhttp.send();
          if (xmlhttp.status==200) {
            console.log("In imgexist : " +  image_url + "true");
            return true;
          }
          console.log("In imgexist : " +  image_url + "false");
          return false;
    }

    sendDataToShinny(){
      let src = this.imgArray[this.currentIndex];

      let imgname = src.substring(src.lastIndexOf("/") + 1,
              src.length );

        Shiny.setInputValue(this.moduleId+'_curr_img', imgname);
        console.log("id : " + this.moduleId+'_curr_img');
    }


    resetHandlers(msg)
    {
      if(msg === 'noImages'){
        Shiny.setInputValue('no_srv_imgs', null);
      }
      else{
        Shiny.setInputValue('mssng_srv_imgs', null);
      }
    }



  }

