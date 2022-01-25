// Detect browser
const isFirefox = typeof InstallTrigger !== 'undefined';
const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
const isIE = /*@cc_on!@*/false || !!document.documentMode;
const isEdge = !isIE && !!window.StyleMedia;

let scrolltrigger = 0;
const winheight = $(window).height();
let newsStatus = false;

// Browser specificities
if (isFirefox == true || isSafari == true || isEdge == true) {
	$(window).ready(function () {
		if( isEdge == true){
			$("[class^='background_section'], #planet, #sun, #city_block, .space_items").css("transform", "translateX(0) translateY(0) translateZ(0) scale(1)");
			$(".hole_content").css("bottom", "calc(-20vw + var(--portalHeight))");
		}
		$("#clients .space_items #sun").css("top", "5%");
		scrolltrigger = winheight;

		setup();
	});
}
else {
	$(window).on("load", function () {
		$("[class^='background_section'], #planet, #sun, #city_block").css("transition", "none");
		$(".hole_content").css("bottom", "calc(-15vw + var(--portalHeight) - 250px)");
		$(".wave_BG_01").css("bottom", "70%", "!important");
		$(".wave_BG_02").css("bottom", "80%", "!important");
		$(".glow").css("bottom", "50%", "!important");
		// $(".background_section_02").css("height", "75%");
		scrolltrigger = parseInt($("#services_anchor").offset().top);
		setup();
		if(newsStatus == false){
			setTimeout(() => {
				newsTweeter();
			}, 500);
		}
	});
}

function setup() {
	let currentAnimation = false;
	let wheelStatus = false;
	let wheelAutoOpened = false;
	const wheel = parseInt($("#techno_wheel .wheel").offset().top) - 500;
	const p1 = parseInt($(".portal-1 .front_wave").offset().top);
	const p2 = parseInt($(".portal-2 .front_wave").offset().top);
	const p3 = parseInt($(".portal-3 .front_wave").offset().top);
	const p4 = parseInt($(".portal-4 .front_wave").offset().top);
	const fixedNav = $("#fixed_nav");
	const technoWheel = $("#techno_wheel .wheel");
	const skills = $("#skills .circle_list");
	$("#parallax").scroll(function () {
		let wintop = document.getElementById("parallax").scrollTop;
		//	Show fixed nav
		if (currentAnimation == false && wintop >= scrolltrigger) {
			fixedNav.stop().animate({ top: '0' });
			currentAnimation = true;
		}
		else if(currentAnimation == true && wintop < scrolltrigger){
			fixedNav.stop().animate({ top: '-80px' });
			currentAnimation = false;
		}

		// Techno wheel - Auto open
		if (wheelAutoOpened == false && wintop >= wheel) {
			technoWheel.css({ "width": "150px", "height": "150px" });
			skills.css({ "transform": "scale(1)" });
			wheelStatus = true;
			wheelAutoOpened = true;
		}
		if (newsStatus == true && wintop >= $(window).height() && wintop <= $(window).height()+100) {
			newsTweeter();
		}

		// TODO: Optimize the JQuery selector in contant
		// Hide portal hole
		// if(wintop >= p1){
		// 	$(".portal-1 .hole_content").css({ "display": "none" });
		// }
		// else $(".portal-1 .hole_content").css({ "display": "block" });
		
		// if(wintop >= p2){
		// 	$(".portal-2 .hole_content").css({ "display": "none" });
		// }
		// else $(".portal-2 .hole_content").css({ "display": "block" });

		// if(wintop >= p3){
		// 	$(".portal-3 .hole_content").css({ "display": "none" });
		// }
		// else $(".portal-3 .hole_content").css({ "display": "block" });

		// if(wintop >= p4){
		// 	$(".portal-4 .hole_content").css({ "display": "none" });
		// }
		// else $(".portal-4 .hole_content").css({ "display": "block" });
	});

	// Carousel
	carousel(1);
	function carousel(i) {
		if (i >= 7) i = 1;
		$("#skills [class^='myarrow'] > *").css("border-color", "white", "!important");
		$("#skills [class^='myarrow'].arr" + i + " > *").css("border-color", "#F3B110", "!important");

		let description = $("#skills [class^='myarrow'].arr" + i).attr("data-description");
		$("#skills #platform_wheel #text").text(description);
		window.setTimeout(
			function () {
				carousel(++i);
			},
			1500);
	}


	// Techno wheel - On click
	if ($(window).width() >= 500) {
		$("#techno_wheel .wheel").click(function () {
			if (wheelStatus == false) {
				$("#techno_wheel .wheel").css({ "width": "150px", "height": "150px" });
				$("#skills .circle_list").css({ "transform": "scale(1)" });
				wheelStatus = true;
			}
			else {
				$("#techno_wheel .wheel").css({ "width": "300px", "height": "300px" });
				$("#skills .circle_list").css({ "transform": "scale(0)" });
				wheelStatus = false;
			}
		});
	}

	// Display text description
	$("#techno_wheel .circle_list div").hover(
		function () {
			$("div", this).css("opacity", "1");
		},
		function () {
			$("div", this).css("opacity", "0");
		}
	);
};
function newsTweeter(){
	if (newsStatus == false) {
		$(".twitterContent").animate({ "bottom": "0" });
		$("#fixed_news").stop().animate({ "height" : "630px", "width" : "550px" });
		setTimeout(
			function() 
			{
				$("#fixed_news .circle").css({ "transform": "rotate(45deg)" });
			}, 500);
		newsStatus = true;
	}

	else {
		$(".twitterContent").animate({ "bottom" : "-120%" });
		$("#fixed_news").animate({ "height" : "60px", "width" : "120px" });
		setTimeout(
			function() 
			{
				$("#fixed_news .circle").css({ "transform": "rotate(0)" });
			}, 500);
		newsStatus = false;
	}
}
