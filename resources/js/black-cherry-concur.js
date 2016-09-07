// Maraschino.js 
// by Liz Myers
// Feb 16, 2016

var mySet = 'concurSetAll';
var myPicksArray=[];
var newCount;

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
			filter: '*',
			getSortData: {
				number: '.number',
				title: '[data-title]',
				name: '.name',
				author: '.set',
				selected: '.itemSelected .mypicks',
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


	$(window).resize(function() {
		console.log("resized window");
		$('#container').isotope('layout');
	});

	var $myPicks = localStorage.getItem('myPicks');
	Utils.makeList($myPicks);

}); //end pagecreate

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

$(document).on('pagebeforeshow', '#cGrid', function() {

	/////////////////////////////// INIT VARS //////////////////////////////////////

	var myCount = localStorage.getItem('myCount');

	if (myCount == 'undefined' ||  myCount ==' ' ||  myCount == null) {
		var myCount = '0';
		$('#myPicksTotal').text(myCount);
		console.log("hey Liz myCount= "+ myCount);
	} else {
		$('#myPicksTotal').text(myCount);
		console.log("hey Liz myCount now = "+ myCount);
	}
	var $container = $('#container');
	var $item = $('#container .item');

	/////////////////////////////// OPEN LIBRARY ////////////////////////////////////////////  
	
	function openMySet() {
		console.log("called openMySet");
		var mySet = localStorage.getItem('mySet');

		if (mySet == ' ' || mySet == null || mySet == 'concurSetAll' || mySet == 'undefined') {
			$('#concurAll').trigger('click');
			console.log("triggered concurSetAll + mySet= " +mySet);
			mySet == 'concurSetAll';
			localStorage.setItem('mySet', mySet);
			var nConcurSetAll = localStorage.getItem ('nConcurSetAll');
			$('#nCurrentTotal').text(nConcurSetAll);
		} else if (mySet == 'concurWebSet') {
			$('#concurWeb').trigger('click');
			var nConcurSetWeb = localStorage.getItem ('nConcurSetWeb');
			$('#nCurrentTotal').text(nConcurSetWeb);
		} else if (mySet == 'concurMobileSet') {
			$('#concurMobile').trigger('click');
			var nConcurSetMobile = localStorage.getItem ('nConcurSetMobile');
			$('#nCurrentTotal').text(nConcurSetMobile);
		} else if (mySet == 'tripitSet') {
			$('#concurTripit').trigger('click');
			var nConcurSetTripit = localStorage.getItem ('nConcurSetTripit');
			$('#nCurrentTotal').text(nConcurSetTripit);
		}
	}

	setTimeout(function(){
		console.log("opening my set");
		 openMySet();
		}, 3000);
    
		////////////////////////////// CLICK TILES ////////////////////////////////  

		$item.on('click', function(evt) {
			evt.preventDefault();
			var $this = $(this);
			// $this.closest('.item').attachTo('#myForegroundGlyph');
			var newIcon = $this.closest('.item').find('i').attr('class');
			console.log("newIcon " + newIcon);
			$('.myIcon').find('i').removeClass();
			$('.myIcon').find('i').addClass(newIcon);


		}); //end item onClick

	}); //end pagebeforeshow

///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

