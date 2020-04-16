console.log("In helper.js new ");

/*if($('#image-1').length){
	alert("Div1 exists");
}else{
	alert("Div1 does not exists");
}

  if($('#image-1').length){
  	console.log("Div1 exists");
  }else{
  	console.log("Div1 does not exists");
  }

  var image1 = document.querySelector('#image-1');


  new Cropper(image1, {
    viewMode: 3,
    dragMode: 'move',
    autoCropArea: 3,
    restore: false,
    modal: false,
    guides: false,
    highlight: false,
    cropBoxMovable: false,
    cropBoxResizable: false,
    toggleDragModeOnDblclick: false,
  });*/
$(document).ready(function(){

  jQuery.fn.extend({
    renameAttr: function( name, newName, removeData ) {
      var val;
      return this.each(function() {
        val = jQuery.attr( this, name );
        jQuery.attr( this, newName, val );
        jQuery.removeAttr( this, name );
        // remove original data
        if (removeData !== false){
          jQuery.removeData( this, name.replace('data-','') );
        }
      });
    }
  });

  $('#sv-btn').renameAttr('datamethod', 'data-method', false);
  $('#sv-btn').renameAttr('dataoption', 'data-option', false);

  $('#sv-span').renameAttr('datatoggle', 'data-toggle', false);
  $('#sv-span').renameAttr('dataanimation', 'data-animation', false);


  $('#getCroppedCanvasModal').renameAttr('ariahidden', 'aria-hidden', false);
  $('#getCroppedCanvasModal').renameAttr('arialabelledby', 'aria-labelledby', false);

  $('#cls-btn').renameAttr('datadismiss', 'data-dismiss', false);
  $('#cls-btn').renameAttr('aria-label', 'data-dismiss', false);

  $('#cls-span').renameAttr('ariahidden', 'aria-hidden', false);

  $('#cls-mdl-btn').renameAttr('datadismiss', 'data-dismiss', false);





  var modal = document.getElementById("getCroppedCanvasModal");

 var span = document.getElementById("cls-span");

$('#btn-grp-2').append(


    '<button type="button" class="btn btn-primary" id="reset-btn" data-method="reset" title="Reset">'+
    '<span class="docs-tooltip"  title="reset cropper"><span class="fa fa-sync-alt"></span></span>'+
    '</button>'+
    '<label class="btn btn-primary" id="aspect4">'+
    '<input type="radio" class="sr-only" id="aspectRatio4" name="aspectRatio" value="NaN">'+
    '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="grab mode">'+
    '<span class="fa fa-crop-alt"></span>'+
    '</span>'+
    '</label>'
);

/*$('#btn-grp-3').append(
    '<label class="btn btn-primary">'+
    '<input type="radio" class="sr-only" id="aspectRatio4" name="aspectRatio" value="NaN">'+
    '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="aspectRatio: NaN">'+
    'Free'+
    '</span>'+
    '</label>'
);*/

$('#btn-grp-4').append(
  '<button type="button" class="btn btn-primary" id="btn-rotate-acw" data-method="rotate" data-option="-5" title="Rotate Left">'+
    '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="rotate anti-clockwise">'+
    '<span class="fa fa-undo-alt"></span>'+
    '</span>'+
    ' </button>'+
    '<button type="button" class="btn btn-primary" id="btn-rotate-cw" data-method="rotate" data-option="5" title="Rotate Right">'+
    '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="rotate clockwise">'+
    '<span class="fa fa-redo-alt"></span>'+
    '</span>'+
    '</button>'

);

$('#btn-drag').attr('data-method','setDragMode');
$('#btn-drag').attr('data-option','move');
//$('#').click();
$( "#aspect4" ).trigger( "click" );

document.getElementById('download').setAttribute('download','cropped.jpg');
});






