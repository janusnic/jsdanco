$(document).ready(function(){
	$('img');
	$('.gallery');
	$('#gal-1 img').mouseover(function() {

        $(this).fadeOut('slow');

    });
    $('#gal-1 img').mouseout(function() {

        $(this).fadeIn('slow');

    });   
	$('#gal-2 img');
});