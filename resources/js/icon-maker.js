/*
Icon-Maker for Alexa
by Liz Myers 
lizmyers@amazon.com
November 2016
*/

var mySet;
var largeIcon = false;
var smallIcon = false;

$(document).on('pagecreate', '#cGrid', function() {

	//Isotope, lazy loading, and ajax   
	//http://plnkr.co/edit/4ztirik2820BxKt1Yfl4?p=preview  

	//INIT
	
	var max = 50,
		min = 0,
		icons,
		$container = $('#container');

	var allSets = JSON.parse(localStorage.getItem("allSets"));

	if (allSets == null || allSets == 'undefined' || allSets == '') {
		$('#cGrid').hide();
		grabIcons();
	} else {
		Utils.displayIcons(allSets);
	}

	function finishedLoadingData() {

		console.log("init isotope");
		$('#container').isotope({
			itemSelector: '.item',
			layoutMode: 'fitRows',
			filter: '.nature.travel',
			getSortData: {
				number: '.number',
				title: '[data-title]',
				name: '.name',
				author: '.set',
				selected: '.mypicks',
				category: '[data-category]'
			}
		});
		//reload document
		location.reload();
	};

	function grabIcons() {
			$.ajax({
				type: 'GET',
				url: 'resources/data/allSets.json',
				success: function(data) {
					var allSets = data;
					var stringifiedData = JSON.stringify(data);
					localStorage.setItem("allSets", stringifiedData);
					Utils.displayIcons(allSets);
				},
				error: function() {
					alert('Loading Failed...');
				},
				complete: function() {
				finishedLoadingData();
                                                $('#container').css('background', 'red');
				}
			});
		} //grabIcons

	//set both glyphes to selected
            $('#both-icons').css('background', '#ff9900');

}); //end pagecreate

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

$(document).on('pagebeforeshow', '#cGrid', function() {

	/////////////////////////////// INIT VARS //////////////////////////////////////

	// $('#clearSearch').css('visibility', 'hidden');
	var $container = $('#container');
	var $item = $('#container .item');

	/////////////////////////////// OPEN LIBRARY ////////////////////////////////////////////  
	
	function openMySet() {
		console.log("called openMySet");
		var mySet = localStorage.getItem('mySet');
		console.log("mySet= " +mySet);

		if(mySet == ' ' || mySet == null || mySet == 'faSet') {
			$('#faSet').trigger('click');
			mySet == 'faSet';
			localStorage.setItem('mySet', mySet);
		} else if (mySet == 'mdSet') {
			$('#mdSet').trigger('click');
		} else if (mySet == 'glyphSet') {
			$('#glyphSet').trigger('click');
		} else if (mySet == 'ionicSet') {	
			$('#ionicSet').trigger('click');
		}
	}

	setTimeout(function(){
		console.log("opening my set");
		 openMySet();
		}, 3000);
    
	/////////////////////////////// CHANGE GLYPH ////////////////////////////////////////////  

	$item.on('click', function(evt) {
		evt.preventDefault();
		var $this = $(this);
		var newIcon = $this.closest('.item').find('i').attr('class');
		console.log("newIcon " + newIcon);
		$('#sm-background').find('i').removeClass();
		$('#sm-background').find('i').addClass(newIcon);
		$('#lg-background').find('i').removeClass();
		$('#lg-background').find('i').addClass(newIcon);
		
	}); //end item onClick

}); //end pagebeforeshow

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

