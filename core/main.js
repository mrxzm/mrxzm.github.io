/**
 * Created by mrxzm on 2017/5/17.
 */

// jQuery(document).ready(function($) {

    /* ---------------------------------------------------------------------- */
    /*	------------------------------- config ------------------------------ */
    /* ---------------------------------------------------------------------- */

require(['core/config/extend_config.js'], function () {

    /* ---------------------------------------------------------------------- */
    /* -------------------------------- Loading ----------------------------- */
    /* ---------------------------------------------------------------------- */
    require(['text!temp_profile', 'text!temp_blog', 'text!temp_contact', 'jquery', 'bootstrap',
            'jquery_mixitup' , 'jquery_easyResponsiveTabs', 'jquery_mCustomScrollbar',
        'jquery_prettyPhoto', 'jquery_reveal','prism','common'
            ],function(temp_profile, temp_blog, temp_contact) {

        //使用预加载方式加载模板文件
        // for( item in tempName.path){
        //     var label = getTempFileLabel(item);
        //     var content = getTempFileContent(item);
        //     $('#verticalTab .resp-tabs-list').append(label);
        //     $('.resp-tabs-container').append(content);
        // }

        var respTabsList = $('#verticalTab .resp-tabs-list');
        var respTabsContainer = $('.resp-tabs-container');
        respTabsContainer.append(getTempDOMContent(temp_profile));
        respTabsList.append(getTempDOMLabel(temp_profile));
        respTabsContainer.append(getTempDOMContent(temp_blog));
        respTabsList.append(getTempDOMLabel(temp_blog));
        respTabsContainer.append(getTempDOMContent(temp_contact));
        respTabsList.append(getTempDOMLabel(temp_contact));

        //加载Tab选项卡插件
        $('#verticalTab').easyResponsiveTabs({
            type: 'vertical',
            width: 'auto',
            // tabidentify: 'tabs',
            fit: true
        });
        redimensionnement();

        //首页代码块内容
        var code = "var boy;\n";
        code += 'var girl;\n';
        var date = 150;
        var showStr = '';
        for(var i = 0;i < code.length; i++){
            (function(index){
                setTimeout(function () {
                    showStr += code.charAt(index);
                    var html = Prism.highlight(showStr, Prism.languages.javascript);
                    $('#code-content').html(html);
                }, 200 * (index + 1));
            })(i);
        }

        //这是开始加载是显示的东西
        $('#spinner').fadeOut(200);
        $('#preloader').delay(200).fadeOut('slow');
        $('.wrapper').fadeIn(200);
        /* ---------------------------------------------------------------------- */
        /* -------------------------- easyResponsiveTabs ------------------------ */
        /* ---------------------------------------------------------------------- */

        $("h2.resp-accordion").on('click', function() {
            $(this).find(".icon_menu").addClass("icon_menu_active");
            $("h2.resp-accordion").not(this).find(".icon_menu").removeClass("icon_menu_active");

            /*	Scroll To */
            $('html, body').animate({scrollTop: $('h2.resp-accordion').offset().top - 50}, 600);
        });

        $(".resp-tabs-list").on('click', 'li', function() {
            $(this).find(".icon_menu").addClass("icon_menu_active");
            $(".resp-tabs-list li").not(this).find(".icon_menu").removeClass("icon_menu_active");
        });


        $(".resp-tabs-list").on('hover', 'li', function() {
            $(this).find(".icon_menu").addClass("icon_menu_hover");
        }, function() {
            $(this).find(".icon_menu").removeClass("icon_menu_hover");
        });

        $("h2.resp-accordion").hover(function() {
            $(this).find(".icon_menu").addClass("icon_menu_hover");
        }, function() {
            $(this).find(".icon_menu").removeClass("icon_menu_hover");
        });

        /* ---------------------------------------------------------------------- */
        /* ------------------------- Effect tabs -------------------------------- */
        /* ---------------------------------------------------------------------- */

        var animation_style = 'bounceIn';

        $('ul.resp-tabs-list').on('click', 'li[class^=tabs-]', function() {
            var tab_name = $(this).attr('data-tab-name');

            $('.resp-tabs-container').addClass('animated ' + animation_style);
            $('.resp-tabs-container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $('.resp-tabs-container').removeClass('animated ' + animation_style);
            });
            $(".content_2").mCustomScrollbar("destroy");
            $(".content_2").mCustomScrollbar({
                theme: "dark-2",
                contentTouchScroll: true,
                advanced: {
                    updateOnContentResize: true,
                    updateOnBrowserResize: true,
                    autoScrollOnFocus: false
                }
            });
            return false;
        });

        /* ---------------------------------------------------------------------- */
        /* ---------------------- 初始化 选项卡 自适应 ----------------------------- */
        /* ---------------------------------------------------------------------- */

        function redimensionnement() {
            if (window.matchMedia("(max-width: 800px)").matches) {
                //小于800px
                $(".content_2").mCustomScrollbar("destroy");
                $(".resp-vtabs .resp-tabs-container").css("height", "100%");
                $(".content_2").css("height", "100%");
            } else {
                $(".resp-vtabs .resp-tabs-container").css("height", "580px");
                $(".content_2").css("height", "580px");
                $(".content_2").mCustomScrollbar("destroy");
                $(".content_2").mCustomScrollbar({
                    theme: "dark-2",
                    contentTouchScroll: true,
                    advanced: {
                        updateOnContentResize: true,
                        updateOnBrowserResize: true,
                        autoScrollOnFocus: false
                    }
                });

            }

        }

        window.addEventListener('resize', redimensionnement, false);

        $("#verticalTab h2.resp-accordion").click(function() {
            redimensionnement();
        });

        /* ---------------------------------------------------------------------- */
        /* -------------------------- Contact Form ------------------------------ */
        /* ---------------------------------------------------------------------- */

        // Needed variables
        var $contactform = $('#contactform'),
            $success = ' Your message has been sent. Thank you!';

        $contactform.submit(function() {
            $.ajax({
                type: "POST",
                url: "php/contact.php",
                data: $(this).serialize(),
                success: function(msg)
                {
                    var msg_error = msg.split(",");
                    var output_error = '';

                    if (msg_error.indexOf('error-message') != -1) {
                        $("#contact-message").addClass("has-error");
                        $("#contact-message").removeClass("has-success");
                        output_error = 'Please enter your message.';
                    } else {
                        $("#contact-message").addClass("has-success");
                        $("#contact-message").removeClass("has-error");
                    }

                    if (msg_error.indexOf('error-email') != -1) {

                        $("#contact-email").addClass("has-error");
                        $("#contact-email").removeClass("has-success");
                        output_error = 'Please enter valid e-mail.';
                    } else {
                        $("#contact-email").addClass("has-success");
                        $("#contact-email").removeClass("has-error");
                    }

                    if (msg_error.indexOf('error-name') != -1) {
                        $("#contact-name").addClass("has-error");
                        $("#contact-name").removeClass("has-success");
                        output_error = 'Please enter your name.';
                    } else {
                        $("#contact-name").addClass("has-success");
                        $("#contact-name").removeClass("has-error");
                    }


                    if (msg == 'success') {

                        response = '<div class="alert alert-success success-send">' +
                            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                            '<i class="glyphicon glyphicon-ok" style="margin-right: 5px;"></i> ' + $success
                            + '</div>';


                        $(".reset").trigger('click');
                        $("#contact-name").removeClass("has-success");
                        $("#contact-email").removeClass("has-success");
                        $("#contact-message").removeClass("has-success");

                    } else {

                        response = '<div class="alert alert-danger error-send">' +
                            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                            '<i class="glyphicon glyphicon-remove" style="margin-right: 5px;"></i> ' + output_error
                            + '</div>';

                    }
                    // Hide any previous response text
                    $(".error-send,.success-send").remove();
                    // Show response message
                    $contactform.prepend(response);
                }
            });
            return false;
        });

        /* ---------------------------------------------------------------------- */
        /* --------------------------- Portfolio 图库 ---------------------------- */
        /* ---------------------------------------------------------------------- */

        var filterList = {
            init: function() {

                // MixItUp plugin
                // http://mixitup.io
                $('#portfoliolist').mixitup({
                    targetSelector: '.portfolio',
                    filterSelector: '.filter',
                    effects: ['fade'],
                    easing: 'snap',
                    // call the hover effect
                    onMixEnd: filterList.hoverEffect()
                });

            },
            hoverEffect: function() {

                // Simple parallax effect
                $('#portfoliolist .portfolio').hover(
                    function() {
                        $(this).find('.label').stop().animate({bottom: 0}, 200);
                        $(this).find('img').stop().animate({top: -30}, 500);
                    },
                    function() {
                        $(this).find('.label').stop().animate({bottom: -40}, 200);
                        $(this).find('img').stop().animate({top: 0}, 300);
                    }
                );

            }

        };

        // Run the show!
        filterList.init();

        /* ---------------------------------------------------------------------- */
        /* ----------------------------- prettyPhoto ---------------------------- */
        /* ---------------------------------------------------------------------- */

        $("a[rel^='portfolio']").prettyPhoto({
            animation_speed: 'fast', /* fast/slow/normal */
            social_tools: '',
            theme: 'pp_default',
            horizontal_padding: 5,
            deeplinking: false,
        });

        /* ---------------------------------------------------------------------- */
        /* --------------------------------- Blog ------------------------------- */
        /* ---------------------------------------------------------------------- */

        // More blog
        $('a.read_m').click(function() {
            var pagina = $(this).attr('href');
            var postdetail = pagina + '-page';

            if (pagina.indexOf("#post-") != -1) {

                $('#blog-page').hide();

                $(postdetail).show();
                $(".tabs-blog").trigger('click');
            }

            return false;

        });

        // More blog
        $('a.read_more').click(function() {
            var pagina = $(this).attr('href');
            var postdetail = pagina + '-page';

            if (pagina.indexOf("#post-") != -1) {

                $('#blog-page').hide();

                $(postdetail).show();
                $(".tabs-blog").trigger('click');
            }

            return false;

        });

        //pagination All
        $('.content-post a').click(function() {
            var pagina = $(this).attr('href');

            if (pagina == "#blog") {

                $('.content-post').hide();
                $('#blog-page').show();
                $(".tabs-blog").trigger('click');

            }

            return false;

        });

        //pagination blog
        $('.content-post #pagination').click(function() {


            var pagina = $(this).attr('href');
            var postdetail = pagina + '-page';

            if (pagina.indexOf("#post-") != -1) {

                $('#blog-page').hide();
                $('.content-post').hide();

                $(postdetail).show();
                $(".tabs-blog").trigger('click');
            }

            return false;

        });


        /* ---------------------------------------------------------------------- */
        /* ---------------------------- icon menu ------------------------------- */
        /* ---------------------------------------------------------------------- */
        //在800px以下以menu形式展示
        $(".resp-tabs-container h2.resp-accordion").each(function(){

            if($(this).hasClass('resp-tab-active')){
                $(this).append("<i class='glyphicon glyphicon-chevron-up arrow-tabs'></i>");
            }else {
                $(this).append("<i class='glyphicon glyphicon-chevron-down arrow-tabs'></i>");
            }
        });

        $(".resp-tabs-container h2.resp-accordion").click(function(){
            if($(this).hasClass('resp-tab-active')){
                $(this).find("i.arrow-tabs").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
            }

            $(".resp-tabs-container h2.resp-accordion").each(function(){

                if(!$(this).hasClass('resp-tab-active')){
                    $(this).find("i.arrow-tabs").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
                }
            });

        });


        /* ---------------------------------------------------------------------- */
        /* -------------------------------- skillbar ---------------------------- */
        /* ---------------------------------------------------------------------- */

        $('.tabs-resume').click(function() {

            $('.skillbar').each(function() {
                $(this).find('.skillbar-bar').width(0);
            });

            $('.skillbar').each(function() {
                $(this).find('.skillbar-bar').animate({
                    width: $(this).attr('data-percent')
                }, 2000);
            });

        });

        $('#resume').prev('h2.resp-accordion').click(function() {

            $('.skillbar').each(function() {
                $(this).find('.skillbar-bar').width(0);
            });

            $('.skillbar').each(function() {
                $(this).find('.skillbar-bar').animate({
                    width: $(this).attr('data-percent')
                }, 2000);
            });
        });


        //Change for demo page
        $('input:radio[name=page_builder]').on('change', function() {

            $('input:radio[name=page_builder]').each(function () {

                var $this = $(this);

                if ($(this).prop('checked')) {
                    window.location.replace($this.val());
                }
            });

            return false;
        });

        /* ---------------------------------------------------------------------- */
        /* -------------------------------- 百度统计  ---------------------------- */
        /* ---------------------------------------------------------------------- */
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?8caaea110287dd1582fb46c1b994985b";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    });
});

// });