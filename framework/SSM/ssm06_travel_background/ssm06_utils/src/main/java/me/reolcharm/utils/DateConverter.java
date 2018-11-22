/**
 * @Project: ssm06_ny_travel_background
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-13 20:03
 * @Description:
 **/
package me.reolcharm.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateConverter {
    public static String date2String(Date date2BeConverted, String pattern) {
//        根据目标格式解析
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);

        String dateStr = dateFormat.format(date2BeConverted);

        return dateStr;
    }
}
