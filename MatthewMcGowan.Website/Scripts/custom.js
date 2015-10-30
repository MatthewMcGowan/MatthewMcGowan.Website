/**
 * global vars init
 */
 var $headerHeight,
 $isMobile,
 $isDesktop,
 $mapType,
 $mapStyle,
 $wall,
 $mySwiperCentered,
 $tabsSwiper,
 $mySwiperVertical,
 $mySwiperHorizontal,
 $mySwiperParent,
 $mySwiperChild;




/**
 * Windows event
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
 $(window).on("resize",function(e){

 	/* Ipad Modernizr Test */
 	Modernizr.addTest('ipad', function () {
 		return !!navigator.userAgent.match(/iPad/i);
 	});

 	/* Main Menu */
 	if (!Modernizr.ipad) {  
 		initializeMainMenu(); 
 	}
 	preHeaderManagment();
 	$('.sub-menu').hide();


 	/* mobile detection */
 	if(Modernizr.mq('only all and (max-width: 767px)') ) {
 		$isMobile = true;
 	}else{
 		$isMobile = false;
 	}
 	/* tablette and mobile detection */
 	if(Modernizr.mq('only all and (max-width: 1025px)') ) {
 		$isDesktop = false;
 	}else{
 		$isDesktop = true;
 	}

 });



