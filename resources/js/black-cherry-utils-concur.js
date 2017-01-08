/*
BLACK CHERRY
by Liz Myers 
liz@myersdesign.com
Feb 17, 2016
*/

var Utils = {

    makeList: function ($name) {
            $('#slide-list').empty();
            console.log("passing in: " + $name);
            var myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
            //list layout
            var allSets=JSON.parse(localStorage.getItem('allSets'));
            var icons = $.map(allSets, function(icon, i) {

                var id = i + 1;
                var name = icon.name;
                var code = icon.symbol;
                var category = icon.category;
                var author = icon.set;
                var symbol = icon.symbol;

                var index = $.inArray(JSON.stringify(i + 1), myPicksArray);
                
                var isMyPick = ((index !== -1) && ((i + 1) == myPicksArray[index])) ? "mypicks" : "";
                if (isMyPick == "mypicks") {

                var newItem = '<li class="new-item" data-sort='+name+'>' +
                    '<p class = "list-glyph"><i class="' + symbol + ' style="color:#383f46!important"></i></p>' +
                    '</li>';
                }

                    // var insertPoint = $(this).parent().find("li:nth-child("+id+")");
                    // $('<li />', {
                    //     'text': $name,
                    //     'class': 'newItem'
                    // }).insertAfter(insertPoint);

            
                $(newItem).appendTo('#slide-list');
                    
                return icons;

        }); //map function
    },
    
    displayIcons: function(allSets) {
            		
        var icon='';
        var i=0;

        //init icon set totals
        var nConcurSetAll=0;
        var nConcurSetWeb=0;
        var nConcurSetMobile=0;
        var nConcurSetTripit=0;

        //init category totals
        var nExpense = 0;
        var nTravel = 0;
        var nSocial = 0;
        var nTravelAndExpense = 0;
       
        var icons = $.map(allSets, function(icon, i) {
            
                var id = i+1;
                var name = icon.name;
                var code = icon.symbol;
                var category = icon.category;
                var set = icon.set;
                var keywords = icon.keywords;

                switch(set) {
                        case "concurWebSet":
                            nConcurSetWeb++;
                            //console.log("concurSet: "+nConcurSet);
                        break;
                        case "concurMobileSet":
                             nConcurSetMobile++;
                        break;
                        case "tripitSet":
                            nConcurSetTripit++;
                        break;
                }

                switch(category){
                    case "expense":
                        nExpense++;
                        //console.log("Expense: "+nExpense);
                    break;
                    case "travel":
                        nTravel++;
                        //console.log("Travel: "+nTravel);
                    break;
                    case "social":
                        nSocial++;
                        //console.log("Social: "+nSocial);
                    break;
                    case "travel and expense":
                        nTravelAndExpense++;
                        //console.log("Social: "+nSocial);
                    break;
                }
            
                    var author = icon.set;
                    var mvar = "m-";
                    var tvar = "t-"
                    var symbol = icon.symbol;  
                    var myPicksArray = JSON.parse(localStorage.getItem('myPicksArray'));
                    var index = $.inArray(JSON.stringify(i+1), myPicksArray);
                    var isMyPick = ((index!==-1) && ((i+1)==myPicksArray[index])) ? "mypicks" : "";

                        if (isMyPick == "mypicks") {
                            var item = '<div data-title="'+symbol+'"class="item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'"data-libe="'+set+'">'+
                                            '<div class="faveHide"><b class="icon-star faveShow"></b></div>'+
                                            // '<p class="number">'+(i+1)+'</p>'+
                                            '<p class = "glyph"><i class="'+symbol+'"></i></p>'+
                                            '<p class="set">'+author+'</p>'+
                                            '<p class="keywords">'+keywords+'</p>'+
                                            '</div>';
                        } else if (author=="concurMobileSet"){						
                            var item = '<div data-title="'+symbol+'"class="item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
                                            '<div class="faveHide"><b class="icon-star"></b></div>'+
                                            // '<p class="number">'+(i+1)+'</p>'+
                                            '<p class = "glyph"><i class="'+symbol+'"></i></p>'+
                                            '<p class="set">'+author+'</p>'+
                                            '<p class="keywords">'+keywords+'</p>'+
                                            '</div>';
                        } else if (author=="tripitSet"){                      
                            var item = '<div data-title="'+symbol+'"class="item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
                                            '<div class="faveHide"><b class="icon-star"></b></div>'+
                                            // '<p class="number">'+(i+1)+'</p>'+
                                            '<p class = "glyph"><i class="'+symbol+'"></i></p>'+
                                            '<p class="set">'+author+'</p>'+
                                            '<p class="keywords">'+keywords+'</p>'+
                                            '</div>';
                        } else if (author=="concurWebSet") {
                            var item = '<div data-title="'+symbol+'"class="item '+category+' '+author+' '+isMyPick+'"data-id="'+i+'"data-category="'+category+'"data-libe="'+set+'">'+
                                            '<div class="faveHide"><b class="icon-star"></b></div>'+
                                            // '<p class="number">'+(i+1)+'</p>'+
                                            '<p class = "glyph"><i class="'+symbol+'"></i></p>'+
                                            '<p class="set">'+author+'</p>'+
                                            '<p class="keywords">'+keywords+'</p>'+
                                            '</div>';
                        }//end if isMyPick
                
            
                //UPDATE COUNT TOTALS
                // $('#nConcurSetAll').text(nConcurSetAll);
                $('#nConcurSetWeb').text(nConcurSetWeb);
                $('#nConcurSetMobile').text(nConcurSetMobile);
                //$('#nConcurSetTripit').text(nConcurSetTripit);
                
                nConcurSetAll = nConcurSetWeb + nConcurSetMobile + nConcurSetTripit;
                $('#nConcurSetAll').text(nConcurSetAll);

                //STORE COUNTS
                localStorage.setItem('nConcurSetAll', nConcurSetAll);
                localStorage.setItem('nConcurSetWeb', nConcurSetWeb);
                localStorage.setItem('nConcurSetMobile', nConcurSetMobile)
                 localStorage.setItem('nConcurSetTripit', nConcurSetTripit)
                //categories
                localStorage.setItem('nExpense', nExpense);
                localStorage.setItem('nTravel', nTravel);
                localStorage.setItem('nSocial', nSocial);
                localStorage.setItem('nTravelAndExpense', nTravelAndExpense);

                $('#container').append(item);
                
            return item;
            
        });//map function
        	  
    }//end displayIcons function

} //end Utils