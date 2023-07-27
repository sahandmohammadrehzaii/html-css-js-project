/* ----------------------------- 
Pre Loader
----------------------------- */
$(window).load(function() {
	'use strict';
	$('.preloader').delay(500).fadeOut();
	$('loading-icon').delay(800).fadeOut('slow');
});


$(window).ready(function() {
	'use strict';
/*--------------------------------
About and features Tab
--------------------------------*/
	$('.tab-nav li').on('click', function(e) {
		var this_li = $(this),
			tabs = this_li.parent().parent(),
			target = $.trim(this_li.find('a').attr('href').substring(1)),
			all_tab_li = tabs.find('ul li');
			
			all_tab_li.removeClass('tab-selected').find('a[href="#'+ target +'"]')
			.parent().addClass('tab-selected');
			
			tabs.find('.tab').fadeIn();
			tabs.find('.tab:not(".'+ target +'")').hide();
			e.preventDefault();
			
	});

/*--------------------------------
One page Navigation 
--------------------------------*/
	$('.navigation').onePageNav({
		currentClass: 'current',
		scrollSpeed: 1000
	});

/*--------------------------------
Image Slider
--------------------------------*/
	$('.slider').bxSlider({
		pager: false,
		auto: true,
		adaptiveHeight: true,
		onSliderLoad: function() {
			$('.bx-controls-direction a').html('');
		}
	});

/*--------------------------------
Countdown timer
--------------------------------*/
	$(".time").countdown({
		date: "april 20, 2024 16:00:00", /* Update This For Counter Date */
		leadingZero: true,
		htmlTemplate: '<div id="counter-sec" class="countdown col-md-3 col-xs-6 col-sm-3 c_last"><div><span class="count-int">%s</span><span class="count-text">ثانیه</span></div></div><div id="counter-min" class="countdown col-md-3 col-xs-6 col-sm-3"><div><span class="count-int">%i</span><span class="count-text">دقیقه</span></div></div><div id="counter-hour" class="countdown col-md-3 col-xs-6 col-sm-3"><div><span class="count-int">%h</span><span class="count-text">ساعت</span></div></div><div id="counter-day" class="countdown col-md-3 col-xs-6 col-sm-3"><div><span class="count-int">%d</span><span class="count-text">روز</span></div></div>',
	});

/*--------------------------------
Mailchimp
--------------------------------*/
	$('#mailchimp-form').ajaxChimp({
		callback: mailchimpCallback, /* replace url inside '' */
    	url: 'http://themegret.us9.list-manage1.com/subscribe/post?u=05c9c728caa33814788546457&id=79a59df02a'
	});

	function mailchimpCallback(resp) {
		 if(resp.result === 'success') {
			$('.subscription-success')
				.html(resp.msg)
				.delay(500)
				.fadeIn(1000);

			$('.subscription-success').delay(5000).fadeOut(400);
			
		} else if(resp.result === 'error') {
			$('.subscription-failed')
				.html(resp.msg)
				.delay(500)
				.fadeIn(1000);
				
			$('.subscription-failed').delay(5000).fadeOut(400);
		}
		$('#subscription-form .input-email').val('');
	};

/*--------------------------------
Fixed navigation bar
--------------------------------*/
	$(window).scroll(function(e) {
		var scrollPos = $(window).scrollTop();
		if (scrollPos > 2) {
			$('.header').addClass('scrolling');
		} else {
			$('.header').removeClass('scrolling');
		}
	});

/*--------------------------------
Input placeholder for all browsers
--------------------------------*/
	$('input, textarea').placeholder();

/*--------------------------------
niceScroll Scroll bar
--------------------------------*/
	$("html").niceScroll({
		cursorcolor: '#262522',
		cursoropacitymin: '1',
		cursorborder: '0px',
		cursorborderradius: '0px',
		mousescrollstep: 80,
		cursorwidth: '5px',
		cursorminheight: 60,
		horizrailenabled: false,
		zindex: 1000
	});

/*--------------------------------
Ajax contact form with validation
--------------------------------*/
	$('#contact-form').validate({
		rules: {
			name: 'required',
			email: 'required',
			message: 'required'
		},
		submitHandler: function (form) {
			$('.form-submit').addClass('sending');	
            $.ajax({
				type: "POST",
				url: "contact/contact.php",
				data: $(form).serialize(),
				success: function (response) {
					if ($('.success-msg p').html() != "") {
						$('.success-msg p').replaceWith('<p></p>');
					}
				$('.success-msg p').append(response).parent('.success-msg').fadeIn();
				$('.form-input').val('');
				$('.form-submit').removeClass('sending');
				setTimeout(function() {
					$('.success-msg').fadeOut();
				}, 8000);
				}
            });
            return false;
     	}
	});
});



