
console.log("new setCanvas");
function setCanvas(moduleId,imgSrc){
let imgId = 'currnt-img' + moduleId.substring(14, moduleId.length);
if ( $('#'+targetID+' img' ).length ) {
     $('#'+targetID+' img' ).attr('src',imgSrc );
    //console.log("img exist : ");
  }else{
     $('#'+targetID).prepend($('<img>',{id:imgId,src:imgSrc,alt:'camtrap'}));
     $("#"+imgId).imgViewer();
  }
}
