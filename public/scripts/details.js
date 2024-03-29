//for the details page.
//Objs is the array of the object info from /api/courses/
$(function() 
{
  let objs;
  let urlParams = new URLSearchParams(location.search);
  let TeamId = urlParams.get("id");
  let leaguesSelect;
  let maxLeagueMembers;

  $.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
  }

  $("#cancel").click(function() 
  {
    document.location.href = "teamsearch.html";
  });

  $("#addplayer").click(function() 
  {
    document.location.href = "addplayer.html?id=" + TeamId;
  })

  $.getJSON("/api/teams/" + TeamId, function(teams) 
  {
    // the returned data is available in an "already parsed"
    // parameter named objs
    // take a few minutes to examine the attached .json file
    objs = teams;
    showPlayers(objs);
    createMngrTable(objs);
    $("#teamgender").val(objs.TeamGender).change();    
    $("#region").val(objs.League).change();

    if (objs.MaxTeamMembers <= objs.Members.length)
    {
      $("#addplayer").hide();
      $("#teamfull").html("Team is Full. Adding players is disallowed.")
    }

    $.getJSON("/api/leagues", function(leagues) 
    {
      // the returned data is available in an "already parsed"
      // parameter named data
      // take a few minutes to examine the attached .json file
      leaguesSelect = leagues
      $("#leaguecode").empty();
      for (var i = 0; i < leaguesSelect.length; i++) 
      {
        $("#leaguecode").append(
          "<option value=" +
            leaguesSelect[i].Code +
            ">" +
            leaguesSelect[i].Name +
            "</option>"
        );
      }

      $.getJSON("/api/regions", function(region) 
      {
        // the returned region is available in an "already parsed"
        // parameter named region
        // take a few minutes to examine the attached .json file
        regionSelect = region
        createLeagueTable(regionSelect, leaguesSelect);
        $("#maxteammembers").val(objs.MaxTeamMembers);
        $("#leaguecode").val(objs.League).change();
        createLeagueTable(regionSelect, leaguesSelect);

        $("#leaguecode").change(function()
        {
          $("#region").val(objs.League).change();
          createLeagueTable(regionSelect, leaguesSelect);
        }); 
      })
    });
  })

  $("#update").click(function() 
  {
    
    let isok = validateForm(leaguesSelect, objs);
      if (isok == false)
      {
        return false;
      }
      $.ajax(
      {
        url: "/api/teams",
        data: $("#teamInfo").serialize(),
        method: 'PUT'
      })
      .done(function (){
        alert("Team has been updated");
        document.location.href = "teamsearch.html";
      });
  })

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

  $("#confirm").click(function() 
  {
    $.ajax(
      {
        url: "/api/teams/" + TeamId,
        data: "teamid=" + TeamId + "&" + $("#teamInfo").serialize(),
        method: 'DELETE',
        success: function() 
        {
          alert("Team has been Deleted");
          document.location.href = "teamsearch.html";
        }
      })
  })
})

/*This function shows the team informaiton in the details table.
*
*@param ---teamid--- Team ID.
*@param ---teamname---Team Name.
*@param ---managername--- Manager Name
*@param ---managerphone---Manager Phone
*@param ---minmemberage--- Min member Age.
*@param ---teamgender---Team Gender.
*@param ---maxmemberage--- Max member Age.
*/
function createMngrTable(objs)
{
  $("#teamid").val(objs.TeamId);
  $("#teamname").val(objs.TeamName);
  $("#managername").val(objs.ManagerName);
  $("#managerphone").val(objs.ManagerPhone);
  $("#manageremail").val(objs.ManagerEmail);
  $("#minmemberage").val(objs.MinMemberAge);
  $("#teamgender").val(objs.TeamGender);
  $("#maxmemberage").val(objs.MaxMemberAge);
  $("#teamgender").append(
    "<option value=" + "Male" + ">" + "Male" + "</option>" +
    "<option value=" + "Female" + ">" + "Female" + "</option>" + 
    "<option value=" + "Any" + ">" + "Any" + "</option>"
  )
}

/*This function populates the leagues.
*
*@param ---leaguecode--- League dropdown option.
*@param ---region---Region option.
*/
function createLeagueTable(regionSelect, leaguesSelect)
{
  $("#region").empty();
  for (let i = 0; i < leaguesSelect.length; i++) 
  {
    if ($("#leaguecode option:selected").val() == leaguesSelect[i].Code)
    {
      $("#maxteammembers").val(leaguesSelect[i].MaxTeamMembers);
      if (leaguesSelect[i].Region == "All")
      {
        $("#region").append(
          "<option value='All'>" + "All" + "</option>"
        )
        for (let i = 0; i < regionSelect.length; i++)
        {
          if (leaguesSelect[i].Region == regionSelect[i].Code)
          { 
            $("#region").append( 
              "<option value=" +
              regionSelect[i].Code +
              ">" +
              regionSelect[i].Name +
              "</option>"
            )
          }
        }
      } else {
        for (let j = 0; j < regionSelect.length; j++)
        {
          if (leaguesSelect[i].Region == regionSelect[j].Code)
          $("#region").append( 
            "<option value=" +
            regionSelect[j].Code +
            ">" +
            regionSelect[j].Name +
            "</option>"
          )
        }
      }
    }
  }
}
    

