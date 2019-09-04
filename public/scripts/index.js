$(document).ready(function() {
    
        modalShow();
});

/*This function shows the modal.
*
*@param ---leaguecode--- league code.
*@param ---graphA---graph A.
*@param ---graphB--- graph B
*@param ---graphC---graph C
*@param ---img01--- modal image..
*@param ---caption---modal caption.
*/
function modalShow ()
{
    // Get the modal
    $("#maxteammembers")
    var modal = $("#myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var imgA = $("#graphA");
    var imgB = $("#graphB");
    var imgC = $("#graphC");
    var modalImg = $("#img01");
    var captionText = $("#caption");
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