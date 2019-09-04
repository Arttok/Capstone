$(function() 
{
    let objs;
    let urlParams = new URLSearchParams(location.search);
    let team = urlParams.get("id");
    $.urlParam = function(name)
    {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    $.getJSON("/api/regions", function(region) 
    {
        // the returned region is available in an "already parsed"
        // parameter named region
        // take a few minutes to examine the attached .json file
        regionSelect = region
        $.getJSON("/api/leagues", function(leagues) 
        {
        // the returned data is available in an "already parsed"
        // parameter named data
        // take a few minutes to examine the attached .json file
        leaguesSelect = leagues
            $.getJSON("/api/teams/" + team, function(teamList) 
            {
                // the returned data is available in an "already parsed"
                // parameter named data
                // take a few minutes to examine the attached .json file
                objs = teamList;
                showRegionOptions(objs, regionSelect, leaguesSelect);
                showGenderOptions(objs);
                $("#teamname").val(objs.TeamName);

                $("#addplayer").click(function() 
                {
                console.log(objs)
                console.log(team)
                let isok = validateForm(objs);
                if (isok == false)
                    {
                    return false;
                    }
                $.ajax(
                    {
                        url: "/api/teams/" + team + "/members",
                        data: $("#playerInfo").serialize(),
                        method: 'POST',
                        success: function() {
                        alert("Player has been added");
                        document.location.href = "teamsearch.html";
                        }
                    });
                })
            });
        })
    })
    $("#cancel").click(function() 
    {
        document.location.href = "teamsearch.html";
    })
})

/*This function shows the region available to the player based upon the team.
*
*@param ---region--- region selector.
*/
function showRegionOptions(objs, regionSelect, leaguesSelect)
{
    if (objs.Region == "All")
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
          $("#region").append( 
            "<option value=" +
            objs.Region +
            ">" +
            objs.Region +
            "</option>"
          )
        }
}

/*This function gets the different gender options.
*
*@param ---gender--- gender selector.
*/
function showGenderOptions(objs)
{
    if (objs.TeamGender == "Any")
    {
        $("#gender").append(
            "<option value=" + "Male" + ">" + "Male" + "</option>" +
            "<option value=" + "Female" + ">" + "Female" + "</option>" + 
            "<option value=" + "Any" + ">" + "Any" + "</option>"
        )
    } else {
        $("#gender").append(
            "<option value=" + objs.TeamGender + ">" + objs.TeamGender + "</option>")
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

    if ($("#age").val().trim() < objs.MinMemberAge || $("#age").val().trim() > objs.MaxMemberAge) //validaiton for min and maxe age.
    {
        errMsg[errMsg.length] = "Age needs to be between: " + objs.MinMemberAge + " and " + objs.MaxMemberAge;
    }
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.test($("#email").val()) == false) //validation for email.
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