$(document).on('pageshow', '#cGrid', function() {


	/////////////////////////////// SEARCH ////////////////////////////////////////////
	
	$('#search').on('keyup', function() {
		$('#clearSearch').css({
			'visibility': 'visible'
		});
		return false;
	});

	$('input').on("keyup", function(e) {
		if ($(this).val().length > 2 || e.keyCode == 13 || e.keyCode == 8) {
			event.preventDefault();
			$('#view-my-picks').css('background', 'none').css('color', '#ccc');
			$('#view-my-picks i').css('color', '#ccc');
			$('#view-all').css('background', 'none');
			$('#view-all').css('color', '#ccc');
			$('#totals *').removeClass('selected');
			$('#setGroup li *').removeClass('selected');
			$('#filterGroup li *').removeClass('selected');
			$('#btnClearLibraries').css('color', '#555');
			$('#btnClearCategories').css('color', '#555');
			$('#clearSearch').show();
			var kwd = $('input').val();
			var mySet="ionicSet";

			//IF SEARCH IS EMPTY 
			if (kwd == ' ' || !kwd || kwd == 'undefined') {
				$('#clearSearch').hide();
				$('#container').isotope({
					filter: '*'
				});
				$('#showAll *').css('color', '#fff');
			} else {
				$('#container').isotope({
					filter: ':contains(' + kwd + ')' 
				});
				$('#setGroup').find('a').removeClass('selected').find('i').removeClass('selected');
				$('#filterType').text('All Categories');
			}
                                    window.scrollTo(0, 0);
		}
		return false;
	});

	$('#clearSearch').on('click', function() {
		$('#container').isotope({
			 filter: '*'
		});
		$('#search').val('');
		$('#dropDownFilter').find('#catAll').trigger('click');
		$(this).hide();
	});


}); //end bbGrid pageshow

////////////////////////////////////////////////////////////////////////////////////
//////////////////             GLOBAL                  //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


//////////////////////////// CATEGORIES MENU /////////////////////////////////////	


$('.menuItem ').on('click', this, function() {
	$('#search').val('');
	$('#clearSearch').css('visibility', 'hidden');

	var catSelector = $(this).attr('data-category-value');
	switch(catSelector) {
		case '*':
		$('#filterType').text('All Categories')
		break;
		case '.business':
		$('#filterType').text('Business')
		break;
		case '.entertainment':
		$('#filterType').text('Entertainment')
		break;
		case '.food':
		$('#filterType').text('Food & Drink')
		break;
		case '.nature':
		$('#filterType').text('Nature')
		break;
		case '.objects':
		$('#filterType').text('Objects')
		break;
		case '.office':
		$('#filterType').text('Office')
		break;
		case '.people':
		$('#filterType').text('People')
		break;
		case '.social':
		$('#filterType').text('Social')
		break;
		case '.sports':
		$('#filterType').text('Sports')
		break;
		case '.technology':
		$('#filterType').text('Technology')
		break;
		case '.travel':
		$('#filterType').text('Travel')
		break;
		case '.UI':
		$('#filterType').text('UI Elements')
		break;
	}
	
	$('#container').isotope({
		filter: catSelector
	});

});


var orginalWidth = $("#image").width();

$("#infoSlider").text(orginalWidth + ', 100%');

$("#slider").slider({
    value: 0,
    min: -50,
    max: 50,
    step: 10,
    slide: function (event, ui) {
        var fraction = (1 + ui.value / 100),
            newWidth = orginalWidth * fraction;
  
        $("#infoSlider").text(newWidth + ', ' + Math.floor(fraction * 100) + '%');

        $("#image").width(newWidth);
    }
});

///////////////////////// ICON MAKER /////////////////////////////////

//WHICH ICON BUTTONS
$('#lg-container').on('click', function(){
     smallIcon = false;
     largeIcon = true;
    $('#both-icons').css('background', 'none');
    $('#512-icon').css('background', '#ff9900');
    $('#108-icon').css('background', 'none');
});
$('#sm-container').on('click', function(){
     largeIcon = false;
     smallIcon = true;
     $('#both-icons').css('background', 'none');
     $('#512-icon').css('background', 'none');
     $('#108-icon').css('background', '#ff9900');
});
$('#both-icons').on('click', function(){
     largeIcon = false;
     smallIcon = false;
     $('#both-icons').css('background', '#ff9900');
     $('#512-icon').css('background', 'none');
     $('#108-icon').css('background', 'none');
});
$('#512-icon').on('click', function(){
     largeIcon = true;
     smallIcon = false;
     $('#both-icons').css('background', 'none');
     $('#512-icon').css('background', '#ff9900');
     $('#108-icon').css('background', 'none');
});
$('#108-icon').on('click', function(){
     largeIcon = false;
     smallIcon = true;
     $('#both-icons').css('background', 'none');
     $('#512-icon').css('background', 'none');
     $('#108-icon').css('background', '#ff9900');
});


