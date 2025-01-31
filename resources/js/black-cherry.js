// Maraschino.js 
// by Liz Myers
// May 27, 2015
var mySet;

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

	$('#simple-menu').sidr({
		//side: 'right',
		speed: 200
	});

	var sliderIsOpen = localStorage.getItem("mSlider");
	if ((sliderIsOpen == 'undefined') || (sliderIsOpen == '') || (sliderIsOpen == "closed")) {
		sliderIsOpen == "closed";
	} else {
		sliderIsOpen == "open";
		$('#simple-menu').trigger('click');
		localStorage.setItem("mSlider", "open");
	}

	$(window).resize(function() {
		console.log("resized window");
		$('#container').isotope('layout');
	});

	//set colour of default menus to show defaults
	$('#allIcons').find('a').addClass('selected').find('i').addClass('selected');
	$('#allIcons').find('#iconsTotal').addClass('selected');

	var theme = localStorage.getItem('theme');
	if (theme == "steel-blue") {
		$('.menu #steel-blue').find('a').addClass('selected').find('i').addClass('selected');
	} else if (theme == "light-theme") {
		$('.menu #light-theme').find('a').addClass('selected').find('i').addClass('selected');
	} else {
		$('.menu #dark-theme').find('a').addClass('selected').find('i').addClass('selected');
	}

	$('#view-all').css('background', '#f46666').css('color', 'white');
	$('#view-all i').css('color', 'white');

}); //end pagecreate

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

$(document).on('pagebeforeshow', '#cGrid', function() {

	/////////////////////////////// INIT VARS //////////////////////////////////////

	var myCount = JSON.parse(localStorage.getItem('myCount'));
	console.log("MyCount: " + myCount);

	if (myCount !== 'undefined' && myCount !==' ' && myCount !== null) {
		$('#picksTotal').text(myCount);
	} else {
		myCount = 0;
		$('#picksTotal').find('.countTxt').text(myCount);
	}
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
    
	/////////////////////////////// CLICK TILES ////////////////////////////////////////////  

	$item.on('click', function(evt) {
		evt.preventDefault();
		var $this = $(this);
		var newIcon = $this.closest('.item').find('i').attr('class');
		console.log("newIcon " + newIcon);
		$('.myIcon').find('i').removeClass();
		$('.myIcon').find('i').addClass(newIcon);
		// var myCount = localStorage.getItem('myCount');
		// console.log("New Count: " + myCount);
		// var $myPicksArray = localStorage.getItem('myPicksArray');
		// console.log($myPicksArray);

		// if (($myPicksArray) && ($myPicksArray !=='undefined') && ($myPicksArray !==' ')&& ($myPicksArray !==null)) {
		// 	$myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
		// } else {
		// 	var $myPicksArray = [];
		// 	myCount = 0;
		// 	$('#myPicks').find('.countTxt').text = '0';
		// }

		// $this.toggleClass('mypicks');

		// //remove items that were deselected
		// var myPicksFilterStatus = $('#myPicks').find('a').attr('class');
		// var myPicks = $this.find('b').attr('class');

		// console.log("myPicksFilterStatus "+myPicksFilterStatus);

		// //after de-selecting or unfaving item, run filter again to eliminate that  item from view

		// if (myPicksFilterStatus == "ui-link selected") {
		// 	$('#container').isotope({
		// 		filter: '.mypicks'
		// 	});
		// }

		// //change star color = red/light-theme else yellow
		// var $icon = $this.find($('b'));
		// var isSelected = $('.menu #steel-blue ').find('a').attr('class');

		// if (isSelected == "ui-link selected") {
		// 	$icon.toggleClass('faveShow');
		// 	$icon.css('color', '#fc0');
		// } else {
		// 	$icon.toggleClass('faveShow');
		// 	$icon.css('color', '#f46666');
		// }
		// var $number = $this.find('.number').text();
		// var $name = $this.find('.name').text();
		// var $star = $this.find('b').attr('class');

		// //unfave = remove from array
		// if ($star !== "md-star faveShow") {

		// 	var $myDiscard = $myPicksArray.indexOf($number);

		// 	$myPicksArray.splice($myDiscard, 1);

		// 	localStorage.setItem('myPicksArray', JSON.stringify($myPicksArray));
		// 	myCount--;
		// 	if (myCount <= 0) {
		// 		localStorage.removeItem("myPicksArray");
		// 	}
		// } else {
		// 	$myPicksArray.push($number);
		// 	localStorage.setItem('myPicksArray', JSON.stringify($myPicksArray));
		// 	myCount++;

		// }
		// //update myPicks count for this set
		// $('#myCount').text(myCount);
		// localStorage.setItem("myCount", myCount);

		// myCount = JSON.parse(localStorage.getItem('myCount'));
		// var picksTotal = JSON.stringify(myCount);
		// $('#myPicks').find('.countTxt').text(picksTotal);
		

	}); //end item onClick

}); //end pagebeforeshow

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

$(document).on('pageshow', '#cGrid', function() {

	$('#simple-menu').trigger('click');
	sliderIsOpen = 1;
	localStorage.setItem("sliderIsOpen", true);

	/////////////////////////////// SEARCH ////////////////////////////////////////////
	
	$('#search').on('keyup', function() {
		$('#btnClear').css({
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
			}
		}
		return false;
	});

$('#clearSearch').on('click', function() {
	$('#container').isotope({
		 filter: '*'
	});
	$('#search').val(' ');
	$(this).hide();
});

	/////////////////////////////// TRIGGER MENUS ////////////////////////////////////////////

	$('#clearSearch').hide();

	//restore menu states
	menuStates();
 
 	var firstOpen = localStorage.getItem('mySet');
 	if (mySet == null) {
 		$("#faSet").find('a').addClass('selected').find('i').addClass('selected');
		$("#faSet").find('.countTxt').addClass('selected');
 	}

}); //end bbGrid pageshow

