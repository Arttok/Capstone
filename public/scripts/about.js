$(document).ready(function() {
    
    modalShow();
    console.log("hello")
});

function modalShow ()
{
    console.log("hi")
    // Get the modal
    var modal = $('#myModal');

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

    tournA.onclick = function()
    {
        modal.style.display = "block";
        modalImg.src = "images/eSportGraphAlrg.jpg";
    }
    tournB.onclick = function()
    {
        modal.style.display = "block";
        modalImg.src = "images/eSportGraphBlrg.jpg";
    }
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