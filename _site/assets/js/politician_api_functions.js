let _home_page = false;
let _politicians_page = false;
let _politician_page = false;

function _politicians_requestsCompletedFunc(){
  _politicians_allPoliticians.forEach(function(item,index){
    const politicianInfo = _politicians_getPoliticianData(item,index);
    if(politicianInfo.state){
      search_list.push({
        title: politicianInfo.name,
        type: "politician",
        party: politicianInfo.party.toLowerCase(),
        state: item.terms[item.terms.length - 1].state,
        link: site_baseurl + "/politician.html?p=" + index
      });
    }else{
      search_list.push({
        title: politicianInfo.name,
        type: "whitehouse_politician",
        party: politicianInfo.party.toLowerCase(),
        link: site_baseurl + "/politician.html?p=" + index
      });
    }
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
    if(getQueryVariable("s") == "type" || getQueryVariable("s") == false){
      $(".main_content").html('<h1 class="executives" onclick="_updateMainContentPageDropdowns(this);">Executives</h1><hr><div class="box_item_list executives"></div><h1 class="senate" onclick="_updateMainContentPageDropdowns(this);">Senators</h1><hr><div class="box_item_list senate"></div><h1 class="house" onclick="_updateMainContentPageDropdowns(this);">Representatives</h1><hr><div class="box_item_list house"></div>');
    }else if(getQueryVariable("s") == "state"){
      $(".main_content").append('<h1 class="executives" onclick="_updateMainContentPageDropdowns(this);">Executives</h1><hr><div class="box_item_list executives"></div>');
      _politicians_possibleStates[0].forEach(function(item,index){
        $(".main_content").append('<h1 class="' + _politicians_possibleStates[1][index] + '" onclick="_updateMainContentPageDropdowns(this);">Legislators from ' + item + '</h1><hr><div class="box_item_list ' + _politicians_possibleStates[1][index] + '"></div>');
      });
    }else if(getQueryVariable("s") == "party"){
      $(".main_content").html('<h1 class="republican" onclick="_updateMainContentPageDropdowns(this);">Republican Executives and Legislators</h1><hr><div class="box_item_list republican"></div><h1 class="democrat" onclick="_updateMainContentPageDropdowns(this);">Democratic Executives and Legislators</h1><hr><div class="box_item_list democrat"></div><h1 class="independent" onclick="_updateMainContentPageDropdowns(this);">Independent Executives and Legislators</h1><hr><div class="box_item_list independent"></div>');
    }
    _politicians_allPoliticians.forEach(function(item,index){
      const politicianInfo = _politicians_getPoliticianData(item,index);
      let stateHTML = "";
      if(politicianInfo.state){
        stateHTML = "<span><strong>State:</strong> " + politicianInfo.state + "</span>";
      }
      const placeholderImageURL = site_baseurl + "/assets/img/placeholder_person.png";
      let appendHTML = '<div class="box_list_item"><a class="top_image" href="' + politicianInfo.link + '" style="background-image: url(\'' + politicianInfo.image + '\'), url(\'' + placeholderImageURL + '\')"></a><div class="bottom_section"><div class="row"><h1><a href="' + politicianInfo.link + '">' + politicianInfo.name + '</a></h1><p><span><strong>Gender:</strong> ' + politicianInfo.gender + '</span><span><strong>Title:</strong> ' + politicianInfo.type + '</span>' + stateHTML + '<span><strong>Party:</strong> ' + politicianInfo.party + '</span></p></div></div></div>';

      if(getQueryVariable("s") == "type" || getQueryVariable("s") == false){
        if(politicianInfo.type == "Senator"){
          $("div.main_content div.box_item_list.senate").append(appendHTML);
        }else if(politicianInfo.type == "Congressman" || politicianInfo.type == "Congresswoman"){
          $("div.main_content div.box_item_list.house").append(appendHTML);
        }else{
          $("div.main_content div.box_item_list.executives").append(appendHTML);
        }
      }else if(getQueryVariable("s") == "state"){
        if(politicianInfo.state){
          console.log(0);
          $("div.main_content div.box_item_list." + item.terms[item.terms.length - 1].state).append(appendHTML);
        }else{
          $("div.main_content div.box_item_list.executives").append(appendHTML);
        }
      }else if(getQueryVariable("s") == "party"){
        if(politicianInfo.party == "Republican"){
          $("div.main_content div.box_item_list.republican").append(appendHTML);
        }else if(politicianInfo.party == "Democrat"){
          $("div.main_content div.box_item_list.democrat").append(appendHTML);
        }else{
          $("div.main_content div.box_item_list.independent").append(appendHTML);
        }
      }
    });
    _updateMainContentPageDropdowns();
  }
  if(_politician_page){
    const politicianInfo = _politicians_getPoliticianData(_politicians_allPoliticians[getQueryVariable("p")],getQueryVariable("p"));
    function updatePoliticianBio(key,value){
      $("div.bio_container div.bio_info").append("<p><strong>" + key + ": </strong><span>" + value + "</span></p>");
    }

    $("div.bio_container img").attr("src",politicianInfo.image);
    $("div.bio_container img").attr("onerror","this.onerror = null;this.setAttribute('class','load_error')");
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
