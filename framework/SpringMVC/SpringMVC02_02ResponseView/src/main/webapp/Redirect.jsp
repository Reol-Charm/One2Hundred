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
    <input type="submit" value="登录账户， post 请求" align="center">
</form>
<hr color="lightgreen">
<form action="account/login02" method="post">
    用户名: <input type="text" name="account.username"/>
    密码: <input type="password" name="account.password"/><br>
    <input type="submit" value="登录账户， post 请求" align="center">
</form>
</body>
</html>
