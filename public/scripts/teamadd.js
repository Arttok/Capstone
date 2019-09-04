$(function() 
{
  $("#cancel").click(function() 
    {
        document.location.href = "teamsearch.html";
    })

  $.getJSON("/api/leagues", function(leagues) 
    {
        // the returned leagues is available in an "already parsed"
        // parameter named leagues
        // take a few minutes to examine the attached .json file
        leaguesSelect = leagues;
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
            regionOptions(regionSelect, leaguesSelect);

            $("#leaguecode").change(function()
            {
                regionOptions(regionSelect, leaguesSelect);
            }); 
        })
    })

    //displays the 3 different options that are available for gender.
    $("#teamgender").append(
        "<option value=" + "Male" + ">" + "Male" + "</option>" +
        "<option value=" + "Female" + ">" + "Female" + "</option>" + 
        "<option value=" + "Any" + ">" + "Any" + "</option>"
    )

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      })

    //confirm button to update team.
    $("#confirm").click(function() 
    {
        let isok = validateForm(leaguesSelect);
        if (isok == false)
        {
            return false;
        }
        $.ajax(
        {
            url: "/api/teams",
            data: $("#teamInfo").serialize(),
            method: 'POST',
            success: function() {
                alert("Team has been Added");
                document.location.href = "teamsearch.html";
                }
        });
    })
})


/*This function gets the different region options that are available.
*This function also displays the max team player for the league if changed.
*
*@param ---leaguecode--- is the dropdown.
*@param ---maxteammembers--- setting the max team members based upon the league.
*/
function regionOptions(regionSelect, leaguesSelect)
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
    
    if ($("#minmemberage").val().trim() > ($("#maxmemberage").val().trim()))
    {
      errMsg[errMsg.length] = "Min age can not be larger than Max Age";
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
        $('.modal').find(".close").click();
    }
    return false;
}