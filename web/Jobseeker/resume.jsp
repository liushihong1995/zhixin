<%--
  Created by IntelliJ IDEA.
  User: 温雅新
  Date: 2019/1/11
  Time: 19:09
  制作在线简历
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored ="false" %>
<html>
<head>
    <title>知心招聘 | 简历编辑</title>
    <link rel="stylesheet" href="../bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" type="text/css">
    <link rel="stylesheet" href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" type="text/css">
    <link rel="stylesheet" href="../CSS/CommonCss/header_three.css" type="text/css">
    <link rel="stylesheet" href="../CSS/SeekerCss/resume.css" type="text/css">
</head>
<body>
    <div class="resume_header">
        <jsp:include page="../Common/header_one.jsp"></jsp:include>
    </div>
    <!-- Start:存放简历的容器-->
    <div class="resume_container">
        <div class="hiddenDiv">
            <!-- 行业 -->
            <div class="industryDiv">
                <input type="text" id="opName" hidden/>
                <div class="industry_up">
                    <label class="industry_title">请选择行业类别</label>
                    <span class="glyphicon glyphicon-remove" id="closeIndustry" onclick="closeIndustryDiv()"></span>
                </div>
                <div class="industry_down">
                </div>
            </div>
            <!-- 职类-->
            <div class="categoryDiv">
                <input type="text" id="cateOpName" hidden/>
                <div class="industry_up">
                    <label class="industry_title">请选择职位类型</label>
                    <span class="glyphicon glyphicon-remove" id="closeCategory" onclick="closeCateDiv()"></span>
                </div>
                <div class="category_down">
                    <div class="cate_first_list">
                    </div>
                    <div class="cate_second">
                        <div class="cate_second_header">
                        </div>
                        <div class="cate_second_list"></div>
                    </div>
                    <div class="cate_third">
                        <div class="cate_third_header">
                            <label id="third_header" style="width: 440px"></label>
                            <label id="return_second" style="width: 50px" onclick="goForward()">返回</label>
                        </div>
                        <div class="cate_third_list"></div>
                    </div>
                </div>
            </div>
            <div class="cityDiv">
                <div class="industry_up">
                    <label class="industry_title">请选择城市</label>
                    <span class="glyphicon glyphicon-remove" id="closeCity" onclick="closeCityDiv()"></span>
                </div>
                <div class="cityDown">
                </div>
            </div>
        </div>
        <!-- Start:存放简历内容 -->
        <div class="resume_content">
            <!-- 显示更新事件和预览简历 -->
            <div class="update_and_brower">
                <label id="lastUpdateTime">最后更新 2019-01-11 19:04</label>
                <label id="browerResume"><a target="_blank" href="http://localhost:8080/zhixin/seeker/browerResume.action?id=${uid}">预览简历</a></label>
            </div>
            <!-- Start:显示基本信息-->
            <div class="show_base_infor">
                <div class="show_base_infor_left">
                    <label id="user_name">温姑娘</label>
                    <img id="user_sex" src="../images/female.png" class="img-circle" width="35px" height="35px">
                    <span id="editInforIcon" class="glyphicon glyphicon-edit"></span>
                    </br>
                    <span id="beginWorkTimeIcon" class="glyphicon glyphicon-briefcase"></span>
                    <label id="user_beginWorkTime"></label>
                    <span id="educationIcon" class="glyphicon glyphicon-education"></span>
                    <label id="user_education"></label>
                    <span id="statusIcon" class="glyphicon glyphicon-asterisk"></span>
                    <label id="user_status"></label></br>
                    <span id="phoneIcon" class="glyphicon glyphicon-earphone"></span>
                    <label id="user_phone"></label>
                    <span id="emailIcon" class="glyphicon glyphicon-envelope"></span>
                    <label id="user_email">
                    </label>
                </div>
                <div class="show_base_infor_right">
                    <img id="user_photo" src="" class="img-circle" width="100px" height="100px">
                </div>
            </div>
            <!--End: 显示基本信息-->
            <!-- Start:编辑基本信息-->
            <div class="edit_base_infor">
                <label id="edit_infor_label" class="title_label">编辑个人信息</label></br>
                <div class="infor_item">
                    <label>姓 名</label></br>
                    <input type="text" id="snameInput" >
                </div>
                <div class="infor_item">
                    <label>求职状态</label></br>
                    <select id="status_select">
                        <option value="离职-随时到岗">离职-随时到岗</option>
                        <option value="在职-暂不考虑">在职-暂不考虑</option>
                        <option value="在职-考虑机会">在职-考虑机会</option>
                        <option value="在职-月内到岗">在职-月内到岗</option>
                    </select>
                    <input type="text" id="statusInput" hidden>
                </div>
                <div class="infor_item">
                    <label>性 别</label></br>
                    <input type="text" id="sexInput" value="男" hidden>
                    <button type="button" class="btn btn-default" id="male">男</button>
                    <button type="button" class="btn btn-default" id="female">女</button>
                </div>
                <div class="infor_item">
                    <label>工作经验</label></br>
                    <select id="selectWorkExp">
                        <option value="应届生">应届生</option>
                        <option value="1年以内">1年以内</option>
                        <option value="1-3年">1-3年</option>
                        <option value="3-5年">3-5年</option>
                        <option value="5-10年">5-10年</option>
                        <option value="10年以上">10年以上</option>
                    </select>
                    <input type="text" id="workExpInput" hidden>
                </div>
                <div class="infor_item">
                    <label>生 日</label></br>
                    <input type="text" class="form-control" id="birthInput" readonly="true">
                </div>
                <div class="infor_item">
                    <label>微信号</label></br>
                    <input type="text" id="weichatInput">
                </div>
                <div class="infor_item">
                    <label>电 话</label></br>
                    <input type="text" id="phoneInput" value="${Seeker.phone}" disabled="false">
                </div>
                <div class="infor_item">
                    <label>邮 箱</label></br>
                    <input type="text" id="emailInput">
                </div>
                <div class="infor_item">
                    <label>最高学历</label></br>
                    <select id="education_select">
                    </select>
                    <input type="text" id="eduInput" hidden>
                </div>
                <div class="infor_item">
                    <button type="button" class="btn btn-default" id="edit_base_infor_cancel">取 消</button>
                    <button type="button" class="btn btn-default" id="edit_base_infor_submit" onclick="updateBaseInfor()">完 成</button>
                </div>
            </div>
            <!-- End:编辑基本信息-->

            <!-- Start:展示个人优势-->
            <div class="show_user_advantange">
                <label class="mySign"></label><label id="advantage_label" class="show_title_label">个人优势</label></br>
                <div class="advantange_content">
                    <div id="show_advange_content">
                         哈哈哈哈哈哈哈啊哈哈
                    </div>
                    <div id="edit_advange_btn">
                        <span class="glyphicon glyphicon-edit" id="go_edit_advange"></span>
                    </div>
                </div>
            </div>
            <!-- End:显示个人优势-->
            <div class="edit_user_advantange">
                <label id="edit_advange_label" class="title_label">编辑个人优势</label></br>
                <textarea id="advantageInput">
                </textarea></br>
                <button type="button" class="btn btn-default" id="edit_advange_cancel">取 消</button>
                <button type="button" class="btn btn-default" id="edit_advange_submit" onclick="updateAdvantage()">完 成</button>
            </div>

            <!-- Start:展示期望职位-->
            <div class="show_hope_job">
                <!--
                <label class="mySign"></label><label id="show_hope_job_label" class="show_title_label">期望职位</label></br>
                <div class="hope_job_item">
                    <span class="glyphicon glyphicon-star"></span>
                    <label class="hopeColumn">Java</label>
                    <span class="glyphicon glyphicon-yen"></span>
                    <label class="hopeColumn">2K到4K</label>
                    <span class="glyphicon glyphicon-heart"></span>
                    <label class="hopeColumn">移动互联网</label>
                    <span class="glyphicon glyphicon-map-marker"></span>
                    <label class="hopeColumn">杭州</label>
                    <span class="glyphicon glyphicon-trash hope_trash"></span>
                    <span class="glyphicon glyphicon-edit hope_edit"></span>
                </div>
                <div class="hope_job_item">
                    <span class="glyphicon glyphicon-plus hope_plus"></span><label id="add_hope_job_label">添加期望职位</label>
                </div>
                <div class="blank"></div>
                -->
            </div>
            <!-- End:展示期望职位 -->
            <!-- Start:编辑期望职位 -->
            <div class="edit_hope_job">
                <input type="text" id="jobId" hidden/>
                <input type="text" id="jobOp" hidden/>
                <label id="edit_hope_job_label" class="title_label">编辑期望信息</label></br>
                <div class="infor_item">
                    <label>期望职位</label></br>
                    <input type="text" id="catetoryInput" readonly="true"/>
                    <input type="text" id="categoryIdInput" hidden/>
                </div>
                <div class="infor_item">
                    <label>薪资范围</label></br>
                    <select id="salarySelect">
                        <option value="3K以下">3K以下</option>
                        <option value="3K-5K">3K-5K</option>
                        <option value="5K-10K">5K-10K</option>
                        <option value="10K-15K">10K-15K</option>
                        <option value="15K-20K">15K-20K</option>
                        <option value="20K-30K">20K-30K</option>
                        <option value="30K-50K">30K-50K</option>
                        <option value="50K以上">50K以上</option>
                    </select>
                    <input type="text" id="salaryInput" hidden/>
                </div>
                <div class="infor_item">
                    <label>行 业</label></br>
                    <input type="text" id="industryInput" readonly="true">
                    <input type="text" id="industryIdInput" hidden/>
                </div>
                <div class="infor_item">
                    <label>城 市</label></br>
                   <input type="text" id="cityInput" readonly="true">
                </div>
                <button type="button" id="edit_hope_job_cancel" class="btn btn-default">取 消</button>
                <button type="button" id="edit_hope_job_submit" class="btn btn-default" onclick="updateHope()">完 成</button>
            </div>
            <!-- End:编辑期望职位-->

            <!-- Start:展示实习经历-->
            <div class="show_practice_experience">
                <!--
                <label class="mySign"></label><label id="show_practice_experience_label" class="show_title_label">实习经历</label>
                <div class="pe_item">
                    <label>浙江创邻科技有限公司</label><label>2018.07-2018-11</label>
                    <span class="glyphicon glyphicon-trash practice_trash"></span>
                    <span class="glyphicon glyphicon-edit practice_edit"></span></br>
                    <label>研发部</label><label>Java实习生</label></br>
                    <label>工作内容</label></br>
                    <div class="show_practice_content">
                    </div>
                    <label>工作业绩</label></br>
                    <div class="show_practice_achieve">
                    </div>
                </div>
                <div class="hope_job_item">
                    <span class="glyphicon glyphicon-plus hope_plus"></span><label id="add_practice_experience_label">添加实习经历</label>
                </div>
                <div class="blank"></div>
                >-->
            </div>
            <!-- End:展示实习经历-->

            <!-- Start:编辑实习经历-->
            <div class="edit_practice_experience">
                <input type="text" id="practiceId" hidden/>
                <input type="text" id="practiceOp" hidden/>
                <label id="edit_practice_experience_label" class="title_label">编辑实习经历</label></br>
                <div class="infor_item">
                    <label>公司名称</label></br>
                    <input type="text" id="compInput" >
                    <div class="compList"></div>
                    <input type="text" id="compIdInput" hidden/>
                </div>
                <div class="infor_item">
                    <label>所属行业</label></br>
                    <input type="text" id="pIndustryInput" readonly="true">
                    <input type="text" id="pIndustryIdInput" hidden/>
                </div>
                <div class="infor_item">
                    <label>所属部门(选填)</label></br>
                    <input type="text" id="departInput">
                </div>
                <div class="infor_item">
                    <label>职位名称(选填)</label></br>
                    <input type="text" id="jobNameInput">
                </div>
                <div class="infor_item">
                    <label>职位类型</label></br>
                    <input type="text" id="pCategoryInput" readonly="true"/>
                    <input type="text" id="pCategoryIdInput" hidden/>
                </div>
                <div class="infor_item">
                    <label>在职时间</label></br>
                    <input type="text" id="start_select" style="width:130px;height: 40px" readonly="true"/>
                    <label>&nbsp&nbsp至&nbsp&nbsp</label>
                    <input type="text" id="end_select" style="width:130px;height: 40px " readonly="true"/>
                </div>
                <div class="edit_practice_content">
                    <label>工作内容</label></br>
                    <textarea id="practice_content">
                    </textarea>
                </div>
                <div class="edit_practice_achieve">
                    <label>工作业绩</label></br>
                    <textarea id="practice_achieve">
                    </textarea>
                </div>
                <button type="button" id="edit_practice_achieve_cancel" class="btn btn-default">取 消</button>
                <button type="button" id="edit_practice_achieve_submit" class="btn btn-default" onclick="update_practice()">完 成</button>
            </div>
            <!-- End:编辑实习经历-->
            <!-- Start：显示项目经历 -->
            <div class="show_project">
                <!--
                <label class="mySign"></label><label class="show_title_label">项目经历</label>
                <div class="project_item">
                    <label>仿Boss直聘招聘网站</label>&nbsp&nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp&nbsp<label>2018.07-2018-11</label>
                    <span class="glyphicon glyphicon-trash project_trash"></span>
                    <span class="glyphicon glyphicon-edit project_edit"></span></br>
                    <label>UI设计、前端开发、后端开发</label></br>
                    <label>项目描述</label></br>
                    <div class="project_content">
                        1.负责爬虫小组数据的清洗。
                        2. 负责后台代码的编码。
                        3. 负责测试师傅写的代码。
                    </div>
                    <label>项目业绩</label>
                    <div class="project_achieve">
                        1.负责爬虫小组数据的清洗。
                        2. 负责后台代码的编码。
                        3. 负责测试师傅写的代码。
                    </div>
                </div>
                <div class="hope_job_item">
                    <span class="glyphicon glyphicon-plus hope_plus"></span><label id="add_project_label">添加项目经历</label>
                </div>
                <div class="blank"></div>
                -->
            </div>
            <!-- End: 显示项目经历 -->
            <!-- Start: 编辑项目经历 -->
            <div class="edit_project">
                <label id="edit_project_label" class="title_label">编辑项目经历</label></br>
                <input type="text" id="proId" hidden/>
                <input type="text" id="proOp" hidden/>
                <div class="infor_item">
                    <label>项目名称</label></br>
                    <input type="text" id="proNameInput" placeholder="例如：知心招聘">
                </div>
                <div class="infor_item">
                    <label>项目角色</label></br>
                    <input type="text" id="roleInput" placeholder="例如：UI设计师">
                </div>
                <div class="infor_item">
                    <label>开始时间</label></br>
                    <input type="text" id="pro_start" readonly="true"/>
                </div>
                <div class="infor_item">
                    <label>终止时间</label></br>
                    <input type="text" id="pro_end" readonly="true"/>
                </div>
                <div class="pro_url">
                    <label>项目链接（选填）</label></br>
                    <input type="text" id="urlInput" placeholder="例如：http://www.wyxeainn.com">
                </div>
               <div class="edit_project_content">
                   <label>项目描述</label></br>
                   <textarea id="pro_content"></textarea>
               </div>
                <div class="edit_project_achieve">
                    <label>项目成绩</label></br>
                    <textarea id="pro_achieve"></textarea>
                </div>
                <button class="btn btn-default" type="button" id="edit_project_cancel">取 消</button>
                <button class="btn btn-default" type="button" id="edit_project_submit" onclick="update_pro()">完 成</button>
            </div>
            <!-- End:编辑项目经历 -->
            <!-- Start:显示教育经历-->
            <div class="show_edu_exp">
                <!--
                <label class="mySign"></label><label id="show_edu_exp_label" class="show_title_label">教育经历</label>
                <div class="edu_item">
                    <label>平顶山学院</label>
                    <label>2015-2019</label>
                    <label>计算机科学与技术</label>
                    <label>本科</label>
                    <span class="glyphicon glyphicon-trash edu_trash"></span>
                    <span class="glyphicon glyphicon-edit edu_edit"></span>
                </div>
                <div class="hope_job_item">
                    <span class="glyphicon glyphicon-plus hope_plus"></span><label id="add_edu_label">添加教育经历</label>
                </div>
                <div class="blank"></div>-->
            </div>
            <!-- End:显示教育经历 -->
            <!-- Start:编辑教育经历 -->
            <div class="edit_edu_exp">
                <input type="text" id="eduIdInput" hidden/>
                <input type="text" id="eduOp" hidden/>
                <label id="edit_edu_label" class="title_label">编辑教育经历</label></br>
                <div class="edu_range">
                    <label>时间段</label></br>
                    <input id="select_edu_start" readonly="true"/>
                    <label id="edu_range_label">至</label>
                    <select id="select_edu_end"></select>
                    <input type="text" id="edu_end" hidden/>
                </div>
                <div class="infor_item">
                    <label>学校名称</label></br>
                    <input type="text" id="schoolNameInput" placeholder="例如：北京大学">
                </div>
                <div class="infor_item">
                    <label>学 历</label></br>
                    <select id="edu_select">
                    </select>
                    <input id="levelInput" type="text" hidden>
                </div>
                <div class="infor_item">
                    <label>专业名称</label></br>
                    <input type="text" id="majorInput" placeholder="例如：计算机科学与技术">
                </div>
                <div class="infor_item">
                    <button class="btn btn-default" type="button" id="edit_edu_cancel">取 消</button>
                    <button class="btn btn-default" type="button" id="edit_edu_submit" onclick="update_edu()">完 成</button>
                </div>
            </div>
            <!-- End:编辑教育经历 -->
            <!-- Start:显示社交主页 -->
            <div class="show_social">
                <!--
                <label class="mySign"></label><label id="show_social_label" class="show_title_label">社交主页</label>
                <div class="social_item">
                    <span class="glyphicon glyphicon-star-empty"></span><label>https://blog.csdn.net/wyxeainn</label>
                    <span class="glyphicon glyphicon-trash social_trash"></span>
                    <span class="glyphicon glyphicon-edit social_edit"></span>
                </div>
                <div class="hope_job_item">
                    <span class="glyphicon glyphicon-plus hope_plus"></span><label id="add_social_label">添加社交主页</label>
                </div>
                <div class="blank"></div> -->
            </div>
            <!-- End:显示社交主页结束 -->
            <!-- Start:添加社交主页 -->
            <div class="edit_social">
                <label id="edit_social_label" class="title_label">编辑社交主页</label></br>
                <input type="text" id="socialInput" placeholder="例如：www.wyxeainn.com">
                <input type="text" id="socialIdInput" hidden>
                <input type="text" id="socialOp" hidden>
                <button class="btn btn-default" id="edit_social_cancel" type="button">取 消</button>
                <button class="btn btn-default" id="edit_social_submit" type="button" onclick="update_social()">完 成</button>
            </div>
            <div class="blank"></div>
            <div class="blank"></div>
            <div class="blank"></div>
            <div class="blank"></div>
            <div class="blank"></div>
            <div class="blank"></div>
            <div style="clear:both;"></div>
        </div><!-- 存放简历内容 -->
        <div style="clear:both;"></div>
    </div><!-- End: 存放简历的容器 -->
    <script src="../JQuery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js"></script>
    <script src="../bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.fr.js"></script>
    <script src="../JS/CommonJs/header_one.js" type="text/javascript"></script>
    <script src="../JS/SeekerJs/resume.js" type="text/javascript"></script>
</body>
</html>
