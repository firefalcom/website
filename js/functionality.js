$(document).ready(function(){

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


		//Parallax
		$("[class^='background_section']").each(function (e) { 
			let strength = -2;
			let paralax = wintop / strength; // calculate the paralax
			let paralax_fault = $(this).offset().top / strength; // calculate the error size

			$(this).css("top", paralax_fault - paralax);
		});

		
		if($(window).width() >= 1000){//Lock parallax for small screen
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
	});

	// Update the paralax position as soon as posible (note, a simple call doesn't work)
	setTimeout(
		function() {
			$(window).scroll();
		}, 1);

});
