<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>信息页面</title>
</head>
<body>
<center>
    <h2></h2>

    <table border="1">
        <tr>
            <th>客户名称</th>
            <th>电话</th>
            <th>客户来源</th>
            <th>客户级别</th>
        </tr>
        <tr align="center">
            <td>${submitCustomer.cust_name}</td>
            <td>${submitCustomer.cust_mobile}</td>
            <td>${submitCustomer.cust_source}</td>
            <td>${submitCustomer.cust_level}</td>
        </tr>
    </table>
</center>
</body>
</html>