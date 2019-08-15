$(document).ready(function(){
	$('.main-content-slider').slick({
		dots: false,
		infinite: true,
		arrows:false,
		slidesToShow: 1,
  // adaptiveHeight: true,
  variableWidth: true
});
});

function wheelSlede(){
	var scrollCount = null;
	var scroll= null;

	$('.main-content-slider').on('wheel', (function(e) {
		e.preventDefault();

		clearTimeout(scroll);
		scroll = setTimeout(function(){scrollCount=0;}, 100);
		if(scrollCount) return 0;
		scrollCount=1;

		if (e.originalEvent.deltaY < 0) {
			console.log('slickNext');
			$(this).slick('slickNext');
		} else {
			$(this).slick('slickPrev');
			console.log('slickPrev');
		}
	}));
}
wheelSlede();

function changeSlideNav(){
// console.log($('.slider-nav').find('li'));
$('.slider-nav').find('li').on('click', function(event){
	event.preventDefault();

	var slide=$(this).data('slide');
	// console.log(slide);
	$('.main-content-slider').slick('slickGoTo', slide);
	$('.slider-nav').find('li').removeClass('active-slide-link');
	$(this).addClass('active-slide-link');

});

$('.main-content-slider').on('afterChange', function(event, slick, currentSlide){
	// console.log(currentSlide);
	
	$('.slider-nav').find('li').removeClass('active-slide-link');
	$('#slide-link-'+currentSlide).addClass('active-slide-link');
	

})

}
changeSlideNav();

function showSlideText(i){
	var h2text=$('.slide-text h2')[i];
	var pText=$('.slide-text p')[i];
	var slideButton=$('.slide-text button')[i];

	setTimeout(function(){
		$(h2text).addClass('show');
		// console.log('h2 '+ i)
	}, 1000);

	setTimeout(function(){
		$(pText).addClass('show');
		// console.log('p '+ i)
	},1800);

	setTimeout(function(){
		$(slideButton).addClass('show');
		// console.log('button '+ i)
	},2600);

	// console.log($('.slide-text p')[i])
}

$(window).ready(showSlideText(0));

$('.main-content-slider').on('afterChange', function(event, slick, currentSlide){

	// $('.slide-text h2').removeClass('show');
	// $('.slide-text p').removeClass('show');
	// $('.slide-text button').removeClass('show');

	// showSlideText(currentSlide);

	console.log(currentSlide);

});

function changePhoneImg(){
	$('#phone').on('mouseover', function(){
		$('#phone').find('img').attr('src', 'img/phone-white.svg');
	});
	$('#phone').on('mouseout', function(){
		$('#phone').find('img').attr('src', 'img/phone.svg');
	});
}
changePhoneImg();