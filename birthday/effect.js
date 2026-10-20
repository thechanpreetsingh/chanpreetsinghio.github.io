$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function(){

	var BALLOONS = ['#b1','#b2','#b3','#b4','#b5','#b6','#b7'];
	var flying = false;

	/* balloon geometry is derived from the viewport so the row of 7 never
	   runs off a phone screen the way the old fixed +/-350px offsets did */
	function balloonWidth() {
		return $('.balloons').outerWidth() || 100;
	}

	function lineUpBalloons() {
		var vw = $(window).width();
		var bw = balloonWidth();
		var gap = Math.min(bw, (vw - bw) / 6);
		var start = (vw - bw) / 2 - gap * 3;
		var top = Math.min(240, $(window).height() * 0.3);
		$.each(['#b11','#b22','#b33','#b44','#b55','#b66','#b77'], function(i, id){
			$(id).animate({top: top, left: start + gap * i}, 500);
		});
	}

	function floatBalloon(sel) {
		var $b = $(sel);
		if (!$b.length) { return; }
		$b.animate({
			left: Math.random() * ($(window).width() - balloonWidth()),
			bottom: Math.random() * ($(window).height() * 0.6)
		}, 10000, function(){
			floatBalloon(sel);
		});
	}

	$(window).resize(function(){
		if (flying) { return; }
		$(BALLOONS.join(',')).stop();
		lineUpBalloons();
	});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});

	$('#play').click(function(){
		var audio = $('.song')[0];
		audio.play();
		$('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	$('#balloons_flying').click(function(){
		flying = true;
		$('.balloon-border').animate({top:-500},8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		$.each(BALLOONS, function(i, sel){ floatBalloon(sel); });
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

	$('#wish_message').click(function(){
		flying = false;
		$(BALLOONS.join(',')).stop();
		$.each(BALLOONS, function(i, sel){
			$(sel).attr('id', sel.substring(1) + sel.substring(2));
		});
		lineUpBalloons();
		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});

	/* walks the verses one at a time, then parks on a static closing card
	   instead of leaving the cake spinning with nothing on screen */
	function runMessage() {
		var $lines = $('.message p');
		var total = $lines.length;

		function step(i) {
			if (i >= total) {
				$lines.fadeOut('slow').promise().done(function(){
					$('.cake').fadeIn('fast');
					$('.the-end').fadeIn('slow');
				});
				return;
			}
			$lines.eq(i).fadeIn('slow').delay(1800).fadeOut('slow').promise().done(function(){
				step(i + 1);
			});
		}

		$('.the-end').hide();
		$lines.hide();
		$('.message').fadeIn('slow');
		step(0);
	}

	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(runMessage);
	});

	$('#replay').click(function(){
		$('.the-end').fadeOut('fast').promise().done(function(){
			$('.cake').fadeOut('fast').promise().done(runMessage);
		});
	});
});
