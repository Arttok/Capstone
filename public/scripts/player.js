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
        console.log(objs)
        console.log(objs[team])
        console.log("Hello")
        $("#membername").val(objs.Members[player].MemberName);
        $("#email").val(objs.Members[player].Email);
        $("#contactname").val(objs.Members[player].ContactName);
        $("#age").val(objs.Members[player].Age);
        $("#gender").val(objs.Members[player].Gender);
        $("#phone").val(objs.Members[player].Phone);
        $("#region").val(objs.Members[player].Region);
        });

})
