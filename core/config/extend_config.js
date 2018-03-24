/**
 * 配置插件路径
 * Created by mrxzm on 2017/5/17.
 */
var _serverURL = 'http://mrxzm.top/'; // window.location.host
var _configPath = 'core/config/';
//requireJs 插件
var _require_text = 'public/require.text/text!';

//加载 request配置
require.config({
    baseUrl: '',
    paths: {
        //requireJs 插件
        text : 'public/require.text/text',

        jquery : 'public/jquery/jquery.min',
        template : 'public/template/template',
        bootstrap :'public/bootstrap/bootstrap-3.3.7-dist/js/bootstrap.min',
        jquery_mixitup : 'public/jquery.mixitup/jquery.mixitup.min',
        jquery_easyResponsiveTabs : 'public/jquery.easyResponsiveTabs/easyResponsiveTabs.min',
        jquery_mCustomScrollbar: 'public/jquery.mCustomScrollbar/jquery.mCustomScrollbar.concat.min',
        jquery_prettyPhoto : 'public/jquery.prettyPhoto/jquery.prettyPhoto',
        jquery_reveal : 'public/jquery.reveal/jquery.reveal',
        prism : 'public/prism/prism',
        juicer : 'public/juicer/juicer-min',
        marked : 'public/marked/marked.min',
        common : 'core/function/common',
        blog : 'core/function/blog',
        analyze : 'blog/analyze',

        //模板配置
        temp_profile : 'template/profile.html',
        temp_blog : 'template/blog.html',
        temp_contact : 'template/contact.html',

        temp_blog_list : 'blog/module/list.html',

    },
    shim: {
        bootstrap :['jquery'],
        jquery_mixitup : ['jquery'],
        jquery_easyResponsiveTabs : ['jquery'],
        jquery_mCustomScrollbar : ['jquery'],
        jquery_prettyPhoto: ['jquery'],
        jquery_reveal : ['jquery'],
        common : ['jquery'],

        marked : {exports : 'marked'},
        //模板配置
        temp_profile :{exports : 'temp_profile'},
        temp_blog :{exports : 'temp_blog'},
        temp_contact :{exports : 'temp_contact'},

        temp_blog_list : {exports : 'temp_blog_list'}

    },
    //等待超时 github国内访问比较慢
    nodeIdCompat : 0,
    waitSeconds : 0,

});