/**
 * Load and resize 
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
// $(window).on("load resize",function(e){


/**
 * document ready
 */
 (function($) {
 	"use strict";


 	/* var asign */
 	$headerHeight = ($('.menu-header.navbar-fixed-top').length)?$('.menu-header.navbar-fixed-top').outerHeight():0;


 	/* mobile detection initial test*/
 	if(Modernizr.mq('only all and (max-width: 767px)') ) {
 		$isMobile = true;
 	}else{
 		$isMobile = false;
 	}
 	/* tablette and mobile detection initial test*/
 	if(Modernizr.mq('only all and (max-width: 1025px)') ) {
 		$isDesktop = false;
 	}else{
 		$isDesktop = true;
 	}


	/*
	|--------------------------------------------------------------------------
	| Main menu
	|--------------------------------------------------------------------------
	*/
	preHeaderManagment();
	initializeMainMenu();
	

	/* on scroll detection */
	if($('.header-transparent').length || $('.header-6').length){
		$(window).scroll(function(){
			if($(window).scrollTop() > 40){
				$('.menu-header').addClass('scroll-header');
			}else{
				$('.menu-header').removeClass('scroll-header');
			} 
		});
	}


	/*
	|--------------------------------------------------------------------------
	| FREE WALL
	|--------------------------------------------------------------------------
	*/		

	if($("#freewall").length){

		var gutterX = ($("#freewall").data('gutterx'))?$("#freewall").data('gutterx'):0 ,
		gutterY     = ($("#freewall").data('guttery'))?$("#freewall").data('guttery'):0;


		$wall = new freewall("#freewall");
		$wall.reset({
			selector: '.brick',
			animate: true,
			cellW: function(){
				var customWidth = 380;
				if(Modernizr.mq('only all and (max-width: 421px)')){
					customWidth = 100;
				}
				return customWidth;
			},
			cellH: 'auto',
			gutterX:gutterX,
			gutterY:gutterY,
			onResize: function() {
				$wall.fitWidth();

			},
			onComplete:function() {
				if ($isDesktop === true && $('.parallax').length){
					setTimeout(function(){
						$.stellar('refresh');
					}, 300);
				}
			}
		});

		$wall.container.find('.caption img').load(function() {
			$wall.fitWidth();
		});

		$(".filter-label").click(function() {
			$(".filter-label").removeClass("active");
			var filter = $(this).addClass('active').data('filter');
			if (filter) {
				$wall.filter(filter);
			} else {
				$wall.unFilter();
			}

			if ($isDesktop === true && $('.parallax').length){
				setTimeout(function(){
					$.stellar('refresh');
				}, 300);
			}

		});


	}





    /*
    |--------------------------------------------------------------------------
    | SCROLL NAV
    |--------------------------------------------------------------------------
    */ 
    if($('#scroll-menu').length || $('.scroll-link').length){

    	$('#global-wrapper').on( 'click', '#scroll-menu li a, .scroll-link',function(event) {

    		var $anchor  = $(this),
    		content      = $anchor.attr('href'),
    		checkURL     = content.match(/^#([^\/]+)$/i);


    		if(checkURL){
    			event.preventDefault();
    			if( $('.navbar-toggle').length && $('.navbar-toggle').css('display') == 'block' && $anchor.parents('#scroll-menu').length ){
    				$('.navbar-toggle').trigger('click');
    				var Hheight     = $('.navbar-header').height();
    			}else{
    				var Hheight     = ( $('#scroll-menu').length && $('.navbar-toggle').css('display') != 'block' )?$('#scroll-menu').outerHeight(true):$('.navbar-header').height();
    			}
    			
    			var computedOffset  = $($anchor.attr('href')).offset().top - parseInt(Hheight) + 1;

    			$('html, body').stop().animate({
    				scrollTop : computedOffset + "px"
    			}, 1200, 'easeInOutExpo');
    		}
    	});
    }



 	/*
    |--------------------------------------------------------------------------
    | FULL page
    |--------------------------------------------------------------------------
    */ 

    if($('#fullpage').length){
    	var paddingtop = $('.menu-header').outerHeight(true);

    	$('#fullpage').fullpage({
    		anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
    		sectionsColor: ['#fff', '#549982', '#E2E0C2', '#6E4F26'],
    		navigation: true,
    		resize :false,
    		navigationPosition: 'right',
    		navigationTooltips: ['Home', 'GitHub', 'Cycling', 'Travel'],
    		responsive: 900,
    		paddingTop: paddingtop+'px'
    	});	
	}


}) (jQuery); //END DOC READY



$( window ).load(function() {

	"use strict";

}); //END WINDOW LOAD



/**
 * Fulscreen fucntion
 */

 function fullscreen($obj, $realfs){
 	var $body_offset = 0;
 	if($realfs == undefined){
 		var $body_offset = parseInt($('body').css('padding-top'));
 	}

 	

 	$obj.css({height:$(window).height() - $body_offset });
 	$obj.css({width:$(window).width()});


 	$(window).on('resize', function () {
 		$obj.css({height:$(window).height() - $body_offset});
 		$obj.css({width:$(window).width()});
 	});
 }

/**
 * PRE HEADER MANAEMENT
 */
 function preHeaderManagment() {

 	if(!$('.shop-pre-header').length){

		if($('.navbar-fixed-top').length && $('.pre-header-on').length || $('.navbar-fixed-top').length && $('.pre-header-on-sm').length && 
			Modernizr.mq('only all and (min-width: 768px)') ){
			var $window = $(window),
			$offsetPreheader = ($('.pre-header-on').length)?$('#pre-header').height():80;
			/* initial state detection */
			if( $window.scrollTop() >= $offsetPreheader  ){
				$('.pre-header-on #pre-header, .pre-header-on-sm #pre-header').hide();
			}else{
				$('.pre-header-on #pre-header, .pre-header-on-sm #pre-header').show();
			}

			/* on scroll detection */
			$window.bind("scroll.preheaderscroll", function(){
				if($window.scrollTop() > 40){
					$('body.pre-header-on  #pre-header, .pre-header-on-sm #pre-header').stop(true, false).slideUp(150).end();
				}else{
					$('body.pre-header-on  #pre-header, .pre-header-on-sm #pre-header').slideDown(150).end();
				} 
			});
		}else{
			$('#pre-header').css('display', 'none');
			$(window).unbind(".preheaderscroll");
		}

 	}

}
/**
 * MAIN MENU (submenu slide and setting up of a select box on small screen)
 */

 function initializeMainMenu() {

 	"use strict";
 	var $mainMenu = jQuery('.menu-header .navbar-collapse').children('ul');


 	if(Modernizr.mq('only all and (max-width: 1024px)') || Modernizr.touch && Modernizr.mq('only all and (max-width: 1024px)')) {

 		var addActiveClass = false;

 		jQuery("li a.has-sub-menu").unbind('click');
 		$('li',$mainMenu).unbind('mouseenter mouseleave');


 		$("a.has-sub-menu").on("click", function(e) {

 			var $this = jQuery(this);	
 			e.preventDefault();

 			addActiveClass = $this.parent("li").hasClass("Nactive");

 			$this.parent().removeClass("Nactive");
 			$this.next('.sub-menu').slideUp('fast');


 			if(!addActiveClass) {
 				$this.parents("li").addClass("Nactive");
 				$this.next('.sub-menu').slideDown('fast');
 			}

 			return false;
 		});

 	}else if(  Modernizr.touch && Modernizr.mq('only all and (min-width: 1024px)') ){

 		jQuery("li", $mainMenu).removeClass("Nactive");
 		jQuery('li a', $mainMenu).unbind('click');

 		$("a.has-sub-menu").on("click", function(e) {

 			e.preventDefault();

 			var $this = jQuery(this),
 			$subMenu = $this.parent().children('.sub-menu'),
 			$header_H = $('.menu-header').outerHeight(true);



 			if($this.parent().parent().is(jQuery(':gt(1)', $mainMenu))){

 				$subMenu.stop(true, true).fadeIn(200,'easeInOutQuad'); 
 				$subMenu.css('left', $subMenu.parent().outerWidth(true));

 			}else{

 				$('.sub-menu').css('display', 'none');
 				if($subMenu.css('display') == 'none'){


 					var preheaderoffset = 0;
 					var offset = 0;
 					if($('#pre-header').css('display') == 'block'){
 						preheaderoffset = $('#pre-header').outerHeight(true);
 					}

 					if($('.header-6').length || $('.header-7').length){
 						var $displayState = ($subMenu.hasClass('neko-mega-menu'))?'table':'block';
 						$subMenu.css('top', ($header_H - preheaderoffset ) + offset);

 					}else{
 						if($('.header-1').length && !$('.scroll-header').length){
 							offset = - parseInt($('.menu-header').css('padding-bottom'));
 						}

 						$subMenu.css('top', ($header_H - preheaderoffset) + offset); 
 					}
 					$subMenu.stop(true, true).delay( 300 ).fadeIn(200,'easeInOutQuad', function(){});
 				}
 			}
 		});
	}else{

		jQuery("li", $mainMenu).removeClass("Nactive");
		jQuery('li a', $mainMenu).unbind('click');

		$('li',$mainMenu).hover(

			function() {

				var $this = jQuery(this),
				$subMenu = $this.children('.sub-menu'),
				$header_H = $('.menu-header').outerHeight(true);


				if($this.parent().is(jQuery(':gt(1)', $mainMenu))){
					$subMenu.stop(true, true).fadeIn(200,'easeInOutQuad'); 
					$subMenu.css('left', $subMenu.parent().outerWidth(true));
				}else{

					var preheaderoffset = 0;
					var offset = 0;
 					if($('#pre-header').css('display') == 'block'){
 						preheaderoffset = $('#pre-header').outerHeight(true);
 					}


					if($('.header-6').length || $('.header-7').length){
						var $displayState = ($subMenu.hasClass('neko-mega-menu'))?'table':'block';

						$subMenu.css('top', ($header_H - preheaderoffset ) + offset); 

					}else{

						if($('.header-1').length && !$('.scroll-header').length){
							offset = - parseInt($('.menu-header>.container').css('padding-bottom'));
						}else if($('.header-4').length ){
							offset = 2;
						}
		
 						$subMenu.css('top', ($header_H - preheaderoffset) + offset); 

					}
					$subMenu.stop(true, true).delay( 300 ).fadeIn(200,'easeInOutQuad', function(){});
				}

			}, function() {

				var $this = jQuery(this),
				$subMenu = $this.children('ul, div');

				if($this.parent().is(jQuery(':gt(1)', $mainMenu))){
					$this.children('ul').hide();


				}else{

					$subMenu.stop(true, false).delay( 300 ).fadeOut(0);
					if( $subMenu.length ){$this.removeClass('hover');}

				}

			});
	}
}