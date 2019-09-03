$(function() 
{
    $.getJSON("/api/leagues", function(leagues) 
    {
        // the returned data is available in an "already parsed"
        // parameter named data
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
            regionSelect = region
            regionOptions(regionSelect, leaguesSelect);

            $("#leaguecode").change(function()
            {
                regionOptions(regionSelect, leaguesSelect);
            }); 
        })
    })

    $("#gender").append(
        "<option value=" + "Male" + ">" + "Male" + "</option>" +
        "<option value=" + "Female" + ">" + "Female" + "</option>" + 
        "<option value=" + "Non-Binary" + ">" + "Non-Binary" + "</option>"
    )
})


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