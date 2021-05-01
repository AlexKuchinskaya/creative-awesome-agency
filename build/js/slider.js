$('.testimonials__slider-big').slick({
slidesToShow: 1,
// slidesToScroll: 1,
arrows: false,
fade: true,
asNavFor: '.testimonials__slider'
});

$('.testimonials__slider').slick({
slidesToShow: 5,
// slidesToScroll: 1,
asNavFor: '.testimonials__slider-big',
// centerMode: true,
focusOnSelect: true,
centerPadding: '10px',
});