//for the details page.
//Objs is the array of the object info from /api/courses/
$(function() 
{
  let objs;
  let urlParams = new URLSearchParams(location.search);
  let TeamId = urlParams.get("id");
  let leaguesSelect;

  $.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
  }

  $.getJSON("/api/teams/" + TeamId, function(teams) 
  {
    // the returned data is available in an "already parsed"
    // parameter named objs
    // take a few minutes to examine the attached .json file
    objs = teams;
    showPlayers(objs);
    createMngrTable(objs);
    $("#leaguecode").val(objs.League);
      //"courses.html?" + "instr=" + $.urlParam('instr') );
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
      if ($("#leaguecode option:selected").val() ==leaguesSelect[i].Code)
      { //gets the starting max team members and region based upon league.
        $("#maxteammembers").val(leaguesSelect[i].MaxTeamMembers);            
      }   
    }
  })

  $.getJSON("/api/regions", function(region) 
  {
    regionSelect = region
    createLeagueTable(regionSelect, leaguesSelect);

    $("#leaguecode").change(function()
    {
      createLeagueTable(regionSelect, leaguesSelect);
    }); 
  });
})


function createMngrTable(objs)
{
  $("#teamname").val(objs.TeamName);
  $("#managername").val(objs.ManagerName);
  $("#managerphone").val(objs.ManagerPhone);
  $("#manageremail").val(objs.ManagerEmail);
  $("#minmemberage").val(objs.MinMemberAge);
  $("#maxmemberage").val(objs.MaxMemberAge);
  $("#teamgender").val(objs.TeamGender);
}


function createLeagueTable(regionSelect, leaguesSelect)
{
  $("#region").empty();
  for (let i = 0; i < leaguesSelect.length; i++) 
  {
    if ($("#leaguecode option:selected").val() == leaguesSelect[i].Code)
    {
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
  let tableHead = ["Tag Name", "Email", "Age", "Gender", "Phone", "Region"];

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

  if (objs.Members.length == 0) {
    $("#players").html("<table class=text-light> <tr><td>No Players have Registered</td></td> </table>");
  } else {
    let tBody = $("<tbody class= text-light>");
    $("#players").append(tBody);
    for (let i = 0; i < objs.Members.length; i++) {
      let markup =
        "<tr><td name=membername" + [i] + ">" +
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
        objs.Members[i].Region
        "</td><td class='detailbtn'>" +
        '<input type="button" id=' + [i] + ' class="delete" value="Unregister"/>' +
        "</td></tr>";
      $("#players tbody").append(markup);

      
      //on delete click, delete specific student.
      $("#" + [i]).click(function(){
        result = window.confirm("Click Ok to Remove Student from the class.");
        if (result == true)
        {
          $.ajax({
            url: "/api/teams/:id",
            type: 'post',
            data: 
            {
              "id": objs.Member[i].MemberId,
            },
            success: function() {
              document.location.href = "details.html?id=" + objs.CourseId + "&instr=" + $.urlParam('instr');
            }
          });
        }
      });
    }
  }
}