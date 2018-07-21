let _committee_page = false;
let _committees_page = false;

function _committees_requestCompletedFunc(){
  _committees_allCommittees.forEach(function(item,index){
    const committeeInfo = (_committees_getCommitteeData(item,index));
    let name = item.name;
    console.log(name);
    name = name.split(" ");
    console.log(name);
    name.shift();
    name = name.join(" ");
    search_list.push({
      title: name,
      type: "committee",
      link: committeeInfo.link
    });
  });
  if(_home_page){

  }
  if(_committees_page){
    _committees_allCommittees.forEach(function(item,index){
      const committeeInfo = (_committees_getCommitteeData(item,index));
      let committeeInfoJursdiction = "No description available.";
      if(committeeInfo.jurisdiction){
        committeeInfoJursdiction = committeeInfo.jurisdiction;
        committeeInfoJursdiction = committeeInfoJursdiction.split(" ");
        if(committeeInfoJursdiction.length > 40){
          committeeInfoJursdiction = committeeInfoJursdiction.slice(0,40);
          committeeInfoJursdiction = committeeInfoJursdiction.join(" ");
          committeeInfoJursdiction += "...";
        }else{
          committeeInfoJursdiction = committeeInfoJursdiction.join(" ");
        }
      }
      $("div.main_content div.box_item_list").append('<div class="box_list_item"><div class="bottom_section"><div class="row"><h1><a href="' + committeeInfo.link + '">' + committeeInfo.name + '</a></h1><p>' + committeeInfoJursdiction + '</p></div></div></div>');
    });
  }
  if(_committee_page){

  }
};
