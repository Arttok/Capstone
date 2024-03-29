$(function() 
{
  $("#errorimg").hide()
  $("#noTeam").hide()
  let objs;
  let tableHead = ["League", "Team Name", "Max Members", "Spots Left", "Region", "Details"];
  let leagueSelect;
  if (sessionStorage.error == "true")
  {
    $("#DnD").prop("disabled", true);
  }
  
  //Populates dropdown with info from the different regions.
  let regionsSelect;
  $.getJSON("/api/regions", function(regions) 
  {
  // the returned regions is available in an "already parsed"
  // parameter named regions
  // take a few minutes to examine the attached .json file
    regionsSelect = regions;
    populateDropDownRegion(regionsSelect);

    //gets the teams info from teams.json
    $("#leagueDropdown").change(function() 
    {
      $.getJSON("/api/teams", function(teams) 
      {
          // the returned teams is available in an "already parsed"
          // parameter named teams
          // take a few minutes to examine the attached .json file
          objs = teams;
          populateTableInfo(objs, tableHead, regionsSelect);
      })
    })

  })

  //getting the leagues info fomr leagues.json.
  $.getJSON("/api/leagues", function(leagues) 
  {
    // the returned leagues is available in an "already parsed"
    // parameter named leagues
    // take a few minutes to examine the attached .json file
    leagueSelect = leagues;
    populateDropDownInfo(leagueSelect);
  })
});

/*This function gets the drop down informaiton on the page.
 *
 *
 *@param ---leagueSelect--- is the classSelector field.
 *@param ---leagueDropdown--- is the dropdown field.
 */
function populateDropDownInfo(leagueSelect) 
{
    for (var i = 0; i < leagueSelect.length; i++) 
    {
      $("#leagueDropdown").append(
        "<option value=" +
        leagueSelect[i].Code +
          ">" +
          leagueSelect[i].Name +
          "</option>"
      );
    }
}

/*This function populates the dropdown info with the different regions.
*
*@param ---regionsSelect--- regions.
*@param ---leagueDropdown---manager name.
*/
function populateDropDownRegion(regionsSelect) 
{
  for (var i = 0; i < regionsSelect.length; i++) 
  {
    $("#leagueDropdown").append(
      "<option value=" +
      regionsSelect[i].Code +
        ">" +
        regionsSelect[i].Name +
        "</option>"
    );
  }
}





/*This function populates the dropdown info with the rest of the leagues..
 *
 *
 *@param ---DnD--- DO NOT PICK THIS OPTION. The DND League has been disbanded, never to return.
 *@param ---teamsList--- list options.
 */
function populateTableInfo(objs, tableHead, regionsSelect) {
    $("#teamsList").empty();
    let thead = $("<thead>");
    $("#teamsList").append(thead);
    let trow = $("<tr>");
    $("#teamsList thead").append(trow);
    for (let i = 0; i < tableHead.length; i++) {
      let col = $("<th>" + tableHead[i] + "</th>");
      $("#teamsList thead tr").append(col);
    }
  
    let tBody = $("<tbody>");
    $("#teamsList").append(tBody);
    // forming table header ends
  
    var catatext = $("#leagueDropdown option:selected").text(); //gets text of drop down.
  
    //if the user selects the choose one option.
    if (catatext == "Choose One") {
      //start off empty and make sure they can go back to empty.
      $("#teamsList").empty();
    }
  
    //if the user selects the all option from the dropdown.
    if (catatext == "All") {
      noTeam();
      //shows all classes
      for (let i = 0; i < objs.length; i++) 
      {
        generateMarkUp(objs, i);
      }
    } else if  (catatext == "Male Only"){
        noTeam();
        for (let i = 0; i < objs.length; i++) 
        {
          if (objs[i].TeamGender == "Male") 
              {
                  generateMarkUp(objs, i);         
              }
        }
    } else if  (catatext == "Female Only"){
      noTeam();
      for (let i = 0; i < objs.length; i++) 
      {
          if (objs[i].TeamGender == "Female") 
              {
                  generateMarkUp(objs, i);         
              }
      }
    } else if  (catatext == "North America"){
      noTeam();
      for (let i = 0; i < objs.length; i++) 
      {
          if (objs[i].Region == "NA") 
              {
                  generateMarkUp(objs, i);          
              }
      }
  } else if  (catatext == "European"){
    noTeam();
    for (let i = 0; i < objs.length; i++) 
    {
        if (objs[i].Region == "EU") 
            {
                generateMarkUp(objs, i);          
            }
    }
  } else if  (catatext == "D&D adventurers league"){
      $("#DnDtxt").show();
      $("#DnDtxt").html("Wrong, sir! Wrong! Under section 37B of the contract signed by him, it states quite clearly that all offers shall become null and void if - and you can read it for yourself in this photostatic copy - 'I, the undersigned, shall forfeit all rights, privileges, and licenses herein and herein contained,' et cetera, et cetera... 'Fax mentis, incendium gloria cultum,' et cetera, et cetera... Memo bis punitor delicatum! It's all there! Black and white, clear as crystal! You tried to reference D&D! You picked the D&D option, which now has to be unselected and disabled, so you get... NOTHING!!! You lose! GOOD DAY, SIR! ");
      $("#teamsList").hide();
      $("#errorimg").show()
      $("#errorimg").attr("src","images/errorpic.jpg");

      var delay = 14000; 
      setTimeout(function()
      { 
        sessionStorage.error = "true";
        window.location = "index.html";
      }, delay);  

    } else { 
    //if the user selects any of the other options from the drop down besides all or choose option.
    noTeam();
      for (let i = 0; i < objs.length; i++) 
      {
        if (objs[i].League == $("#leagueDropdown option:selected").val()) 
        {
            generateMarkUp(objs, i);        
        }
      }
    }
  }

  function noTeam()
  {
    $("#teamsList").hide();
    $("#noTeam").show();
  }
  function generateMarkUp(objs, i)
  {
    $("#noTeam").hide();
    $("#teamsList").show();
    //gets classes based upon dropdown info.
    let markup =
    "<tr><td>" +
    objs[i].League +
    "</td><td>" +
    objs[i].TeamName +
    "</td><td>" +
    objs[i].MaxTeamMembers +
    "</td><td>" +
    (objs[i].MaxTeamMembers - objs[i].Members.length) +
    "</td><td>" +
    objs[i].Region +
    "</td><td>" +
    "<a class='detailbtn text-warning' href=details.html?id=" +
    objs[i].TeamId + ">Details</a>" + 
    "</td></tr>";
    $("#teamsList tbody").append(markup);   
  }