////////////////////////////////////////////////////////////////////////////////////
//////////////////             GLOBAL                  //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function menuStates() {

		var mClr = localStorage.getItem("mClr");
		var mSet = localStorage.getItem("mSet");
		var mBrowse = localStorage.getItem("mBrowse");

		if ((!mClr) || (mClr == '') || (mClr == "open")) {
			$('#colorToggle').trigger('click');
		}

		if ((!mSet) || (mSet == '') || (mSet == "open")) {
			$('#setToggle').trigger('click');
		}

		if ((!mBrowse) || (mBrowse == '') || (mBrowse == "open")) {
			$('#browseToggle').trigger('click');
		}

	} //function menu states

//slider-menu

$('#simple-menu').on('click', function() {

	var sliderIsOpen = localStorage.getItem('mSlider');
	console.log("sliderIsOpen= " + sliderIsOpen);

	if (sliderIsOpen == "open") {
		localStorage.setItem('mSlider', "closed");
	} else if (sliderIsOpen == "closed") {
		localStorage.setItem('mSlider', "open");
	}
});

//////////////////////////// TOGGLE MENUS /////////////////////////////////	

$('#colorGroup').hide();
$('#colorToggle').on('click', function() {
	$('#colorToggle i').toggleClass('fa-rotate-270');
	$('#colorGroup').slideToggle('fast');
	if ($('#colorToggle i').hasClass('fa-rotate-270')) {
		localStorage.setItem('mClr', "open");
	} else {
		localStorage.setItem('mClr', "closed");
	}
});
$('#setGroup').hide();
$('#setToggle').on('click', function() {
	$('#setToggle i').toggleClass('fa-rotate-270');
	$('#setGroup').slideToggle('fast');
	if ($('#setToggle i').hasClass('fa-rotate-270')) {
		localStorage.setItem('mSet', "open");
	} else {
		localStorage.setItem('mSet', "closed");
	}
});
$('#filterGroup').hide();
$('#browseToggle').on('click', function() {
	$('#browseToggle i').toggleClass('fa-rotate-270');
	$('#filterGroup').slideToggle('fast');
	if ($('#browseToggle i').hasClass('fa-rotate-270')) {
		localStorage.setItem('mBrowse', "open");
	} else {
		localStorage.setItem('mBrowse', "closed");

	}
});

//////////////////////////// CATEGORIES MENU /////////////////////////////////////	


$('.menuItem ').on('click', this, function() {
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

	$('#iconSize').keyup(function() { 
		icon_size = $('#iconSize').val()+'px';
		$('#myIconSymbol').css('width', icon_size);
		$('#myIconSymbol >').css('font-size', icon_size);
		//iconSize(bg_size,icon_size);
	});

	$('#bkgndSize').keyup(function() { 
		bkgnd_size = $('#bkgndSize').val()+'px';
		$('#myIconBackground').css('width', bkgnd_size);
		$('#myIconBackground').css('height', bkgnd_size);
		//iconSize(bg_size,icon_size);
	});

///////////////////////// ICON MAKER /////////////////////////////////	

//CHANGE GLYPH SIZE
$('#icon-bigger').on('click', function(){
     var myIcon = $('.myIcon');
     var typeSize = parseInt($('.myIcon').css('font-size'));
     console.log("typeSize: " +typeSize);
     var newTypeSize =(typeSize + 10);
    $('.myIcon').css('font-size', newTypeSize);
});

$('#icon-smaller').on('click', function(){
     var myIcon = $('.myIcon');
     var typeSize = parseInt($('.myIcon').css('font-size'));
     console.log("typeSize: " +typeSize);
     var newTypeSize =(typeSize - 10);
    $('.myIcon').css('font-size', newTypeSize);
});

//MOVE RIGHT
$('#btn-move-right').on('click', function(){
   var myIcon = $('#myIconSymbol');
   var position = myIcon.position();
   var myIconLeft = position.left;
   var newLeft = myIconLeft +1;
   myIcon.position.left = myIconLeft;
    $('#myIconSymbol').css('left', newLeft);
});

//MOVE LEFT
$('#btn-move-left').on('click', function(){
   var myIcon = $('#myIconSymbol');
   var position = myIcon.position();
   var myIconLeft = position.left;
   var newLeft = myIconLeft - 1;
   myIcon.position.left = myIconLeft;
   $('#myIconSymbol').css('left', newLeft);
});

//MOVE UP
$('#btn-move-up').on('click', function(){
   var myIcon = $('#myIconSymbol');
   var position = myIcon.position();
   var myIconTop = position.top;
   var newTop = myIconTop - 1;
   myIcon.position.top = myIconTop;
   $('#myIconSymbol').css('top', newTop);
   console.log("moved up");
});

//MOVE DOWN
$('#btn-move-down').on('click', function(){
   var myIcon = $('#myIconSymbol');
   var position = myIcon.position();
   var myIconTop = position.top;
   var newTop = myIconTop + 1;
   myIcon.position.top = myIconTop;
   $('#myIconSymbol').css('top', newTop);
   console.log("moved down");
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

	$('#myIconBackground').css('width', '512');
	$('#myIconBackground').css('height', '512');

    html2canvas($('#myIconBackground'), {
	
        	onrendered: function(canvas) {
          
            // canvas is the final rendered <canvas> element
            var myImage = canvas.toDataURL("image/png");
            canvas.width = '512';
            window.open(myImage);
        }
    });
});


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

