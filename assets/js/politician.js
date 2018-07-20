function _politicians_getQueryVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){
      return pair[1];
    }
  }
  return(false);
}

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
    item = _politicians_allPoliticians[_politicians_getQueryVariable("p")];
    index = _politicians_getQueryVariable("p");
    let politicianInfo = {
      name: item.name.first + " " + item.name.last,
      gender: possibleGenders[1][possibleGenders[0].indexOf(item.bio.gender)],
      type: possibleTypes[1][possibleTypes[0].indexOf(item.terms[item.terms.length - 1].type)],
      state: possibleStates[0][possibleStates[1].indexOf(item.terms[item.terms.length - 1].state)],
      party: item.terms[item.terms.length - 1].party,
      image: "https://theunitedstates.io/images/congress/original/" + item.id.bioguide +  ".jpg",
      office: item.terms[item.terms.length - 1].office,
      phone: item.terms[item.terms.length - 1].phone,
      website: item.terms[item.terms.length - 1].url
    }
    if(politicianInfo.name == "Donald Trump"){
      politicianInfo.image = "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg";
      politicianInfo.website = "https://www.whitehouse.gov/people/donald-j-trump/";
    }
    if(politicianInfo.name == "Mike Pence"){
      politicianInfo.website = "https://www.whitehouse.gov/people/mike-pence/";
    }
    if(politicianInfo.type == "Congress"){
      politicianInfo.state += " District " + item.terms[item.terms.length - 1].district;
    }
    if(politicianInfo.type == "Senator"){
      politicianInfo.contact = item.terms[item.terms.length - 1].contact_form;
    }
    if(politicianInfo.type == "Congress"){
      if(politicianInfo.gender == "Male"){
        politicianInfo.type = "Congressman";
      }else{
        politicianInfo.type = "Congresswoman"
      }
    }
    (function(){
      var d = new Date(item.bio.birthday);
      var ageDifMs = Date.now() - d.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      politicianInfo.age = Math.abs(ageDate.getUTCFullYear() - 1970);
    })();
    console.log(politicianInfo);

    if(politicianInfo.name == "Mike Pence" || politicianInfo.name == "Donald Trump"){
      delete politicianInfo.office;
      delete politicianInfo.phone;
      delete politicianInfo.state;
    }

    function updatePoliticianBio(key,value){
      $("div.bio_container div.bio_info").append("<p><strong>" + key + ": </strong><span>" + value + "</span></p>");
    }

    $("div.bio_container img").attr("src",politicianInfo.image);
    $("div.bio_container div.bio_info h1").text(politicianInfo.name);
    updatePoliticianBio("Gender",politicianInfo.gender);
    updatePoliticianBio("Age",politicianInfo.age);
    updatePoliticianBio("Title",politicianInfo.type);
    if(politicianInfo.state){
      updatePoliticianBio("State",politicianInfo.state);
    }
    updatePoliticianBio("Party",politicianInfo.party);
    if(politicianInfo.office){
      updatePoliticianBio("Office",politicianInfo.office);
    }
    if(politicianInfo.phone){
      updatePoliticianBio("Phone Number",politicianInfo.phone);
    }
    updatePoliticianBio("Website","<a href='" + politicianInfo.website + "'>" + politicianInfo.name + " Official Website</a>");
    if(politicianInfo.contact){
      updatePoliticianBio("Contact Form","<a href='" + politicianInfo.contact + "'>Contact " + politicianInfo.name + "</a>");
    }
  }
}
