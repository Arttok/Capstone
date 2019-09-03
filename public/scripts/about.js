$(document).ready(function() {
    
    modalShow();
    console.log("hello")
});

function modalShow ()
{
    $('#modal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      })

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var tournA = $('#tournA');
    var tournB = $('#tournB');
    var tournC = $('#tournC');
    var tournD = $('#tournD');
    var tournE = $('#tournE');
    var tournF = $('#tournF');
    var tournG = $('#tournG');
    var tournH = $('#tournH');
    var tournI = $('#tournI');
    var tournJ = $('#tournJ');
    var tournK = $('#tournK');
    var tournL = $('#tournL');
    
    
    var captionText = document.getElementById("caption");
    tournA.on("click", function()
    {
        modalHeader.innerHTML = "WoW Arena 2018";
        videoHolder.innerHTML = '<iframe width="360" height="240" src="https://www.youtube.com/embed/nJE22low3K0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "2018 WoW Championship Grand Finals! Come watch Method Orange vs The Gosu Crew!"
    })
    tournB.on("click", function()
    {
        modalHeader.innerHTML = "WoW Arena 2017";
        videoHolder.innerHTML = '<iframe width="360" height="240" <iframe width="560" height="315" src="https://www.youtube.com/embed/PazufneUQTA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "2017 WoW Championship Grand Finals! Cloud9 vs Tempo Storm!"
    })
    tournC.onclick = function()
    {
        modal.style.display = "block";
        modalImg.src = "images/eSportGraphClrg.jpg";
    }
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
    modal.style.display = "none";
    }
}