/*This function shows the student table informaiton..
 *
 *
 *@param ---tbody is the table body.
 *@param ---markup--- is the student table information.
 *@param ---StudentName--- is the student name.
 *@param ---Email--- is the student email.
 */
function showPlayers(objs) 
{
  let tableHead = ["Tag Name", "Email", "Age", "Gender", "Phone", "Region", "Edit"];

    $("#players").empty();
    let thead = $("<thead class= text-light>");
    $("#players").append(thead);
    let trow = $("<tr>");
    $("#players thead").append(trow);
    for (let i = 0; i < tableHead.length; i++) 
    {
      let col = $("<th>" + tableHead[i] + "</th>");
      $("#players thead tr").append(col);
    }

  if (objs.Members.length == 0) 
  {
    $("#players").html("<table> <tr><td class='text-light'>No Players have Registered</td></td> </table>");
  } else {
      let tBody = $("<tbody class= text-light>");
      $("#players").append(tBody);
      let urlParams = new URLSearchParams(location.search);
      let TeamId = urlParams.get("id");

      for (let i = 0; i < objs.Members.length; i++) 
      {
        let markup =
        "<tr><td class=membername" + ">" +
        objs.Members[i].MemberName +
        "</td><td class=email>" +
        objs.Members[i].Email +
        "</td><td class=age>" +
        objs.Members[i].Age +
        "</td><td class=gender>" +
        objs.Members[i].Gender +
        "</td><td class=phone>" +
        objs.Members[i].Phone +
        "</td><td class=region>" +
        objs.Members[i].Region +
        "</td><td class='editplayer'>" +
        "<a class='editplayerbtn btn text-warning' href=player.html?id=" +
          TeamId + "&member=" + [i] + ">Edit</a>" + 
        "</td></tr>";
        $("#players tbody").append(markup);
      };
    }
}

/*This function checks to make sure all the validaiton is correct.
*
*@param ---leaguecode--- league code.
*@param ---managername---manager name.
*@param ---managerphone--- manager phone number.
*@param ---manageremail---manager email.
*@param ---maxteammembers--- max team members.
*@param ---minmemberage---min team members.
*@param ---maxmemberage--- max member age.
*@param ---minmemberage--- min member age.
*/
function validateForm(leaguesSelect, objs)
{ 
    let errMsg = [];
    if ($("#leaguecode").val().trim() == "")//validation for league
    {
        errMsg[errMsg.length] = "League is required";
    }
    if ($("#managername").val().trim() == "")//validation for manager name
    {
        errMsg[errMsg.length] = "Manager Name is required";
    }
    if ($("#managerphone").val().trim() == "") //validation for manager phone
    {
        errMsg[errMsg.length] = "Manager Phone is required";
    }
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.test($("#manageremail").val()) == false) //validation for email.
    {
        errMsg[errMsg.length] = "Manager Email must be valid";
    }
    if ($("#maxteammembers").val().trim() == "") //validation for max team member
    {
        errMsg[errMsg.length] = "Max Team Members needs to have a value.";
    }
    if ($("#minmemberage").val().trim() == "") //validation for min member age
    {
        errMsg[errMsg.length] = "Min Member Age is required";
    }
    if ($("#maxmemberage").val().trim() == "") //validation for max member age
    {
        errMsg[errMsg.length] = "Max Member Age is required";
    }
    
    for (let i = 0; i < leaguesSelect.length; i++) 
    {
      if ($("#leaguecode option:selected").val() == leaguesSelect[i].Code)
      {
        maxLeagueMembers = leaguesSelect[i].MaxTeamMembers;
        if (($("#maxteammembers").val()) > maxLeagueMembers) //validaiton for max team members
        {
          errMsg[errMsg.length] = "Max Team Size is above League Max of " + maxLeagueMembers;
        }
      }
    }

    if (($("#maxteammembers").val()) < objs.Members.length)
    {
      errMsg[errMsg.length] = "Max Team Members of " + $("#maxteammembers").val() + " is less than the current number of players: " + objs.Members.length;
    }


    for (let i=0; i < objs.Members.length; i++)
    {
      if ($("#teamgender").val() != objs.Members[i].Gender )
      {
        errMsg[errMsg.length] = "There is a conflict between player: " + objs.Members[i].MemberName + " gender and the new team gender of: " + $("#teamgender").val();
      }

      if ($("#minmemberage").val().trim() > objs.Members[i].Age || $("#maxmemberage").val().trim() < objs.Members[i].Age)
      {
        errMsg[errMsg.length] = "Invalde Team Age due to player age.";
      }
    }
    if (errMsg.length == 0)
    {
        return true;
    }
    $("#ulMsg").empty();//this is for msgDiv not
    for(let i=0; i < errMsg.length; i++)
    {
        $("<li>" + errMsg[i] + "</li>").appendTo($("#ulMsg"));
    }
    return false;
}