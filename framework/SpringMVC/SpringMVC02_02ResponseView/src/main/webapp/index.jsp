<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/11/1
  Time: 20:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

<body>
<h2>Hello World!</h2>
<%--虚拟路径--%>
<a href="${pageContext.request.contextPath}/account/login?username=mm&password=mmm">寻寻觅觅</a>
<br/>

<form action="account/login" method="post">
    用户名: <input type="text" name="username"/>
    密码: <input type="password" name="password"/><br>
    用户名: <input type="text" name="user.uname"/>
    邮箱: <input type="password" name="user.email"/>
    年龄: <input type="text" name="user.age"/><br>
    totalCount: <input type="text" name="pageBeans[0].totalCount"/>
    totalPage: <input type="password" name="pageBeans[0].totalPage"/><br>
    totalCount: <input type="text" name="pageBeans[1].totalCount"/>
    totalPage: <input type="password" name="pageBeans[1].totalPage"/>
    totalPage: <input type="password" name="pageBeans[2].totalPage"/><br>
    pageBeanMap['first'].totalCount: <input type="text" name="pageBeanMap['first'].totalCount"/>
    pageBeanMap['first'].totalPage: <input type="password" name="pageBeanMap['first'].totalPage"/><br>
    pageBeanMap['two'].totalCount: <input type="text" name="pageBeanMap['two'].totalCount"/>
    pageBeanMap['two'].totalPage: <input type="password" name="pageBeanMap['two'].totalPage"/><br>
    <input type="submit" value="登录账户， post 请求" align="center">
</form>

<hr color="lightgreen">
<form action="account/login03" method="post">
    用户名: <input type="text" name="reolcharm"/>
    密码: <input type="password" name="password"/><br>
    <input type="submit" value="登录账户， post 请求" align="center">
</form>


<hr color="pink">
<form action="account/login04" method="post">
    uname: <input type="text" name="uname"/>
    email: <input type="text" name="email"/>
    age: <input type="text" name="age"/><br>
    <input type="submit" value="登录账户， post 请求" align="center">
    <input id="login04_btn" type="button" value="ajax" align="center">
</form>

<script src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
<script>
    $(function () {
// 绑定点击事件
        $("#login04_btn").click(function () {
            $.ajax({
                url: "account/login04",
                contentType: "application/json;charset=UTF-8",
                data: '{"uname":"reolcharm","email":"mmmm@gmail.com","age":"12"}',
                dataType: "json",
                type: "post",
                success: function (data) {
                    alert(data);
                    alert(data.uname);
                }
            });
        });
    });
</script>
</body>
</html>
