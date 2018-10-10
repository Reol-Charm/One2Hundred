<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>

<body>
	<center><%--todo 1: 添加跳转超链接--%>
			<h2>
                <a href="${pageContext.request.contextPath}/listServlet">客户列表</a>
				<%--todo 2. 跳转到 ListServlet 查询所有,再重定向到 list.jsp--%>
			</h2>
			<h2>
                <a href="${pageContext.request.contextPath}/customer_save.jsp">新增客户</a>
				<%--todo 3. 跳转到 customer_save.jsp ,再提交到 saveServlet ,插入一条新的数据, 再转发到listServlet,展示--%>
			</h2>

	</center>
</body>
</html>