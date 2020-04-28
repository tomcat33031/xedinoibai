$(document).ready(function () {

    $(window).scroll(function () {
        if ($(window).scrollTop() > 92) {
            $('#viver-back-top').fadeIn();
        } else {
            $('#viver-back-top').fadeOut();
        }
    });

    $('#viver-back-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    $(window).on('load resize', function () {
        iniMainSlide();
    });


    $(window).on('load', function () {
        var ztTo = $('.scrTo');
        if (ztTo.length > 0) {
            $('html, body').animate({
                scrollTop: ztTo.offset().top - 73
            }, 500);
        }
    });
    $('.js-scroll').on('click', function (e) {
        e.preventDefault();
        var t = $($(this).attr('href'));
        if (t.length == 1) {
            $('html, body').animate({
                scrollTop: t.offset().top - 73
            }, 500);
        }
    });

    $('#order-form input,#order-form textarea').focus(function () {
        var pla = $(this).attr('placeholder');
        $(this).attr('placeholder', '').attr('data-pla', pla);
    }).blur(function () {
        var pla = $(this).attr('data-pla');
        if (typeof pla != 'string') {
            pla = '';
        }
        $(this).attr('placeholder', pla);
    });

});

function iniMainSlide() {

    $('.viver-slide-content:not(".ini")').slick({
        infinite: true,
        speed: 600,
        dots: false,
        autoplay: true,
        fade: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
    }).addClass('ini');
}

var form = document.forms['order-form'];
var btnOrder = form['btn-order'];

btnOrder.onclick = function (event) {
    console.log('Send form ');

    var xhr = new XMLHttpRequest();
    xhr.open(form.method, "https://smartnotification.herokuapp.com/send", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    var params = {
        "name": form['co_name'].value,
        "phone": form['co_phone'].value,
        "cartype": form['co_title'].value,
        "drivetype": form['co_address'].value,
        "desc": form['co_content'].value,
    }

    xhr.send(JSON.stringify(params));
    event.preventDefault();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //alert('Quý khách đặt xe thành công , Xin cảm ơn quý khách đã sử dụng dịch vụ');
            document.getElementById('modal-content').innerHTML = '<p style="color:#333;font-weight:bold;">Quý khách đặt xe thành công , Xin cảm ơn quý khách đã sử dụng dịch vụ</p>'
        } else if (xhr.readyState == 4 && (xhr.status != 200)) {
            //alert('Quá trình đặt xe xảy ra lỗi , Vui lòng xin thử lại sau');
            document.getElementById('modal-content').innerHTML = '<p style="color:#333;font-weight:bold;">Quá trình đặt xe xảy ra lỗi , Vui lòng xin thử lại sau</p>';
        }
    }
}
