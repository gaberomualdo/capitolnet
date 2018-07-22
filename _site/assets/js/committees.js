$(".main_content h1").on("click",function(){
  $("div.box_item_list." + $(this).attr("class")).slideToggle(500,"easeInOutExpo");
  if($(this).attr("style")){
    $(this).removeAttr("style");
  }else{
    $(this).attr("style","background-image: url(assets/img/up_icon.png);");
  }
});
