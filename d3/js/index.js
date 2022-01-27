/*
 * @Description  :
 * @Author       : lihui
 * @Date         : 2021-08-31 16:50:46
 * @LastEditTime : 2021-08-31 16:50:46
 * @LastEditors  : lihui
 */
import { fmdata } from "./data";
export class LogicDiagram {
  domContainer
  svgContainer
  allElseObjArr=[]//
  fmdata
  actionObj
  fHasLineArr// 和其他流程表单存在的关系的流程表单
  fmOption = {
    h: 74, // 流程图底图默认高度
    w: 132, // 流程表底表默认宽度
    h1: 25, // 流程表到底表线的高度
    h2: 25, // 底表到底表线的高度
    h3: 25, // 表右侧出去的线之间的高度
    h5: 25, // 流程表到流程表线的高度
    h4: 42, // 上方文件夹高度：包名字下面那行的高度
    h6: 40, // 包名字那行的高度
    w1: 16, // 流程表单左侧到流程表线的拐点宽度
    w2: 60, // 流程表到左边文件夹间距
    w3: 45, // 文件夹宽度
    w4: 50, // 流程表到上边文件夹间距
    bcNum: 10, // 前三列底表每列最多多少 测试时可以调小点  产品要求为10
    x: 0, // 流程表单的X 坐标：流程表单里元素距离最左侧的距离
    width: 0, // 完整宽度
    height: 0, // 完整高度
    oldy: 82, // 左边文件夹上一个的y坐标
  }

  allObjble
  allBotlist

  domId
  bcArr = [
    // 四列底表,存储key
    [],
    [],
    [],
    [],
  ]
  
  sArr = [] // 简单底表数组
  computedLineBcArr
  
  constructor(domId, data) {
    this.domId = domId;
    this.svgContainer = window.d3.select(`#${domId}`);
    this.domContainer = document.getElementById(domId) as any;
    this.fmdata = data;
    this.initial();
  }

  initial() {
    this.actionObj = {
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
      x: 0,
      y: 0,
      state: false,
      op1: 0,
      op2: 0,
      op3: 0,
      op4: 0
    };
    this.fmOption.oldy = this.fmOption.h4 + this.fmOption.h6;
    this.svgContainer.selectAll('g').remove();
    this.allObj = this.creatObj(this.fmdata);
    this.fmOption.x = this.cx1(this.fmdata) + this.fmOption.w2 + this.fmOption.w3;
    this.cfLine(this.fmdata);
    this.isS(this.fmdata);
    this.ch1(this.fmdata);
    this.cbc4(this.fmdata);
    this.ch2(this.fmdata);
    this.cw1();
    this.drawAllTable(this.fmdata);
    this.czdkeylineCenterY();
    this.drawAllLine();      
    this.svgContainer.attr('width', this.fmOption.width + 'px').attr('height', this.fmOption.height + 'px').attr('viewBox', null);
  }

  creatObj(data) {
    const obj = {};
    for (let i = 0, len = data.proList.length; i < len; i++) {
      obj[data.proList[i].key] = JSON.parse(JSON.stringify(data.proList[i]));
      obj[data.proList[i].key].disabled = true;
    }
    for (let i = 0, len = data.botList.length; i < len; i++) {
      obj[data.botList[i].key] = JSON.parse(JSON.stringify(data.botList[i]));
      obj[data.botList[i].key].disabled = true;
    }
    if (data.reportList) {
      for (let i = 0, len = data.reportList.length; i < len; i++) {
        obj[data.reportList[i].key] = JSON.parse(JSON.stringify(data.reportList[i]));
        obj[data.reportList[i].key].disabled = true;
      }
    }
    this.fmdata.treedatas.forEach((item) => {
      if (item.type === '0') {
        item.children.forEach((item1) => {
          obj[item1.key].disabled = item1.disabled;
        });
      }
    });
    return obj;
  }

  /**
     * 计算流程表单里的元素最左侧需要留出的宽度
     */
  cx1(data) {
    // 计算流程表x坐标
    let x = 0;
    for (let i = 0, len = data.proList.length; i < len; i++) {
      if (data.proList[i].proToList.length) {
        x += this.fmOption.w1;
      }
    }
    console.log(data.proList, x, 'x');
    return x;
  }

  /**
     * 和其他流程表单存在的关系的流程表单
     */
  cfLine(data) {
    this.fHasLineArr = [];
    for (let i = 0, len = data.treedatas.length; i < len; i++) {
      if (data.treedatas[i].children) {
        for (
          let i1 = 0, len1 = data.treedatas[i].children.length;
          i1 < len1;
          i1++
        ) {
          if (data.treedatas[i].children[i1].type === '1' && this.allObj[data.treedatas[i].children[i1].key].proToList.length) {
            this.fHasLineArr.push(data.treedatas[i].children[i1].key);
          }
        }
      }
    }
  }

  cw1() { // 计算整体宽度 没加说明
    this.fmOption.width = this.fmOption.x;
    for (let i = 0, len = this.bcArr.length; i < len; i++) {
      if (this.bcArr[i].length === 0) {
        break;
      } else {
        let state = false;
        for (let i2 = 0, len2 = this.bcArr[i].length; i2 < len2; i2++) {
          if (this.sArr.indexOf(this.bcArr[i][i2]) === -1) {
            state = true;
          }
        }
        if (state) {
          if (i === 0) {
            this.fmOption.width += 396;
          } else {
            this.fmOption.width += 640;
          }
        }
      }
    }
    this.fmOption.width += 640;
    const domW = this.domContainer.clientWidth;
    if (this.fmOption.width < domW) {
      this.fmOption.width = domW;
    }
  }

  /**
     * 计算元素高度
     */
  ch1(data) {
    let base;
    for (let i = 0, len = data.botList.length; i < len; i++) {
      base = data.botList[i];
      // 多条线增加高度，30：右侧出去的第一条线到最上边的距离
      if (base.toProList.length > (this.fmOption.h - 30) / this.fmOption.h3) {
        this.allObj[base.key].height = base.toProList.length * this.fmOption.h3 + 30;
      } else {
        this.allObj[base.key].height = this.fmOption.h;
      }
    }
  }

