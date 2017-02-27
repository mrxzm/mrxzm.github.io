/**
 * Created by yimXiaoMo on 2017/2/22.
 * 公用函数库
 * ps：需要jquery的支持
 */
/* ---------------------------------------------------------------------- */
/*	---------------------------- template 读取 --------------------------- */
/* ---------------------------------------------------------------------- */

var number = 0;
//拿到模板文件内容
function getTempFileContent(fileName) {
    number++;
    var data = window.frames["iframe-" + fileName].document.getElementById(fileName + "-content").innerHTML;
    if(data == '' || data == undefined){
        if(number < 10){
            data = getTempFileContent(fileName);
        }
        number = 0;
    }
    return data;
}