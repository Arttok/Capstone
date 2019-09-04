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
    tournC.on("click", function()
    {
        modalHeader.innerHTML = "London Spitfire vs Shanghai Dragons";
        videoHolder.innerHTML = '<iframe width="360" height="240" <iframe width="560" height="315" src="https://www.youtube.com/embed/9x13BD0mtmI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "HIGHLIGHTS Shanghai Dragons vs. London Spitfire | Play-Ins | Day 2 | Overwatch League"
    })
    tournD.on("click", function()
    {
        modalHeader.innerHTML = "Team EnVyUs vs OpTic Gaming";
        videoHolder.innerHTML = '<iframe width="360" height="240" <iframe width="560" height="315" src="https://www.youtube.com/embed/-vZsvYxNKw0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "Team EnVyUs vs OpTic Gaming - Grand Finals -2017"
    })
    tournE.on("click", function()
    {
        modalHeader.innerHTML = "OG vs Liquid Game 1";
        videoHolder.innerHTML = '<iframe width="360" height="240" <iframe width="560" height="315" src="https://www.youtube.com/embed/sQh8nnB-0BU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "OG vs Liquid Game 1 | Grand Final The International 2019 | Dota 2 TI9 LIVE | The Championship"
    })
    tournF.on("click", function()
    {
        modalHeader.innerHTML = "TL vs TSM";
        videoHolder.innerHTML = '<iframe width="360" height="240" <iframe width="560" height="315" src="https://www.youtube.com/embed/jaTYLdVc9mU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "TL vs TSM - Game 1 | Finals S9 LCS Spring 2019 | Team Liquid vs TSM G1"
    })
    tournG.on("click", function()
    {
        modalHeader.innerHTML = "Chengdu Hunters vs. Los Angeles Gladiators";
        videoHolder.innerHTML = '<iframe width="360" height="240" <iframe width="560" height="315" src="https://www.youtube.com/embed/upnZ_BkyUx4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "Full Match | Chengdu Hunters vs. Los Angeles Gladiators | Stage 4 Week 2 Day 2"
    })
    tournH.on("click", function()
    {
        modalHeader.innerHTML = "Optic Gaming vs 100 Thieves";
        videoHolder.innerHTML = '<iframe width="360" height="240" <iframe width="560" height="315" src="https://www.youtube.com/embed/FoxSJdWE3I0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "Optic Gaming vs 100 Thieves | CWL Champs 2019 | Day 5"
    })
    tournI.on("click", function()
    {
        modalHeader.innerHTML = "FNC VS IG";
        videoHolder.innerHTML = '<iframe width="360" height="240" <iframe width="560" height="315" src="https://www.youtube.com/embed/kLM4Pah5BOg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "FNC vs. IG | Finals | World Championship | Fnatic vs. Invictus Gaming (2018)"
    })
    tournJ.on("click", function()
    {
        modalHeader.innerHTML = "Method Black vs nLite";
        videoHolder.innerHTML = '<iframe width="360" height="240" <iframe width="560" height="315" src="https://www.youtube.com/embed/-S6kA1s5AbA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "Jungle Against Meta | GRAND FINAL | Method Black vs nLite | 2019 AWC EU Summer Cup #3 | Match 10"
    })
    tournK.on("click", function()
    {
        modalHeader.innerHTML = "Panda Global vs. ABC";
        videoHolder.innerHTML = '<iframe width="360" height="240" <iframe width="560" height="315" src="https://www.youtube.com/embed/BdKWhOsl54w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "Panda Global vs. ABC | WoW Arena World Championship | Finals"
    })
    tournL.on("click", function()
    {
        modalHeader.innerHTML = "Kansas State University vs University of Michigan";
        videoHolder.innerHTML = '<iframe width="360" height="240" <iframe width="560" height="315" src="https://www.youtube.com/embed/lziAnezoOU8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        videotext.innerHTML = "Kansas State University vs University of Michigan – Tespa Collegiate Series: Overwatch Week 2"
    })
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
    modal.style.display = "none";
    }
}