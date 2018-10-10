<%--
  Created by IntelliJ IDEA.
  User: ReolCharm
  Date: 2018/9/21
  Time: 14:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login</title>

    <style>
        body {
            width: 100%;
            height: 100%;
        }

        #bodybg {
            /*background: paleturquoise;*/
            /*background-image: image("/WEB-INF/img/新海诚电影截图.png");*/
            width: 1345px;
            height: 757px;
            /* background-image: url('WEB-INF/img/新海诚电影截图.png');*/
            /*WEB-INF/img/新海诚电影截图.png*/
        }

        #firsttab {
            background: lightgoldenrodyellow;
            border: 1px solid lightgrey;
            margin-top: 15%;
            margin-left: 35%;
        }

        div {
            margin-left: 40%;
            color: palevioletred;
        }

        #verify {
            width: 50%;
        }

        /*#btn {
            margin-left: auto;
            margin-right: auto;
        }*/
    </style>

    <script>
        window.onload = function () {
            document.getElementById("img").onclick = function () {
                /*时间戳覆盖*/
                this.src = "${pageContext.request.contextPath}/VerifyCodeServlet?time=" + new Date().getTime();
            }
            document.getElementById("fresh").onclick = function () {
                document.getElementById("img").src = "${pageContext.request.contextPath}/VerifyCodeServlet?time=" + new Date().getTime();
            }
        }


    </script>
</head>
<body>
<span id="bodybg">
    <table id="firsttab">
    <form action="${pageContext.request.contextPath}/loginServlet" method="post">
        <tr>
            <td> 用户名:</td>
            <td><input type="text" name="u_username"></td>
            <td>
                <div></div>
            </td>
        </tr>
        <tr>
            <td> 密码:</td>
            <td><input type="password" name="u_password"></td>
            <td>
                <div></div>
            </td>
        </tr>
        <%-- 难点1. 页面布局= =... --%>
        <tr id="middle">
            <td colspan="2">
                <table>
                    <tr>
                        <td> 验证码:</td>
                        <td style="padding-left: 10px">
                            <input type="text" name="verifyCode" id="verify">
                            <%-- 难点 3.  输出验证码图片, 还是用 img 的 src 属性, 指向生成验证码的 servlet(向页面输出img) --%>
                            <img id="img" class="img" src="${pageContext.request.contextPath}/VerifyCodeServlet"
                                 alt="验证码">
                        </td>
                        <td>
                            <%--<img id="img" class="img" src="${pageContext.request.contextPath}/VerifyCodeServlet"
                                 alt="验证码">--%>
                        </td>
                    </tr>
                </table>
            </td>
            <%--<td>${pageContext.session.verifyCode}</td>--%> <%--动态的不能获取??--%>
            <td>
                <div></div>
            </td>
        </tr>

        <tr>
            <td colspan="3">
                <div id="fresh">看不清?刷新一下</div>
            </td>
        </tr>

        <tr>
            <td colspan="3" align="center"><input type="submit" value="登录" id="btn">${pageContext.request.contextPath}
            </td>
        </tr>

    </form>

</table>
    <%-- 提示用户登录成功与否--%>
<div><%--<%=request.getAttribute("cc_error") == null ? "" : request.getAttribute("cc_error")%>--%>
    ${sessionScope.u_msg}${sessionScope.v_msg}
</div>
<%--<div>&lt;%&ndash;<%=request.getAttribute("login_error") == null ? "" : request.getAttribute("login_error") %>&ndash;%&gt;

</div>--%>

</span>


</body>
</html>