$(document).on('pageshow', '#cGrid', function() {
	var myCount = localStorage.getItem('myCount');
	
	// if(myCount !=='undefined' && myCount !== 'null' && myCount !== ' ' && myCount >=1) {
	// 	$('#simple-menu').trigger('click');
	// }
	
	$('#concurAll').trigger('click');
	$('#concurAll').find('a').addClass('menuItemOn');
	$('#filterType').text('All Concur');
	// sliderIsOpen = 1;
	// localStorage.setItem("sliderIsOpen", true);

	/////////////////////////////// SEARCH ////////////////////////////////////////////
	
	$('#search').on('keyup', function() {
		$('.icon-close').css({
			'visibility': 'visible'
		});
		return false;
	});

	$('input').on("keyup", function(e) {
		if ($(this).val().length > 2 || e.keyCode == 13) {
			event.preventDefault();

			$('#clearSearch').show();
			var kwd = $('input').val();
			var mySet ="concurAll";

			//IF SEARCH IS EMPTY 
			if (kwd == ' ' || !kwd || kwd == 'undefined') {
				$('#clearSearch').hide();
				$('#container').isotope({
					filter: '*'
				});
				
			} else {
				$('#container').isotope({
					filter: ':contains(' + kwd + ')' 

				});
				$('#filterType').text('Filter');


			}

			// COUNT ITEMS BEING DISPLAYED
			// var iso = $('#container').data('isotope');
			// var nFilterTotal = iso.filteredItems.length;
			// $('#nCurrentTotal').text(nFilterTotal);
			// console.log( 'filtered ' + iso.filteredItems.length + ' items' );
		}
		return false;
	});

	$('#clearSearch').on('click', function() {

		var mySet = localStorage.getItem('mySet');

		if (mySet  == 'concurSetAll') {	
			var nCurrentTotal = localStorage.getItem('nConcurSetAll');
			$('#nCurrentTotal').text(nCurrentTotal);
			$('#concurAll').trigger('click');
		} else if (mySet == 'concurWebSet') {
			$('#concurWeb').trigger('click');
			var nCurrentTotal = localStorage.getItem('nConcurSetWeb');
			$('#nCurrentTotal').text(nCurrentTotal);

		} else if (mySet == 'concurMobileSet') {
			$('#concurMobile').trigger('click');
			var nCurrentTotal = localStorage.getItem('nConcurSetMobile');
			$('#nCurrentTotal').text(nCurrentTotal);
		}

		// $('#container').isotope({
		// 	 filter: ':contains('+mySet+')'
		// });

		$('#search').val('');
		$(this).hide();
		
	});


}); //end cGrid pageshow

////////////////////////////////////////////////////////////////////////////////////
//////////////////             GLOBAL                  //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


//slider-menu

$('#simple-menu2').on('click', function() {

	var sliderIsOpen = localStorage.getItem('sliderIsOpen');
	console.log("sliderIsOpen= " + sliderIsOpen);

	if (sliderIsOpen = 0 || sliderIsOpen == 'null') {
		localStorage.setItem('sliderIsOpen', 0);
	} else if (sliderIsOpen = 1) {
		localStorage.setItem('sliderIsOpen', 1);
	}

});

$('#close').on('click', function() {

	var sliderIsOpen = localStorage.getItem('sliderIsOpen');
	console.log("clicked Close Btn");

	$('#simple-menu').trigger('click');

	if (sliderIsOpen = 0) {
		localStorage.setItem('sliderIsOpen', 0);
	} else if (sliderIsOpen = 1) {
		localStorage.setItem('sliderIsOpen', 1);
	}
});


//////////////////////////// FILTERS /////////////////////////////////////	

$('.showMyPicks').on('click', function() {

            console.log("clicked MyPicks");

	$('#container').isotope({
		filter: '.mypicks'
	});

	$('#clearSearch').hide();
	$('#search').val('');

	// COUNT ITEMS BEING DISPLAYED
	var iso = $('#container').data('isotope');
	var nFilterTotal = iso.filteredItems.length;
	$('#nCurrentTotal').text(nFilterTotal);
	$('#picksTotal').text(nFilterTotal);
	console.log("picksTotal= "+nFilterTotal);
	console.log( 'filtered ' + iso.filteredItems.length + ' items' );
});


$('#clearMyPicks').on('click', function(){
	console.log("clicked clearMyPicks");
	$('#myNotifyDialog').popup("open");
      $(".cover").fadeTo(500, 0.5);
});

$('.myNotifyCancelBtn').on('click', function(){
	console.log("clicked cancel");
	$('#myNotifyDialog').popup("close");
	$(".cover").fadeTo(500, 0).hide();
});

$('.myNotifyOkBtn').on('click', function(){
	console.log("clicked OK");
	var currentSet = localStorage.getItem('mySet');
	clearAllMyPicks();
});

