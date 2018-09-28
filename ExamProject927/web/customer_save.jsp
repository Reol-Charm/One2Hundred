<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<center>
		<%--submit the form--%>
		<form method="post" action="${pageContext.request.contextPath}/saveServlet">
			<table width="60%" height="60%"  align="center" bgcolor="#ffffff">
				<tr>
					<td colspan="2">新增客户 <font color='red'></font></td>
				</tr>
				<tr>
					<td>客户名称</td>
					<td><input name="cust_name"></td>
				</tr>
				<tr>
					<td>客户电话</td>
					<td><input name="cust_mobile"></td>
				</tr>
				<tr>
					<td>客户来源</td>
					<td>
						<select name="cust_source">
							<option value="电话营销">电话营销</option>
							<option value="网络营销">网络营销</option>
							<option value="广告推广">广告推广</option>
							<option value="朋友介绍">朋友介绍</option>
							<option value="咨询">咨询</option>
						</select>
					</td>
				</tr>
				<tr>
					<td>客户级别</td>
					<td>
						<select name="cust_level">
							<option value="vip">vip</option>
							<option value="普通客户">普通客户</option>
						</select>
					</td>
				</tr>
				<tr>
					<td colspan='2'><input type="submit"></td>
				</tr>
			</table>
		</form>
	</center>
</body>
</html>