//CHANGE GLYPH SIZE

$('#larger').on('click', function(){
    if(smallIcon) {
        var smSize = parseInt($('#sm-glyph').css('font-size'));
        var newSmSize = (smSize + 3);
        $('#sm-glyph').css('font-size', newSmSize);
    } else if (largeIcon) {
        var lgSize = parseInt($('#lg-glyph').css('font-size'));
        var newLgSize = (lgSize + 9);
        $('#lg-glyph').css('font-size', newLgSize);
    } else {
        var smSize = parseInt($('#sm-glyph').css('font-size'));
        var lgSize = parseInt($('#lg-glyph').css('font-size'));
        var newSmSize = (smSize + 3);
        var newLgSize = (lgSize + 9);
        $('#sm-glyph').css('font-size', newSmSize) 
        $('#lg-glyph').css('font-size', newLgSize);
    }
});

$('#smaller').on('click', function(){
    if(smallIcon) {
        var smSize = parseInt($('#sm-glyph').css('font-size'));
        var newSmSize = (smSize - 3);
        $('#sm-glyph').css('font-size', newSmSize);
    } else if (largeIcon) {
        var lgSize = parseInt($('#lg-glyph').css('font-size'));
        var newLgSize = (lgSize - 9);
        $('#lg-glyph').css('font-size', newLgSize);
    } else {
        var smSize = parseInt($('#sm-glyph').css('font-size'));
        var lgSize = parseInt($('#lg-glyph').css('font-size'));
        var newSmSize = (smSize - 3);
        var newLgSize = (lgSize - 9);
        $('#sm-glyph').css('font-size', newSmSize);
        $('#lg-glyph').css('font-size', newLgSize);
    }
});

//////////////////////////MOVE  GLYPH/////////////////////////////

$('body').on('keydown', function(e) {
	if (largeIcon) { //LARGE icon
		 if(e.keyCode == 37) { // left
		    $('#lg-background #lg-glyph-container').animate({
		      left: "-=5px"
		    });
		  }
		  else if(e.keyCode == 39) { // right
		    $('#lg-background #lg-glyph-container').animate({
		      left: "+=5px"
		    });
		  }
		   else if(e.keyCode == 38) { // up
		    e.preventDefault();
		    $('#lg-background #lg-glyph-container').animate({
		      top: "-=5px"
		    });
		  }
		 else if(e.keyCode == 40) { // down
		    e.preventDefault();
		    $('#lg-background #lg-glyph-container').animate({
		      top: "+=5px"
		    });
		  }
		else if(e.keyCode == 13) { // resize large glyph
		    e.preventDefault();
		  	var font_size = $('#icon_size_input').val()+'vw';
			var line_height = ($('#icon_size_input').val() * 2) + 'vh';
			$('#lg-glyph').css('font-size', font_size);
			$('#lg-glyph').css('line-height', line_height);
		  }
	} else if (smallIcon) { //SMALL icon
 		if(e.keyCode == 37) { // left
		    $('#sm-background #sm-glyph-container').animate({
		      left: "-=5px"
		    });
		  }
		  else if(e.keyCode == 39) { // right
		    $('#sm-background #sm-glyph-container').animate({
		      left: "+=5px"
		    });
		  }
		   else if(e.keyCode == 38) { // up
		    e.preventDefault();
		    $('#sm-background #sm-glyph-container').animate({
		      top: "-=5px"
		    });
		  }
		 else if(e.keyCode == 40) { // down
		    e.preventDefault();
		    $('#sm-background #sm-glyph-container').animate({
		      top: "+=5px"
		    });
		  }
		  else if(e.keyCode == 13) { // resize small glyph
		    e.preventDefault();
		  	var font_size = $('#icon_size_input').val()+'vw';
			var line_height = ($('#icon_size_input').val() * 2) + 'vh';
			$('#sm-glyph').css('font-size', font_size);
			$('#sm-glyph').css('line-height', line_height);
		  }
	}
});


