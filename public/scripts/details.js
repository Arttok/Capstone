//for the details page.
//Objs is the array of the object info from /api/courses/
$(function() 
{
  let objs;
  let urlParams = new URLSearchParams(location.search);
  let TeamId = urlParams.get("id");
  
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

    $("#register").html('Save');
      createMngrTable(objs);
      showPlayers(objs);
      $("#register").attr("href", "#");
      //"courses.html?" + "instr=" + $.urlParam('instr') );
  })
})

/*This function shows the student table informaiton..
 *
 *
 *@param ---tbody is the table body.
 *@param ---markup--- is the student table information.
 *@param ---StudentName--- is the student name.
 *@param ---Email--- is the student email.
 */
function showPlayers(objs) {
  if (objs.Members.length == 0) {
    $("#players").html("<table> <tr><td>No Players have Registered</td></td> </table>");
  } else {
    let tBody = $("<tbody>");
    $("#players").append(tBody);
    for (let i = 0; i < objs.Members.length; i++) {
      let markup =
        "<tr><td name=membername" + [i] + ">" +
        objs.Members[i].MemberName +
        "</td><td name=email>" +
        objs.Members[i].Email +
        "</td><td class=age>" +
        objs.Members[i].Age +
        "</td><td class=teamgender" +
        objs.Members[i].Gender +
        "</td><td class=phone" +
        objs.Members[i].Phone +
        "</td><td class=region" +
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