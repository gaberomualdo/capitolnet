$("nav div.links input.search").on("input",_search_searchInputShowResults);
$("nav div.links input.search").on("focus",_search_checkShowSearchResultsBox);
$("nav div.links input.search").on("blur",_search_checkShowSearchResultsBox);
function _search_searchInputShowResults(){
  const search_query = $("nav div.links input.search").val();
  $("nav div.links div.searchResults").html("");
  $.each(search_list, function() {
    if(this.title.toLowerCase().search(search_query.toLowerCase()) > -1){
      $("nav div.links div.searchResults").append('<a class="result" href="' + this.link + '"><h1>' + this.title +'</h1><svg class="list_item_type_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 16h13v1h-13v-1zm13-3h-13v1h13v-1zm0-6h-5v1h5v-1zm0 3h-5v1h5v-1zm-17-8v17.199c0 .771-1 .771-1 0v-15.199h-2v15.98c0 1.115.905 2.02 2.02 2.02h19.958c1.117 0 2.022-.904 2.022-2.02v-17.98h-21zm19 17h-17v-15h17v15zm-9-12h-6v4h6v-4z"/></svg>');
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
