$(function () {
  'use strict';

  var console = window.console || { log: function () {} };
  var URL = window.URL || window.webkitURL;
  var $image = $('#image');
  var $download = $('#download');
  var $dataX = $('#dataX');
  var $dataY = $('#dataY');
  var $dataHeight = $('#dataHeight');
  var $dataWidth = $('#dataWidth');
  var $dataRotate = $('#dataRotate');
  var $dataScaleX = $('#dataScaleX');
  var $dataScaleY = $('#dataScaleY');
  var options = {
    aspectRatio: 16 / 9,
    preview: '.img-preview',
    crop: function (e) {
      $dataX.val(Math.round(e.detail.x));
      $dataY.val(Math.round(e.detail.y));
      $dataHeight.val(Math.round(e.detail.height));
      $dataWidth.val(Math.round(e.detail.width));
      $dataRotate.val(e.detail.rotate);
      $dataScaleX.val(e.detail.scaleX);
      $dataScaleY.val(e.detail.scaleY);
    }
  };
  var originalImageURL = $image.attr('src');
  var uploadedImageName = 'cropped.jpg';
  var uploadedImageType = 'image/jpeg';
  var uploadedImageURL;
  var secOrig ="";

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();


  // doc ready place default image 
  $( document ).ready(function() {
    let src = "default.JPG";
    $image.cropper('destroy').attr('src', src).cropper(options);
  });
  // Cropper
  $image.on({
    ready: function (e) {
      console.log(e.type);
    },
    cropstart: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
      console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
      console.log(e.type, e.detail.action);
    },
    crop: function (e) {
      console.log(e.type);
    },
    zoom: function (e) {
      console.log(e.type, e.detail.ratio);
    }
  }).cropper(options);

  // Buttons
  if (!$.isFunction(document.createElement('canvas').getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }

  // Download
  if (typeof $download[0].download === 'undefined') {
    $download.addClass('disabled');
  }

  // $( "#dvPreview").click(function() {
  //   uploadedImageName = event.target.alt;  // the orignal image name is @id 
  //   uploadedImageType = event.target.id;
  //   $image.cropper('destroy').attr('src', event.target.src).cropper(options);
  // });

  $( "#ul-layout").click(function() {
    uploadedImageName = event.target.alt;  // the orignal image name is @id 
    uploadedImageType = event.target.id;
    $image.cropper('destroy').attr('src', event.target.src).cropper(options);
  });
  
  // Options
  $('.docs-toggles').on('change', 'input', function () {
    var $this = $(this);
    var name = $this.attr('name');
    var type = $this.prop('type');
    var cropBoxData;
    var canvasData;

    if (!$image.data('cropper')) {
      return;
    }

    if (type === 'checkbox') {
      options[name] = $this.prop('checked');
      cropBoxData = $image.cropper('getCropBoxData');
      canvasData = $image.cropper('getCanvasData');

      options.ready = function () {
        $image.cropper('setCropBoxData', cropBoxData);
        $image.cropper('setCanvasData', canvasData);
      };
    } else if (type === 'radio') {
      options[name] = $this.val();
    }
    $image.cropper('destroy').cropper(options);
  });

  // Methods
  $('.docs-buttons').on('click', '[data-method]', function () {
    var $this = $(this);
    var data = $this.data();
    var cropper = $image.data('cropper');
    var cropped;
    var $target;
    var result;

    if ($this.prop('disabled') || $this.hasClass('disabled')) {
      return;
    }

    if (cropper && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== 'undefined') {
        $target = $(data.target);

        if (typeof data.option === 'undefined') {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      cropped = cropper.cropped;

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('clear');
          }
          break;

        case 'getCroppedCanvas':
          //alert("getCroppedCanvas : 2");
          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }
            //data.option.fillColor = '#fff';
          }
          break;
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('crop');
          }

          break;

        case 'scaleX':
        case 'scaleY':
          $(this).data('option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
      
            //data.option = {fillColor : '#fff'};
            
            //$('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!$download.hasClass('disabled')) {
              
              download.download = uploadedImageName;
              $download.attr('href', result.toDataURL(uploadedImageType));
              $('<a href='+result.toDataURL(uploadedImageType)+' download='+uploadedImageName+' ></a>')[0].click();
              let id = (uploadedImageName).slice(0, (uploadedImageName).indexOf("."));
              console.log("id is : #" + id);
              
              $('#' + id + '').css({
                'opacity': '0.4',
                'filter': 'alpha(opacity=40)'
              });
              $(".list-unstyled > li ").css("background-color", "yellow");
              
             
               
            }
          }

          break;

        case 'destroy':
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            $image.attr('src', originalImageURL);
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  });

  // Keyboard
  $(document.body).on('keydown', function (e) {
    if (e.target !== this || !$image.data('cropper') || this.scrollTop > 300) {
      return;
    }

    switch (e.which) {
      case 37:
        e.preventDefault();
        $image.cropper('move', -1, 0);
        break;

      case 38:
        e.preventDefault();
        $image.cropper('move', 0, -1);
        break;

      case 39:
        e.preventDefault();
        $image.cropper('move', 1, 0);
        break;

      case 40:
        e.preventDefault();
        $image.cropper('move', 0, 1);
        break;
    }
  });

  function addCropperImage(src,imageName,imageType)
  {
    //console.log("File Type :" + imageType);
    uploadedImageName = imageName;
    uploadedImageType = imageType;
    $image.cropper('destroy').attr('src', src).cropper(options);
  }

  // Import image
 // var $inputImage = $('#inputImage');
  //console.log("In main.js");
  $('#inputImage').change(function () {
    //console.log("inputImage");
    if (typeof (FileReader) != "undefined") {
      //console.log("inputImage if 1");
        //let dvPreview = $("#dvPreview");
        let dvPreview = $("#ul-layout");
        dvPreview.html("");
        let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        let count = 0;
        let files = this.files;
        $(".list-unstyled > li").css("background-color", "white");
        $($(this)[0].files).each(function () {
          //console.log("inputImage loop");
            let file = $(this);
            let imagefile = files[count]; 
            count++;
            if (regex.test(file[0].name.toLowerCase())) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    let img = $("<img />");
                    img.attr("style", "max-height:160px;max-width: 120px;width: auto;height:auto;");
                    let imgsyl = 'max-height:160px;max-width: 120px;width: auto;height:auto;';
                    //let ulstyle = 'background-color: yellow;';
                    let cl = 'border';
                    img.attr("src", e.target.result);
                    //img.attr("filename",file1.name);
                    img.attr("alt",imagefile.name);
                    img.attr("id",imagefile.type);
                    img.attr("class","border");
                    let liID = (imagefile.name).slice(0, (imagefile.name).indexOf("."));
                    //dvPreview.append(img);
                    let myli = '<li id="' + liID + '"><img id="' + imagefile.type + '" style="' + imgsyl + '"  class="' + cl + '" src="' + e.target.result + '"  alt="' + imagefile.name + '" /> </li>';
                    dvPreview.append(myli);
                    //uploadedImageName = file1.name;
                    //uploadedImageType = file1.type;
                    //addCropperImage(e.target.result,imagefile.name,imagefile.type);
                    //$image.cropper('destroy').attr('src', e.target.result).cropper(options);
                }
                reader.readAsDataURL(file[0]);
            } else {
                alert(file[0].name + " is not a valid image file.");
                return false;
            }
        });
        $(".list-unstyled > li").css("background-color", "yellow");
       // addCropperImage(e.target.result,imagefile.name,imagefile.type);
    } else {
        alert("This browser does not support HTML5 FileReader.");
    }

});

    /* if (URL) {
     alert(URL);
     $inputImage.change(function () {
       var files = this.files;
       var file;
     
       if (!$image.data('cropper')) {
         return;
       }
     
       if (files && files.length) {
         alert("if 1");
         file = files[0];
         console.log("files[0] :"  + URL.createObjectURL(file));
     
         if (/^image\/\w+$/.test(file.type)) {
           alert("if 2");
           uploadedImageName = file.name;
           uploadedImageType = file.type;
     
           if (uploadedImageURL) {
             alert("if 3");
             URL.revokeObjectURL(uploadedImageURL);
           }
     
           uploadedImageURL = URL.createObjectURL(file);
           console.log("uploadedImageURL : " + uploadedImageURL);
           console.log("originalImageURL : " + originalImageURL);
           secOrig = "testing.jpg";
           $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
           $inputImage.val('');
         } else {
           window.alert('Please choose an image file.');
         }
       }
     });
     } else {
      $inputImage.prop('disabled', true).parent().addClass('disabled');
    }*/
});