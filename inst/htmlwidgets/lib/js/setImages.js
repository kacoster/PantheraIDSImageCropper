
console.log("new setCanvass");
function setCanvas(targetID,imgSrc){
let imgId = 'currnt-img_' + targetID.substring(14, targetID.length);
if ( $('#'+targetID+' img' ).length ) {
     $('#'+targetID+' img' ).attr('src',imgSrc );
    //console.log("img exist : ");
  }else{
     $('#'+targetID).prepend($('<img>',{id:imgId,src:imgSrc,alt:'camtrap'}));

     $(document).ready( function() {

						$("#"+imgId).imgViewer());
      });

  }
}