function clearAllMyPicks() {

	var myCount = localStorage.getItem('myCount');
	var $myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
	while (myCount > 0) {
		var $number = $myPicksArray[myCount];
		var $myDiscard = $myPicksArray.indexOf($number);
		$myPicksArray.splice($myDiscard, 1);
		myCount--;

	}
	localStorage.setItem('myPicksArray', JSON.stringify($myPicksArray));
	localStorage.setItem('myCount', myCount);
	console.log("myPicksArray " + $myPicksArray +', myCount: '+myCount);
	$('#container *').find('b').removeClass('faveShow');
	$('#container *').removeClass('mypicks');
	$('#picksTotal').text(myCount);
	$('#myPicksTotal').text(myCount);
	$('#slide-list').empty();

	setTimeout(function(){
		var mySet = localStorage.getItem('mySet');
		console.log("Timeout function now");
		if(mySet  == 'concurSetAll') {
			$('#concurAll').trigger('click');
			console.log("concurAll clicked");
		} else if (mySet == 'concurSetWeb') {
			$('#concurWeb').trigger('click');
			console.log("concurWeb clicked");
		} else if (mySet == 'concurSetMobile') {
			$('#concurMobile').trigger('click');
			console.log("concurMobile clicked");
		}
		$('#simple-menu2').trigger('click');
		$('#myNotifyDialog').popup("close");
		$(".cover").fadeTo(500, 0).hide();
		location.reload();

	}, 500);	

}
	 
$('.menuItem ').on('click', this, function() {
	$(this).siblings().find('a').removeClass('menuItemOn');
	// $(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).closest('.menuItem').find('a').toggleClass('menuItemOn');
	var catSelector = $(this).attr('data-category-value');
	if (catSelector == ".mypicks") {
		var myCount = localStorage.getItem('myCount');
		$('#myCount').text(myCount);
		catSelector = ' '
	} else if (catSelector == '.travel'){
		var nTravel = localStorage.getItem('nTravel');
		$('#nCurrentTotal').text(nTravel);
		$('#filterType').text('Travel');
	} else if (catSelector == '.expense'){
		var nExpense = localStorage.getItem('nExpense');
		$('#nCurrentTotal').text(nExpense);
		$('#filterType').text('Expense');
	} else if (catSelector == '.social') {
		var nSocial = localStorage.getItem('nSocial');
		$('#nCurrentTotal').text(nSocial);
		$('#filterType').text('Social');
	} else if (catSelector == '.travelAndExpense') {
		var nTravelAndExpense = localStorage.getItem('nTravelAndExpense');
		$('#nCurrentTotal').text(nTravelAndExpense);
		$('#filterType').text('T & E');
	} else if (catSelector == '*') {
		$('#showAll *').css('color', '#fff');
		$('#nCurrentTotal').text('229');
		$('#filterType').text('All Concur');
	} else {
		$('#showAll *').css('color', '#999');
		$('#btnClearCategories').css('color', '#fc6');
		$('#filterType').text('All Concur');
	}
	$('#container').isotope({
		filter: catSelector
	});

});

$('#bk01').on('click', function(){
     $('#myIconBackground').css('background', '#ffffff');
});
$('#bk02').on('click', function(){
     $('#myIconBackground').css('background', '#343434');
});
$('#bk03').on('click', function(){
     $('#myIconBackground').css('background', '#ff9900');
});
$('#bk04').on('click', function(){
     $('#myIconBackground').css('background', '#303942');
});
$('#bk05').on('click', function(){
     $('#myIconBackground').css('background', '#0068a8');
});
$('#bk06').on('click', function(){
     //$('#myIconBackground').css('background', '#00c1e0');
      $('#myIconBackground').css('background', '-webkit-linear-gradient(#ffcc00, #990000)');
});

$('#glyph01').on('click', function(){
     $('#myIconSymbol').css('color', '#ffffff');
});
$('#glyph02').on('click', function(){
     $('#myIconSymbol').css('color', '#343434');
});
$('#glyph03').on('click', function(){
     $('#myIconSymbol').css('color', '#ff9900');
});
$('#glyph04').on('click', function(){
     $('#myIconSymbol').css('color', '#303942');
});
$('#glyph05').on('click', function(){
     $('#myIconSymbol').css('color', '#0068a8');
});
$('#glyph06').on('click', function(){
     $('#myIconSymbol').css('color', '#00c1e0');
});
//download button
$('#downloadButton').click(function() {

    html2canvas($("#myIconBackground"), {
        onrendered: function(canvas) {
            // canvas is the final rendered <canvas> element
            var myImage = canvas.toDataURL("image/png");
            window.open(myImage);
        }
    });
});

