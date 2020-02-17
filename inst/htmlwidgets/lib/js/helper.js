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
    
    // Get the button that opens the modal
    //var btn = document.getElementById("myBtn");
    
    // Get the <span> element that closes the modal
   var span = document.getElementById("cls-span");
   
  $('#btn-grp-2').append(
    
    '</button>'+
      '<button type="button" class="btn btn-primary" data-method="reset" title="Reset">'+
      '<span class="docs-tooltip"  title="reset cropper"><span class="fa fa-sync-alt"></span></span>'+
      '</button>'+
      '<button type="button" class="btn btn-primary" data-method="setDragMode" data-option="crop" title="Crop">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="grab mode">'+
      '<span class="fa fa-crop-alt"></span>'+
      '</span>'+
      '</button>'
  );
  $('#btn-grp-3').append(
    '<button type="button" class="btn btn-primary" data-method="move" data-option="-5" data-second-option="0" title="Move Left">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="move left">'+
      '<span class="fa fa-arrow-left"></span>'+
      '</span>'+
      '</button>'+
      '<button type="button" class="btn btn-primary" data-method="move" data-option="5" data-second-option="0" title="Move Right">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="move right">'+
      '<span class="fa fa-arrow-right"></span>'+
      '</span>'+
      '</button>'+
      '<button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="-10" title="Move Up">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="move up">'+
      '<span class="fa fa-arrow-up"></span>'+
      '</span>'+
      '</button>'+
      '<button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="10" title="Move Down">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="move down">'+
      '<span class="fa fa-arrow-down"></span>'+
      '</span>'+
      '</button>'
  );
  $('#btn-grp-4').append(
    '<button type="button" class="btn btn-primary" data-method="rotate" data-option="-10" title="Rotate Left">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="rotate anti-clockwise">'+
      '<span class="fa fa-undo-alt"></span>'+
      '</span>'+
      ' </button>'+
      '<button type="button" class="btn btn-primary" data-method="rotate" data-option="10" title="Rotate Right">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="rotate clockwise">'+
      '<span class="fa fa-redo-alt"></span>'+
      '</span>'+
      '</button>'+
      '<button type="button" class="btn btn-primary" data-method="scaleX" data-option="-1" title="Flip Horizontal">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="flip horizontal">'+
      '<span class="fa fa-arrows-alt-h"></span>'+
      '</span>'+
      '</button>'+
      '<button type="button" class="btn btn-primary" data-method="scaleY" data-option="-1" title="Flip Vertical">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="flip vertical">'+
      '<span class="fa fa-arrows-alt-v"></span>'+
      '</span>'+
      '</button>'
  );
  $('#btn-grp-5').append(
    '<label class="btn btn-primary">'+
      '<input type="radio" class="sr-only" id="aspectRatio0" name="aspectRatio" value="1.7777777777777777">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="aspectRatio: 16 / 9">'+
      '16:9'+
      '</span>'+
      '</label>'+
      '<label class="btn btn-primary">'+
      '<input type="radio" class="sr-only" id="aspectRatio1" name="aspectRatio" value="1.3333333333333333">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="aspectRatio: 4 / 3">'+
      '4:3'+
      '</span>'+
      '</label>'+
      '<label class="btn btn-primary">'+
      '<input type="radio" class="sr-only" id="aspectRatio3" name="aspectRatio" value="0.6666666666666666">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="aspectRatio: 2 / 3">'+
      '2:3' +
      '</span>'+
      '</label>'+
      '<label class="btn btn-primary">'+
      '<input type="radio" class="sr-only" id="aspectRatio4" name="aspectRatio" value="NaN">'+
      '<span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="aspectRatio: NaN">'+
      'Free'+
      '</span>'+
      '</label>'
  );
  
  $('#btn-drag').attr('data-method','setDragMode');
  $('#btn-drag').attr('data-option','move');
  //$('#sv-btn').attr('data-method','getCroppedCanvas');
  //$('#sv-btn').attr('data-option','{&quot;maxWidth&quot;: 4096, maxHeight: 4096  &quot;maxHeight&quot;: 4096 }');
 // $('#sv-btn').attr('data-option','{ &quot;maxWidth&quot;: 4096, &quot;maxHeight&quot;: 4096 }');
  
  // data-method = "getCroppedCanvas",
  // data-option = "{ "maxWidth": 4096, "maxHeight": 4096 }",
  
  //$('#sv-span').attr('data-toggle','tooltip');
  //$('#sv-span').attr('data-animation','false');
  //$('#sv-span').attr('title','$().cropper(&quot;getCroppedCanvas&quot;, { maxWidth: 4096, maxHeight: 4096 })');
  
  

  //$('#getCroppedCanvasModal').attr('aria-hidden','true');
  //$('#getCroppedCanvasModal').attr('aria-labelledby','getCroppedCanvasTitle');
  //$('#cls-btn').attr('data-dismiss','modal');
  //$('canvas').attr('id','canvas');
  
  //$("#sv-btn").click(function() {
  //  
  //  //alert("clicked");
  //    
  //    $("#download").trigger( "click" );
  //    $("#download").trigger( "click" );
  //    
  //});
  //
  //$("#download").click(function(){
  //  alert("clicked download");
  //  
  //   //let href = $('#download').attr('href');
  //   //window.location.href = href;
  //
  //})
  

  
  
  
  document.getElementById('download').setAttribute('download','cropped.jpg');
});

