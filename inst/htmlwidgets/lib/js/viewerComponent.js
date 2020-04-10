class ViewerComponent {

      constructor(moduleId,csvfile)
      {
        this.csvfile = csvfile;
        this.moduleId =moduleId;
        this.imgArray = [];
        this.currentIndex = 0;
        this.result = [];
      }
      // fetchServerData

      fetchServerData(file)
      {
        console.log("In fetchServerData moduleId : " + this.moduleId);
        //console.log("Fetched " + this.loadFile(file) );
        //console.log(" DATA : " + this.loadFile(csvfile));
        this.readServerData(this.loadFile(file));

       //((ar[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
      }

      loadFile(file) {
        console.log("In loadFile : " +  file);
        let result = null;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", file, false);
        xmlhttp.send();
        if (xmlhttp.status==200) {
          result = (xmlhttp.responseText).replace(/^\s*$[\n\r]{1,}/gm, '');
          return result;
        }
        return result;
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
        if(this.moduleId === "spcs_idntfctn_id_rf_1"){
          setCanvas( this.moduleId,this.imgArray[0]);
          console.log("ModuleID : " + $('.rf_1_container').attr('id'));
        }
        else if(this.moduleId === "spcs_idntfctn_id_rf_2"){
          setCanvas( this.moduleId,this.imgArray[0]);
          console.log("ModuleID : " + $('.rf_2_container').attr('id'));
        }else{

        }
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

          //console.log("Array : " + this.trimSRC(this.imgArray));
          //if(this.moduleId === "img_clssfctn_ud")
          //{
          //  Shiny.onInputChange("img_clssfctn_ud_btch_tckr",
          //                      1 + " / " + this.getBatchNumber());
          //}
        }
        //this.imgloop(this.displayImages(this.imgNumb,0));
      }

      // $('div.event img').attr('src', '/anything');
      reset(){
         this.currentIndex = 0;
         $('#'+this.moduleId+' img' ).attr('src', this.imgArray[this.currentIndex] );

      }

      next() {

        if(this.currentIndex == this.imgArray.length-1){

          // last image

        }
        else{
           console.log("Before next : " + $('#'+this.moduleId+' img' ).attr('src'));
           $('#'+this.moduleId+' img' ).attr('src', this.imgArray[this.currentIndex+1] );
           console.log("After next : " + $('#'+this.moduleId+' img' ).attr('src'));
           this.currentIndex++;
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

      }

  }






      trimSRC(selctdImgAry)
      {
        let tempArray = [];
        selctdImgAry.forEach(function(item){
        let newSRC = item.substring(item.lastIndexOf("/") + 1,item.length );
        //newSRC = ((newSRC.trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
          tempArray.push(newSRC);
        });
        return tempArray;
      }


      initializeImgArray(array)
      {
        this.imgArray = [...arr];
      }

      highliter(elementID)
      {
        $('#' + elementID + '').css({
          'opacity': '0.4',
          'filter': 'alpha(opacity=40)'
        });
        $(".pictures > li").css("background-color", "yellow");
      }

      removeHighlight(elementID)
      {
        $('#' + elementID + '').css({
          'opacity': '',
          'filter': ''
        });
      }
      /** Not Yet Generic */
        setCol(){

          //console.log("ul class Name : " + $("ul").attr("class"));
          $('.pictures > li').css({
            'width' : 'calc(100% /' + this.columnSize +')'
          });
        }

      getCurrClckdImg(state, imgsrc)
      {
        Shiny.onInputChange(state,imgsrc);
      }



      /** Not Yet Generic */
      /* handleExistance(params,src,id)
      {
          if(params.includes(src))
          {
            this.tempRemoved =  (params.splice(params.indexOf(src),1))[0];
            this.removeHighlight(id);
            if(params.length > 0)
            {
              this.getCurrClckdImg("clssfctn_slctd_img",this.getTrimedSelectedImages().toString());
            }else{
              this.getCurrClckdImg("clssfctn_slctd_img","");
            }
          }
          else{
            if(this.isPlacveHolder(src))
            {
              console.log("Cant Process Place Holder Image orig");
              selectionFind(true);
            }
            else{
              params.push(src);
              this.highliter(id);
              this.getCurrClckdImg("clssfctn_slctd_img",this.getTrimedSelectedImages().toString());
            }
          }
        }*/

      isPlacveHolder(src)
      {
        return (src.split('/').pop() === 'PantheraIDS_image_not_found_2.jpg');
      }

      removedRef()
      {
        return this.tempRemoved;
      }

      displayImages(imgnumb,bat) {
        this.clearImages();
        let start ,end;
        start = bat * imgnumb;
        end = start + imgnumb;
        this.result = this.imgArray.slice(start, end);
        return this.result;
      }

      getBatchNumber()
      {
        if((this.imgArray.length %  this.imgNumb)===0){
          return (this.imgArray.length / this.imgNumb);
        }
        else{
          return ((Math.floor(this.imgArray.length / this.imgNumb)) + 1);
        }
      }
      // We need a function that maps to diff modules

      // This is specific to tag #
      sendDataToShinny(){
        if (this.selected_images === undefined || this.selected_images.length === 0) {
          alert("No Images Selected !!");
          return ;
        }
        else{
          const copy_selected_images = [...this.selected_images];
          this.deSelectAll();
          return copy_selected_images;
        }
      }

      placeHolder(imgURL)
      {
        let xmlhttp = new XMLHttpRequest();
        let url = imgURL;
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        if (xmlhttp.status==200) {
          return true;
        }
        else{
          return false;
        }
      }

      checkImageExistance(arry) {
        let count = 0;
        for(let i= 0; i< arry.length ; i++)
        {
          let url = ((arry[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
          let xmlhttp = new XMLHttpRequest();
          xmlhttp.open("GET", url, false);
          xmlhttp.send();
          if (xmlhttp.status==200) {
          }
          else{
            count++;
          }
        }
        return count;
      }

      imgloop(ar) {
        this. placeHolder();
        console.log("PantheraIDSImageViewer : " );
        if(this.checkImageExistance(ar) == ar.length)
        {
          if(this.moduleId === "img_clssfctn_ud"){
            console.log('no_srv_imgs');
            Shiny.setInputValue('no_srv_imgs', 'no imgs');
          }

        }
        else if(this.checkImageExistance(ar) > 0 && this.checkImageExistance(ar) < ar.length)
        {
          if(this.moduleId === "img_clssfctn_ud"){
            console.log('mssng_srv_imgs');
            Shiny.setInputValue('mssng_srv_imgs', 'missing imgs');
          }

          let ul = document.getElementById(this.moduleId);
          for (let i = 0; i < ar.length; i++) {
              let liId = i + this.moduleId;
              let img = new Image();
              img.src = ((ar[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
              img.alt = "Camera Trap";
              img.datamarked = 0;
              if(this.placeHolder(img.src)){
                ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '"  marked="' + img.datamarked + '" src="' + img.src + '"onerror="'+ "this.style.display='none'" +'"  alt="' + img.alt + '" /> </li>';
              }
              else{
                img.src = '/srv/shiny-server/www/PantheraIDS_image_not_found_2.jpg';
                ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '"  marked="' + img.datamarked + '" src="' + img.src +'"  alt="' + img.alt + '" /> </li>';

              }
          }
        }
       else{

          let ul = document.getElementById(this.moduleId);
          for (let i = 0; i < ar.length; i++) {
              let liId = i + this.moduleId;
              let img = new Image();
              img.src = ((ar[i].trim()).replace(/['"]+/g, '')).replace(/(\r\n|\n|\r)/gm,"");
          img.alt = "Camera Trap";
          img.datamarked = 0;
          ul.innerHTML += '<li  ><img id="' + liId + '" data-original="' + img.src + '"  marked="' + img.datamarked +
          '" src="' + img.src + '"onerror="'+ "this.style.display='none'" +'"  alt="' + img.alt + '" /> </li>';
          this.setCol();
        }
      }
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

      /**
        * @description - indirect call to the vjs() function
      * @returns image view myFunction
      */
      callvjs(elementId) {
        this.vjs(elementId);
        return;
      }

  }

