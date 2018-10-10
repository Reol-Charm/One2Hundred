<%@page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<!-- 网页使用的语言 -->
<html lang="zh-CN">
<head>
    <!-- 指定字符集 -->
    <meta charset="utf-8">
    <!-- 使用Edge最新的浏览器的渲染方式 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- viewport视口：网页可以根据设置的宽度自动进行适配，在浏览器的内部虚拟一个容器，容器的宽度与设备的宽度相同。
    width: 默认宽度与设备的宽度相同
    initial-scale: 初始的缩放比，为1:1 -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>用户信息管理系统</title>

    <!-- 1. 导入CSS的全局样式 -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- 2. jQuery导入，建议使用1.9以上的版本 -->
    <script src="js/jquery-3.2.1.min.js"></script>
    <!-- 3. 导入bootstrap的js文件 -->
    <script src="js/bootstrap.min.js"></script>
    <style type="text/css">
        td, th {
            text-align: center;
        }
    </style>
</head>
<body>
<div class="container">
    <h3 style="text-align: center">用户信息列表</h3>
    <table border="1" class="table table-bordered table-hover">
        <tr class="success">
            <th>编号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>籍贯</th>
            <th>QQ</th>
            <th>邮箱</th>
            <th>操作</th>
            <th><input type="checkbox" class="mainCheckbox"></th>
        </tr>
        <%--很有问题, 怎么遍历 ? jstl标签咋写 熟能生巧...--%>
<%-- For input string: "length" --%>
<c:forEach var="tempUser" items="${sessionScope.userList}" varStatus="s"><%--items="${userList}" var="i" begin="0" end="${userList.length}" step="1"--%> <%--pageContext.session.--%>
    <tr><%--${userList[i].uid}--%>
        <%--<td>${tempUser.uid}</td>--%>

        <td>${s.count}</td>
        <td>${tempUser.userName}</td>
        <td>${tempUser.gender}</td>
        <td>${tempUser.age}</td>
        <td>${tempUser.address}</td>
        <td>${tempUser.qq}</td>
        <td>${tempUser.email}</td>

        <%--修改按钮绑定用户的 ID, 修改按钮一经点击, 跳转到查找指定用户的 servlet 中, 之后再跳转到 update.jsp --%>
        <td><a class="btn btn-default btn-sm" href="${pageContext.request.contextPath}/findUserByUidServlet?uid=${tempUser.uid}">修改</a>&nbsp;
            <%-- 同样绑定 uid , 传回 uid, 拿着uid 取数据库找对应的 user, 再删除. --%>
            <a class="btn btn-default btn-sm" href="<%--${pageContext.request.contextPath}--%>">删除</a>
        </td>
        <td><input type="checkbox" class="partCheckbox"></td>
    </tr>
</c:forEach>

        <tr>
            <td colspan="9" align="center"><a class="btn btn-primary" href="add.jsp">添加联系人</a></td>
        </tr>
    </table>
</div>
</body>
</html>
