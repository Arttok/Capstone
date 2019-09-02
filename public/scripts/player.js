$(function() 
{
    let objs;
    let urlParams = new URLSearchParams(location.search);
    let team = urlParams.get("id");
    let player = urlParams.get("member");
    
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
    });

    $("#update").click(function() 
        {
          console.log("check")
          let isok = validateForm();
          console.log("is it ok?")
          if (isok == false)
            {
              return false;
            }
            
            console.log(player)
            console.log(typeof Number(player))
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
})


function validateForm()
{ 
    let errMsg = [];
    if ($("#membername").val().trim() == "")//validation for title
    {
        errMsg[errMsg.length] = "Player Name is required";
    }
    if ($("#contactname").val().trim() == "")//validation for title
    {
        errMsg[errMsg.length] = "Player Contact Name is required.";
    }
    if ($("#age").val().trim() == "") //validation for location
    {
        errMsg[errMsg.length] = "Age is required";
    }
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.test($("#email").val()) == false) //validation for start & end date.
    {
        errMsg[errMsg.length] = "Player Email must be valid";
    }
    if ($("#gender").val().trim() == "") //validation for Meets
    {
        errMsg[errMsg.length] = "Gender is required.";
    }
    if ($("#phone").val().trim() == "") //validation for Meets
    {
        errMsg[errMsg.length] = "Player Phone Number is required";
    }
    if ($("#region").val().trim() == "") //validation for Meets
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