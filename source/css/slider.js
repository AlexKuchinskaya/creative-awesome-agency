$('.testimonials__slider-big').slick({
slidesToShow: 1,
arrows: false,
fade: true,
asNavFor: '.testimonials__slider'
});

$('.testimonials__slider').slick({
slidesToShow: 5,
asNavFor: '.testimonials__slider-big',
focusOnSelect: true,
centerPadding: '10px',
});