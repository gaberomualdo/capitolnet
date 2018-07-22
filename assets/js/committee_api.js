_committees_page = false;

let _committees_allCommittees = [];

(function(){
  var xmlhttp = new XMLHttpRequest();
  var url = "https://theunitedstates.io/congress-legislators/committees-current.json";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      _committees_allCommittees = JSON.parse(this.responseText);
      _committees_requestCompletedFunc();
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
})();

function _committees_getCommitteeData(item,index){
  let committeeInfo = {
    name: item.name,
    chamber: item.type,
    jurisdiction: item.jurisdiction,
    website: item.url,
    link: site_baseurl + "/committee.html?p=" + index,
    subcommittees: item.subcommittees
  }
  if(committeeInfo.name.split(" on ").length > 1){
    committeeInfo.name = committeeInfo.name.split(" on ")[1];
  }
  if(committeeInfo.name.split("the ").length > 1){
    committeeInfo.name = committeeInfo.name.split("the ")[1];
  }
  return committeeInfo;
}
