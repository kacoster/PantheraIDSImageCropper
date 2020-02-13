#' @title Image Cropper Function
#' @description This function maps images to a html component to complete the
#'              rendering of images...
#'
#' @param width  Fixed width for widget (in css units). The default is NULL, which
#'               results in intelligent automatic sizing based on the widget’s
#'               container.
#' @param height Fixed height for widget (in css units). The default is NULL, which
#'              results in intelligent automatic sizing based on the widget’s
#'              container.
#' @param elementId  Use an explicit element ID for the widget
#'                   Useful if you have other JavaScript that needs to
#'                   explicitly discover and interact with a specific widget instance.
#'                  in any other case leave as NULL which results in an
#'                  automatically generated one.
#'
#' @keywords cropper.js
#' @examples
#' imageCropper()
#'
#' @export
imageCropper <- function( width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    #message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'imageCropper',
    x,
    width = width,
    height = height,
    package = 'PantheraIDSImageCropper',
    elementId = elementId
  )
}

#' Shiny bindings for imageCropper
#'
#' Output and render functions for using imageCropper within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a imageCropper
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name imageCropper-shiny
#'
#' @export
imageCropperOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'imageCropper', width, height, package = 'PantheraIDSImageCropper')
}

#' @rdname imageCropper-shiny
#' @export
renderImageCropper <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, imageCropperOutput, env, quoted = TRUE)
}
