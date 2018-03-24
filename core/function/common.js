/**
 * Created by yimXiaoMo on 2017/2/22.
 * 公用函数库
 * ps：需要jquery的支持
 */
/* ---------------------------------------------------------------------- */
/*	---------------------------- template 读取 --------------------------- */
/* ---------------------------------------------------------------------- */

var number = 0;

/**
 * 通过模板字节流返回内容DOM
 * @param fileStream
 */
function getTempDOMContent(dom) {
    return getTempDOM(dom, 'content');
}

/**
 * 通过模板字节流返回标签DOM
 * @param fileStream
 */
function getTempDOMLabel(dom) {
    return getTempDOM(dom, 'label');
}

/**
 * 通过模板名称返回内容
 * @param fileName
 */
function getTempFileContent(fileName) {
    return getTempFile(fileName, "content");
}

/**
 * 通过模板名称返回标签
 * @param fileName
 */
function getTempFileLabel(fileName) {
    return getTempFile(fileName, "label");
}

function getTempDOM(dom, type) {
    if(dom != undefined && dom != ''){
        return $(dom).find('#temp-' + type).html();
    }
    return '';
}

/**
 * 预加载(例)：
 * <div id="tempfile-none" style="display:none">
 *     <iframe src="template/blog.html" name="iframe-blog" ></iframe>
 *     <iframe src="template/contact.html" name="iframe-contact" ></iframe>
 *     <iframe src="template/profile.html" name="iframe-profile" ></iframe>
 * </div>
 * <!--预加载html模板-->
 * <div id="tempfile-none" style="display:none">
 *  <iframe src="template/blog.html" name="iframe-blog" ></iframe>
 *  <iframe src="template/contact.html" name="iframe-contact" ></iframe>
 *  <iframe src="template/profile.html" name="iframe-profile" ></iframe>
 *  <!--<iframe src="html/portfolio.html" name="iframe-portfolio" ></iframe>-->
 *  <!--<iframe src="html/resume.html" name="iframe-resume" ></iframe>-->
 * </div>
 * 通过指定的名称 and 模板类型(id)获取index.html中的frames模板文档的template数据
 * @param fileName  模板名称
 * @param type  类型
 * @returns {string}
 */
function getTempFile(fileName, type) {
    number++;
    var data = window.frames["iframe-" + fileName].document.getElementById("temp-" + type).innerHTML;
    if(data == '' || data == undefined){
        if(number < 10){
            data = getTempFile(fileName,type);
        }
        number = 0;
    }
    return data;
}