var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦!路径（带查询参数）为:' + pathWithQuery)

    // if (path === '/') {
    //     console.log("有傻逼访问了!");
    //     response.setHeader('Content-Type', 'text/html;charset=utf-8')
    //     response.end("这就是响应内容\n");
    // }
    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`
        <!DOCTYPE html>
        <head>
            <link rel="stylesheet" href="/x">
        </head>
        <body></body>
        <script src="/y"></script>
        <h1>哈哈哈哈哈，我是二哈</h1>
        <h2>我是新增的内容</h2>
        <div id="heart">
            <div class="left"></div>
            <div class="right"></div>
            <div class="bottom"></div>
        </div>
        `)
        response.end()
    }
    else if (path === '/x') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(`* {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        #heart {
            display: inline-block;
            /* border: 1px solid blue; */
            margin: 100px;
            position: relative;
            /* transition: all 0.5s; */


        }

        @keyframes heart {
            0% {
                transform: scale(1.0);
            }

            100% {
                transform: scale(1.5);
            }
        }

        #heart:hover {
            animation: heart .6s infinite alternate;
        }

        .left {
            /* margin: 0 auto; */
            width: 50px;
            height: 50px;
            /* border: 1px solid black; */
            background: red;
            transform: rotate(45deg) translateX(35px);
            position: absolute;
            bottom: 100%;
            right: 100%;
            border-radius: 50% 0 0 50%;
        }

        .right {
            /* margin: 0 auto; */
            width: 50px;
            height: 50px;
            /* border: 1px solid blue; */
            background: red;
            transform: rotate(45deg) translateY(35px);
            position: absolute;
            bottom: 100%;
            left: 100%;
            border-radius: 50% 50% 0 0;
        }

        .bottom {
            /* margin: 0 auto; */
            width: 50px;
            height: 50px;
            /* border: 1px solid grey; */
            transform: rotate(45deg);
            background: red;
            /* position: absolute; */
        }
        
        h1{
            color:red
        }
        h2{
            color:pink
        }
        `)
        response.end()
    }
    else if (path === '/y') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(`console.log('我是js啦')`)
        response.end()
    }
    else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你访问的页面不存在!!!`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

