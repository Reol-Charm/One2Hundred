package me.reolcharm.file.how2j;

import org.jetbrains.annotations.Nullable;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

class How2JFilePractice {
    private static long minSize = Integer.MAX_VALUE;
    private static long maxSize = 0;
    private static File minFile = null;
    private static File maxFile = null;

    public How2JFilePractice() {
    }

    @Nullable
    public static HashMap<Long, File> traverse() {
        /* 获取路径下文件对象 */
        File f = new File("c:\\windows");
        /* 获取路径下所有文件数组, 包括文件夹 */
        File[] fs = f.listFiles();
        if (null == fs)
            return null;

        /* 准备容器 */
        HashMap<Long, File> fileHashMap = new HashMap<>();
        /* 遍历 所有文件 */
        for (File file : fs) {
            if (file.isDirectory())
                continue;
            if (file.length() > maxSize) {
                maxSize = file.length();
                maxFile = file;

            }
            if (file.length() != 0 && file.length() < minSize) {
                minSize = file.length();
                minFile = file;
            }
        }
        fileHashMap.put(maxSize, maxFile);
        fileHashMap.put(minSize, minFile);
        System.out.printf("最大的文件是%s，其大小是%,d字节%n", maxFile.getAbsoluteFile(), maxFile.length());
        System.out.printf("最小的文件是%s，其大小是%,d字节%n", minFile.getAbsoluteFile(), minFile.length());
        return fileHashMap;
    }
}

public class TraverseFiles {
    public static void main(String[] args) {
        Long aLong = null;
        File value = null;
        HashMap<Long, File> map = How2JFilePractice.traverse();
        /* 复习了一下 map 集合的遍历 */
        Set<Map.Entry<Long, File>> entries = null;
        try {
            entries = map.entrySet();
            for (Map.Entry<Long, File> entry : entries) {
                aLong = entry.getKey();
                value = entry.getValue();
                System.out.println("-------------");
                System.out.println("aLong = " + aLong);
                System.out.println("value = " + value);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


    }
}
