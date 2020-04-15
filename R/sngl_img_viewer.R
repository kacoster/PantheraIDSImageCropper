#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
sngl_img_viewer <- function(filename, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    filepath = filename,
    width = width,
    height = height,
    targetId = elementId
  )
  # create widget
  htmlwidgets::createWidget(
    name = 'sngl_img_viewer',
    x,
    width = width,
    height = height,
    package = 'PantheraIDSImageCropper',
    elementId = elementId
  )
}

#' Shiny bindings for sngl_img_viewer
#'
#' Output and render functions for using sngl_img_viewer within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a sngl_img_viewer
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name sngl_img_viewer-shiny
#'
#' @export
sngl_img_viewerOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'sngl_img_viewer', width, height, package = 'PantheraIDSImageCropper')
}

#' @rdname sngl_img_viewer-shiny
#' @export
renderSngl_img_viewer <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, sngl_img_viewerOutput, env, quoted = TRUE)
}