  /**
     * 处理四列底表线的关系
     */
  cbc4(data) {
    // 计算前30连接数的底表 和其余底表
    const obj = {};
    let arr = [];
    this.bcArr = [[], [], [], []];
    this.computedLineBcArr = [{
      hasProtoArr: [],
      botToBotArr: []
    }, {
      hasProtoArr: [],
      botToBotArr: []
    }, {
      hasProtoArr: [],
      botToBotArr: []
    }, {
      hasProtoArr: [],
      botToBotArr: []
    }];
    let index;
    // 将底表按照连接流程表的线数分类
    for (let i = 0, len = data.botList.length; i < len; i++) {
      index = data.botList[i].toProList.length;
      if (obj[index]) {
        obj[index].push(data.botList[i].key);
      } else {
        obj[index] = [data.botList[i].key];
      }
    }
    // 存储所有元素的key
    for (const i1 in obj) {
      arr = obj[i1].concat(arr);
    }
    // 去掉单一关系的元素
    for (let i2 = 0, len2 = arr.length; i2 < len2; i2++) {
      if (this.sArr.indexOf(arr[i2]) !== -1) {
        arr.splice(i2, 1);
        i2--;
        len2--;
      }
    }
    this.fmOption.bcNum = Math.round(arr.length / 4);
    if (arr.length > 40) {
      this.fmOption.bcNum = 10;
    }
    if (this.fmOption.bcNum === 0) {
      this.fmOption.bcNum = 1;
    }
    // 将元素的key分为4列
    for (let i3 = 0, len3 = arr.length; i3 < len3; i3++) {
      if (i3 < this.fmOption.bcNum * 4) {
        this.bcArr[i3 % 4].push(arr[i3]);
      } else {
        this.bcArr[3].push(arr[i3]);
      }
    }
    for (let i4 = 0; i4 < 4; i4++) {
      for (let i5 = 0, len5 = this.bcArr[i4].length; i5 < len5; i5++) {
        const botobj = this.allObj[this.bcArr[i4][i5]];
        if (botobj.proToList.length && !botobj.disabled) {
          this.computedLineBcArr[i4].hasProtoArr.push(this.bcArr[i4][i5]);
        }
        if (!botobj.disabled) {
          this.computedLineBcArr[i4].botToBotArr = this.computedLineBcArr[i4].botToBotArr.concat(botobj.toBotList);
        }
      }
      this.computedLineBcArr[i4].botToBotArr = Array.from(new Set(this.computedLineBcArr[i4].botToBotArr));
      this.computedLineBcArr[i4].hasProtoArr = Array.from(new Set(this.computedLineBcArr[i4].hasProtoArr));
    }
  }

  /**
     * 计算流程表高度
     */
  ch2(data) {
    const { h, h1, h2, } = this.fmOption;
    let fArr = [],
      bArr = [];
    let simpleNum = 0;
    let cbcIndex = -1;
    let concatArr = [];
    let zdKey;// 遮挡key
    let isEquallyArr = [];
    let isZ = false;
    const allBcArr = this.bcArr.flat();
    for (let i = 0, len = data.treedatas.length; i < len; i++) {
      if (data.treedatas[i].children) {
        simpleNum = 0;
        isEquallyArr = [];
        fArr = [];
        bArr = [];
        for (
          let i1 = 0, len1 = data.treedatas[i].children.length;
          i1 < len1;
          i1++
        ) {
          // 分离 流程表 底表数组
          if (data.treedatas[i].children[i1].type == '1') {
            fArr.push(data.treedatas[i].children[i1].key);
          }
          if (data.treedatas[i].children[i1].type != '1') {
            bArr.push(data.treedatas[i].children[i1].key);
          }
        }
        for (let i2 = 0, len2 = fArr.length; i2 < len2; i2++) {
          // 计算是否遮挡
          isZ = false;
          cbcIndex = -1;
          if (this.allObj[fArr[i2]].simpleKey) {
            cbcIndex = 0;
            zdKey = this.allObj[fArr[i2]].simpleKey;
            simpleNum++;
            isZ = true;
          } else {
            for (let i4 = 0, len4 = allBcArr.length; i4 < len4; i4++) {
              for (let i3 = 0, len3 = this.bcArr.length; i3 < len3; i3++) {
                if (this.bcArr[i3].indexOf(allBcArr[i4]) != -1 && bArr.indexOf(allBcArr[i4]) !== -1 && isEquallyArr.indexOf(allBcArr[i4]) === -1 && this.sArr.indexOf(allBcArr[i4]) == -1) {
                  zdKey = allBcArr[i4];
                  isEquallyArr.push(zdKey);
                  cbcIndex = i3;
                  break;
                }
              }
              if (cbcIndex != -1 && isEquallyArr.length - 1 + simpleNum === i2) {
                isZ = true;
                break;
              }
            }
          }
          let hnum = h;
          if (this.allObj[fArr[i2]].toBotList.length > Math.round((h - 30) / h1)) {
            hnum = this.allObj[fArr[i2]].toBotList.length * h1 + 30;
          }
          if (isZ) {
            // 存在遮挡但是需要判断是否连接后面的线 再考虑是否延长高度
            concatArr = [];
            this.allObj[fArr[i2]].height = h;
            for (
              let i4 = cbcIndex + 1, len4 = this.bcArr.length;
              i4 < len4;
              i4++
            ) {
              concatArr = concatArr.concat(this.bcArr[i4]);
            }
            let blN = 0;
            for (
              let i5 = 0, len5 = this.allObj[fArr[i2]].toBotList.length;
              i5 < len5;
              i5++
            ) {
              if (
                concatArr.indexOf(this.allObj[fArr[i2]].toBotList[i5].id) != -1 &&
                  this.sArr.indexOf(this.allObj[fArr[i2]].toBotList[i5].id) == -1
              ) {
                // 存在连接后面的线
                this.allObj[fArr[i2]].height += h1;
                blN++;
              }
            }

            if (this.allObj[fArr[i2]].height > h) {
              this.allObj[fArr[i2]].zheight = this.allObj[fArr[i2]].height - h;
              // 再加上 遮挡底表的高度 和遮挡底表到其他底表线的高度和 连接前面不遮挡线超出的
              if (
                this.allObj[fArr[i2]].toBotList.length - blN >
                  Math.round((this.allObj[zdKey].height - 15) / h1)
              ) {
                this.allObj[fArr[i2]].height +=
                    (this.allObj[fArr[i2]].toBotList.length -
                      blN -
                      Math.round((this.allObj[zdKey].height - 15) / h1)) *
                    h1;
              }
              this.allObj[fArr[i2]].height += this.allObj[zdKey].height - h;
              this.allObj[fArr[i2]].height +=
                  this.allObj[zdKey].toBotList.length * h2;
            } else {
              // 不存在连接后面的线
              this.allObj[fArr[i2]].height = hnum;
              if (hnum < this.allObj[zdKey].height) {
                this.allObj[fArr[i2]].height = this.allObj[zdKey].height;
              }
            }
          } else {
            // 不存在遮挡
            this.allObj[fArr[i2]].height = hnum;
          }
        }
      }
    }
  }

