$(function(){
  resizeImages();
  resizePostImages();
});

function resizeImages(){
  var $images = $(".thumbnail img");
  if ($images.length === -1) return;
  $.each($images, function(i, image){
    if (image.width < image.height) image.classList.add('portrait');
  });
}

function resizePostImages(){
  var $images = $(".post img");
  if ($images.length === -1) return;
  $.each($images, function(i, image){
    $(image).wrap("<div class='image-container'></div>");
    if (image.width > image.height) image.classList.add('landscape');
    if (image.width < image.height) image.classList.add('portrait');
  });
}
