$(document).ready(function() {
    
        modalShow();
});

function modalShow ()
{
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var imgA = document.getElementById("graphA");
    var imgB = document.getElementById("graphB");
    var imgC = document.getElementById("graphC");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    imgA.onclick = function()
    {
        modal.style.display = "block";
        modalImg.src = "images/eSportGraphAlrg.jpg";
        captionText.innerHTML = this.alt;
    }
    imgB.onclick = function()
    {
        modal.style.display = "block";
        modalImg.src = "images/eSportGraphBlrg.jpg";
        captionText.innerHTML = this.alt;
    }
    imgC.onclick = function()
    {
        modal.style.display = "block";
        modalImg.src = "images/eSportGraphClrg.jpg";
        captionText.innerHTML = this.alt;
    }
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
    modal.style.display = "none";
    }
}