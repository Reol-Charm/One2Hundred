<%--
  Created by IntelliJ IDEA.
  User: ReolCharm
  Date: 2018/9/21
  Time: 17:16
  To change this template use File | Settings | File Templates.
--%>
<%-- 1. 导入 jstl jar 包 两个! --%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>

    <title>Welcome to ${sessionScope.loginUser.u_username}'s house</title>
</head>
<body>
<%--<c:if test="${sessionScope.loginUser.gender}">--%>
    <h2>Welcome! ${sessionScope.loginUser.u_username} </h2>
<%--</c:if>--%>
</body>
</html>
