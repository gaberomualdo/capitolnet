$("nav div.links input.search").on("input",_search_searchInputShowResults);
$("nav div.links input.search").on("focus",_search_checkShowSearchResultsBox);
$("nav div.links input.search").on("blur",_search_checkShowSearchResultsBox);
function _search_searchInputShowResults(){
  const search_query = $("nav div.links input.search").val();
  const possibleImages = [["news","republican","democrat","independent"],['<svg class="list_item_type_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 16h13v1h-13v-1zm13-3h-13v1h13v-1zm0-6h-5v1h5v-1zm0 3h-5v1h5v-1zm-17-8v17.199c0 .771-1 .771-1 0v-15.199h-2v15.98c0 1.115.905 2.02 2.02 2.02h19.958c1.117 0 2.022-.904 2.022-2.02v-17.98h-21zm19 17h-17v-15h17v15zm-9-12h-6v4h6v-4z"/></svg>','<img src="assets/img/republican_icon.png" alt="GOP Party Logo">','<img src="assets/img/democrat_icon.png" alt="Democratic Party Logo">','<svg class="list_item_type_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>']]
  $("nav div.links div.searchResults").html("");
  $.each(search_list, function() {
    if(this.title.toLowerCase().startsWith(search_query.toLowerCase())){
      $("nav div.links div.searchResults").prepend('<a class="result" href="' + this.link + '"><h1>' + this.title +'</h1>' + possibleImages[1][possibleImages[0].indexOf(this.type)]);
    }else if(this.title.toLowerCase().search(search_query.toLowerCase()) > -1){
      $("nav div.links div.searchResults").append('<a class="result" href="' + this.link + '"><h1>' + this.title +'</h1>' + possibleImages[1][possibleImages[0].indexOf(this.type)]);
    }
  });
  if($("nav div.links div.searchResults").html() === ""){
    $("nav div.links div.searchResults").html('<h2 class="no_results_notice">No Results Found.</h2>');
  }
  _search_checkShowSearchResultsBox();
}
function _search_checkShowSearchResultsBox(){
  $("nav div.links div.searchResults").css("display","block");
  if($("nav div.links input.search").val() === "" || !$("nav div.links input.search").is(":focus")){
    if($("nav div.links div.searchResults a:hover").length == 0 && $("nav div.links div.searchResults a:active").length == 0){
      $("nav div.links div.searchResults").css("display","none");
    }
  }

  $("nav div.links input.search").addClass("focused");
  if(!$("nav div.links input.search").is(":focus") && $("nav div.links div.searchResults a:hover").length == 0 && $("nav div.links div.searchResults a:active").length == 0) {
    $("nav div.links input.search").removeClass("focused");
  }
}
