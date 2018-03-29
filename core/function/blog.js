/**
 * blog js
 * Created by mrxzm on 2018/3/4.
 *
 * 依赖其他插件 jQuery, juicer, marked
 *
 */

define([ 'text!temp_blog_list', 'text!articleConfig',
    'marked', 'analyze', 'jquery', 'juicer'],function(temp_blog_list, articleConfig, marked, analyze, $) {

    // 文章名称集
    window._articleNameList = [];

    /* ---------------------------------------------------------------------- */
    /*	------------------------------- 分页 -------------------------------- */
    /* ---------------------------------------------------------------------- */
    // 查看全部 （文章详细）
    $(document).delegate('a.read_more', 'click', function () {
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
    $(document).delegate('.content-post a', 'click', function () {
        var pagina = $(this).attr('href');

        if (pagina == "#blog") {

            $('.content-post').hide();
            $('#blog-page').show();
            $(".tabs-blog").trigger('click');

        }

        return false;

    });

    //pagination blog
    $(document).delegate('.content-post #pagination', 'click', function () {


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

    //pageLower  下
    juicer.register('pageLower', function (data) {
        var tag = 0;
        var index = _articleNameList.indexOf(data);
        if( index !== _articleNameList.length){
            tag = _articleNameList[ index + 1];
        }
        return tag;
    });

    //pageUp 上
    juicer.register('pageUp', function (data) {
        var tag = 0;
        var index = _articleNameList.indexOf(data);
        if( index !== 0){
            tag = _articleNameList[ index - 1];
        }
        return tag;
    });

    //showLabel 标签分割
    // <span class="tag">#php</span>
    juicer.register('showLabel', function (data) {
        var label = '';
        var list = data.split(',');
        list.forEach(function (value) {
            label += '<span class="tag">#'+ value +'</span> ';
        });
        return label;
    })

    /* ---------------------------------------------------------------------- */
    /* ------------------------------ 文章读取 ------------------------------ */
    /* ---------------------------------------------------------------------- */
    //文章列表
    var timeId = setInterval(function (args) {
        if(articleConfig != null || articleConfig != ''){
            window._articleNameList = JSON.parse(articleConfig).article;
            _articleNameList.forEach(function (item, index) {
                //文章
                $.get(_serverURL + 'blog/article/' + item, function (article) {
                    var articleInfo = analyze.getArticleInfo(article);

                    var tplList = null;
                    if(articleInfo.image == undefined && articleInfo.images == undefined){
                        tplList = getTempDOM(temp_blog_list, 'blog-text');
                    }
                    else if(articleInfo.image != undefined){
                        tplList = getTempDOM(temp_blog_list, 'blog-image');
                    }
                    else if(articleInfo.images != undefined){
                        tplList = getTempDOM(temp_blog_list, 'blog-images');
                    }

                    var tplContent = getTempDOM(temp_blog_list, 'blog-content');

                    var htmlList = juicer(tplList, articleInfo);
                    articleInfo['content'] = marked(article);
                    var htmlContent = juicer(tplContent, articleInfo);

                    $('#blog-page').append(htmlList);
                    $('#blog-article').append(htmlContent);
                    // console.log(htmlContent);
                });

            });
            clearInterval(timeId);
        }
    }, 200);

})