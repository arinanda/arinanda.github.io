/**
*   Glitche (HTML)
*   Copyright © Glitche by beshleyua. All Rights Reserved.
**/

$(function () {
	'use strict';
	
	$(window).unload(function() {});
	
	/* Set full height in blocks */
	var width = $(window).width();
	var height = $(window).height();
	$('.section.started').css({'height': height-60});
	
	/* Typed preload text */
	$('.typed-load').typed({
		stringsElement: $('.typing-load'),
		loop: true
	});
	
	/* Preloader */
	$(window).load(function() {
		$(".preloader .pre-inner").fadeOut(800, function(){
			/* Preload hide */
			$('.preloader').fadeOut();
			$('body').addClass('loaded');
			
			/* Typed subtitle */
			$('.typed-subtitle').typed({
				stringsElement: $('.typing-subtitle'),
				loop: true
			});
			
			/* Typed breadcrumbs */
			$('.typed-bread').typed({
				stringsElement: $('.typing-bread'),
				showCursor: false
			});

			/* One Page Nav */
			var url_hash = location.hash;
			var sectionElem = $(url_hash);
			if(url_hash.indexOf('#section-') == 0 && sectionElem.length){
				$('body, html').animate({scrollTop: $(url_hash).offset().top - 72}, 400);
			}
		});
	});
	
	/*Fade-out animation between load pages*/
	$('header .top-menu, .typed-bread').on('click', 'a', function(){
		var link = $(this).attr('href');
		if(link.indexOf('#section-') == 0){
			if(!$('body').hasClass('home')){
				location.href = '/'+link;
			}

			$('body, html').animate({scrollTop: $(link).offset().top - 110}, 400);
			if($('header').hasClass('active')){
				$('.menu-btn').trigger('click');
			}
		} else {
			$('body').removeClass('loaded');
			setTimeout(function() {
				location.href = "" + link;
			}, 500);
		}
		return false;
	});
	
	/*Menu mobile*/
	$('header').on('click', '.menu-btn', function(){
		if($('header').hasClass('active')){
			$('header').removeClass('active');
			$('body').addClass('loaded');
		} else {
			$('header').addClass('active');
			$('body').removeClass('loaded');
		}
		
		return false;
	});
	
	/* Hide mouse button on scroll */
	$(window).scroll(function(){
		if ($(this).scrollTop() >= 1 /*$('#blue_bor').offset().top*/) {
			$('.mouse_btn').fadeOut();
		}
		else {
			$('.mouse_btn').fadeIn();
		}
	});
	
	/* On click mouse button, page scroll down */
	$('.section').on('click', '.mouse_btn', function(){
		$('body,html').animate({
			scrollTop: height - 150
		}, 800);
	});
	
	$('body').on({
		mouseenter: function () {
			$(this).addClass('glitch-effect-white');
		},
		mouseleave: function () {
			$(this).removeClass('glitch-effect-white');
			$('.top-menu ul li.active a.btn').addClass('glitch-effect-white');
		}
	}, 'a.btn, .btn');
	
	/* Validate contact form */
	$("#cform").validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
		submitHandler: function() {
			$.ajax({
				url: 'mailer/feedback.php',
				type: 'post',
				dataType: 'json',
				data: 'name='+ $("#cform").find('input[name="name"]').val() + '&email='+ $("#cform").find('input[name="email"]').val() + '&message=' + $("#cform").find('textarea[name="message"]').val(),
				beforeSend: function() {
				
				},
				complete: function() {
				
				},
				success: function(data) {
					$('#cform').fadeOut();
					$('.alert-success').delay(1000).fadeIn();
				}
			});
		}
	});
	
	/* Validate commect form */
	$("#comment_form").validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
		submitHandler: function() {
		}
	});
	
	/* Initialize masonry items */
	var $container = $('.box-items');
	
	$container.imagesLoaded(function(){
		$container.multipleFilterMasonry({
			itemSelector: '.box-item',
			filtersGroupSelector: '.filters',
			percentPosition: true,
			gutter: 0
		});
	});
	
	/* Initialize masonry filter */
	$('.filters label').on('change', 'input[type="checkbox"]', function() {
		if ($(this).is(':checked')) {
			$(this).parent().addClass('glitch-effect');
		}
		else {
			$(this).parent().removeClass('glitch-effect');
		}
		/* Refresh Portfolio magnific popup */
		$('.has-popup').magnificPopup({
			type: 'inline',
			overflowY: 'auto',
			closeBtnInside: true,
			mainClass: 'mfp-fade'
		});
	});
	
	/* Portfolio magnific popup */
	$('.has-popup').magnificPopup({
		type: 'inline',
			overflowY: 'auto',
			closeBtnInside: true,
			mainClass: 'mfp-fade'
	});
	
	/* Resize function */
	$(window).resize(function() {
		var width = $(window).width();
		var height = $(window).height();
		
		$('.section.started').css({'height': height-60});
	});
	
	if(width < 840) {
		$('.section.started').css({'height': height-30});
	}

	/* One Page Menu Nav */
	if($('.section').length && $('.top-menu li a').length) {
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				if($(this).attr('href').indexOf('#section-') == 0){
					var currLink = $(this);
					var refElement = $(currLink.attr("href"));
					if(refElement.length){
						if (refElement.offset().top <= scrollPos + 110) {
							$('.top-menu ul li').removeClass("active");
							currLink.closest('li').addClass("active");
						}
					}
					if(scrollPos == 0) {
						$('.top-menu ul li').removeClass("active");
					}
				}
			});
		});
	}

	$('.theme_panel .toggle_bts').on('click', 'a', function(){
		if($(this).hasClass('active')) {

			$(this).removeClass('active');
            $('.theme_panel').removeClass('active');
			
			return false;
		}
		else {

			$(this).addClass('active');
            $('.theme_panel').addClass('active');
		}
	});
});