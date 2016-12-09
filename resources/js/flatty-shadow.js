<script>
			// this is important for IEs
			var polyfilter_scriptpath = '/js/';
		</script>	

	<!-- Dynamic Fonts Generation -->
	<script type="text/javascript">
	$('.main_dashboard').hide();
	$('#canvasImage').hide();
	$('.back_icons,.position').addClass('hidden');	

	var Icons_Styles = {};
	var Icon_Movements = {};
	var allIcons_List = [];
	var selectedIcons_List = [];
	var deletedIcons_List = [];
	var deletedIcons_Count = [];
	var counter = 1;
	var border_radius = "50%";
	var angle = 42;
	var depth = 60;
	var bg_color = "rgba(246, 80, 52,1)";
	var shadow_color = "rgba(223, 54, 25,1)";
	var icon_color = "rgba(255, 255, 255,1)";
	var id_content = "f1d8";
	var left_content = 0;
	var top_content = 0;	
	var shadow_transparency = 100;	
	var icon_transparency = 100;
	var bg_transparency = 100;
	var icon_size = '60px';
	var bg_size = '130px';

	var icon_result = [{
        "icon_name": "fs-paper-plane",
        "icon_shape": "50%",
        "icon_angle": 42,
        "icon_depth": 60,
        "icon_bg": "rgba(246, 80, 52,1)",
        "icon_shadow": "rgba(223, 54, 25,1)",
        "icon_clr": "rgba(255, 255, 255,1)",
        "icon_id":"f1d8",
        "icon_left":0,
        "icon_top":0,
    }];

    var target_movex=0;
    var target_movey=0;

    var Icon_Movements = {};
    var icons_movements = [{
    	"icon_move_name": "fs-paper-plane",		
        "icon_movex": 0,
        "icon_movey": 0,        
    }];

	var icon_name_item = "fs-paper-plane";
	var icon_shape_item = "50%";
	var icon_angle_item =42;
	var icon_depth_item = 60;
	var icon_bg_item = "rgba(246, 80, 52,1)";
	var icon_shadow_item = "rgba(223, 54, 25,1)";
	var icon_clr_item = "rgba(255, 255, 255,1)";
	var icon_id_item="f1d8";
	var icon_left_item=0;
	var icon_top_item=0; 
	var icon_move_item = "fs-paper-plane";   			

	var icons_style_edit = "";
	var icon_values = "";

	$.each(icon_result, function (i, item) {
		Icons_Styles[item.icon_name] = [];	        	
	        	Icons_Styles[item.icon_name].push([item.icon_shape,item.icon_angle,item.icon_depth, item.icon_bg,item.icon_shadow,item.icon_clr,item.icon_id,item.icon_left,item.icon_top]);	        	

	});
	

	$.each(icons_movements, function (i, item) {
		Icon_Movements[item.icon_move_name] = [];	        	
	       	Icon_Movements[item.icon_move_name].push([item.icon_movex,item.icon_movey]);

	});

	function getValues(key) {
	    return Icons_Styles[key];
	}
            

	allIcons_List.push('paper-plane');
	selectedIcons_List.push('paper-plane');

	/* Color Change */
	$('#bg_picker').colpick({		
			color:bg_color,
			layout:'hex',
			submit:0,
			colorScheme:'dark',
			onChange:function(hsb,hex,rgb,el,bySetColor) {													
				$(el).css('border-color','#'+hex);
				// Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
				if(!bySetColor) $(el).val(hex);
				$('.bg_hex').text('#'+hex);
				$('#bg-transparent-slider').css('background-color', '#'+hex);
				bg_color = ' rgba(' + hexToRgb(hex).r +', ' + hexToRgb(hex).g +', ' + hexToRgb(hex).b +', ' + bg_transparency/100 + ')';	
				icons_style_edit = "bg";			
				editIcons();
			}
		}).keyup(function(){
			$(this).colpickSetColor(this.value);
	});
	$('#icon_picker').colpick({
			color:icon_color,
			layout:'hex',
			submit:0,
			colorScheme:'dark',
			onChange:function(hsb,hex,rgb,el,bySetColor) {
				$(el).css('border-color','#'+hex);
				// Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
				if(!bySetColor) $(el).val(hex);
				$('.icon_hex').text('#'+hex);
				$('#icon-transparent-slider').css('background-color', '#'+hex);	
				icon_color = ' rgba(' + hexToRgb(hex).r +', ' + hexToRgb(hex).g +', ' + hexToRgb(hex).b +', ' + icon_transparency/100 + ')';					
				icons_style_edit = "icon";		
				editIcons();
			}
		}).keyup(function(){
			$(this).colpickSetColor(this.value);
	});

	$('#shadow_picker').colpick({
			color:shadow_color,
			layout:'hex',
			submit:0,
			colorScheme:'dark',
			onChange:function(hsb,hex,rgb,el,bySetColor) {
				$(el).css('border-color','#'+hex);
				// Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
				if(!bySetColor) $(el).val(hex);
				$('.shadow_hex').text('#'+hex);
				$('#shadow-transparent-slider').css('background-color', '#'+hex);
				 shadow_color = ' rgba(' + hexToRgb(hex).r +', ' + hexToRgb(hex).g +', ' + hexToRgb(hex).b +', ' + shadow_transparency/100 + ')';
				 icons_style_edit = "shadow";
				 editIcons();
			}
		}).keyup(function(){
			$(this).colpickSetColor(this.value);
	});

	$('.palette').click(function(){
		var flat_color = $(this).attr("class");		
		flat_color = flat_color.split(' ')[1];

		switch (flat_color) {
		    case 'flat_red':
		        bg_color = "rgba(231, 76, 60,1)";
		        shadow_color="rgba(192, 57, 43,1)";
		        icons_style_edit = "bg_shadow";
		        editIcons();
		        break;
		    case 'flat_orange':
		        bg_color = "rgba(246, 80, 52,1)";
		        shadow_color="rgba(223, 54, 25,1)";
		        icons_style_edit = "bg_shadow";
		        editIcons();
		        break;
		    case 'flat_yellow':
		        bg_color = "rgba(241, 196, 15,1)";
		        shadow_color="rgba(243, 156, 18,1)";
		        icons_style_edit = "bg_shadow";
		        editIcons();
		        break;
		    case 'flat_green':
		        bg_color = "rgba(46, 204, 113,1)";
		        shadow_color="rgba(39, 174, 96,1)";
		        icons_style_edit = "bg_shadow";
		        editIcons();
		        break;
		    case 'flat_mint':
		        bg_color = "rgba(26, 188, 156,1)";
		        shadow_color="rgba(22, 160, 133,1)";
		        icons_style_edit = "bg_shadow";
		        editIcons();
		        break;
		    case 'flat_sky_blue':
		        bg_color = "rgba(52, 152, 219,1)";
		        shadow_color="rgba(41, 128, 185,1)";
		        icons_style_edit = "bg_shadow";
		        editIcons();
		        break;
		    case 'flat_grey':
		        bg_color = "rgba(246, 80, 52,1)";
		        shadow_color="rgba(223, 54, 25,1)";
		        icons_style_edit = "bg_shadow";
		        editIcons();
		        break;
		    case 'flat_navy':
		        bg_color = "rgba(246, 80, 52,1)";
		        shadow_color="rgba(223, 54, 25,1)";
		        icons_style_edit = "bg_shadow";
		        editIcons();
		        break;
		}
		icons_style_edit = "edit";		
		editIcons();
	}); 

	/* Border Radius */
	$('.square').click(function(){
		icons_style_edit = "shape";
		border_radius = "0%";
		editIcons();
	});
	$('.circle').click(function(){
		icons_style_edit = "shape";
		border_radius = "50%";
		editIcons();
	});
	$('.curve').click(function(){
		icons_style_edit = "shape";
		border_radius = "20%";
		editIcons();
	});
	$('.icon_size').click(function(){
		icon_size = $(this).children().attr("class");
		iconSize(bg_size,icon_size);
	});
	$('.bg_size').click(function(){
		bg_size = $(this).children().attr("class");
		iconSize(bg_size,icon_size);	
	});
	$('#icon_size_input').keyup(function() { 
		icon_size = $('#icon_size_input').val()+'px';
		iconSize(bg_size,icon_size);
	});
	$('#bg_size_input').keyup(function() { 
		bg_size = $('#bg_size_input').val()+'px';
		iconSize(bg_size,icon_size);
	});

	function iconSize(bg_size, icon_size){
		$('.fs_icon').css( 'font-size', icon_size );
		$('.fsd_icon').css( 'font-size', icon_size );		
		var icon_pos = parseInt(icon_size.split('px')[0]) * -1;		    
		$('.centered').css( { marginLeft : icon_pos, marginTop : icon_pos } );

		$('.flatty_icon').css( 'width', bg_size );
		$('.flatty_icon').css( 'height', bg_size );
		$('.single_icon').css( 'width', bg_size );
		$('.single_icon').css( 'height', bg_size );
	}

	$(function() {
		    $( "#radius-slider" ).slider({
		      range: "min",
		      value: 20,
		      min: 1,
		      max: 50,
		      slide: function( event, ui ) {		        
		      	icons_style_edit = "shape";
		        border_radius = ui.value+'%';
		        editIcons();
		      }
		    });
		    
		  });
	$(function() {
		    $( "#depth-slider" ).slider({
		      range: "min",
		      value: 20,
		      min: 1,
		      max: 400,
		      slide: function( event, ui ) {		        
		        depth = ui.value;
		        icons_style_edit = "depth";		              
		        editIcons();		       		        
		      }
		    });
		    
		  });
	$(function() {
		    $( "#angle-slider" ).slider({
		      range: "min",
		      value: 42,
		      min: 1,
		      max: 360,
		      slide: function( event, ui ) {		        
		        angle = ui.value;
		        icons_style_edit = "angle";		              
		        editIcons();		       		        
		      }
		    });
		    
		  });	
	$(function() {
		    $( "#bg-transparent-slider" ).slider({
		      range: "min",
		      value: 98,
		      min: 1,
		      max: 100,
		      slide: function( event, ui ) {	
		      	var bg_trans_clr = $('.bg_hex').text();		      	
		        bg_transparency = ui.value;    	             			             
		        bg_color = ' rgba(' + hexToRgb(bg_trans_clr).r +', ' + hexToRgb(bg_trans_clr).g +', ' + hexToRgb(bg_trans_clr).b +', ' + bg_transparency/100 + ')';
		        icons_style_edit = "bg";
		        editIcons();		       		        
		      }
		    });
		    
		  });
	$(function() {
		    $( "#icon-transparent-slider" ).slider({
		      range: "min",
		      value: 98,
		      min: 1,
		      max: 100,
		      slide: function( event, ui ) {	
		      	var icon_trans_clr = $('.icon_hex').text();
		        icon_transparency = ui.value;
		        if(icon_transparency==1){
		        	icon_transparency = 0;
		        }     	             			             
		        icon_color = ' rgba(' + hexToRgb(icon_trans_clr).r +', ' + hexToRgb(icon_trans_clr).g +', ' + hexToRgb(icon_trans_clr).b +', ' + icon_transparency/100 + ')';		        
		        icons_style_edit = "icon";		        
		        editIcons();		       		        
		      }
		    });		    
		  });
	$(function() {
		    $( "#shadow-transparent-slider" ).slider({
		      range: "min",
		      value: 98,
		      min: 1,
		      max: 100,
		      slide: function( event, ui ) {	
		      	var shadow_trans_clr = $('.shadow_hex').text();		      	
		        shadow_transparency = ui.value; 
		        if(shadow_transparency==1){
		        	shadow_transparency = 0;
		        }   	             			             
		        shadow_color = ' rgba(' + hexToRgb(shadow_trans_clr).r +', ' + hexToRgb(shadow_trans_clr).g +', ' + hexToRgb(shadow_trans_clr).b +', ' + shadow_transparency/100 + ')';	
		        icons_style_edit = "shadow";	        
		        editIcons();		       		        
		      }
		    });
		    
		  });	

	/* Dynamic Icons Generator */
	$('.icon_grid').click(function(e)
	{
		e.preventDefault();
		var iconId = "";
		var selectedIcon = $(this).html(); 			
		iconName = selectedIcon.split('"');	
		iconId = iconName[3];
		iconName = iconName[1].split(' ');			
		iconName = iconName[1].split('-')[1];					
		seticonName();
		function seticonName(){
			if ($.inArray(iconName, allIcons_List) !== -1)
			{			
				iconName = iconName.split('_')[0];				
				iconName = iconName+'_'+counter;
				counter++;							
				seticonName();			
			}		
			else{
				counter = 1;
				allIcons_List.push(iconName);
				selectedIcons_List.push(iconName);
			}
		}						
		$( ".font_icons" ).append( '<div class="single_icon"><div class="flatty_icon '+iconName+'" id="'+iconId+ '"><div class="centered"><span class="fs_icon '+iconName+'">'+selectedIcon+'</span><span class="fsd_icon '+iconName+'">'+selectedIcon+'</span></div></div><input type="text" class="fs_title" value="fs-'+iconName+'"/></div>' );	

		icon_name_item = 'fs-'+iconName;
		icon_id_item = iconId;		
		icon_shape_item = "50%";
		icon_angle_item =42;
		icon_depth_item = 60;
		icon_bg_item = "rgba(246, 80, 52,1)";
		icon_shadow_item = "rgba(223, 54, 25,1)";
		icon_clr_item = "rgba(255, 255, 255,1)";		
		icon_left_item=0;
		icon_top_item=0;		

		Icons_Styles[icon_name_item] = [];
		Icons_Styles[icon_name_item].push([icon_shape_item,icon_angle_item,icon_depth_item,icon_bg_item,icon_shadow_item,icon_clr_item,icon_id_item,icon_left_item,icon_top_item]);

		icons_style_edit = "edit";		         
		editIcons();	

		if(typeof Icon_Movements[icon_name_item]==="undefined"){
		    	Icon_Movements[icon_name_item] = [];
		    	Icon_Movements[icon_name_item].push([0,0]);
		    }	

		$(function() {
		    $( ".icon_name_item" ).draggable();
		  });	

		iconSize(bg_size,icon_size);

	});
	
	/* Icon Tools - Select, Deselect, Edit, Delete */
	$('body').on('click', '.flatty_icon', function() {
    	var selectedIcon = this.className;
   		selectedIcon = selectedIcon.split(' ')[1];

   		if ($.inArray(selectedIcon, selectedIcons_List) !== -1)
		{
			$(this).addClass('bw');
			selectedIcons_List.splice( $.inArray(selectedIcon, selectedIcons_List), 1 );	
		}
		else{
			$(this).removeClass('bw');
			selectedIcons_List.push(selectedIcon);   			
		}   				
	});

	function hexToRgb(hex) {		
	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	}	

	function rgb2hex(rgb){
		 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		 return (rgb && rgb.length === 4) ? "#" +
		  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
		}

	editIcons();
	function editIcons(){		
		$.each(selectedIcons_List, function( index, value ) {					

			icon_name_item = 'fs-'+value;			
			icon_shape_item = Icons_Styles[icon_name_item][0][0];
			icon_angle_item = Icons_Styles[icon_name_item][0][1];
			icon_depth_item = Icons_Styles[icon_name_item][0][2];
			icon_bg_item = Icons_Styles[icon_name_item][0][3];
			icon_shadow_item = Icons_Styles[icon_name_item][0][4];
			icon_clr_item = Icons_Styles[icon_name_item][0][5];
			icon_id_item = Icons_Styles[icon_name_item][0][6];
			icon_left_item= Icons_Styles[icon_name_item][0][7];
			icon_top_item= Icons_Styles[icon_name_item][0][8];				
			switch (icons_style_edit) {
		    case 'bg_shadow':
		        icon_bg_item = bg_color;
		        icon_shadow_item = shadow_color;		       
		    	Icons_Styles[icon_name_item].splice([icon_name_item]);
		        Icons_Styles[icon_name_item].push([icon_shape_item,icon_angle_item,icon_depth_item,icon_bg_item,icon_shadow_item,icon_clr_item,icon_id_item,icon_left_item,icon_top_item]);
		        break;
		    case 'bg':
		    	icon_bg_item = bg_color;
		    	Icons_Styles[icon_name_item].splice([icon_name_item]);
		        Icons_Styles[icon_name_item].push([icon_shape_item,icon_angle_item,icon_depth_item,icon_bg_item,icon_shadow_item,icon_clr_item,icon_id_item,icon_left_item,icon_top_item]);
		        break;
		    case 'shadow':
		    	icon_shadow_item = shadow_color;
		    	Icons_Styles[icon_name_item].splice([icon_name_item]);
		        Icons_Styles[icon_name_item].push([icon_shape_item,icon_angle_item,icon_depth_item,icon_bg_item,icon_shadow_item,icon_clr_item,icon_id_item,icon_left_item,icon_top_item]);		        
		        break;
		    case 'icon':
		    	icon_clr_item = icon_color;		
		    	console.log(icon_color);    	
		    	Icons_Styles[icon_name_item].splice([icon_name_item]);
		        Icons_Styles[icon_name_item].push([icon_shape_item,icon_angle_item,icon_depth_item,icon_bg_item,icon_shadow_item,icon_clr_item,icon_id_item,icon_left_item,icon_top_item]);
		        break;    
		    case 'shape':
		    	icon_shape_item = border_radius;
		    	$('.font_icons').find('.'+value).css({borderRadius:border_radius});
		    	Icons_Styles[icon_name_item].splice([icon_name_item]);
		        Icons_Styles[icon_name_item].push([icon_shape_item,icon_angle_item,icon_depth_item,icon_bg_item,icon_shadow_item,icon_clr_item,icon_id_item,icon_left_item,icon_top_item]);
		        break;
		    case 'depth':
		    	icon_depth_item = depth;
		    	Icons_Styles[icon_name_item].splice([icon_name_item]);
		        Icons_Styles[icon_name_item].push([icon_shape_item,icon_angle_item,icon_depth_item,icon_bg_item,icon_shadow_item,icon_clr_item,icon_id_item,icon_left_item,icon_top_item]);		        
		        break;
		    case 'angle':
		    	icon_angle_item = angle;
		    	Icons_Styles[icon_name_item].splice([icon_name_item]);
		        Icons_Styles[icon_name_item].push([icon_shape_item,icon_angle_item,icon_depth_item,icon_bg_item,icon_shadow_item,icon_clr_item,icon_id_item,icon_left_item,icon_top_item]);
		        break;
		    case 'position':
		    	if('fs-'+icon_move_item == icon_name_item){
		    		icon_left_item = left_content;
			    	icon_top_item = top_content;
			    	Icons_Styles[icon_name_item].splice([icon_name_item]);
			        Icons_Styles[icon_name_item].push([icon_shape_item,icon_angle_item,icon_depth_item,icon_bg_item,icon_shadow_item,icon_clr_item,icon_id_item,icon_left_item,icon_top_item]);
		    	}		    	
		        break;		   
			}			

			var x = 1.5 * Math.cos(icon_angle_item * Math.PI/180);
	        var y = 1.5 * Math.sin(icon_angle_item * Math.PI/180);            

	        var num_x= x;
	        x= x;
	        var num_y= y;	        
	        var long_shadow = "";
	        var icon_shadow_opacity = 1;
	        var icon_clr_opacity = 1;	        
	        icon_shadow_opacity = icon_shadow_item.split(',')[3].slice(0,-1);
	        icon_clr_opacity = icon_clr_item.split(',')[3].slice(0,-1);

	        var icon_shadow_opacity_item = icon_shadow_item.split(',')[0]+','+icon_shadow_item.split(',')[1]+','+icon_shadow_item.split(',')[2]+',1)';			

	        for (var i = 1; i <= icon_depth_item; i++) {
	            long_shadow += ' ' + x + 'px ' + y + 'px '+ 0 + ' '+ icon_shadow_opacity_item + ',';	            
	            x+=num_x;
	            y+=num_y;               
	        }

	        long_shadow = long_shadow.substr(0, long_shadow.length-1);
	                	        
			$('.'+value).css('background-color', icon_bg_item);	

			$('.'+value).find('.fsd_icon').css( 'color', icon_clr_item );
			$('.'+value).find('.fs_icon').css( 'color', icon_shadow_item );		
			$('.'+value).find('.fsd_icon').css( 'opacity', icon_clr_opacity );	

	        $('.font_icons').find('.fs_icon'+'.'+value).css( 'text-shadow', long_shadow );
	        $('.font_icons').find('.fs_icon'+'.'+value).css( 'opacity', icon_shadow_opacity );

			/*console.log(JSON.stringify(Icons_Styles));*/
		});

	}		

	$('.select_icons').click(function(){
		selectedIcons_List = [];		
		selectedIcons_List = $.merge([], allIcons_List);
		$(".flatty_icon").removeClass('bw');		
	});

	$('.deselect_icons').click(function(){
		selectedIcons_List = [];				
		$(".flatty_icon").addClass('bw');		
	});
	
	$('.delete_icons').click(function(){
		var delete_count = 0;
		$.each(selectedIcons_List, function( index, value ) {			
			$('.'+value).parents('.single_icon').fadeOut();
			deletedIcons_List.push(value);	
			delete_count++;				
		});		
		
		$.each(deletedIcons_List, function( index, value ) {	
			selectedIcons_List.splice( $.inArray(value, selectedIcons_List), 1 );
		});
		deletedIcons_Count.push(delete_count);			
	});	
	$('.undo_icons').click(function(){			
		var to_deleted = deletedIcons_List[deletedIcons_List.length-1];		
		var to_deleted_counter = deletedIcons_List.length-1;		

		for (var i = 0; i < deletedIcons_Count[deletedIcons_Count.length-1]; i++) {				
				selectedIcons_List.push(to_deleted);
				deletedIcons_List.splice(-1,1);			
				to_deleted_counter--;		

				to_deleted = deletedIcons_List[to_deleted_counter];					
			}

		$.each(selectedIcons_List, function( index, value ) {					
			$('.'+value).parents('.single_icon').fadeIn();
		});	

		deletedIcons_Count.splice(-1,1);				
	});		

	/* Generate PNG */	
	$('.download_btn').click(function(e) {
		
		$('.draggable_draw').empty();	
	    $('#canvas_draw,#canvasImage').empty();	    
	    var html_code = "";
	    var css_code = "";
	    var css_shadow = "";

	    draw(Icons_Styles,selectedIcons_List,icon_size,bg_size);	    	    	   

	    $.each(Icons_Styles, function (key, item) {
	   		var item_name = key.toString().split(/-(.+)?/)[1];	   		
	   		$('.draggable_draw').append('<div class="drag_wrapper"><div class="dragIcon '+item_name+'"></div></div>');
			$('.draggable_draw').addClass('hidden');
			/*$('.'+item_name).draggable({ containment: ".draggable_draw", scroll: false });*/
			var ofset_x = 0;
		    var ofset_y = 0; 
			$('.'+item_name).draggable(
		    {			    	
		    	start: function(){
		    		var offset = $(this).offset();
		    		ofset_x = offset.left;
		    		ofset_y = offset.top; 
		    	},
		        drag: function(){
		            var offset = $(this).offset();				                      
		            var xPos = offset.left - ofset_x;
		            var yPos = offset.top - ofset_y;		           
		            $('#posX').text('x: ' + xPos);
		            $('#posY').text('y: ' + yPos);		            
		        }
		    });	   		
	   });

	   download();
	   $('#canvas_draw').hide();
	});	
	
	$('.icon_move').click(function(){
		$('.icon_drag').empty();
		$.each(Icons_Styles, function (key, item) {
	   		var item_name = key.toString().split(/-(.+)?/)[1];	   		
	   		$('.icon_drag').append('<div class="drag_wrapper"><div class="dragIcon drag_'+item_name +' '+item_name+'"></div></div>');
			
			var ofset_x = 0;
		    var ofset_y = 0;
		    /*$('.dragIcon').css( { left : ofset_x+'px', icon_top : ofset_y+'px' } );*/ 		   
		    var drag_x = parseInt(bg_size.split('px')[0])/2-50;		    
		    var drag_y = parseInt(bg_size.split('px')[0])/2-50;			    
		    $('.drag_wrapper').css( { paddingLeft : drag_x, paddingTop : drag_y, paddingRight : drag_x, paddingBottom : drag_y } );
			$('.drag_'+item_name).draggable(
		    {			    	
		    	start: function(){
		    		var offset = $(this).offset();
		    		ofset_x = offset.left;
		    		ofset_y = offset.top; 
		    	},
		        drag: function(){
		            var offset = $(this).offset();				                      
		            var xPos = offset.left - ofset_x;
		            var yPos = offset.top - ofset_y;		           
		                      
		            var move_Icon = '.'+item_name+ ' .centered';		
					$(move_Icon).css( { marginLeft : (xPos*2.3)-parseInt(icon_size.split('px')[0])+'px', marginTop : (yPos*1.5)-parseInt(icon_size.split('px')[0])+'px' } );		           
		            left_content = xPos;
					top_content = yPos;					
					icon_move_item = item_name;					
					icons_style_edit = "position";
					editIcons();
		        }
		    });		    				       	
	   });
	});
			
	$('#angle-slider,#depth-slider').mousedown(function(){
		$('.icon_drag').empty();
		$('.icon_drag').addClass('hidden');				
	});

	$('.menu_tab').click(function(){
		$('.icon_drag').empty();
		$('.icon_drag').addClass('hidden');
	});

	$('.icon_move_body').click(function(){		
		$('.icon_drag').removeClass('hidden');
	});
	
	$('.icon_position_move,.icon_move').click(function(){
		$('.draggable_draw').removeClass('hidden');
	});		

	$('.colors,.shapes,.fonts,.shadows').click(function(){
		$('.select_icons,.deselect_icons,.undo_icons,.delete_icons,.font_icons,.generate_btn').removeClass('hidden');
		$('.back_icons,.position').addClass('hidden');		
		$('.back_icons,.position').addClass('hidden');
		$('#canvas_draw,.draggable_draw').addClass('hidden');   
	});
	
	/* Download */
	function download(){		
		  var zip = new JSZip();
		  flattyShadow = zip.folder("Images");		 
		  $(".custom_icons img").each( function(index){
		  	var icon_image_name = $(this).attr("id");
		    imageLink = $(this).attr('src').substring(22);
		    flattyShadow.file(icon_image_name + ".png", imageLink, {base64: true});
		  });
		  flattyShadow = zip.generate({type:"blob"});
		  saveAs(flattyShadow, "flattyShadow.zip");		  
	}

	/* Code */
	$('.code_btn').click(function(){
		var code="";
		$.each(Icons_Styles, function (key, item) {
			get_name = key.toString().toString().slice(3);
			get_name = $('.fs_icon.'+get_name).html().split('"');
			get_name = get_name[0]+'"'+get_name[1]+'"'+get_name[4];
			
			get_shape = Icons_Styles[key][0][0].toString().slice(0, -1);			
			get_angle = Icons_Styles[key][0][1];
			get_depth = Icons_Styles[key][0][2]; 
			get_bg_clr = rgb2hex(Icons_Styles[key][0][3]);
			get_shadow_clr = rgb2hex(Icons_Styles[key][0][4]);
			get_icon_clr = rgb2hex(Icons_Styles[key][0][5]);			
			get_left_pos = Icons_Styles[key][0][7];
			get_top_pos = Icons_Styles[key][0][8];			
			get_bg_trans = Icons_Styles[key][0][3].replace(/^.*,(.+)\)/,'$1');
			get_shadow_trans = Icons_Styles[key][0][4].replace(/^.*,(.+)\)/,'$1');
			get_icon_trans = Icons_Styles[key][0][5].replace(/^.*,(.+)\)/,'$1');
			get_bg_size = bg_size.split('px')[0];
			get_icon_size = icon_size.split('px')[0];

			code+='<div class="flatty_shadow" data-bg-color="'+get_bg_clr+'" data-shadow-color="'+get_shadow_clr+'" data-icon-color="'+get_icon_clr+'" data-angle="'+get_angle+'" data-depth="'+get_depth+'" data-shape="'+get_shape+'" data-bg-transparency="'+get_bg_trans+'" data-shadow-transparency="'+get_shadow_trans+'" data-icon-transparency="'+get_icon_trans+'" data-pos-x="'+get_left_pos+'" data-pos-y="'+get_top_pos+'" data-bg-size="'+get_bg_size+'" data-icon-size="'+get_icon_size+'">'+get_name+'</div>';						
		});					
		
		var zip = new JSZip();
		var xhr_css = new XMLHttpRequest();
		var xhr_js = new XMLHttpRequest();
		var xhr_html = new XMLHttpRequest();

		xhr_css.open('GET', "code/flattyshadow.css", true);
		xhr_js.open('GET', "code/flattyshadow.js", true);
		xhr_html.open('GET', "demo.html", true);

		xhr_css.responseType = "arraybuffer";		
		xhr_css.onreadystatechange = function(evt) {
		    if (xhr_css.readyState === 4) {
		        if (xhr_css.status === 200) {		            
		            zip.file("flattyshadow.css", xhr_css.response);
		            var content = zip.generate({type:"blob"});		            
		        }
		    }
		};
		xhr_css.send();

		xhr_html.responseType = "arraybuffer";		
		xhr_html.onreadystatechange = function(evt) {
		    if (xhr_html.readyState === 4) {
		        if (xhr_html.status === 200) {		            
		            zip.file("demo.html", xhr_html.response);
		            var content = zip.generate({type:"blob"});		            
		        }
		    }
		};
		xhr_html.send();

		xhr_js.responseType = "arraybuffer";
		xhr_js.onreadystatechange = function(evt) {
		    if (xhr_js.readyState === 4) {
		        if (xhr_js.status === 200) {		            		            
		            zip.file("flattyshadow.js", xhr_js.response);
		            zip.file("Icons.txt", code);
		            var content = zip.generate({type:"blob"});		
					saveAs(content, "flattyshadow.zip");
		        }
		    }
		};
		xhr_js.send();		
	});	

	$(window).on("load resize", hideDashboard);
	function hideDashboard(){
        if($(window).width() < 768){
        	$('.main_dashboard').hide();
        	$('.screen_text').text('Switch to larger screen to view Dashboard.');
        }
        else{
        	$('.screen_text').html('<p>All Icons in the Dashboard are free to use, <span class="get_started_btn">Get Started..!!</span></p>');
        }        

    }
	</script>
	<script type="text/javascript">
		$(".create_btn,.dashboard_btn,.get_started_btn").click(function() {
			$('.main_dashboard').show();
		    $('html, body').animate({
		        scrollTop: $(".main_dashboard").offset().top
		    }, 1000);
		});

		$(".download_lib").click(function() {			
		    $('html, body').animate({
		        scrollTop: $(".download_code_section").offset().top
		    }, 700);
		});

		$(".Icons_btn").click(function() {			
		    $('html, body').animate({
		        scrollTop: $(".icons_section").offset().top
		    }, 400);
		});

		$(".how_btn").click(function() {			
		    $('html, body').animate({
		        scrollTop: $(".how_to_use").offset().top
		    }, 550);
		});

		$('.dashboard_code_btn').click(function(e) {
		    e.preventDefault();  //stop the browser from following
		    window.location.href = 'flattyshadow.zip';
		});
		
	</script>	
	<script>
		$(function() {
			var pull 		= $('#pull');
				menu 		= $('nav ul');
				menuHeight	= menu.height();

			$(pull).on('click', function(e) {
				e.preventDefault();
				menu.slideToggle();
			});

			$(window).resize(function(){
        		var w = $(window).width();
        		if(w > 320 && menu.is(':hidden')) {
        			menu.removeAttr('style');
        		}
    		});
		});		
	</script>
	<script type="text/javascript">
		$('#search_fa_text').keyup(function(){
			var fa_search = $("#search_fa_text").val();

			jQuery('.fa').each(function() {
			    var fa_class = $(this).attr("class");
	   			
	   			if (fa_class.indexOf(fa_search) >= 0){
	   				$(this).parents('a').show();
	   			}
	   			else{
	   				$(this).parents('a').hide();
	   			}			    			    
			});
		});
	</script>
	<script type="text/javascript">
		$('a').click(function(e){
			e.preventDefault();
		})
		$(".menu_tab").click(function() {
		   var selected_tab = this.className;
		   var tab = selected_tab.split(' ')[1];
		   $('.submenu').removeClass('active_submenu');
		   $('.'+tab).addClass('active_submenu');		   
		});
		$('.view_icons_btn').click(function(){
			window.open('https://getdpd.com/cart/hoplink/19437?referrer=8wkc6rv8ur0o08sc', '_blank');
		});
		
	</script>

	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-56518620-1', 'auto');
	  ga('send', 'pageview');

	</script>

	<script type="text/javascript">
		$(".contribute_btn").click(function () {
		    $(".file_upload").click();
		});

		$(".file_upload").change(function () {
		    //file input control returns the file path as C:\fakepath\<file name>
		    //on windows, so we remeove it and show only file name.
		    var file=$(this).val().replace(/C:\\fakepath\\/ig,'');
		    if(file==""){
		    	file = '<i class="fa fa-cloud-upload"></i> Contribute';
		    }
		    else{
		    	file = '<i class="fa fa-cloud-upload"></i> '+file;
		    }		    
		    $(".contribute_btn").html(file);
		    $('#file_contribute').submit();
		});

		$('.opl').click(function(){
			window.open('http://onepagelove.com/flatty-shadow', '_blank');
		});

		$('.cssda').click(function(){
			window.open('http://www.cssdesignawards.com/sites/flatty-shadow/25589/', '_blank');
		});

		$('.cssw').click(function(){
			window.open('http://www.csswinner.com/details/flatty-shadow/8340', '_blank');
		});
		
		$('.cssreel').click(function(){
			window.open('http://cssreel.com/Website/flatty-shadow', '_blank');
		});
		
	</script>