$('#print').on('click', function() {

	//To PRINT FROM REMOTE SERVER uncomment the following line
	//window.open("http://blackcherry.lizmyers.webfactional.com/picksList.html", "_blank");
	
	//To PRINT LOCALLY uncomment the following line
	window.open("http://localhost:8000/picksList.html", "_blank");
});

///////////////////////// SELECT LIBRARY /////////////////////////////////		

$('#concurSetWeb').on('click', function() {
	var mySet = "concurWebSet";
	$('#nCurrentTotal').text('137');
	console.log("clicked "+ mySet);
	$('#container').isotope({
		 filter: ':contains('+mySet+')'
	});
	localStorage.setItem('mySet', mySet);
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).siblings().find('.countTxt').removeClass('selected');
	$(this).find('.countTxt').addClass('selected');
	
	$('#clearSearch').hide();
	$('#search').val('');
	$('#filterType').text('Web Set');
});

$('#concurSetMobile').on('click', function() {
	var mySet = "concurMobileSet";
	$('#nCurrentTotal').text('92');
	console.log("clicked "+ mySet);
	$('#container').isotope({
		 filter: ':contains('+mySet+')'
	});
	localStorage.setItem('mySet', mySet);
	$(this).siblings().find('a').removeClass('selected').find('i').removeClass('selected');
	$(this).find('a').addClass('selected').find('i').addClass('selected');
	$(this).siblings().find('.countTxt').removeClass('selected');
	$(this).find('.countTxt').addClass('selected');
	//$('#filterGroup li *').removeClass('selected');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#filterType').text('Mobile Set');
	//$('#btnClearCategories').css('color', '#555');
});

$('#concurSetAll').on('click', function() {
	var mySet="concurSetAll";
            localStorage.setItem('mySet', mySet);
	var nConcurSetAll = localStorage.getItem('nConcurSetAll');
	$('#nCurrentTotal').text(nConcurSetAll);
	$('#filterType').text('All Sets');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#container').isotope({
		filter: '*'
	})
	setTimeout(function(){
		$('#container').isotope({
		filter: '*'
	})

	}, 1500);
});
$('#concurAll').on('click', function() {
	var mySet="concurSetAll";
            localStorage.setItem('mySet', mySet);
	var nConcurSetAll = localStorage.getItem('nConcurSetAll');
	$('#nCurrentTotal').text(nConcurSetAll);
	$('#filterType').text('All Concur');
	$('#clearSearch').hide();
	$('#search').val('');
	$('#container').isotope({
		filter: '*'
	});
});

$('#concurWeb').on('click', function() {
	var mySet="concurWebSet";
	console.log("clicked "+ mySet);
	$('#filterType').text('Web Set');
	var nConcurSetWeb = localStorage.getItem('nConcurSetWeb');
	$('#nCurrentTotal').text(nConcurSetWeb);

	$('#container').isotope({
		 filter: ':contains('+mySet+')'
	});
	localStorage.setItem('mySet', mySet);
	$('#clearSearch').hide();
	$('#search').val('');
});

$('#concurMobile').on('click', function() {
	var mySet="concurMobileSet";
	console.log("clicked "+ mySet);
	$('#filterType').text('Mobile Set');
	var nConcurSetMobile = localStorage.getItem('nConcurSetMobile');
	$('#nCurrentTotal').text(nConcurSetMobile);

	$('#container').isotope({
	  filter: ':contains('+mySet+')'
	});
	localStorage.setItem('mySet', mySet);
	 $('#clearSearch').hide();
	 $('#search').val('');
});
$('#concurTripit').on('click', function() {
	var mySet="tripitSet";
	console.log("clicked "+ mySet);
	$('#filterType').text('TripIt');
	var nConcurSetTripit = localStorage.getItem('nConcurSetTripit');
	$('#nCurrentTotal').text(nConcurSetTripit);

	$('#container').isotope({
	  filter: ':contains('+mySet+')'
	});
	localStorage.setItem('mySet', mySet);

	 $('#clearSearch').hide();
	 $('#search').val('');
});

