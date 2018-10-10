<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
</head>
<body>
<table border="1" width="70%" align="center">
    <tr>
        <th>id</th>
        <th>客户名称</th>
        <th>客户来源</th>
        <th>客户级别</th>
        <th>客户电话</th>
    </tr>
    <%--遍历查询到的保存到 list 中的数据库所有信息--%>
    <c:forEach items="${sessionScope.customers}" var="customer" varStatus="s">
        <tr>
            <td>${s.count}</td>
            <td>${customer.cust_name}</td>
            <td>${customer.cust_source}</td>
            <td>${customer.cust_level}</td>
            <td>${customer.cust_mobile}</td>
        </tr>
    </c:forEach>

</table>
</body>
</html>