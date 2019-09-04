$(function() 
{
    let objs;
    let urlParams = new URLSearchParams(location.search);
    let team = urlParams.get("id");
    let player = urlParams.get("member");
    let playerNum;
    $.urlParam = function(name)
    {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    $.getJSON("/api/teams/" + team, function(teamList) 
    {
        // the returned data is available in an "already parsed"
        // parameter named data
        // take a few minutes to examine the attached .json file
        objs = teamList;
        $("#memberid").val(objs.Members[player].MemberId);
        $("#membername").val(objs.Members[player].MemberName);
        $("#email").val(objs.Members[player].Email);
        $("#contactname").val(objs.Members[player].ContactName);
        $("#age").val(objs.Members[player].Age);
        $("#gender").val(objs.Members[player].Gender);
        $("#phone").val(objs.Members[player].Phone);
        $("#region").val(objs.Members[player].Region);

        playerNum = objs.Members[player].MemberId;

        //updates the team.
        $("#update").click(function() 
        {
          let isok = validateForm(objs);
          if (isok == false)
            {
              return false;
            }
          $.ajax(
            {
                url: "/api/teams/" + team + "/members",
                data: $("#playerInfo").serialize(),
                method: 'PUT',
                success: function() {
                alert("Team has been updated");
                document.location.href = "teamsearch.html";
                }
            });
        })
    });

        //deletes the team.
        $("#delete").click(function() 
        {
            if (confirm('Press OK to confirm deletion!')) 
            {
                $.ajax(
                    {
                        url: "/api/teams/" + team + "/members/" + playerNum,
                        data: $("#playerInfo").serialize(),
                        method: 'DELETE',
                        success: function() {
                        alert("Player has been deleted.");
                        document.location.href = "teamsearch.html";
                        }
                    });
            }
        })

        $("#cancel").click(function() 
        {
            document.location.href = "teamsearch.html";
        })
})

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
function validateForm(objs)
{ 
    let errMsg = [];
    if ($("#membername").val().trim() == "")//validation for member name
    {
        errMsg[errMsg.length] = "Player Name is required";
    }
    if ($("#contactname").val().trim() == "")//validation for contact name
    {
        errMsg[errMsg.length] = "Player Contact Name is required.";
    }
    if ($("#age").val().trim() == "") //validation for age
    {
        errMsg[errMsg.length] = "Age is required";
    }

    if ($("#age").val().trim() < objs.MinMemberAge || $("#age").val().trim() > objs.MaxMemberAge) //validaiton for min and max age.
    {
        errMsg[errMsg.length] = "Age needs to be between: " + objs.MinMemberAge + " and " + objs.MaxMemberAge;
    }

    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.test($("#email").val()) == false) //validation for email
    {
        errMsg[errMsg.length] = "Player Email must be valid";
    }
    if ($("#gender").val().trim() == "") //validation for gender
    {
        errMsg[errMsg.length] = "Gender is required.";
    }
    if ($("#phone").val().trim() == "") //validation for phone
    {
        errMsg[errMsg.length] = "Player Phone Number is required";
    }
    if ($("#region").val().trim() == "") //validation for region
    {
        errMsg[errMsg.length] = "Player Region is required";
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