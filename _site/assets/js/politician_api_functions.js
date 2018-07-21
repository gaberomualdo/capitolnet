let _home_page = false;
let _politicians_page = false;
let _politician_page = false;

function _politicians_requestsCompletedFunc(){
  _politicians_allPoliticians.forEach(function(item,index){
    const politicianInfo = _politicians_getPoliticianData(item,index);
    search_list.push({
      title: politicianInfo.name,
      type: politicianInfo.party.toLowerCase(),
      link: site_baseurl + "/politician.html?p=" + index
    });
  });
  if(_home_page){
    _politicians_featuredPoliticians.forEach(function(index,ind){
      let item = _politicians_allPoliticians[index];
      const politicianInfo = _politicians_getPoliticianData(item,index);
      let stateHTML = "";
      if(politicianInfo.state){
        stateHTML = "<span><strong>State:</strong> " + politicianInfo.state + "</span>";
      }
      const placeholderImageURL = site_baseurl + "/assets/img/placeholder_person.png";
      $("section.politicians div.horizontal_scroll_list").append('<div class="box_list_item"><a class="top_image" href="' + politicianInfo.link + '" style="background-image: url(\'' + politicianInfo.image + '\'), url(\'' + placeholderImageURL + '\')"></a><div class="bottom_section"><div class="row"><h1><a href="' + politicianInfo.link + '">' + politicianInfo.name + '</a></h1><p><span><strong>Gender:</strong> ' + politicianInfo.gender + '</span><span><strong>Title:</strong> ' + politicianInfo.type + '</span>' + stateHTML + '<span><strong>Party:</strong> ' + politicianInfo.party + '</span></p></div></div></div>');
    });
  }
  if(_politicians_page){
    _politicians_allPoliticians.forEach(function(item,index){
      const politicianInfo = _politicians_getPoliticianData(item,index);
      let stateHTML = "";
      if(politicianInfo.state){
        stateHTML = "<span><strong>State:</strong> " + politicianInfo.state + "</span>";
      }
      const placeholderImageURL = site_baseurl + "/assets/img/placeholder_person.png";
      $("div.main_content div.box_item_list").append('<div class="box_list_item"><a class="top_image" href="' + politicianInfo.link + '" style="background-image: url(\'' + politicianInfo.image + '\'), url(\'' + placeholderImageURL + '\')"></a><div class="bottom_section"><div class="row"><h1><a href="' + politicianInfo.link + '">' + politicianInfo.name + '</a></h1><p><span><strong>Gender:</strong> ' + politicianInfo.gender + '</span><span><strong>Title:</strong> ' + politicianInfo.type + '</span>' + stateHTML + '<span><strong>Party:</strong> ' + politicianInfo.party + '</span></p></div></div></div>');
    });
  }
  if(_politician_page){
    const politicianInfo = _politicians_getPoliticianData(_politicians_allPoliticians[_politicians_getQueryVariable("p")],_politicians_getQueryVariable("p"));
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
};