  /**
     * 对单一关系的处理
     */
  isS(data) {
    let bArr = []; // 无流程表单
    let fArr = []; // 流程表单
    this.sArr = []; // 单一关系表单
    for (let i = 0, len = data.treedatas.length; i < len; i++) {
      if (data.treedatas[i].children) {
        bArr = [];
        fArr = [];
        for (let i2 = 0, len2 = data.treedatas[i].children.length; i2 < len2; i2++) {
          if (data.treedatas[i].children[i2].type !== '1') {
            bArr.push(data.treedatas[i].children[i2].key);
          } else {
            fArr.push(data.treedatas[i].children[i2].key);
          }
        }
        // 判断是否是简单底表 并写在对应流程表对象上
        for (let i3 = 0, len3 = bArr.length; i3 < len3; i3++) {
          if (this.allObj[bArr[i3]].proToList.length === 1 && !this.allObj[bArr[i3]].toBotList.length && !this.allObj[bArr[i3]].toProList.length) {
            for (let i4 = 0, len4 = fArr.length; i4 < len4; i4++) {
              if (fArr[i4] === this.allObj[bArr[i3]].proToList[0].id && this.sArr.indexOf(bArr[i3]) === -1) {
                this.allObj[fArr[i4]].simpleKey = bArr[i3];
                this.sArr.push(bArr[i3]);
              }
            }
          }
        }
      }
    }
  }
  
  drawAllTable(data) { // 生成流程表和底表
    let fobj;
    let bArr = [];
    let barrCopy = [];
    let fArr = [];
    let simpleNum = 0;
    let height = 0;
    let zdKey;
    let isEquallyArr;
    let bcArrIndex = 0;
    let y = this.fmOption.oldy;
    const allBcArr = this.bcArr.flat();
    let reportFileObj;
    let numArr, num;
    this.allBotlist = [];
    for (let i = 0, len = data.treedatas.length; i < len; i++) {
      if (data.treedatas[i].children) {
        isEquallyArr = [];
        bArr = [];
        fArr = [];
        simpleNum = 0;
        y += this.fmOption.w4;
        // 分为流程表单和非流程表单
        for (let i2 = 0, len2 = data.treedatas[i].children.length; i2 < len2; i2++) {
          if (data.treedatas[i].children[i2].type != '1') {
            bArr.push(data.treedatas[i].children[i2].key);
          } else {
            fArr.push(data.treedatas[i].children[i2].key);
          }
        }
        barrCopy = bArr.slice(0);
        // 画流程表单
        for (let i1 = 0, len1 = fArr.length; i1 < len1; i1++) {
          fobj = this.allObj[fArr[i1]];
          y += fobj.toProList.length * this.fmOption.h5;
          fobj.y = y;
          fobj.x = this.fmOption.x;
          num = 0;
          numArr = fobj.selfList.concat(fobj.proToList, fobj.botToList, fobj.toProList, fobj.toBotList);
          for (let i21 = 0, len21 = numArr.length; i21 < len21; i21++) {
            num += numArr[i21].name.length;
          }
          this.drawTable(fobj.key, this.fmOption.w, fobj.height, fobj.x, y, fobj.type, num, fobj.name, fobj.ownedFolder);
          height = fobj.height;
          if (fobj.simpleKey) {
            fobj.zdKey = fobj.simpleKey;
            const sKey = fobj.simpleKey;
            fobj = this.allObj[sKey];
            fobj.y = y;
            fobj.x = this.fmOption.x + 396;
            fobj.dcolindex = 0;// 底表在的哪列 0 为第一列底表
            this.allObj[fArr[i1]].zdKey = sKey;
            this.allBotlist.push(sKey);
            num = 0;
            numArr = fobj.selfList.concat(fobj.proToList, fobj.botToList, fobj.toProList, fobj.toBotList);
            for (let i22 = 0, len22 = numArr.length; i22 < len22; i22++) {
              num += numArr[i22].name.length;
            }
            this.drawTable(fobj.key, this.fmOption.w, fobj.height, fobj.x, y, fobj.type, num, fobj.name, fobj.ownedFolder);
            if (fobj.toBotList.length) {
              const ftObjH = this.allObj[fArr[i1]].height;
              const btObjH = fobj.height + fobj.toBotList.length * this.fmOption.h2;
              if (ftObjH < btObjH) {
                y += btObjH - ftObjH;
              }
              // y+=fobj.toBotList.length*this.fmOption.h2;
            }
            simpleNum++;
            if (barrCopy.indexOf(sKey) != -1) {
              barrCopy.splice(barrCopy.indexOf(sKey), 1);
            }
          } else {
            for (let i4 = 0, len4 = allBcArr.length; i4 < len4; i4++) {
              for (let i3 = 0, len3 = this.bcArr.length; i3 < len3; i3++) {
                if (this.bcArr[i3].indexOf(allBcArr[i4]) != -1 && bArr.indexOf(allBcArr[i4]) != -1 && isEquallyArr.indexOf(allBcArr[i4]) == -1 && this.sArr.indexOf(allBcArr[i4]) == -1) {
                  zdKey = allBcArr[i4];
                  isEquallyArr.push(zdKey);
                  bcArrIndex = i3;
                  break;
                }
              }
              if (isEquallyArr.length - 1 + simpleNum == i1) {
                if (barrCopy.indexOf(zdKey) != -1) {
                  barrCopy.splice(barrCopy.indexOf(zdKey), 1);
                }
                fobj = this.allObj[zdKey];
                fobj.y = y;
                fobj.x = this.fmOption.x + 396 + 640 * bcArrIndex;
                fobj.dcolindex = bcArrIndex;
                this.allObj[fArr[i1]].zdKey = zdKey;
                this.allBotlist.push(zdKey);
                num = 0;
                numArr = fobj.selfList.concat(fobj.proToList, fobj.botToList, fobj.toProList, fobj.toBotList);
                for (let i23 = 0, len23 = numArr.length; i23 < len23; i23++) {
                  num += numArr[i23].name.length;
                }
                this.drawTable(fobj.key, this.fmOption.w, fobj.height, fobj.x, y, fobj.type, num, fobj.name, fobj.ownedFolder);
                if (fobj.toBotList.length) {
                  const ftObjH = this.allObj[fArr[i1]].height;
                  const btObjH = fobj.height + fobj.toBotList.length * this.fmOption.h2;
                  if (ftObjH < btObjH) {
                    y += btObjH - ftObjH;
                  }
                  // y+=fobj.toBotList.length*this.fmOption.h2;
                }
                break;
              }
            }
          }
          y += height + 46;
        }
        for (let i5 = 0, len5 = barrCopy.length; i5 < len5; i5++) {
          let barrCopykeyCIndex = 0;
          fobj = this.allObj[barrCopy[i5]];
          if (this.bcArr[0].indexOf(barrCopy[i5]) != -1) {
            barrCopykeyCIndex = 0;
          }
          if (this.bcArr[1].indexOf(barrCopy[i5]) != -1) {
            barrCopykeyCIndex = 1;
          }
          if (this.bcArr[2].indexOf(barrCopy[i5]) != -1) {
            barrCopykeyCIndex = 2;
          }
          if (this.bcArr[3].indexOf(barrCopy[i5]) != -1) {
            barrCopykeyCIndex = 3;
          }
          fobj.y = y;
          fobj.x = this.fmOption.x + 396 + 640 * barrCopykeyCIndex;
          fobj.dcolindex = barrCopykeyCIndex;
          this.allBotlist.push(fobj.key);
          num = 0;
          numArr = fobj.selfList.concat(fobj.proToList, fobj.botToList, fobj.toProList, fobj.toBotList);
          for (let i24 = 0, len24 = numArr.length; i24 < len24; i24++) {
            num += numArr[i24].name.length;
          }
          this.drawTable(fobj.key, this.fmOption.w, fobj.height, fobj.x, y, fobj.type, num, fobj.name, fobj.ownedFolder);
          if (fobj.toBotList.length) {
            y += fobj.toBotList.length * this.fmOption.h2;
          }
          y += fobj.height + 46;
        }
        data.treedatas[i].y = this.fmOption.oldy;
        for (let i31 = 0, len31 = this.allElseObjArr.length; i31 < len31; i31++) {
          if (this.allElseObjArr[i31].key == data.treedatas[i].key) {
            this.allElseObjArr[i31].y = this.fmOption.oldy;
            break;
          }
        }
        this.drawLeftFrame(y, data.treedatas[i].title, data.treedatas[i].key);
      }
    }
    this.fmOption.height = y;
  }
  
