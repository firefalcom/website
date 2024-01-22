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
		}
		$("#clients .space_items #sun").css("top", "5%");
		scrolltrigger = winheight;

		setup();
	});
}
else {
	$(window).on("load", function () {
		$("[class^='background_section'], #planet, #sun, #city_block").css("transition", "none");
		scrolltrigger = parseInt($("#services_anchor").offset().top);
		setup();
	});
}

function setup() {
	let currentAnimation = false;
	let wheelStatus = false;
	let wheelAutoOpened = false;
	const wheel = parseInt($("#techno_wheel .wheel").offset().top) - 500;
	// const p1 = parseInt($(".portal-1 .front_wave").offset().top);
	// const p2 = parseInt($(".portal-2 .front_wave").offset().top);
	// const p3 = parseInt($(".portal-3 .front_wave").offset().top);
	// const p4 = parseInt($(".portal-4 .front_wave").offset().top);
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

	// Portfolio header slider
	function portfolioSlider() {
		var $portfolioList = $("#portfolio ul li");
		var numberOfItems = $portfolioList.length;
		var currentIndex = 0;
		var canClick = true;
		var scrollPortfolioInterval = 0;

		function scrollPortfolio(indexIncrement=1) {
			$portfolioList.fadeOut(500);
			currentIndex += indexIncrement;
			if(currentIndex >= numberOfItems)
			{
				currentIndex = 0;
			}
			else if(currentIndex <= 0)
			{
				currentIndex = numberOfItems - 1;
			}
			console.log(currentIndex);
			const currentElement = $portfolioList[currentIndex];
			setTimeout(() => {
				$(currentElement).fadeIn(500);
			}, 500);
		}
		scrollPortfolioInterval = setInterval(scrollPortfolio, 7500);

		// Manage click nav
		$("#arrow_carrousel #right").click(() => {
            if(canClick)
            {
                scrollPortfolio(+1);
                canClick = false;
                
                canClickTimeout = setTimeout(() => {
                    canClick = true;
                }, 1000);
				clearInterval(scrollPortfolioInterval);
				scrollPortfolioInterval = setInterval(scrollPortfolio, 7500);
            }
        });

		$("#arrow_carrousel #left").click(() => {
            if(canClick)
            {
                scrollPortfolio(-1);
                canClick = false;
                
                canClickTimeout = setTimeout(() => {
                    canClick = true;
                }, 1000);
				clearInterval(scrollPortfolioInterval);
				scrollPortfolioInterval = setInterval(scrollPortfolio, 7500);
            }
        });
	}	  
	portfolioSlider();

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

// Twitter info bubble
function popupInfoBubble(){
	$(".popup_info_bubble").css({"display": "none"});
}

// Twitter button
function newsTwitter(){
	if (newsStatus == false) {
		$(".twitterContent").animate({ "bottom": "0" });
		$("#fixed_news").stop().animate({ "height" : "630px", "width" : "550px" });
		popupInfoBubble();
		setTimeout(
			function() 
			{
				$("#fixed_news .circle").css({ 'background': 'url("images/logos/twitter_white.svg") no-repeat center center / 0%, #1d9bf0' });
				$("#fixed_news .circle .bar").css({ "opacity": "1" });
			}, 500);
		newsStatus = true;
	}

	else {
		$(".twitterContent").animate({ "bottom" : "-120%" });
		$("#fixed_news").animate({ "height" : "60px", "width" : "50px" });
		setTimeout(
			function() 
			{
				$("#fixed_news .circle").css({ 'background': 'url("images/logos/twitter_white.svg") no-repeat center center / 60%, #1d9bf0' });
				$("#fixed_news .circle .bar").css({ "opacity": "0" });
			}, 500);
		newsStatus = false;
	}
}
