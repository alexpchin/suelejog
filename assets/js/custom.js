$(function(){
  resizeImages();
  resizePostImages();
});

function resizeImages(){
  var $images = $(".square img");
  if ($images.length === -1) return;
  $.each($images, function(i, image){
    if (image.width > image.height) image.classList.add('landscape');
    else if (image.width < image.height) image.classList.add('portrait');
  });
}

function resizePostImages(){
  var $images = $(".post img");
  if ($images.length === -1) return;
  $.each($images, function(i, image){
    if (image.width > image.height) image.classList.add('landscape');
    else if (image.width < image.height) image.classList.add('portrait');
  });
}