  drawLeftFrame(y, text, key) {
    const g = window.d3
      .select("#flowmapSvg")
      .append("g").attr('class', 'folder folder_' + key);
    g.append('rect').attr('x', 0).attr('y', this.fmOption.oldy).attr('width', this.fmOption.w3).attr('height', y - this.fmOption.oldy).attr('fill', '#E1EFFF').attr('stroke', 'none');
    g.append('line').attr('x1', 0).attr('y1', y).attr('x2', this.fmOption.width).attr('y2', y).attr('stroke', '#CCCCCC').attr('fill', 'none').attr('stroke-width', 1).attr('stroke-dasharray', 4);

    this.creatVerticalText(g, text, '15px', 15, 18, '#333333', '-9 -3.8 -3.7', true, y, this.fmOption.oldy);
    this.fmOption.oldy = y;
  }
  
  
  czdkeylineCenterY() {
    let obj;
    for (const i in this.allObj) {
      obj = this.allObj[i];
      for (let i1 = 0, len1 = obj.toBotList.length; i1 < len1; i1++) {
        if (obj.toBotList[i1].id == obj.zdKey) {
          if (obj.zheight) {
            this.allObj[obj.zdKey].lineCenterY = obj.y + 6 + 10;
          } else {
            this.allObj[obj.zdKey].lineCenterY = obj.y + 30;
          }
          break;
        }
      }
    }
  }

