$(document).ready(function(){

	// Detect browser
	var isFirefox = typeof InstallTrigger !== 'undefined';
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

	if(isFirefox == true || isSafari == true){
		$("[class^='background_section'], #planet, #sun, #city_block").css("transition", "all ease-in-out 0.25s");
	}
	else{
		$("[class^='background_section'], #planet, #sun, #city_block").css("transition", "none");
	}

	var currentAnimation = "before";
	// capture scroll any percentage
	$(window).scroll(function(){
		let wintop = $(window).scrollTop();
		let  scrolltrigger = parseInt($("#services_anchor").offset().top);

		//	Show fixed nav		
		if (wintop >= scrolltrigger) {
			if(currentAnimation == "before"){
				$("#fixed_nav").stop().animate({top: '0'});
				currentAnimation = "after";
			}
		}
		else{
			if(currentAnimation == "after"){
				$("#fixed_nav").stop().animate({top: '-80px'});
				currentAnimation = "before";
			}
		}

		if(isFirefox != true){
			//Parallax
			$("[class^='background_section'], #planet, #sun, #city_block").each(function (e) { 
				let strength = -2;
				let paralax = wintop / strength; // calculate the paralax
				let paralax_fault = $(this).offset().top / strength; // calculate the error size

				$(this).css("top", paralax_fault - paralax);
			});

		
			if($(window).width() >= 1000){	//Lock parallax for small screen
				// PORTALS
				$(".hole_content").each(function (e) { 
					let strength = 3.5;
					let paralax = wintop / strength; // calculate the paralax
					let default_position = (80 * ($(window).height() / 100)) - (15 * ($(window).width() / 100));
					let paralax_fault = ($(this).height() * 1.5 - $(this).offset().top) / strength; // calculate the fault due to the paralax

					$(this).css("bottom", default_position - paralax_fault - paralax);
				});

				$(".wave_BG_01").each(function (e) { 
					let strength = 3;
					let paralax = wintop / strength; // calculate the paralax
					let default_position = (80 * ($(window).height() / 100)) - (2 * ($(window).width() / 100));
					let paralax_fault = ($(this).height() * 1.5 - $(this).offset().top) / strength; // calculate the fault due to the paralax

					$(this).css("bottom", default_position - paralax_fault - paralax);
				});

				$(".wave_BG_02").each(function (e) { 
					let strength = 2;
					let paralax = wintop / strength; // calculate the paralax
					let default_position = (80 * ($(window).height() / 100)) + (8 * ($(window).width() / 100));
					let paralax_fault = ($(this).height() * 2 - $(this).offset().top) / strength; // calculate the fault due to the paralax

					$(this).css("bottom", default_position - paralax_fault - paralax);
				});

				$(".glow").each(function (e) { 
					let strength = 2;
					let paralax = wintop / strength; // calculate the paralax
					let default_position = (80 * ($(window).height() / 100)) - (10 * ($(window).width() / 100));
					let paralax_fault = ($(this).height() * 0.45 - $(this).offset().top) / strength; // calculate the fault due tot the paralax

					$(this).css("bottom", default_position - paralax_fault - paralax);
				});
			}
		}
	});

	// Update the paralax position as soon as posible (note, a simple call doesn't work)
	setTimeout(
		function() {
			$(window).scroll();
		}, 1);


	
	// Carousel
	carousel(1);
	function carousel(i){
		if(i >= 7) i = 1;		
		$("#skills [class^='myarrow'] > *").css("border-color", "white", "!important");
		$("#skills [class^='myarrow'].arr"+i+" > *").css("border-color", "#F3B110", "!important");

		let description = $("#skills [class^='myarrow'].arr"+i).attr("data-description");
		$("#skills #platform_wheel #text").text(description);
		window.setTimeout(
			function(){
				carousel(++i);
			},
		1500);
	}


	// Techno wheel
	if($(window).width() >= 500){
		let status = 0;
		$("#techno_wheel .wheel").click(function(){
			if(status == 0){
				status =1;
				$("#techno_wheel .wheel").css({"width": "150px", "height": "150px"});
				$("#skills .circle_list").css({"transform": "scale(1)"});
			}
			else{
				$("#techno_wheel .wheel").css({"width": "300px", "height": "300px"});
				$("#skills .circle_list").css({"transform": "scale(0)"});
				status =0;
			}
		});
	}

	// Display text description
	$("#techno_wheel .circle_list div").hover(
		function(){
			$("div", this).css("opacity", "1");
		},
		function(){
			$("div", this).css("opacity", "0");
			
		}
	);

});
