
 $(document).ready(function(){

   $('.slider').slick({
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: false,
     infinite: true,
     fade: true,
     autoplay: true,
     autoplaySpeed: 6000,
     pauseOnFocus: false,
     pauseOnHover: false
    //  adaptiveHeight: true
 });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  function toggleSlide (item){
    $(item).each(function(i){
      $(this).on('click',function(e){
        e.preventDefault();
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        $('.catalog-item__main').eq(i).toggleClass('catalog-item__main_active');
      });
    });

  }
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //Modal

  $ ('[data-modal=consultation]').on('click', function(){
     $('.overlay, #consultation').fadeIn('slow');

  });
  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $ ('[data-modal=contact]').on('click', function(){
    $('.new_overlay, #contact').fadeIn('slow');

 });
 $('.modal__close').on('click', function(){
   $('.new_overlay, #contact, #thanks, #order').fadeOut('slow');
 });

  // $('.button_mini').on('click', function(){
  // $('.overlay, #order').fadeIn('slow');
  // });

  // $('.button_mini').each(function(i){
  //   $(this).on('click', function(){
  //     $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
  //     $('.overlay, #order').fadeIn('slow');

    // });
  // });


  function validateForms(form){
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
      name: "Please enter your name",
      phone: "Please enter your phone",
      email: {
        required: "Please enter your email",
        email: "Incorrect email"
  
      }
    }
    });
  }

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#contact form');
  validateForms('#contact-form');
  validateForms('#order form');

  $('input[name=phone]').mask("+91 999-999-9999");

  $('form').submit(function(e){
    e.preventDefault();
    if($("#name").val().trim().length==0) {
      alert("enter valid name");
      return false;
   }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $('#consultation,#contact,#order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');

    });
    return false;
  });

  // page up

  $(window).scroll(function(){
    if($(this).scrollTop() > 1600){
      $('.pageup').fadeIn();
    }else{
      $('.pageup').fadeOut();
    }
  });
//smooth scroll 
  $("a[href^='#up']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
 });

}); 

