package me.reolcharm.travel.web.servlet;
import me.reolcharm.travel.domain.Category;
import me.reolcharm.travel.service.CategoryService;
import me.reolcharm.travel.service.impl.CategoryServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-12 18:19
 * @Description:
 **/
public class CategoryServlet extends BaseServlet {
    private CategoryService service = new CategoryServiceImpl();

    /**
     * @Param: [request, response]
     * @Return: void
     * @Author: Reolcharm
     * @Date: 2018/10/12-20:11
     * @Description: 从 tab_category 表中查询所有数据, 在页面展示.
     */
    public void listCategory(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Category> categories = service.findAllCategory();
        String s = writerAsString(categories, response);
//       [{"cid":8,"cname":"全球自由行"},{"cid":5,"cname":"国内游"},{"cid":4,"cname":"处境游"},{"cid":7,"cname":"抱团定制"},{"cid":6,"cname":"港澳游"},{"cid":2,"cname":"酒店"},{"cid":1,"cname":"门票"},{"cid":3,"cname":"香港车票"}]
        System.out.println("s = " + s);
        response.getWriter().write(s);
    }


}
