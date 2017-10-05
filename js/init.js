(function($){
  $(function(){
  	$('.autopesquisa').hide();
  	$('.btn-search-go').click(function(){
  		$('.title-topo, .nav-action, .menu-collapse').hide();
  		$('.autopesquisa').fadeIn( "slow" );
  	});
  	$('.btn-close-go').click(function(){
  		$('.title-topo, .nav-action, .menu-collapse').fadeIn('slow');
  		$('.autopesquisa').hide();
  	});
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown({
	      inDuration: 300,
	      outDuration: 225,
	      constrainWidth: false, // Does not change width of dropdown to that of the activator
	      hover: true, // Activate on hover
	      gutter: 0, // Spacing from edge
	      belowOrigin: false, // Displays dropdown below the button
	      alignment: 'left', // Displays dropdown with edge aligned to the left of button
	      stopPropagation: false // Stops event propagation
	    }
	  );

  }); // end of document ready
})(jQuery); // end of jQuery name space
document.addEventListener("DOMContentLoaded", function(){
  $('.preloader-background').delay(1700).fadeOut('slow');
  
  $('.preloader-wrapper')
    .delay(1700)
    .fadeOut();
});