$(function() 
{
    let objs;
    let urlParams = new URLSearchParams(location.search);
    let urlID = urlParams.get("id");
    
    $.urlParam = function(name)
    {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
    }

    $.getJSON("/api/teams/" + urlID, function(classes) 
    {
        // the returned data is available in an "already parsed"
        // parameter named data
        // take a few minutes to examine the attached .json file
        objs = classes;
    }

})
