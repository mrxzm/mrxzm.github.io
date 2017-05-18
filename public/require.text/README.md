# text

A [RequireJS](http://requirejs.org)/requireJs 加载文本资源插件

## Docs

文档 [RequireJS API text 部分](http://requirejs.org/docs/api.html#text).

## Latest release

点击链接下载最 [新版本](https://raw.github.com/requirejs/text/latest/text.js).

可以通过 volo [volo](https://github.com/volojs/volo): 安装

    volo add requirejs/text

If using npm:

    npm install requirejs/text

## Usage

我们推荐使用常规的html文档，而不是在JavaScript中构建DOM结构，然而没有那个可以很好的嵌入html
文档，能做到最好的就是使用html字符串，但是这样很难管理，特别是对于多行的html字符串。

这个text.js AMD 插件可以帮你解决这个问题，在需要加载的路径前加上 text! 可以帮你加载html文档. 下载这个插件
 并设置[baseUrl](http://requirejs.org/docs/api.html#config-baseUrl)
路径 (或者使用 [paths config](http://requirejs.org/docs/api.html#config-paths) 来配置html文档的位置).

像这样指定一个文本资源：

```javascript
require(["some/module", "text!some/module.html", "text!some/module.css"],
    function(module, html, css) {
        //加载html文档
        //of the some/module.html file
        //加载css 文档
        //of the some/module.css file.
    }
);
```

注意 .html 和 .css 扩展名称. 这个
"some/module" 是路径的一部分: 根据正常的解析规则 **baseUrl** + **paths** 
[解析规则](http://requirejs.org/docs/api.html#config) 映射到一个路径。

对于 HTML/XML/SVG 后缀的文件, 还有另外一种方法，使用 !strip 标记, 可以加载SVG 和 XML文档，
同样的，如果只想返回html文档body内容，可以使用这个标签：

```javascript
require(["text!some/module.html!strip"],
    function(html) {
        //只会返回一部分的body里的代码，head不会返回。（大概应该是这个意思）
    }
);
```

因为是通过异步的方式加载 XMLHttpRequest (XHR), 所以只能在相同的域获取web 文档 (see **XHR
restrictions** below).

然而, [这个 RequireJS](http://requirejs.org/docs/optimization.html)
will inline any text! references with the actual text file contents into the
modules, so after a build, the modules that have text! dependencies can be used
from other domains.

## Configuration

### XHR restrictions

The text plugin works by using XMLHttpRequest (XHR) to fetch the text for the
resources it handles.

However, XHR calls have some restrictions, due to browser/web security policies:

1) Many browsers do not allow file:// access to just any file. You are better
off serving the application from a local web server than using local file://
URLs. You will likely run into trouble otherwise.

2) There are restrictions for using XHR to access files on another web domain.
While CORS can help enable the server for cross-domain access, doing so must
be done with care (in particular if you also host an API from that domain),
and not all browsers support CORS.

So if the text plugin determines that the request for the resource is on another
domain, it will try to access a ".js" version of the resource by using a
script tag. Script tag GET requests are allowed across domains. The .js version
of the resource should just be a script with a define() call in it that returns
a string for the module value.

Example: if the resource is 'text!example.html' and that resolves to a path
on another web domain, the text plugin will do a script tag load for
'example.html.js'.

The [requirejs optimizer](http://requirejs.org/docs/optimization.html) will
generate these '.js' versions of the text resources if you set this in the
build profile:

    optimizeAllPluginResources: true

In some cases, you may want the text plugin to not try the .js resource, maybe
because you have configured CORS on the other server, and you know that only
browsers that support CORS will be used. In that case you can use the
[module config](http://requirejs.org/docs/api.html#config-moduleconfig)
(requires RequireJS 2+) to override some of the basic logic the plugin uses to
determine if the .js file should be requested:

```javascript
requirejs.config({
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                //Override function for determining if XHR should be used.
                //url: the URL being requested
                //protocol: protocol of page text.js is running on
                //hostname: hostname of page text.js is running on
                //port: port of page text.js is running on
                //Use protocol, hostname, and port to compare against the url
                //being requested.
                //Return true or false. true means "use xhr", false means
                //"fetch the .js version of this resource".
            }
        }
    }
});
```

### Custom XHR hooks

There may be cases where you might want to provide the XHR object to use
in the request, or you may just want to add some custom headers to the
XHR object used to make the request. You can use the following hooks:

```javascript
requirejs.config({
    config: {
        text: {
            onXhr: function (xhr, url) {
                //Called after the XHR has been created and after the
                //xhr.open() call, but before the xhr.send() call.
                //Useful time to set headers.
                //xhr: the xhr object
                //url: the url that is being used with the xhr object.
            },
            createXhr: function () {
                //Overrides the creation of the XHR object. Return an XHR
                //object from this function.
                //Available in text.js 2.0.1 or later.
            },
            onXhrComplete: function (xhr, url) {
                //Called whenever an XHR has completed its work. Useful
                //if browser-specific xhr cleanup needs to be done.
            }
        }
    }
});
```

### Forcing the environment implementation

The text plugin tries to detect what environment it is available for loading
text resources, Node, XMLHttpRequest (XHR) or Rhino, but sometimes the
Node or Rhino environment may have loaded a library that introduces an XHR
implementation. You can force the environment implementation to use by passing
an "env" module config to the plugin:

```javascript
requirejs.config({
    config: {
        text: {
            //Valid values are 'node', 'xhr', or 'rhino'
            env: 'rhino'
        }
    }
});
```

## License

MIT

## Code of Conduct

[jQuery Foundation Code of Conduct](https://jquery.org/conduct/).

## Where are the tests?

They are in the [requirejs](https://github.com/requirejs/requirejs) and
[r.js](https://github.com/requirejs/r.js) repos.

## History

This plugin was in the [requirejs repo](https://github.com/requirejs/requirejs)
up until the requirejs 2.0 release.
