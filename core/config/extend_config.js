/**
 * 配置插件路径
 * Created by mrxzm on 2017/5/17.
 */
var configPath = 'core/config/';
//加载 request配置
require.config({
    baseUrl: '',
    paths: {
        jquery : 'public/jquery/jquery.min',
        template : 'public/template/template',
        bootstrap :'public/bootstrap/bootstrap-3.3.7-dist/js/bootstrap.min',
        jquery_mixitup : 'public/jquery.mixitup/jquery.mixitup.min',
        jquery_easyResponsiveTabs : 'public/jquery.easyResponsiveTabs/easyResponsiveTabs.min',
        jquery_mCustomScrollbar: 'public/jquery.mCustomScrollbar/jquery.mCustomScrollbar.concat.min',
        jquery_prettyPhoto : 'public/jquery.prettyPhoto/jquery.prettyPhoto',
        jquery_reveal : 'public/jquery.reveal/jquery.reveal',
        common : 'core/function/common',
    },
    shim: {
        bootstrap :['jquery'],
        jquery_mixitup : ['jquery'],
        jquery_easyResponsiveTabs : ['jquery'],
        jquery_mCustomScrollbar : ['jquery'],
        jquery_prettyPhoto: ['jquery'],
        jquery_reveal : ['jquery'],

    }
});

