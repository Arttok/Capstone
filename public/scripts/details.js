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
  console.log(TeamId);
  $.getJSON("/api/teams/" + TeamId, function(teams) 
  {
    // the returned data is available in an "already parsed"
    // parameter named objs
    // take a few minutes to examine the attached .json file
    objs = teams;
    showPlayers(objs);
    createMngrTable(objs);
      //"courses.html?" + "instr=" + $.urlParam('instr') );

    $.getJSON("/api/regions", function(region) 
    {
      regionSelect = region
      createLeagueTable(regionSelect, leaguesSelect);
      $("#maxteammembers").val(objs.MaxTeamMembers);
      $("#leaguecode").val(objs.League).change();

      $("#leaguecode").change(function()
      {
        createLeagueTable(regionSelect, leaguesSelect);
      }); 
    })
  })

  $.getJSON("/api/leagues", function(leagues) 
  {
    // the returned data is available in an "already parsed"
    // parameter named data
    // take a few minutes to examine the attached .json file
    leaguesSelect = leagues
    let x;
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
  });

  $("#update").click(function() 
  {
    console.log("check")
    let isok = validateForm(leaguesSelect);
    console.log("is it ok?")
      if (isok == false)
      {
        return false;
      }
      $.ajax(
      {
        url: "/api/teams",
        data: "teamid=" + TeamId + "&" + $("#teamInfo").serialize(),
        method: 'PUT',
        success: function() {
          alert("Team has been updated");
          document.location.href = "teamsearch.html";
      }
    });
  })

  $("#reset").click(function() 
  {
      $('#courseInfo')[0].reset();
  });

})


function createMngrTable(objs)
{
  $("#teamname").val(objs.TeamName);
  $("#managername").val(objs.ManagerName);
  $("#managerphone").val(objs.ManagerPhone);
  $("#manageremail").val(objs.ManagerEmail);
  $("#minmemberage").val(objs.MinMemberAge);
  $("#teamgender").val(objs.TeamGender);
  $("#maxmemberage").val(objs.MaxMemberAge);
}


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
    $("#players").html("<table class=text-light> <tr><td>No Players have Registered</td></td> </table>");
  } else {
      let tBody = $("<tbody class= text-light>");
      $("#players").append(tBody);
      let urlParams = new URLSearchParams(location.search);
      let TeamId = urlParams.get("id");

      for (let i = 0; i < objs.Members.length; i++) 
      {
        let markup =
        "<tr><td name=membername" + ">" +
        objs.Members[i].MemberName +
        "</td><td name=email>" +
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
      $("#reset").click(function() 
      {
        $('#courseInfo')[0].reset();
      });
    }
}


function validateForm(leaguesSelect)
{ 
    let errMsg = [];
    if ($("#leaguecode").val().trim() == "")//validation for title
    {
        errMsg[errMsg.length] = "League is required";
    }
    if ($("#managername").val().trim() == "")//validation for title
    {
        errMsg[errMsg.length] = "Manager Name is required";
    }
    if ($("#managerphone").val().trim() == "") //validation for location
    {
        errMsg[errMsg.length] = "Manager Phone is required";
    }
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.test($("#manageremail").val()) == false) //validation for start & end date.
    {
        errMsg[errMsg.length] = "Manager Email must be valid";
    }
    if ($("#maxteammembers").val().trim() == "") //validation for Meets
    {
        errMsg[errMsg.length] = "Max Team Members needs to have a value.";
    }
    if ($("#minmemberage").val().trim() == "") //validation for Meets
    {
        errMsg[errMsg.length] = "Min Member Age is required";
    }
    if ($("#maxmemberage").val().trim() == "") //validation for Meets
    {
        errMsg[errMsg.length] = "Max Member Age is required";
    }
    
    for (let i = 0; i < leaguesSelect.length; i++) 
    {
      if ($("#leaguecode option:selected").val() == leaguesSelect[i].Code)
      {
        maxLeagueMembers = leaguesSelect[i].MaxTeamMembers;
        if (($("#maxteammembers").val()) > maxLeagueMembers)
        {
          errMsg[errMsg.length] = "Max Team Size is above League Max of " + maxLeagueMembers;
        }
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