package com.wyxeainn.tools;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.text.FieldPosition;
import java.text.Format;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 封装短信接口的发送类
 */
public class SMSUtil {
    static String httpUrl = "http://yun.movek.net:83/api/sms/send.json";
    final  static String apikey = "1a284d4dbdc74aa9a4beaf74d6f9c373";
    public boolean send(String phone,String content) {
        boolean flag = false;
        try {
            JSONObject data = new JSONObject();
            data.put("apikey",apikey);
            data.put("tpl_id","540");
            data.put("content",content);
            data.put("mobile",phone);
            data.put("extNo","");
            /*Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String current = sdf.format(date);*/
            data.put("sendTime","");

            URL url = new URL(httpUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");   //设置提交方式
            //设置允许输出
            connection.setDoOutput(true);
            connection.setDoInput(true);
            //设置不用缓存
            connection.setUseCaches(false);
            //设置维持长连接
            connection.setRequestProperty("Connection","Keep-Alive");
            //设置文件字符集
            byte[] dataArray = data.toString().getBytes("UTF-8");
            //设置文件长度
            connection.setRequestProperty("Content-Length",String.valueOf(dataArray.length));
            //设置文件类型
            connection.setRequestProperty("Content-Type","application/json");

            //开始连接请求
            connection.connect();
            OutputStream out = connection.getOutputStream();
            //写入请求的字符串
            System.out.println(data.toString());
            out.write(dataArray);
            out.flush();
            out.close();
            if(connection.getResponseCode()==200) {
                System.out.println("连接成功");
                //请求返回的数据
                InputStream in = connection.getInputStream();
                String a = null;
                try {
                    byte[] data1 = new byte[in.available()];
                    in.read(data1);
                    //转成字符串
                    a = new String(data1,Charset.forName("UTF-8"));
                    JSONObject obj = JSON.parseObject(a);
                    if(obj.getInteger("code")==0) {
                        System.out.println(a);
                        flag = true;
                    }
                    connection.disconnect();
                }catch (Exception e) {
                    e.printStackTrace();
                    connection.disconnect();
                }
            }
        } catch(Exception ex) {
            ex.printStackTrace();
        }
        return flag;
    }


}
