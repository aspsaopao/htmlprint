<!--
 * @Author: alownilow alownilow@163.com
 * @Date: 2023-01-29 17:00:43
 * @LastEditors: alownilow alownilow@163.com
 * @LastEditTime: 2023-01-29 17:08:35
 * @FilePath: \htmlPrint\README.md
 * @Description: 
 * alownilow@163.com
 * 
-->
## 浏览器打印

  复制print-tool到自己项目中
   
    // 需要引入 PrintTool
    import PrintTool, { PrintType } from '你的工具ts地址';
    //使用方法 具体根据你的type使用
    PrintTool.showPrint({
      data: "<b>312</b>",
      type: PrintType.html,
    });
