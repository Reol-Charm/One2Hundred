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

<form action="account/login02" method="post">
    用户名: <input type="text" name="username"/>
    密码: <input type="password" name="password"/><br>
    <input type="submit" value="登录账户， post 请求" align="center">
</form>
<br>
<hr>
<form action="account/login02" method="post">
    账户名: <input type="text" name="username"/>
    密码: <input type="password" name="password"/><br>
    <%--
    封装 POJO
    account = Account{username='Mikky', password='123',
    user=User{uname='mm', email='sdfjal@gmail.com', age=null}}
    --%>
    昵称: <input type="text" name="user.uname"/>
    邮箱: <input type="email" name="user.email"/>
    年龄: <input type="text" name="user.age"/><br>
    <input type="submit" value="登录账户， post 请求" align="center">
</form>


<hr color="lightBlue">


<%-- List/Map--%>
<form action="account/login03" method="post">
    账户名: <input type="text" name="username"/>
    密码: <input type="password" name="password"/><br>
    昵称: <input type="text" name="user.uname"/>
    邮箱: <input type="email" name="user.email"/>
    年龄: <input type="text" name="user.age"/><br>
    <%--list--%>
    totalCount: <input type="text" name="pageBeans[0].totalCount"/>
    totalPage: <input type="text" name="pageBeans[0].totalPage"/>
    <%--rname: <input type="text" name="pageBeans[0].routers[0].rname"/>--%>
    <%--<br>
    totalCount1st: <input type="text" name="pageBeanMap['first'].totalCount"/>
    totalPage1st: <input type="text" name="pageBeanMap['first'].totalPage"/><br>
    totalCount2nd: <input type="text" name="pageBeanMap['two'].totalCount"/>
    totalPage2nd: <input type="text" name="pageBeanMap['two'].totalPage"/><br>--%>
    <input type="submit" value="登录账户， post 请求" align="center">
</form>


</body>
</html>
