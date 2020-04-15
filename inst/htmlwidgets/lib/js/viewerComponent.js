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
      this.setCanvas( this.moduleId,this.imgArray[0]);
      console.log("ModuleID : " + $('.rf_1_container').attr('id'));
    }
    if(this.moduleId === "spcs_idntfctn_id_rf_2"){
      this.setCanvas( this.moduleId,this.imgArray[0]);
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
  console.log("In  sendDataToShiny ");
  let src = this.imgArray[this.currentIndex];
  let imgname = src.substring(src.lastIndexOf("/") + 1, src.length );

  if(this.moduleId == "spcs_idntfctn_id_rf_1"){
    console.log("matched spcs_idntfctn_id_rf_1");
    Shiny.setInputValue("spcs_idntfctn_id_rf_1_curr_img", imgname);
  }
  else if(this.moduleId == "spcs_idntfctn_id_rf_2"){
    console.log("matched spcs_idntfctn_id_rf_2");
    Shiny.setInputValue("spcs_idntfctn_id_rf_2_curr_img", imgname);
  }else{
    console.log("Conditions not met ");
  }
  //Shiny.setInputValue(this.moduleId+'_curr_img', imgname);
  //console.log("Equal : " + "spcs_idntfctn_id_rf_1_curr_img" == this.moduleId+'_curr_img');
  //Shiny.onInputChange(""+this.moduleId+"_curr_img", imgname);
 
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

setCanvas(targetID,imgSrc) {

  if (typeof $.fn.cropper != "undefined") {
    alert(" Cropper Active");
    $.fn.cropper.noConflict();
  }
  'use strict';

  console.log("In main.js sngl vwr in");

  //$.fn.cropper.noConflict();
  var Cropper = window.Cropper;

  console.log("Exist test : " + $('#'+targetID+' img' ).length );

  if ( $('#'+targetID+' img' ).length ) {
     $('#'+targetID+' img' ).attr('src',imgSrc );
    console.log("img exist : ");
  }else{
     $('#'+targetID).prepend($('<img>',{id:'currnt-img',src:imgSrc,alt:'camtrap'}));
  }

  var container = document.querySelector('#'+targetID);
  console.log(" container : " + container);
  var image = container.getElementsByTagName('img').item(0);
  
  var options = {
    aspectRatio: 16 / 9,
    preview: '.img-preview',
    ready: function (e) {
      //console.log(e.type);
    },
    cropstart: function (e) {
     
    },
    cropmove: function (e) {
    },
    cropend: function (e) {
    },
    crop: function (e) {
      var data = e.detail;

     
    },
    zoom: function (e) {
    }
  };
  var cropper = new Cropper(image, options);
 

  document.body.onkeydown = function (event) {
    var e = event || window.event;

    if (e.target !== this || !cropper || this.scrollTop > 300) {
      return;
    }

    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        cropper.move(-1, 0);
        break;

      case 38:
        e.preventDefault();
        cropper.move(0, -1);
        break;

      case 39:
        e.preventDefault();
        cropper.move(1, 0);
        break;

      case 40:
        e.preventDefault();
        cropper.move(0, 1);
        break;
    }
  };

  
}



}

