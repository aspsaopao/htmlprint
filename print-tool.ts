/**
 * 打印类型
 * @description:
 * @return {*}
 */
export enum PrintType {
  /**
   * 地址
   * @description:
   * @return {*}
   */
  url = 1,
  /**
   * id
   * @description:
   * @return {*}
   */
  id = 2,
  /**
   * HTMLDivElement
   * @description:
   * @return {*}
   */
  html = 3,
}
export interface PrintInit {
  /**
   * 打印类型
   * @description:
   * @return {*}
   */
  type: PrintType;
  /**
   * 与type联动传入
   * @description:
   * @return {*}
   */
  data: string | HTMLElement;
}

export default class PrintTool {
  /**
   * 调起打印
   * @description:
   * @param {PrintInit} init
   * @return {*}
   */
  static showPrint(init: PrintInit) {
    let print = new Print(init);
    if (init.type === PrintType.html) print.inithtml();
    else print.init();
    // print.clear();
  }
}
class Print {
  /**
   * dom
   * @description:
   * @return {*}
   */
  dom: any;
  /**
   * 数据信息
   * @description:
   * @return {*}
   */
  _data: PrintInit;
  /**
   * 原隐藏样式
   * @description:
   * @return {*}
   */
  display: string;
  constructor(data: PrintInit) {
    this._data = data;
  }
  inithtml(): void {
    this.dom = this._data.data;
    var content = this.getStyle() + this.getHtml();
    this.writeIframe(content);
  }
  init(): void {
    if (this._data.type == PrintType.url) {
      this.writeIframe("");
    } else {
      if (this._data.data == "") {
        console.warn("找不到Id对应节点");
        return;
      }
      this.dom = document.getElementById(this._data.data as string);
      console.log(this._data.data);

      this.display = this.dom.style.display;
      this.dom.style.display = "block";
      var content = this.getStyle() + this.getHtml();
      this.writeIframe(content);
    }
  }
  getStyle(): string {
    var str = "",
      styles = document.getElementsByTagName("style"),
      lines = document.getElementsByTagName("line");
    for (var i = 0; i < styles.length; i++) {
      str += styles[i].outerHTML;
    }
    for (var i = 0; i < lines.length; i++) {
      str += lines[i].outerHTML;
    }
    return str;
  }
  getHtml(): string {
    var inputs = document.querySelectorAll("input");
    var textareas = document.querySelectorAll("textarea");
    var selects = document.querySelectorAll("select");
    for (var k = 0; k < inputs.length; k++) {
      if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
        if (inputs[k].checked == true) {
          inputs[k].setAttribute("checked", "checked");
        } else {
          inputs[k].removeAttribute("checked");
        }
      } else if (inputs[k].type == "text") {
        inputs[k].setAttribute("value", inputs[k].value);
      } else {
        inputs[k].setAttribute("value", inputs[k].value);
      }
    }

    for (var k2 = 0; k2 < textareas.length; k2++) {
      if (textareas[k2].type == "textarea") {
        textareas[k2].innerHTML = textareas[k2].value;
      }
    }

    return this.dom.outerHTML || this.dom;
  }
  writeIframe(content: string): void {
    let doc:Document|undefined = undefined;
    let iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.id = "myIframe";
    if (this._data.type == PrintType.url) {
      iframe.src = this._data.data as string;
    }
    iframe.setAttribute(
      "style",
      "position:absolute;width:0;height:0;top:-10px;left:-10px;"
    );

    doc = iframe.contentWindow?.document;
    if (this._data.type != PrintType.url) {
      doc?.open();
      doc?.write(content);
      doc?.close();
      iframe.contentWindow?.focus();
    }
    let that = this;

    iframe.onload = function () {
      setTimeout(function () {
        iframe.contentWindow?.print();
        if (that._data.type == PrintType.id) {
          let nextdom = document.getElementById(that._data.data as string);
          if(nextdom!==null)
            nextdom.style.display = that.display;
        }
        document.body.removeChild(iframe);
      }, 500);
    };
  }
}
