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
				}
			});
		} //grabIcons

	

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
		if ($(this).val().length > 2 || e.keyCode == 13) {
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

//////////////////////////// SWATCHES MENU /////////////////////////////////////	

$('#bk01').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#FFF');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#FFF');
    } else {
    	$('#sm-background').css('background', '#FFF');
    	$('#lg-background').css('background', '#FFF');
    }
});
$('#bk02').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#232323');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#232323');
    } else {
    	$('#sm-background').css('background', '#232323');
    	$('#lg-background').css('background', '#232323');
    }	
});
$('#bk03').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#4CD964');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#4CD964');
    } else {
    	$('#sm-background').css('background', '#4CD964');
    	$('#lg-background').css('background', '#4CD964');
    }
});
$('#bk04').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#5AC8FA');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#5AC8FA');
    } else {
    	$('#sm-background').css('background', '#5AC8FA');
    	$('#lg-background').css('background', '#5AC8FA');
    }	
});
$('#bk05').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#007AFF');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#007AFF');
    } else {
    	$('#sm-background').css('background', '#007AFF');
    	$('#lg-background').css('background', '#007AFF');
    }
});
$('#bk06').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#8E8E93');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#8E8E93');
    } else {
    	$('#sm-background').css('background', '#8E8E93');
    	$('#lg-background').css('background', '#8E8E93');
    }	
});
$('#bk07').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#34AADC');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#34AADC');
    } else {
    	$('#sm-background').css('background', '#34AADC');
    	$('#lg-background').css('background', '#34AADC');
    }
});
$('#bk08').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#5856D6');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#5856D6');
    } else {
    	$('#sm-background').css('background', '#5856D6');
    	$('#lg-background').css('background', '#5856D6');
    }	
});
$('#bk09').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#FF2D55');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#FF2D55');
    } else {
    	$('#sm-background').css('background', '#FF2D55');
    	$('#lg-background').css('background', '#FF2D55');
    }
});
$('#bk10').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#FF3B30');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#FF3B30');
    } else {
    	$('#sm-background').css('background', '#FF3B30');
    	$('#lg-background').css('background', '#FF3B30');
    }	
});
$('#bk11').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#FF9500');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#FF9500');
    } else {
    	$('#sm-background').css('background', '#FF9500');
    	$('#lg-background').css('background', '#FF9500');
    }
});
$('#bk12').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '#FFCC00');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '#FFCC00');
    } else {
    	$('#sm-background').css('background', '#FFCC00');
    	$('#lg-background').css('background', '#FFCC00');
    }	
});
$('#bk13').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#ee3369, #f15f3e)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#ee3369, #f15f3e)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#ee3369, #f15f3e)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#ee3369, #f15f3e)');
    }
});
$('#bk14').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#f15f3e, #f8951d)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#f15f3e, #f8951d)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#f15f3e, #f8951d)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#f15f3e, #f8951d)');
    }	
});
$('#bk15').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#ffce06, #fedb4d)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#ffce06, #fedb4d)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#ffce06, #fedb4d)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#ffce06, #fedb4d)');
    }
});
$('#bk16').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#4cb748, #9ccd63)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#4cb748, #9ccd63)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#4cb748, #9ccd63)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#4cb748, #9ccd63)');
    }	
});
$('#bk17').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#64c5f0, #76c9b6)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#64c5f0, #76c9b6)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#64c5f0, #76c9b6)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#64c5f0, #76c9b6)');
    }
});
$('#bk18').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#4265b0, #4cc8ee)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#4265b0, #4cc8ee)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#4265b0, #4cc8ee)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#4265b0, #4cc8ee)');
    }	
});
$('#bk19').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#5a5daa, #975aa4)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#5a5daa, #975aa4)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#5a5daa, #975aa4)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#5a5daa, #975aa4)');
    }
});
$('#bk20').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#965aa4, #db57a0)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#965aa4, #db57a0)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#965aa4, #db57a0)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#965aa4, #db57a0)');
    }	
});
$('#bk21').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#2b2b2b, #4b4b4b)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#2b2b2b, #4b4b4b)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#2b2b2b, #4b4b4b)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#2b2b2b, #4b4b4b)');
    }
});
$('#bk22').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#898c90, #dbddde)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#898c90, #dbddde)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#898c90, #dbddde)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#898c90, #dbddde)');
    }	
});
$('#bk23').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#96d8e9, #4272b8)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#96d8e9, #4272b8)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#96d8e9, #4272b8)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#96d8e9, #4272b8)');
    }
});
$('#bk24').on('click', function() {
    if (largeIcon) {
    	$('#lg-background').css('background', '-webkit-linear-gradient(#ee3369, #f15f3e)');
    } else if (smallIcon) {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#ee3369, #f15f3e)');
    } else {
    	$('#sm-background').css('background', '-webkit-linear-gradient(#ee3369, #f15f3e)');
    	$('#lg-background').css('background', '-webkit-linear-gradient(#ee3369, #f15f3e)');
    }	
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

$('#iconSize').keyup(function() { 
	icon_size = $('#iconSize').val()+'px';
	$('#myIconSymbol').css('width', icon_size);
	$('#myIconSymbol >').css('font-size', icon_size);
	//iconSize(bg_size,icon_size);
});



// $('#shadow').keydown(function() { 
// 	shadow_depth = $('#shadow').val()+'px';
// 	$('#lg-glyph-container').css('filter', 'blur(20px) grayscale(20%)');
	
// });

///////////////////////// ICON MAKER /////////////////////////////////

//WHICH ICON BUTTONS
$('#btn-large-icon').on('click', function(){
     smallIcon = false;
     largeIcon = true;
     console.log("smallIcon is set to " + smallIcon + ", largeIcon is set to " + largeIcon);
});
$('#btn-small-icon').on('click', function(){
     largeIcon = false;
     smallIcon = true;
     console.log("smallIcon is set to " + smallIcon + ", largeIcon is set to " + largeIcon);
});
$('#btn-both').on('click', function(){
     smallIcon = false;
     largeIcon = false;
     console.log("smallIcon is set to " + smallIcon + ", largeIcon is set to " + largeIcon);
});


//CHANGE GLYPH SIZE
$('#icon-bigger').on('click', function(){
     if (smIcon) { //resize small icon
     	     var iconSize = parseInt($('#sm-glyph').css('font-size'));
	     var newIconSize = (iconSize + 1);
	     $('#smIcon').css('font-size', newIconSize);
	     var newLineHeight = (newIconSize * 2) + 3;
	     $('#smIcon').css('lineheight', newLineHeight);
     } else if (lgIcon) { //resize lgicon
     	     var iconSize = parseInt($('#sm-glyph').css('font-size'));
	     var newIconSize = (iconSize + 1);
	     $('#smIcon').css('font-size', newIconSize);
	     var newLineHeight = (newIconSize * 2) + 3;
	     $('#smIcon').css('lineheight', newLineHeight);
     } else { //resize both
     	     var smIconSize = parseInt($('#sm-glyph').css('font-size'));
	     var newIconSize = (iconSize + 1);
	     $('#smIcon').css('font-size', newIconSize);
	     var newLineHeight = (newIconSize * 2) + 3;
	     $('#smIcon').css('lineheight', newLineHeight);
     }

});

$('#icon-smaller').on('click', function(){
     var myIcon = $('.myIcon');
     var typeSize = parseInt($('.myIcon').css('font-size'));
     console.log("typeSize: " +typeSize);
     var newTypeSize =(typeSize - 10);
    $('.myIcon').css('font-size', newTypeSize);
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
	} else { //SMALL icon
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

//CHANGE BACKGROUND COLOR
$('#bk01').on('click', function(){
     $('#myIconBackground').css('background', '#FFF');
});
$('#bk02').on('click', function(){
     $('#myIconBackground').css('background', '#232323');
});
$('#bk03').on('click', function(){
     $('#myIconBackground').css('background', '#4CD964');
});
$('#bk04').on('click', function(){
     $('#myIconBackground').css('background', '#5AC8FA');
});
$('#bk05').on('click', function(){
     $('#myIconBackground').css('background', '#007AFF');
});
$('#bk06').on('click', function(){
      $('#myIconBackground').css('background', '#8E8E93');
});
$('#bk07').on('click', function(){
     $('#myIconBackground').css('background', '#34AADC');
});
$('#bk08').on('click', function(){
     $('#myIconBackground').css('background', '#5856D6');
});
$('#bk09').on('click', function(){
     $('#myIconBackground').css('background', '#FF2D55');
});
$('#bk10').on('click', function(){
     $('#myIconBackground').css('background', '#FF3B30');
});
$('#bk11').on('click', function(){
     $('#myIconBackground').css('background', '#FF9500');
});
$('#bk12').on('click', function(){
      $('#myIconBackground').css('background', '#FFCC00');
});
$('#bk13').on('click', function(){
      $('#myIconBackground').css('background', '-webkit-linear-gradient(#ee3369, #f15f3e)');
});
$('#bk14').on('click', function(){
     $('#myIconBackground').css('background', '-webkit-linear-gradient(#f15f3e, #f8951d)');
});
$('#bk15').on('click', function(){
     $('#myIconBackground').css('background', '-webkit-linear-gradient(#ffce06, #fedb4d)');
});
$('#bk16').on('click', function(){
     $('#myIconBackground').css('background', '-webkit-linear-gradient(#4cb748, #9ccd63)');
});
$('#bk17').on('click', function(){
     $('#myIconBackground').css('background', '-webkit-linear-gradient(#64c5f0, #76c9b6)');
});
$('#bk18').on('click', function(){
      $('#myIconBackground').css('background', '-webkit-linear-gradient(#4265b0, #4cc8ee)');
});
$('#bk19').on('click', function(){
     $('#myIconBackground').css('background', '-webkit-linear-gradient(#5a5daa, #975aa4)');
});
$('#bk20').on('click', function(){
     $('#myIconBackground').css('background', '-webkit-linear-gradient(#965aa4, #db57a0)');
});
$('#bk21').on('click', function(){
     $('#myIconBackground').css('background', '-webkit-linear-gradient(#2b2b2b, #4b4b4b)');
});
$('#bk22').on('click', function(){
     $('#myIconBackground').css('background', '-webkit-linear-gradient(#898c90, #dbddde)');
});
$('#bk23').on('click', function(){
     $('#myIconBackground').css('background', '-webkit-linear-gradient(#96d8e9, #4272b8)');
});
$('#bk24').on('click', function(){
      $('#myIconBackground').css('background', '-webkit-linear-gradient(#ee3369, #f15f3e)');
});

//download button
$('#downloadButton').click(function() {

    html2canvas($('#lg-container'), {
	
        	onrendered: function(canvas) {
          
            // canvas is the final rendered <canvas> element
            var myImage = canvas.toDataURL("image/png");
            window.open(myImage);
        },
        width:512
        
    });
});
// $('#downloadButton').click(function() {
// 	var canvas = document.getElementById('canvas');
// 	var context = canvas.getContext('2d');

// 	domvas.toImage(document.getElementById('lg-container'), function() {
// 		console.log("Drawing your icon");
//     	context.drawImage(this, 512, 512);
// 	});

// });

function updateColor(element, color) {
    var hexColor = "transparent";
    if (color) hexColor = color.toHexString();
    $(element).css("color", hexColor);
}

$("#flatClearable").spectrum({
    flat: true,
    showInput: true,
    allowEmpty:true
});

