package com.wyxeainn.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.wyxeainn.pojo.Admin;
import com.wyxeainn.pojo.Code;
import com.wyxeainn.service.AdminService;
import com.wyxeainn.service.AdminServiceImpl;
import com.wyxeainn.service.CodeService;
import com.wyxeainn.service.CodeServiceImpl;
import com.wyxeainn.tools.SMSUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import sun.misc.BASE64Decoder;
import sun.net.www.content.image.jpeg;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.io.File;

/**
 * Author:温雅新
 * Date:2018/11/26
 *
 * 处理管理员模块请求的Controller
 */
@Controller
public class AdminController {

    private AdminService adminService = new AdminServiceImpl();
    private CodeService codeService = new CodeServiceImpl();


    /**
     * 根据管理员id获取管理员信息
    * @param adminId
     * @return
     */
    @RequestMapping(value = "/admin/getAdminById.action")
    public  @ResponseBody Admin getAdminById(@RequestBody String adminId) {
        int id = Integer.parseInt(adminId);
        //adminService = new AdminServiceImpl();
        Admin admin = adminService.selectById(id);
        admin.setPassword("");
        admin.setEncryption("");
        return admin;
    }

    @RequestMapping(value = "admin/homePage.action")
    public String goHomePage(HttpSession session) {
        return "/Admin/manage.jsp";
    }

    @RequestMapping(value = "admin/signOut.action")
    public String existManageSystem(HttpSession session) {
        session.removeAttribute("adminId");
        return "/Admin/login.jsp";
    }

    /*
    用来处理管理员登录
    * */
    @RequestMapping(value = "/admin/adminLogin.action",method = RequestMethod.POST)
    public ModelAndView adminLogin(String username,String password,HttpSession session) {
       // adminService = new AdminServiceImpl();
        //检测要登录的管理员是否存在
        boolean flag = adminService.adminLoginCheck(username,password);
        ModelAndView mav = new ModelAndView();
        if(flag) {
            Admin admin = adminService.selectByPhone(username);
            mav.setViewName("/Admin/manage.jsp");
            //mav.addObject("Admin",admin);
            //mav.addObject("USER_ACCOUNT",username);
            session.setAttribute("adminId",admin.getId());
        }else {
            mav.setViewName("/Admin/login.jsp");
        }
        return mav;
    }

    /**
     * 用来检测管理员账号是否存在
     * @param params
     * @return
     */
    @RequestMapping(value = "admin/accountExist.action")
    public @ResponseBody
    Boolean accountExist(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String phone = (String)obj.get("phone");
       // adminService = new AdminServiceImpl();
        boolean flag = adminService.accountExist(phone);
        return flag;
    }

    /**
     * 插入一条管理员记录
     * @param param
     * @return
     */
    @RequestMapping(value = "admin/insertAdmin.action")
    public @ResponseBody int insertAdmin(@RequestBody String param) {
        JSONObject obj = JSON.parseObject(param);
        Admin admin = new Admin();
        String phone = obj.getString("phone");
        admin.setPhone(phone);
        String password = obj.getString("pwd");
        admin.setPassword(password);
        admin.setEncryption(password);
        String name = obj.getString("name");
        admin.setName(name);
        String cardNum = obj.getString("cardNum");
        admin.setCardNum(cardNum);
        String department = obj.getString("depart");
        admin.setDepartment(department);
        String email = obj.getString("email");
        admin.setEmail(email);
        admin.setPsrc("");
       // adminService = new AdminServiceImpl();
        int result = 0;
        try {
            adminService.insertAdmin(admin);
            Code code = new Code();
            code.setId(phone);
            code.setCode("");
            codeService = new CodeServiceImpl();
            codeService.insertCode(code);
            result = 1;
        }catch(Exception ex) {
            result = 0;
        }
        return result;
    }