  drawAllLine() {
    let obj, g, text, textDom, textw, toObj, color = "#AB5667";
    const dffArr = [[], [], [], []], dtdArr = [[], [], [], []];
    for (const i in this.allObj) {
      obj = this.allObj[i];
      if (obj.type == '1' && !obj.disabled) {
        g = window.d3
          .select("#flowmapSvg")
          .append("g").attr('class', 'lineG lineG_' + i);
        for (let i1 = 0, len1 = obj.toProList.length; i1 < len1; i1++) { // 流程表到流程表的线
          if (obj.toProList[i1].isRelationOrTrigger == 0) {
            color = "#AB5667";
          } else {
            color = "#78AB6E";
          }
          toObj = this.allObj[obj.toProList[i1].id];
          if (toObj.disabled) {
            continue;
          }
          if (obj.toProList[i1].name.length == 1) {
            text = this.textOverFlow(g, obj.toProList[i1].name[0], 84, 14);
            textDom = text.node();
            textw = textDom.getComputedTextLength();
            text.attr('x', this.fmOption.x + 108 - textw - 15).attr('y', obj.y + 5 - (i1 + 1) * this.fmOption.h5).attr('fill', color).attr('class', `textFrom${i} textTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key);
          } else {
            textw = 24;
            g.append('circle').attr('cx', this.fmOption.x + 108 - 24 - 2).attr('cy', obj.y - (i1 + 1) * this.fmOption.h5).attr('r', 12).attr('fill', color).attr('class', `textFrom${i} textTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key)
              .attr('data-title', obj.toProList[i1].name.join('\n'));
            text = this.textOverFlow(g, obj.toProList[i1].name.length + '', 24, 14);
            textDom = text.node();
            text.attr('x', (this.fmOption.x + 108 - 24 - 2 - (textDom.getComputedTextLength() / 2))).attr('y', obj.y + 5 - (i1 + 1) * this.fmOption.h5).attr('fill', '#fff').attr('class', `fm_eventNone textFrom${i} textTo${toObj.key}`);
          }

          g.append('polyline').attr('class', `lineFrom${i} lineTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2)
            .attr('points', `${this.fmOption.x + 108},${obj.y} ${this.fmOption.x + 108},${obj.y - (i1 + 1) * this.fmOption.h5} 
           ${this.fmOption.x - (this.fHasLineArr.indexOf(obj.toProList[i1].id) + 1) * this.fmOption.w1},${obj.y - (i1 + 1) * this.fmOption.h5} 
           ${this.fmOption.x - (this.fHasLineArr.indexOf(obj.toProList[i1].id) + 1) * this.fmOption.w1},${toObj.y + toObj.height / 2} 
           ${this.fmOption.x - 1},${toObj.y + toObj.height / 2}`).attr("stroke-dasharray", `${(i1 + 1) * this.fmOption.h5 + 10},${textw + 9},99999999`);

          g.append('polygon').attr('class', `line_polygon_From${i} line_polygon_To${obj.toProList[i1].id}`).attr('fill', color)
            .attr('points', `${this.fmOption.x - 8},${toObj.y + toObj.height / 2 - 5} ${this.fmOption.x},${toObj.y + toObj.height / 2} ${this.fmOption.x - 8},${toObj.y + toObj.height / 2 + 5}`);
        }

        let num1 = 0, num2 = 0;
        if (obj.simpleKey) {
          for (let i3 = 0, len3 = obj.toBotList.length; i3 < len3; i3++) {
            if (obj.toBotList[i3].id == obj.simpleKey || obj.toBotList[i3].id == obj.zdKey) {
              obj.toBotList.unshift(obj.toBotList[i3]);
              obj.toBotList.splice(i3 + 1, 1);
              break;
            }
          }
        }
        for (let i2 = 0, len2 = obj.toBotList.length; i2 < len2; i2++) { // 流程表到底表的线
          if (obj.toBotList[i2].isRelationOrTrigger == 0) {
            color = "#AB5667";
          } else {
            color = "#78AB6E";
          }
          toObj = this.allObj[obj.toBotList[i2].id];
          if (toObj.disabled) {
            continue;
          }
          let point2x = 0;
          let lineStartY = 0;
          if (toObj.key == obj.simpleKey) {
            point2x = toObj.x - 33 - 90;
          } else {
            const hasProtoArr = this.computedLineBcArr[toObj.dcolindex].hasProtoArr;
            if (toObj.dcolindex == 0) {
              point2x = toObj.x - 33 - 90 + hasProtoArr.indexOf(toObj.key) * 10;
            } else {
              point2x = toObj.x - 33 - 90 + (10 - hasProtoArr.length + hasProtoArr.indexOf(toObj.key)) * 10;
            }
          }

          if (obj.zheight) {
            if (this.allObj[obj.zdKey].dcolindex >= toObj.dcolindex) {
              lineStartY = obj.y + 6 + num1 * this.fmOption.h1 + 10;
              num1++;
            } else {
              lineStartY = obj.y + obj.height - obj.zheight + num2 * this.fmOption.h1 + 10;
              num2++;
            }
          } else {
            lineStartY = obj.y + 30 + (obj.height - 30) / obj.toBotList.length * i2;
          }

          if (obj.toBotList[i2].name.length == 1) {
            text = this.textOverFlow(g, obj.toBotList[i2].name[0], 84, 14);
            textDom = text.node();
            textw = textDom.getComputedTextLength();
            text.attr('x', this.fmOption.x + this.fmOption.w + 30).attr('y', lineStartY + 4).attr('fill', color).attr('class', `textFrom${i} textTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key);
          } else {
            textw = 24;
            g.append('circle').attr('cx', this.fmOption.x + this.fmOption.w + 30 + 12).attr('cy', lineStartY - 1).attr('r', 12).attr('fill', color).attr('class', `textFrom${i} textTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key)
              .attr('data-title', obj.toBotList[i2].name.join('\n'));
            text = this.textOverFlow(g, obj.toBotList[i2].name.length + '', 24, 14);
            textDom = text.node();
            text.attr('x', (this.fmOption.x + this.fmOption.w + 30 + 12 - (textDom.getComputedTextLength() / 2))).attr('y', lineStartY + 4).attr('fill', '#fff').attr('class', `fm_eventNone textFrom${i} textTo${toObj.key}`);
          }

          g.append('polyline').attr('class', `lineFrom${i} lineTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2)
            .attr('points', `${this.fmOption.x + this.fmOption.w},${lineStartY} ${point2x},${lineStartY} 
            ${point2x},${toObj.lineCenterY ? toObj.lineCenterY : toObj.y + toObj.height / 2} ${toObj.x - 1},${toObj.lineCenterY ? toObj.lineCenterY : toObj.y + toObj.height / 2}`).attr("stroke-dasharray", `25,${textw + 10},99999999`);

          g.append('polygon').attr('class', `line_polygon_From${i} line_polygon_To${toObj.key}`).attr('fill', color)
            .attr('points', `${toObj.x - 8},${toObj.lineCenterY ? toObj.lineCenterY - 5 : toObj.y + toObj.height / 2 - 5} ${toObj.x},${toObj.lineCenterY ? toObj.lineCenterY : toObj.y + toObj.height / 2} ${toObj.x - 8},${toObj.lineCenterY ? toObj.lineCenterY + 5 : toObj.y + toObj.height / 2 + 5}`);
        }
      }
    }
    for (let ii = 0, leni = this.allBotlist.length; ii < leni; ii++) {
      const i = this.allBotlist[ii];
      g = window.d3
        .select("#flowmapSvg")
        .append("g").attr('class', 'lineG lineG_' + i);
      obj = this.allObj[i];
      if (!obj.disabled) {
        let point2xCpuNum = 10, point2xnumSlice = 0;
        if (obj.dcolindex + 1 == 4) {
          point2xCpuNum += 10;
        } else {
          point2xCpuNum += 10 - this.computedLineBcArr[obj.dcolindex + 1].hasProtoArr.length;
        }
        if (this.computedLineBcArr[obj.dcolindex].botToBotArr.length == 0) {
          point2xCpuNum += 16;
          point2xnumSlice = 160;
        } else {
          point2xCpuNum += 10 - this.computedLineBcArr[obj.dcolindex].botToBotArr.length;
          point2xnumSlice = (10 - this.computedLineBcArr[obj.dcolindex].botToBotArr.length) * 10;
        }
        for (let i4 = 0, len4 = obj.toProList.length; i4 < len4; i4++) { // 底表到流程表
          if (obj.toProList[i4].isRelationOrTrigger == 0) {
            color = "#AB5667";
          } else {
            color = "#78AB6E";
          }
          toObj = this.allObj[obj.toProList[i4].id];
          if (toObj.disabled) {
            continue;
          }

          if (dffArr[obj.dcolindex].indexOf(toObj.key) == -1) {
            dffArr[obj.dcolindex].push(toObj.key);
          }
          let point2xnum = 0;
          point2xnum = dffArr[obj.dcolindex].indexOf(toObj.key) % point2xCpuNum;
          const lineStartY = obj.y + 30 + (obj.height - 30) / obj.toProList.length * i4;
          const point2x = obj.x + this.fmOption.w + 70 + 90 + 10 + 116 - point2xnumSlice + point2xnum * 10;

          if (obj.toProList[i4].name.length == 1) {
            text = this.textOverFlow(g, obj.toProList[i4].name[0], 84, 14);
            textDom = text.node();
            textw = textDom.getComputedTextLength();
            text.attr('x', obj.x + this.fmOption.w + 70 + 90 + 10 + 10 - point2xnumSlice).attr('y', lineStartY + 4).attr('fill', color).attr('class', `textFrom${i} textTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key);
          } else {
            textw = 24;
            g.append('circle').attr('cx', obj.x + this.fmOption.w + 70 + 90 + 10 + 10 - point2xnumSlice + 12).attr('cy', lineStartY - 1).attr('r', 12).attr('fill', color).attr('class', `textFrom${i} textTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key)
              .attr('data-title', obj.toProList[i4].name.join('\n'));
            text = this.textOverFlow(g, obj.toProList[i4].name.length + '', 24, 14);
            textDom = text.node();
            text.attr('x', (obj.x + this.fmOption.w + 70 + 90 + 10 + 10 - point2xnumSlice + 12 - (textDom.getComputedTextLength() / 2))).attr('y', lineStartY + 4).attr('fill', '#fff').attr('class', `fm_eventNone textFrom${i} textTo${toObj.key}`);
          }

          g.append('polyline').attr('class', `lineFrom${i} lineTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2)
            .attr('points', `${obj.x + this.fmOption.w},${lineStartY} ${point2x},${lineStartY} ${point2x},${toObj.y + toObj.height + 14} 
           ${toObj.x + this.fmOption.w / 2},${toObj.y + toObj.height + 14} ${toObj.x + this.fmOption.w / 2},${toObj.y + toObj.height + 1} 
           `).attr("stroke-dasharray", `${70 + 90 + 10 + 5 - point2xnumSlice},${textw + 10},99999999`);

          g.append('polygon').attr('class', `line_polygon_From${i} line_polygon_To${toObj.key}`).attr('fill', color)
            .attr('points', `${toObj.x + this.fmOption.w / 2 - 5},${toObj.y + toObj.height + 8} ${toObj.x + this.fmOption.w / 2},${toObj.y + toObj.height} ${toObj.x + this.fmOption.w / 2 + 5},${toObj.y + toObj.height + 8}`);
        }
        for (let i5 = 0, len5 = obj.toBotList.length; i5 < len5; i5++) {
          if (this.cdtodType(obj.key, obj.toBotList[i5].id) == 1) {
            obj.toBotList.push(obj.toBotList[i5]);
            obj.toBotList.splice(i5, 1);
          }
        }
        for (let i6 = 0, len6 = obj.toBotList.length; i6 < len6; i6++) { // 底表到底表
          toObj = this.allObj[obj.toBotList[i6].id];
          if (toObj.disabled) {
            continue;
          }
          if (obj.toBotList[i6].isRelationOrTrigger == 0) {
            color = "#AB5667";
          } else {
            color = "#78AB6E";
          }
          if (dtdArr[obj.dcolindex].indexOf(toObj.key) == -1) {
            dtdArr[obj.dcolindex].push(toObj.key);
          }
          let point2xnum = 0;
          point2xnum = dtdArr[obj.dcolindex].indexOf(toObj.key) % 10;

          const cdtodType = this.cdtodType(obj.key, toObj.key);
          if (cdtodType == 1) {
            if (obj.toBotList[i6].name.length == 1) {
              const textObj = this.creatVerticalText(g, obj.toBotList[i6].name[0], '14px', 14, 14, color, '-9 -3.5 -3.4', false, toObj.y, obj.y + obj.height + (i6 + 1) * this.fmOption.h2 - 10);
              text = textObj.obj;
              text.attr('x', obj.x + this.fmOption.w / 2 - 7).attr('y', obj.y + obj.height + i6 * this.fmOption.h2 + 10 + 3).attr('class', `textFrom${i} textTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key);
              g.append('polyline').attr('class', `lineFrom${i} lineTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2)
                .attr('points', `${obj.x + this.fmOption.w / 2},${obj.y + obj.height} ${toObj.x + this.fmOption.w / 2},${toObj.y - 1}`).attr("stroke-dasharray", `${i6 * this.fmOption.h2 + 10},${textObj.isSplice ? textObj.text.length * 14 + 5 + 17 + 2 : textObj.text.length * 14 + 5 + 3 + 2},99999999`);
            } else {
              g.append('circle').attr('cx', obj.x + this.fmOption.w / 2).attr('cy', obj.y + obj.height + 3 + (i6 + 1) * this.fmOption.h2).attr('r', 12).attr('fill', color).attr('class', `textFrom${i} textTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key)
                .attr('data-title', obj.toBotList[i6].name.join('\n'));
              text = this.textOverFlow(g, obj.toBotList[i6].name.length + '', 24, 14);
              textDom = text.node();
              text.attr('x', (obj.x + this.fmOption.w / 2 - (textDom.getComputedTextLength() / 2))).attr('y', obj.y + 3 + obj.height + (i6 + 1) * this.fmOption.h2 + 5).attr('fill', '#fff').attr('class', `fm_eventNone textFrom${i} textTo${toObj.key}`);
              g.append('polyline').attr('class', `lineFrom${i} lineTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2)
                .attr('points', `${obj.x + this.fmOption.w / 2},${obj.y + obj.height} ${toObj.x + this.fmOption.w / 2},${toObj.y - 1}`).attr("stroke-dasharray", `${i6 * this.fmOption.h2 + 10},34,99999999`);
            }
          } else {
            const point2x = obj.x + this.fmOption.w / 2 + 136 + point2xnum * 10;

            if (obj.toBotList[i6].name.length == 1) {
              text = this.textOverFlow(g, obj.toBotList[i6].name[0], 84, 14);
              textDom = text.node();
              textw = textDom.getComputedTextLength();
              text.attr('x', obj.x + this.fmOption.w / 2 + 30).attr('y', obj.y + obj.height + (i6 + 1) * this.fmOption.h2 + 5).attr('fill', color).attr('class', `textFrom${i} textTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key);
            } else {
              textw = 24;
              g.append('circle').attr('cx', obj.x + this.fmOption.w / 2 + 30 + 12).attr('cy', obj.y + obj.height + (i6 + 1) * this.fmOption.h2).attr('r', 12).attr('fill', color).attr('class', `textFrom${i} textTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key)
                .attr('data-title', obj.toBotList[i6].name.join('\n'));
              text = this.textOverFlow(g, obj.toBotList[i6].name.length + '', 24, 14);
              textDom = text.node();
              text.attr('x', (obj.x + this.fmOption.w / 2 + 30 + 12 - (textDom.getComputedTextLength() / 2))).attr('y', obj.y + obj.height + (i6 + 1) * this.fmOption.h2 + 5).attr('fill', '#fff').attr('class', `fm_eventNone textFrom${i} textTo${toObj.key}`);
            }
            g.append('polyline').attr('class', `lineFrom${i} lineTo${toObj.key}`).attr('data-fromto', i + ',' + toObj.key).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2)
              .attr('points', `${obj.x + this.fmOption.w / 2},${obj.y + obj.height} ${obj.x + this.fmOption.w / 2},${obj.y + obj.height + (i6 + 1) * this.fmOption.h2} 
              ${point2x},${obj.y + obj.height + (i6 + 1) * this.fmOption.h2} ${point2x},${toObj.y - 14} ${toObj.x + this.fmOption.w / 2},${toObj.y - 14} 
              ${toObj.x + this.fmOption.w / 2},${toObj.y - 1}
              `).attr("stroke-dasharray", `${(i6 + 1) * this.fmOption.h2 + 25},${textw + 10},99999999`);
          }
          g.append('polygon').attr('class', `line_polygon_From${i} line_polygon_To${toObj.key}`).attr('fill', color)
            .attr('points', `${toObj.x + this.fmOption.w / 2 - 5},${toObj.y - 8} ${toObj.x + this.fmOption.w / 2 + 5},${toObj.y - 8} ${toObj.x + this.fmOption.w / 2},${toObj.y}`);
        }
      }
    }
  }
  
  drawTable(key, w, h, x, y, type, num, text1, text2) {
    const obj = this.allObj[key];
    if (obj.disabled) {
      return;
    }

    const colors = this.getTableColor(type);
    
    num = num + '';// 右上数字
    const g = window.d3
      .select("#flowmapSvg")
      .append("g")
      .attr("class", "tableG tableG_" + key)
      .attr("transform", `translate(${x}, ${y})`);
    g.append("path").attr("d", `M2 2L${w - 2} 2L${w - 2} ${h - 2}L2 ${h - 2}`).attr('fill', colors.num).attr('filter', 'url(#f1)').attr('class', 'shadow' + key);
    g.append('circle').attr('cx', w).attr('cy', 0).attr('r', 13).attr('fill', colors.shadow).attr('filter', 'url(#f1)').attr('class', 'circleShadow' + key);

    g.append("path")
      .attr(
        "d",
        `M0 ${h - 22}L0 8S0 0 8 0L${w - 8} 0S${w} 0 ${w} 8L${w} ${h - 22}`
      )
      .attr("fill", colors.top).attr('class', 'topRect topRect_' + key).attr('data-key', key).attr("stroke", colors.num);
    const bottom = g.append("path")
      .attr(
        "d",
        `M0 ${h - 23}L${w} ${h - 23}L${w} ${h - 8}S${w} ${h} ${w - 8} ${h}L8 ${h}S0 ${h} 0 ${h - 8}L0 ${h - 23}`
      )
      .attr("fill", colors.bottom).attr('class', 'bottomRect bottomRect_' + key).attr('data-key', key).attr('data-title', obj.description);
    if (type == 3 || type == 5) {
      bottom.attr("stroke", colors.num);
    }
    
    // g.append("path")
    //   .attr("d", `M60 ${h - 16}L${w / 2} ${h - 10}L${w - 60} ${h - 16}M60 ${h - 12}L${w / 2} ${h - 6}L${w - 60} ${h - 12}`)
    //   .attr("stroke", color3).attr('stroke-width', 1).attr('fill', '#fff');
    
    g.append("path")
      .attr("d", `M0 ${h - 23}L${w} ${h - 23}L${w} ${h - 22}L0 ${h - 22}`)
      .attr("fill", colors.line).attr('class', 'fm_eventNone');
      
    if (text2) {
      const t1 = text1 || "";
      const t2 = text2 || "";
      this.textOverFlow(
        g,
        t2,
        w - 30,
        14,
        false
      ).attr('fill', '#333').attr("transform", `translate(10,20)`).attr('class', 'topRect').attr('data-key', key).style('font-weight', 600);
      const tdom2 = this.textOverFlow(
        g,
        t1,
        w - 20,
        12,
        false
      ).attr('fill', colors.text);
      tdom2.each(function () {
        const w1 = this.getComputedTextLength();
        tdom2.attr("transform", `translate(${(w - w1) / 2},${(h - 23 + 8 + 20) / 2})`).attr('class', 'topRect').attr('data-key', key);
      });
    } else {
      const t = text1 || "";
      this.textOverFlow(
        g,
        t,
        w - 20,
        14,
        true,
        h,
        w
      ).attr('fill', colors.text).attr('class', 'topRect').attr('data-key', key);
    }
    g.append('circle').attr('cx', w).attr('cy', 0).attr('r', 13).attr('stroke', colors.num).attr('stroke-width', 1).attr('fill', '#fff').attr('class', 'cursorPointer circleNum circle_' + key).attr('data-key', key);
    const numT = this.textOverFlow(
      g,
      num,
      20,
      16,
      false
    ).attr('fill', colors.num).attr('class', 'cursorPointer circleNum circleNum_' + key).attr('data-key', key);
    numT.each(function () {
      const w1 = this.getComputedTextLength();
      numT.attr("transform", `translate(${(24 - w1) / 2 + w - 12},6)`);
    });

    this.drawBottomContent(obj, g, w, h, key, colors.num);
  }
  
  creatVerticalText(g, text, fz, fw, fh, color, dxStr, isposition, y, oldy) {
    let dx = '', dy = '', height = 0, width = 0, isSplice = false;
    let copyT = text;
    let oldtextw = 0;
    const tdomObj = g.append('text').style('font-size', fz);
    let tdom, textw;
    for (let i = 0, len = text.length; i < len; i++) {
      if (y - oldy - 20 - fh * (i + 1) < 0) {
        dx += ' ';
        dy += ' ';
        copyT = text.slice(0, i - 1);
        isSplice = true;
        break;
      }
      if (i == 0) {
        dx += 0;
        tdomObj.text(text[i]);
        tdom = tdomObj.node();
        oldtextw = tdom.getComputedTextLength();
      } else {
        if (text[i].match(/^[\u4e00-\u9fa5]+$/)) {
          dx += -fw + (fw - oldtextw);
          oldtextw = fw;
        } else {
          tdomObj.text(text[i]);
          tdom = tdomObj.node();
          textw = tdom.getComputedTextLength();
          dx += -textw + (textw - oldtextw);
          oldtextw = textw;
        }
      }
      dy += fh;
      if (i != text.length.length - 1) {
        dx += ' ';
        dy += ' ';
      }
    }
    height = fh * copyT.length + 2;
    width = fw + 2;
    tdomObj.remove();
    const textObj = g.append('text').style('font-size', fz).attr('fill', color);
    if (isposition) {
      textObj.attr('x', this.fmOption.w3 / 2 - width / 2).attr('y', (y - oldy) / 2 - height / 2 + oldy);
    }
    textObj.append('tspan').text(copyT).attr('dx', dx).attr('dy', dy).attr('class', 'textTspan');
    if (isSplice) {
      textObj.append('tspan').text('...').attr('dx', dxStr).attr('dy', '8 5 5').attr('class', 'textTspan');
    }
    if (copyT != text) {
      textObj.append('title').text(text);
    }
    return { obj: textObj, text: copyT, isSplice: isSplice };
  }
  
  getTableColor(type) {
    return new TableColor(type).getColor();
  }

  textOverFlow(g, t, w, f, isM = false, height = 0, width = 0) {
    let text = "";
    const tDOM = g.append("text").style("font-size", f + "px");

    tDOM.each(function () {
      for (let i = 0, len = t.length; i < len; i++) {
        text += t[i];
        tDOM.text(text);
        if (this.getComputedTextLength() > w) {
          text = t.slice(0, i - 1) + "...";
          tDOM.text(text).append('title').text(t);
          break;
        }
      }
      if (isM) {
        const w1 = this.getComputedTextLength();
        tDOM.attr("transform", `translate(${(width - w1) / 2}, ${(height - 23 + 9) / 2})`);
      }
    });
    return tDOM;
  }

  drawBottomContent(obj, g, w, h, key, color) {
    const gp1 = g.append('polyline').attr('points', `${w / 2 - 5},${h - 16} ${w / 2},${h - 11} ${w / 2 + 5},${h - 16}`).attr('stroke-width', 1).attr('fill', 'none').attr('stroke', color);
    const gp2 = g.append('polyline').attr('points', `${w / 2 - 5},${h - 12} ${w / 2},${h - 7} ${w / 2 + 5},${h - 12}`).attr('stroke-width', 1).attr('fill', 'none').attr('stroke', color);
    const label = g.append('text').text('查看说明').style("font-size", "12px").attr("fill", color);
    label.each(function () {
      const w1 = this.getComputedTextLength();
      label.attr("transform", `translate(${(w - w1) / 2}, ${(h - 7)})`);
    });

    if (obj.description) {
      gp1.attr("class", "fm_eventNone polylineIcon" + key);
      gp2.attr("class", "fm_eventNone polylineIcon" + key);
      label.attr('class', "fm_eventNone description-label description-label" + key).text('');
    } else {
      gp1.attr("class", "fm_eventNone fm_hide polylineIcon" + key);
      gp2.attr("class", "fm_eventNone fm_hide polylineIcon" + key);
      label.attr('class', "fm_eventNone no-description description-label" + key).text('');
    }
  }
  
  cdtodType(fkey, tkey) {
    // 返回4种类型  1 中间没有遮挡 f和t x一样   2 其他
    const fobj = this.allObj[fkey];
    const tobj = this.allObj[tkey];
    if (fobj.x == tobj.x && fobj.y < tobj.y && fobj.toBotList.length == 1) {
      for (const i in this.allObj) {
        if (this.allObj[i].x == fobj.x && this.allObj[i].y < tobj.y && this.allObj[i].y > fobj.y) {
          return 2;
        }
      }
      return 1;
    }
    return 2;
  }

  getAllObj() {
    return this.allObj;
  }

  getFmOption() {
    return this.fmOption;
  }
}