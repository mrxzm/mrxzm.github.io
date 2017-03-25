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
    return getTempFile(fileName, "content");
}
//拿到模板文件标签
function getTempFileLabel(fileName) {
    return getTempFile(fileName, "label");
}

//拿到模板文件指定类型数据
function getTempFile(fileName, type) {
    number++;
    var data = window.frames["iframe-" + fileName].document.getElementById(fileName + "-" + type).innerHTML;
    if(data == '' || data == undefined){
        if(number < 10){
            data = getTempFileContent(fileName);
        }
        number = 0;
    }
    return data;
}

/* ---------------------------------------------------------------------- */
/*	-------------------------------- Blog ------------------------------- */
/* ---------------------------------------------------------------------- */

//加载文章
function loadPaper() {
    
}


/* ---------------------------------------------------------------------- */
/*	----------------------------- 发邮件 --------------------------------- */
/* ---------------------------------------------------------------------- */
function SendMail() {
    var outlookApp = new ActiveXObject("Outlook.Application");
    var nameSpace = outlookApp.getNameSpace("MAPI");
    var mailItem = outlookApp.CreateItem(0);
    var mailto = "mrxzm@live.com ";
    var mailBody;
    mailBody = "<HTML><BODY><DIV><FONT face=Verdana size=3>预定人姓名：<BR>乘机人姓名：&nbsp; （请注明内部员工或外部客户）<BR>外部客户身份证号码：（如内部员工无需提供）<BR>预定人联系方式（电话/传真/邮件）<BR><STRONG><U>出发航段<BR></U></STRONG>预定到达时间：<BR>预定航班号：<BR>预定机票价格/折扣率：<BR><U><STRONG>返回航段</STRONG></U><BR>预定返程时间：<BR>预定航班号：<BR>预定机票价格/折扣率：<BR></FONT></DIV></BODY></HTML>";

    mailItem.Subject = "预订机票";
    //mailItem.SentOnBehalfOfName = "技术部服务台";
    mailItem.To = mailto;
    mailItem.HTMLBody = mailBody;
    mailItem.Display(0);
    mailItem = null;
    nameSpace = null;
    outlookApp = null;
}