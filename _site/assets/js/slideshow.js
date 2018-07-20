$("div.featured_slideshow svg.featured_slideshow_back_button").on("click",function(){
  if(!$(this).hasClass("disabled")){
    _slideshow_slideshowMove(-1);
  }
});
$("div.featured_slideshow svg.featured_slideshow_forward_button").on("click",function(){
  if(!$(this).hasClass("disabled")){
    _slideshow_slideshowMove(1);
  }
})
function _slideshow_slideshowMove(moveNumber){
  $('div.featured_slideshow').animate({scrollLeft: $('div.featured_slideshow').scrollLeft() + ($(window).width()*moveNumber)}, 600,'easeInOutExpo',function(){
    _slideshow_slideshowEvaluateDisabledButtons();
  });
}
function _slideshow_slideshowEvaluateDisabledButtons(){
  if($('div.featured_slideshow').scrollLeft() <= 0){
    $("div.featured_slideshow svg.featured_slideshow_back_button").addClass("disabled");
  }else{
    $("div.featured_slideshow svg.featured_slideshow_back_button").removeClass("disabled");
  }

  if($('div.featured_slideshow')[0].scrollWidth - ($('div.featured_slideshow').scrollLeft() + $(window).width()) == 0){
    $("div.featured_slideshow svg.featured_slideshow_forward_button").addClass("disabled");
  }else{
    $("div.featured_slideshow svg.featured_slideshow_forward_button").removeClass("disabled");
  }
}
