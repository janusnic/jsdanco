$(document).ready(function(){
	$('img');
	$('.gallery');
	$('#gal-1 img').mouseover(function() {

        $(this).fadeTo('fast', 0.5);

    });
    $('#gal-1 img').mouseout(function() {

        $(this).fadeTo('fast', 1);

    });   
	$('#gal-2 img');
});