    //分页查询代码
    @RequestMapping(value = "admin/pagequery.action")
    public @ResponseBody String pageQuery(@RequestBody String param) {
        JSONObject obj = JSON.parseObject(param);
        int currentPage = obj.getInteger("currentPage");
     //   adminService = new AdminServiceImpl();
        //获取总记录数
        int totalRecordNum = adminService.recordCount();
        List<Admin> admins = adminService.pageQuery(currentPage);
        Admin admin = null;
        for(int i = 0; i < admins.size(); i++) {
            admin = admins.get(i);
            if(admin.getPhone().equals("admin")) {
                admins.set(i,null);
                break;
            }else {
                admins.get(i).setPassword("");
                admins.get(i).setEncryption("");
            }
        }
        for(int i = admins.size(); i < 10; i++) {
            admins.add(null);
        }
        int totalPage = 0;
        if(totalRecordNum%10==0) {
            totalPage = totalRecordNum/10;
        }else {
            totalPage = totalRecordNum/10 + 1;
        }
        HashMap<String,String> map = new HashMap<String,String>();
        map.put("currentPage",String.valueOf(currentPage));
        map.put("totalPageNum",String.valueOf(totalPage));
        map.put("admins",JSON.toJSONString(admins));
        String result = JSON.toJSONString(map);
        return result;
    }

    //查询一条管理员记录的代码
    @RequestMapping(value = "admin/getOneAdmin.action")
    public @ResponseBody Admin queryAdminById(@RequestBody String param) {
        JSONObject obj = JSON.parseObject(param);
        String adminId = obj.getString("id");
        int id = Integer.parseInt(adminId);
     //   adminService = new AdminServiceImpl();
        Admin admin = adminService.selectById(id);
        admin.setPassword("");
        admin.setEncryption("");
        return admin;
    }

    /**
     * 根据ID删除一条管理员记录
     * @param param JSON字符串
     * @return       是否成功删除
     */
    @RequestMapping(value = "admin/deleteOneAdmin.action")
    public @ResponseBody Boolean deleteAdminById(@RequestBody String param) {
        JSONObject obj = JSON.parseObject(param);
        String adminId = obj.getString("id");
        int id = Integer.parseInt(adminId);
   //     adminService = new AdminServiceImpl();
        boolean flag = false;
        try {
            adminService.deleteById(id);
            flag = true;
        }catch(Exception ex) {
            ex.printStackTrace();
        }
        return flag;
    }

    /**
     * 根据账号更新部门和邮箱
     *
     * @param param 参数，JSON格式
     * @return true代表更新成功，false代表修改失败
     */
    @RequestMapping(value = "admin/updateDepartAndEmail.action")
    public @ResponseBody Boolean updateDepartAndEmail(@RequestBody String param){
        JSONObject obj = JSON.parseObject(param);
        int id = Integer.parseInt((String)obj.get("id"));
        String department = obj.getString("department");
        String email = obj.getString("email");
        Admin admin = new Admin();
        admin.setId(id);
        admin.setEmail(email);
        admin.setDepartment(department);
       // adminService = new AdminServiceImpl();
        boolean flag = true;
        try {
            adminService.updateDepartAndEmail(admin);
        }catch (Exception ex) {
            flag = false;
        }
        return flag;
    }


    @RequestMapping(value = "admin/existPassword.action")
    public @ResponseBody Boolean existPassword(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String adminId = obj.getString("id");
        int id = Integer.parseInt(adminId);
        String password = obj.getString("password");
     //   adminService = new AdminServiceImpl();
        Admin admin = adminService.selectById(id);
        if(password.equals(admin.getEncryption())) {
            return true;
        }else {
            return false;
        }
    }

    /**
     * 更新对应用户的密码
     * @param params 参数
     * @return
     */
    @RequestMapping(value = "admin/updatePassword.action")
    public @ResponseBody Boolean updatePassword(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String adminId = obj.getString("id");
        int id = Integer.parseInt(adminId);
        String password = obj.getString("password");
        Admin admin = new Admin();
        admin.setPassword(password);
        admin.setEncryption(password);
        admin.setId(id);
     //   adminService = new AdminServiceImpl();
        try {
            adminService.updatePassword(admin);
            return true;
        }catch(Exception ex) {
            return false;
        }
    }

