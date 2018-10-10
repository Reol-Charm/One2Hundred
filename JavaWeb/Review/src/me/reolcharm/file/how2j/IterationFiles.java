package me.reolcharm.file.how2j;

import java.io.File;

class Recursive {
    private long maxSize = 0;
    private long minSize = Integer.MAX_VALUE;
    private File maxFile = null;
    private File minFile = null;
    private int count;

    public void recurFile(File file) {
        /* 获取文件夹下所有文件 */
/* 遍历系统盘会存在空指针异常的问题. 遍历个人的文件则没有 */
        /* 如果是文件夹, 递归*/
        if (file.isDirectory()) {

            File[] fis = file.listFiles();

            if (fis != null) {
                for (File fi02 : fis) {
                    recurFile(fi02);
                }
            }
        }
        /* 判断获取最小文件以及字节大小 */

        if (file.isFile()) {
            if (file.length() > maxSize) {
                maxSize = file.length();
                maxFile = file;
            }
            if (file.length() < minSize /*补充：*/ && file.length() != 0) {
                minSize = file.length();
                minFile = file;
            }
            if (file.length() > 50000000){
                count++;
            }
            /*return;*/
        }
        System.out.println("maxSize = " + maxSize);
        System.out.println("maxFile = " + maxFile);
        System.out.println("maxFile.getPath() = " + maxFile.getPath());
        System.out.println("minSize = " + minSize);
        System.out.println("minFile = " + minFile);
        System.out.println("minFile.getPath() = " + minFile.getPath());
        System.out.println("count = " + count);
        System.out.println("-----------------------------------------------------");
    }
}

public class IterationFiles {

    public static void main(String[] args) {
        File file = new File("F:\\FQDownload");
        Recursive recursive = new Recursive();
        recursive.recurFile(file);
    }
}
