package me.reolcharm.travel.web.servlet;

import me.reolcharm.travel.domain.ResultInfo;
import me.reolcharm.travel.domain.User;
import me.reolcharm.travel.service.UserService;
import me.reolcharm.travel.service.impl.UserServiceImpl;
import org.apache.commons.beanutils.BeanUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

/**
 * @Project: HeimaTravelWeb
 * @Author: Reolcharm
 * @CreatedTime: 2018-10-12 18:15
 * @Description: 用户模块功能汇总
 **/
public class UserServlet extends BaseServlet {

    private UserService service = new UserServiceImpl();

    /**
     * @param request
     * @param response
     * @Return: void
     * @Author: Reolcharm
     * @Date: 2018/10/12-19:58
     * @Description: 校验成功后, 注册, 向数据库插入注册信息
     */
    public void register(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        /*校验成功后， 数据库插入数据*/
        /*获取参数*/
        Map<String, String[]> map = request.getParameterMap();
        User userBean1 = new User();
        /*封装参数*/
        try {
            BeanUtils.populate(userBean1, map);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        /*调用 saveService 插入数据，并返回完整的 userbean2 */
//        service.save(userBean1);
    }

    /**
     * @Param: [request, response]
     * @Return: void
     * @Author: Reolcharm
     * @Date: 2018/10/12-19:57
     * @Description: 键盘事件-校验验证码
     */
    public void checkVerifyCode(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        ResultInfo info = new ResultInfo();

        String checkcode = request.getParameter("checkcode");
        String verifycode = (String) session.getAttribute("CHECKCODE_SERVER");
        session.removeAttribute("CHECKCODE_SERVER");
        if (!verifycode.equalsIgnoreCase(checkcode) || checkcode == null) {
            /*验证码不正确*/
            info.setFlag(false);
            info.setErrorMsg("need more");
        } else {
            info.setFlag(true);
        }
        writerAsString(info, response);
    }

    /**
     * @Param: [request, response]
     * @Return: void
     * @Author: Reolcharm
     * @Date: 2018/10/12-19:59
     * @Description: 异步校验用户名是否可用
     */
    protected void checkUsername(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, java.io.IOException {
        /*获取username*/
        /*获取参数*/
        Map<String, String[]> map = request.getParameterMap();
        User userBean1 = new User();
        /*封装参数*/
        try {
            BeanUtils.populate(userBean1, map);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        /*调用 saveService 插入数据，并返回完整的 userbean2 */
        User userBean2 = service.searchByUsername(userBean1);
        ResultInfo info = new ResultInfo();
        /*根据查询结果, json */
        if (userBean2 != null) {
            /*查到有 user了, 该用户名不可用*/
            info.setFlag(false);
            info.setErrorMsg("该名称太受欢迎了, 请尝尝试其他~");
        } else {
            /*查到没 user*/
            info.setFlag(true);
            info.setErrorMsg("太厉害了, 该用户名肥常帅气~");
        }
        writerAsString(info, response);
    }
}
