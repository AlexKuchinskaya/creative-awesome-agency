// $('.testimonials__slider').slick({
//     centerMode: true,
//     centerPadding: '60px',
//     slidesToShow: 3,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           arrows: false,
//           centerMode: true,
//           centerPadding: '40px',
//           slidesToShow: 3
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           arrows: false,
//           centerMode: true,
//           centerPadding: '40px',
//           slidesToShow: 1
//         }
//       }
//     ]
//   });
// $('.testimonials__slider').slick({
//     arrows: true,
//     dots: true,
//     //dotsClass: 'home-slider-dots',
//     autoplay: true,
//     autoplaySpeed: 7000
//   });
// $('.testimonials__slider').slick({
//     asNavFor: '.testimonials__slider-big', //подвязать другой
//     slidesToShow: 5,
//     arrows: false,
//     focusOnSelect: true
//   });

$('.testimonials__slider-big').slick({
slidesToShow: 1,
slidesToScroll: 1,
arrows: false,
fade: true,
asNavFor: '.testimonials__slider'
});

$('.testimonials__slider').slick({
slidesToShow: 5,
slidesToScroll: 1,
asNavFor: '.testimonials__slider-big',
centerMode: true,
focusOnSelect: true
});