    /**
     * 上传管理员头像
     */
    @RequestMapping(value = "admin/uploadPicture.action")
    public @ResponseBody Boolean uploadAdminPic(@RequestBody String params,HttpSession session) {
        JSONObject obj = JSON.parseObject(params);
        String _id = obj.getString("id");
        int id = Integer.parseInt(_id);
        String image = obj.getString("image");
        String uuid = UUID.randomUUID().toString();
        String path = "E:\\upload\\adminPhoto\\" + uuid + ".jpeg";
        File file = base64ToFile(path,image);
        String picName = uuid + ".jpeg";
    //    adminService = new AdminServiceImpl();
        Admin oldInfor = adminService.selectById(id); //获取旧的信息
        Admin admin = new Admin();
        admin.setId(id);
        admin.setPsrc(picName);
        boolean flag = true;
        try {
            adminService.updatePsrc(admin);
            //获取旧图片的名字
            String oldPicName = oldInfor.getPsrc();
            if(oldPicName!=null && !oldPicName.equals("")) {
                //获取旧图片的路径
                String oldPath = "E:\\upload\\adminPhoto\\" + oldPicName;
                //删除旧图片
                File oldPic = new File(oldPath);
                if(oldPic.exists()) {
                    System.out.println("存在");
                    oldPic.delete();
                }
            }
        }catch(Exception ex) {
            flag = false;
            ex.printStackTrace();
        }
        return flag;
    }

    /**
     * base64转成文件格式
     * @param path
     * @param image
     * @return
     */
    public File base64ToFile(String path,String image) {
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            byte[] b = decoder.decodeBuffer(image);
            for (int i = 0; i < b.length; i++) {
                if (b[i] < 0) {
                    b[i] += 256;
                }
            }
            OutputStream out = new FileOutputStream(path);
            out.write(b);
            out.flush();
            out.close();
        } catch (Exception e) {
            e.printStackTrace();

        }
        return new File(path);
    }


    /**
     * 获取短信验证码的function.
     * 1.产生验证码，发送短信
     * 2.把验证码写入数据库
     * @param params
     * @return
     */
    @RequestMapping(value = "admin/getDynamicCode.action")
    public @ResponseBody Boolean getDynamicCode(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String newPhone = obj.getString("newPhone");
        String oldPhone = obj.getString("oldPhone");
        String code = "";
        int x;
        for(int i = 0; i < 6; i++) {
            x = (int)(Math.random()*10);
            code += x;
        }
        String content = "您的验证码是" + code + "，在1分钟内输入有效。如非本人操作请忽略本短信。【知心招聘】";
        SMSUtil smsUtil = new SMSUtil();
        boolean flag = smsUtil.send(newPhone,content);
        Code c = new Code();
        c.setId(oldPhone);
        c.setCode(code);
      //  codeService = new CodeServiceImpl();
        try {
            codeService.updateCode(c);
        }catch(Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

    /**
     * 验证验证码的内容是否正确。
     * 1.获取指定id的验证码
     * 2.比较验证码
     * 3.正确返回true,错误返回false
     */
    @RequestMapping(value="checkCode.action")
    public @ResponseBody Boolean checkCode(@RequestBody String params) {
        JSONObject obj = JSON.parseObject(params);
        String id = obj.getString("id");
        String code = obj.getString("code");
       // codeService = new CodeServiceImpl();
        String str = codeService.getCode(id);   //从数据库中获取的验证码
        if(code.equals(str)) {
            return true;
        }else {
            return false;
        }
    }


    /**
     * 更新数据库的手机号码
     * @param params
     * @return
     */
    @RequestMapping(value = "admin/updatePhone.action")
    public @ResponseBody Boolean updatePhone(@RequestBody String params) {
        boolean flag = true;
        JSONObject obj = JSON.parseObject(params);
        String adminId = obj.getString("id");          //管理员id
        String oldPhone = obj.getString("oldPhone");  //管理员旧手机号
        String newPhone = obj.getString("newPhone");  //管理员新手机号
        int id = Integer.parseInt(adminId);
        Admin admin = new Admin();
        admin.setId(id);
        admin.setPhone(newPhone);
    //    adminService = new AdminServiceImpl();
        try {
            adminService.updatePhoneById(admin);
            Code code = new Code();
            //插入新号码
            code.setId(newPhone);
            code.setCode("");
            codeService = new CodeServiceImpl();
            codeService.insertCode(code);
            //删除旧号码
            codeService.deleteItem(oldPhone);
        } catch(Exception ex) {
            ex.printStackTrace();
            flag = false;
        }
        return flag;
    }

}
