/*
Icon-Maker for Alexa
by Liz Myers 
lizmyers@amazon.com
November 2016
*/

//var mySet;
var largeIcon = false;
var smallIcon = false;

var smGlyphShadowLength = 100;
localStorage.setItem ('smGlyphShadowLength', smGlyphShadowLength);
var lgGlyphShadowLength = 200;
localStorage.setItem ('lgGlyphShadowLength', lgGlyphShadowLength);

$(document).on('pagecreate', '#cGrid', function() {

	//Isotope, lazy loading, and ajax   
	//http://plnkr.co/edit/4ztirik2820BxKt1Yfl4?p=preview  

	//INIT
	
	var max = 50,
		min = 0,
		icons,
		$container = $('#container');

	 var $htmlBody = $('html, body');
  		

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
	var $htmlBody = $('html, body');
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

            $('#col1').scrollTop();
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
	$('#container').isotope('on', 'layoutComplete', function() {
	    $('#col1').animate({
	      scrollTop: $('#container').offset().top
	    })
	});
	$('#container').isotope({
		filter: catSelector
	});
});

$('#btnAddShadow').on('click', function(){

    var myShadowColor = localStorage.getItem('myShadowColor');
    console.log("myColor: " + myShadowColor);

    var myShadowDir = localStorage.getItem('shadowDirection');
    console.log("shadow direction: " + myShadowDir);

    // var smGlyphShadowLength = localStorage.getItem('smGlyphShadowLength');
    // console.log("sm glyph shadow length: " + smGlyphShadowLength);

    //var lgGlyphShadowLength = localStorage.getItem('lgGlyphShadowLength');
    //console.log("lg glyph shadow length: " + lgGlyphShadowLength);
    

    $('#sm-glyph').longShadow({
        colorShadow: myShadowColor,
        sizeShadow: 100,
        directionShadow: myShadowDir
    });

    $('#lg-glyph').longShadow({
        colorShadow: myShadowColor,
        sizeShadow: 200,
        directionShadow: myShadowDir
    });
    
    $('#lg-background-border').css('border', '14px solid ' + myShadowColor);
    $('#sm-background-border').css('border', '6px solid ' + myShadowColor);
});

//////////////////////////// REMOVE SHADOWS ///////////////////////////

$('#btnRemoveShadow').on('click', function() {
    console.log("remove shadow clicked");
    $('#sm-glyph').css('text-shadow', '');
    $('#lg-glyph').css('text-shadow', '');
});

//////////////////////////// SHADOW DIRECTION MENU /////////////////////////////////////	

$('.dirItem ').on('click', this, function() {

	var dirSelector = $(this).attr('data-direction-value');
	switch(dirSelector) {
		case '.top':
		console.log('Shadow Dir = top')
		localStorage.setItem('shadowDirection', 'top');
		break;
		case '.top-right':
		console.log('Shadow Dir = top right')
		localStorage.setItem('shadowDirection', 'top-right');
		break;
		case '.east':
		console.log('Shadow Dir = right')
		localStorage.setItem('shadowDirection', 'right');
		break;
		case '.bottom-right':
		console.log('Shadow Dir = bottom-right')
		localStorage.setItem('shadowDirection', 'bottom-right');
		break;
		case '.bottom':
		console.log('Shadow Dir = bottom')
		localStorage.setItem('shadowDirection', 'bottom');
		break;
		case '.bottom-left':
		console.log('Shadow Dir = bottom-left')
		localStorage.setItem('shadowDirection', 'bottom-left');
		break;
		case '.left':
		console.log('Shadow Dir = left')
		localStorage.setItem('shadowDirection', 'left');
		break;
		case '.top-left':
		console.log('Shadow Dir = top-left')
		localStorage.setItem('shadowDirection', 'top-left');
		break;
	}

});


///////////////////////// ICON MAKER /////////////////////////////////

//WHICH ICON BUTTONS
$('#lg-container').on('click', function(){
     smallIcon = false;
     largeIcon = true;
    $('#both-icons').css('background', 'transparent');
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

//////////////////////////FLIP  GLYPH/////////////////////////////

$('#flip-h').on('click', function(){
	console.log("flip-h");
    if(smallIcon) {
        $('#sm-glyph-container').toggleClass('flip-h');
    } else if (largeIcon) {
        $('#lg-glyph-container').toggleClass('flip-h');
    } else {
		$('#sm-glyph').toggleClass('flip-h');
		$('#lg-glyph').toggleClass('flip-h');
    }
});

//////////////////////////SWATCHES SCROLL PANEL/////////////////////////////

$('#swatchesPanel').on('scroll', function(){
	console.log("scrolling swatches!");
	if($('#swatchesPanel').scrollTop() > 246) {
		$('#swatches').find('span').html('MLB Colors:');
	} else if ($('#swatchesPanel').scrollTop() > 80) {
		$('#swatches').find('span').html('NFL Colors:');
	} else {
		$('#swatches').find('span').html('Background Swatches:');
	}
});

//////////////////////////LONG SHADOW/////////////////////////////
$('#longShadowBtn').on('click', function() {
		console.log("clicked da btn");

		$('#sm-glyph').longShadow({
		    colorShadow: '#000000',
		    sizeShadow: 0,
		    directionShadow: 'bottom-right'
		});
		$('#lg-glyph').longShadow({
		    colorShadow:'#000000',
		    sizeShadow: 0,
		    directionShadow: 'bottom-right'
		});
		longShadow = true;
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
	 		if ($("#sm-glyph").hasClass("flip-h")) {
				  $("#sm-glyph").animate({left: "+=5px"});
				} else {
			    $('#sm-background #sm-glyph-container').animate({
			      left: "-=5px"
			    });
			}
		  }
		  else if(e.keyCode == 39) { // right
		  	 if ($("#sm-glyph").hasClass("flip-h")) {
				  $("#sm-glyph").animate({left: "-=5px"});
				} else {
			    $('#sm-background #sm-glyph-container').animate({
			      left: "+=5px"
			   });
			}
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


