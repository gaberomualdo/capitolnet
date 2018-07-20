let _politicians_legislatorsPoliticians = [];
let _politicians_executivePoliticians = [];
let _politicians_allPoliticians = [];
let _politicians_requestsCompleted = [false, false];

(function(){
  var xmlhttp = new XMLHttpRequest();
  var url = "https://theunitedstates.io/congress-legislators/legislators-current.json";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      _politicians_legislatorsPoliticians = JSON.parse(this.responseText);
      _politicians_requestsCompleted[0] = true;
      _politicians_checkRequestsCompleted();
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
})();

(function(){
  var xmlhttp = new XMLHttpRequest();
  var url = "https://theunitedstates.io/congress-legislators/executive.json";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      _politicians_executivePoliticians.push(response[response.length - 1]);
      _politicians_executivePoliticians.push(response[response.length - 2]);
      _politicians_requestsCompleted[1] = true;
      _politicians_checkRequestsCompleted();
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
})();

function _politicians_checkRequestsCompleted() {
  if(_politicians_requestsCompleted[0] && _politicians_requestsCompleted[1]){
    _politicians_allPoliticians = _politicians_executivePoliticians.concat(_politicians_legislatorsPoliticians);

    const possibleGenders = [["M","F"],["Male","Female"]];
    const possibleTypes = [["sen","rep","prez","viceprez"],["Senator","Congress","President","Vice President"]];
    const possibleStates = [
      ["Arizona", "Alabama", "Alaska", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
      ["AZ", "AL", "AK", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
    ];
    _politicians_allPoliticians.forEach(function(item,index){
      let politicianInfo = {
        name: item.name.first + " " + item.name.last,
        gender: possibleGenders[1][possibleGenders[0].indexOf(item.bio.gender)],
        type: possibleTypes[1][possibleTypes[0].indexOf(item.terms[item.terms.length - 1].type)],
        state: possibleStates[0][possibleStates[1].indexOf(item.terms[item.terms.length - 1].state)],
        party: item.terms[item.terms.length - 1].party,
        image: "https://theunitedstates.io/images/congress/225x275/" + item.id.bioguide +  ".jpg",
        link: site_baseurl + "/politician.html?p=" + index
      }
      if(politicianInfo.type == "Congress"){
        if(politicianInfo.gender == "Male"){
          politicianInfo.type = "Congressman";
        }else{
          politicianInfo.type = "Congresswoman"
        }
      }
      if(politicianInfo.name == "Donald Trump"){
        politicianInfo.image = "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg";
      }

      let stateHTML = "";
      if(politicianInfo.state){
        stateHTML = "<span><strong>State:</strong> " + politicianInfo.state + "</span>";
      }
      $("div.main_content div.politicians_item_list").append('<div class="box_list_item"><a class="top_image" href="' + politicianInfo.link + '" style="background-image: url(\'' + politicianInfo.image + '\')"></a><div class="bottom_section"><div class="row"><h1><a href="' + politicianInfo.link + '">' + politicianInfo.name + '</a></h1><p><span><strong>Gender:</strong> ' + politicianInfo.gender + '</span><span><strong>Title:</strong> ' + politicianInfo.type + '</span>' + stateHTML + '<span><strong>Party:</strong> ' + politicianInfo.party + '</span></p></div></div></div>');
    });
  }
}
