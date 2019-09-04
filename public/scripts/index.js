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
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var imgA = $("#graphA");
    var imgB = $("#graphB");
    var imgC = $("#graphC");
    var modalImg = $("#img01");
    var captionText = $("#caption");
    imgA.click(function()
    {
        modal.style.display = "block";
        modalImg.attr("src", "images/eSportGraphAlrg.jpg");
        captionText.html(this.alt);
    })
    imgB.click(function()
    {
        modal.style.display = "block";
        modalImg.attr("src", "images/eSportGraphBlrg.jpg");
        captionText.html(this.alt);
    })
    imgC.click(function()
    {
        modal.style.display = "block";
        modalImg.attr("src", "images/eSportGraphClrg.jpg");
        captionText.html(this.alt);
    })
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
    modal.style.display = "none";
    }
}