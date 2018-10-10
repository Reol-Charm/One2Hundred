<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/10/8
  Time: 14:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Ajax_Json_Redis</title>
    <script src="js/jquery-3.3.1.min.js"></script>
    <script>
        /* 入口函数*/
        $(function () {
            /* 获取要操作的 select 标签 */
            var select = $("#select");
            /* 发送请求 */
            $.get("provinceServlet", {}, function (data) {
                /* todo 取出数据, 在 select 标签下添加子节点 */
                $(data).each(function () {
                    //3.创建<option>
                    var option = "<option name='" + this.id + "'>" + this.name + "</option>";

                    select.append(option);
                });
            });
        });
    </script>
</head>
<body>
<select id="select">
    <option>
        --请选择地址--
    </option>
</select>
</body>
</html>
