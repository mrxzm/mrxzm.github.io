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
    require(['text!temp_profile', 'text!temp_blog', 'text!temp_contact',
        'jquery', 'bootstrap', 'jquery_mixitup' , 'jquery_easyResponsiveTabs', 'jquery_mCustomScrollbar',
        'jquery_prettyPhoto', 'jquery_reveal','prism' ,'common', 'blog'
            ],function(temp_profile, temp_blog, temp_contact) {

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

        //这是开始加载时显示的东西
        $('#spinner').fadeOut(200);
        $('#preloader').delay(200).fadeOut('slow');
        $('.wrapper').fadeIn(200);

        /* ---------------------------------------------------------------------- */
        /* ------------------------------ 首页代码块 ---------------------------- */
        /* ---------------------------------------------------------------------- */
        var code =
            'void Word()\n' +
            "{\n" +
                "    var boy = new People(man);\n" +
                "    var girl = new People(woman);\n" +
                "    foreach(int year in boy.experience)\n" +
                "    {\n" +
                "        if(year == 18)\n" +
                "        {\n" +
                "            boy.heart = girl;\n" +
                "            girl.heart = boy;\n" +
                "        }\n" +
                "        boy.experience.Add(girl);\n"+
                "        if(year == 19)\n" +
                "        {\n" +
                "            boy.experience.Add(school);\n" +
                "            girl.experience.Add(work);\n" +
                "        }\n" +
                "        ...\n" +
                "    }\n" +
                "    boy.Dispose();\n" +
            '}';
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
        /* ---------------------- 初始化 选项卡 自适应 -------------------------- */
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
        /* -------------------------------- 留言 -------------------------------- */
        /* ---------------------------------------------------------------------- */
        var $contactform = $('#contactform'),
            $success = ' 谢谢你的反馈消息！',
            output_error = '检查计算机中是否有邮箱！';

        $contactform.submit(function () {
            // 成功消息
            var responseSuccess = '<div class="alert alert-success success-send">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '<i class="glyphicon glyphicon-ok" style="margin-right: 5px;"></i> ' + $success
                + '</div>';
            // 错误消息
            var responseError = '<div class="alert alert-danger error-send">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '<i class="glyphicon glyphicon-remove" style="margin-right: 5px;"></i> ' + output_error
                + '</div>';


            var name = $(this).find('input:text[name=name]').val();
            var email = $(this).find('input:text[name=email]').val();
            var content = $(this).find('textarea[name=message]').val();
            var url = 'mailto:' + encodeURIComponent('mrxzm@live.com');
            url += '?subject=' + encodeURIComponent('['+ name +'] mrxzm主页的反馈消息');
            url += '&body=' + encodeURIComponent('姓名:' + name + '\n' +'联系方式:' + email + '\n\t' + content);
            window.location = url;

            $(".error-send,.success-send").remove();
            if(true){ // new ActiveXObject("Outlook.Application") //TODO 发送成功提示
                $contactform.prepend(responseSuccess);
            }
            else {
                $contactform.prepend(responseError);
            }
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