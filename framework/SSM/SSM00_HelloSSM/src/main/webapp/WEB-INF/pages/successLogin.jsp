<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/11/4
  Time: 20:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Login Success</title>
</head>
<body>
<h3 align="center">欢迎您!<span style="color: lightsalmon">${account.username}</span>
    <c:if test="true">先生~</c:if>
</h3>
</body>
</html>
