/**
 * Created by mrxzm on 2018/3/24.
 * mark解析
 */
define('analyze' ,['jquery'], function () {
    window.analyze = {
         getArticleInfo : function (mark) {
             var result = {};
             var startStr = '<!--*top';
             var startIndex = mark.indexOf(startStr);
             var endIndex = mark.indexOf('*end-->');
             var str = mark.substring(startIndex + startStr.length, endIndex);

             var nextIndex = 0;
             while (true){
                 var index = str.indexOf('#', nextIndex);
                 var spaceIndex = str.indexOf(' ', index);
                 nextIndex = str.indexOf('#', spaceIndex);
                 if(nextIndex == -1){
                     nextIndex = str.length;
                 }
                 var name = str.substring(index + 1, spaceIndex);
                 var content = str.substring(spaceIndex + 1, nextIndex -1);
                 result[name] = content;
                 if(nextIndex == str.length){
                     break;
                 }
             }
             // alert(JSON.stringify(result));
             return result;
        }};
    return analyze;
});