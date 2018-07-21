$("nav div.links input.search").on("input",_search_searchInputShowResults);
$("nav div.links input.search").on("focus",_search_checkShowSearchResultsBox);
$("nav div.links input.search").on("blur",_search_checkShowSearchResultsBox);
function _search_searchInputShowResults(){
  const search_query = $("nav div.links input.search").val();
  const possibleImages = [["news","committee"],['<svg class="list_item_type_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 16h13v1h-13v-1zm13-3h-13v1h13v-1zm0-6h-5v1h5v-1zm0 3h-5v1h5v-1zm-17-8v17.199c0 .771-1 .771-1 0v-15.199h-2v15.98c0 1.115.905 2.02 2.02 2.02h19.958c1.117 0 2.022-.904 2.022-2.02v-17.98h-21zm19 17h-17v-15h17v15zm-9-12h-6v4h6v-4z"/></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"/></svg>']];
  $("nav div.links div.searchResults").html("");
  $.each(search_list, function() {
    let linkHTML = '<a class="result" href="' + this.link + '"><h1>' + this.title +'</h1>';
    if(this.type == "politician"){
      linkHTML += "<span class='" + this.party + "'>" + this.state + "</span>";
    }else if(this.type == "whitehouse_politician"){
      linkHTML += '<img src="assets/img/whitehouse_icon.png" alt="Whitehouse Icon">';
    }else{
      linkHTML += possibleImages[1][possibleImages[0].indexOf(this.type)];
    }
    if(this.title.toLowerCase().startsWith(search_query.toLowerCase())){
      $("nav div.links div.searchResults").prepend(linkHTML);
    }else if(this.title.toLowerCase().search(search_query.toLowerCase()) > -1){
      $("nav div.links div.searchResults").append(linkHTML);
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
