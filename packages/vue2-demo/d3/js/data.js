/*
 * @Description  : 假数据调试
 * @Author       : lihui
 * @Date         : 2021-06-16 10:02:07
 * @LastEditTime : 2021-08-31 16:51:00
 * @LastEditors  : lihui
 */

// 逻辑图假数据 fmdata
export const fmdata = {
  treedatas: [
    {
      title: "招聘管理",
      key: '111',
      isParent: true,
      children: [
        // 流程表单和底表只在表信息中区分，都有唯一的id.
        // type表类型，1为流程表单，2为底表
        {
          title: "招聘需求审批表",
          key: '1',
          type: '1',
          iconName: "table",
        },
          
        {
          title: "面试邀约审批表",
          key: '2',
          type: '1',
          iconName: "table",
        },
          
        {
          title: "员工信息登记表",
          key: '3',
          type: '1', // 表类型，1为流程表单，2为底表
          iconName: "table",
        },
          
        {
          title: "行政管理",
          key: '4',
          type: '2', // 表类型，1为流程表单，2为底表
          iconName: "table",
        },
          
        {
          title: "简历档案",
          key: '5',
          type: '2', // 表类型，1为流程表单，2为底表
          iconName: "table",
        },
          
        {
          title: "员工档案",
          key: '6',
          type: '5', // 表类型，1为流程表单，2为底表
          iconName: "table",
        },
        {
          title: "员工档案ada",
          key: '15',
          type: '5', // 表类型，1为流程表单，2为底表
          iconName: "table",
        }
      ],
    },
    {
      title: "人员管理",
      key: '222',
      isParent: true,
      children: [
        // 流程表单和底表只在表信息中区分，都有唯一的id.
        // type表类型，1为流程表单，2为底表
        {
          title: "达标考核表",
          key: '7',
          type: '2',
          iconName: "table",
        },
          
        {
          title: "员工信息登记表",
          key: '8',
          type: '2',
          iconName: "table",
        },
          
        {
          title: "调岗申请表",
          key: '9',
          type: '1', // 表类型，1为流程表单，2为底表
          iconName: "table",
        },
          
        {
          title: "员工离职申请表",
          key: '10',
          type: '1', // 表类型，1为流程表单，2为底表
          iconName: "table",
        },
          
        {
          title: "离职交接表",
          key: '11',
          type: '1', // 表类型，1为流程表单，2为底表
          iconName: "table",
        },
          
        {
          title: "员工交接表",
          key: '12',
          type: '1', // 表类型，1为流程表单，2为底表
          iconName: "table",
        },
          
        {
          title: "培训档案",
          key: '13',
          type: '2', // 表类型，1为流程表单，2为底表
          iconName: "table",
        },
          
        {
          title: "培训申请表",
          key: '14',
          type: '3', // 表类型，1为流程表单，2为底表
          iconName: "table",
        },
        {
          title: "培训申请表aaaa",
          key: '16',
          type: '3', // 表类型，1为流程表单，2为底表
          iconName: "table",
        }
      ],
    },
  ],
  proList: [
    // 流程表
    {
      type: '1',
      key: '1',
      title: "招聘需求审批表",
      name: "招聘需求审批表",
      proToList: [{ id: '2', name: ['xxxxa'] }], // 流程表来的
      botToList: [{ id: '5', name: ['啊大大卡卡文科理科'] }], // 底表来的
      toProList: [{ id: '2', name: ['啊啊啊啊啊1啊啊啊啊啊1'] }, { id: '3', name: ['dada啊'] }], // 到流程表的
      toBotList: [], // 到底表的
      selfList: [], // 到自己的
    },
          
    {
      type: '1',
      key: '2',
      title: "面试邀约审批表",
      name: "面试邀约审批表",
      proToList: [{ id: '1', name: ['啊啊啊啊啊1啊啊啊啊啊1'] }], // 流程表来的
      botToList: [], // 底表来的
      toProList: [{ id: '1', name: ['xxxxa', 'xxxxa1'] }, { id: '3', name: ['仄仄仄仄仄仄仄啊', '仄仄仄仄仄仄仄啊1', '仄仄仄仄仄仄仄啊2'] }], // 到流程表的
      toBotList: [{ id: '7', name: ['xxxxa1', 'xxxxa2', 'xxxxa3'] }, { id: '14', name: ['啊啊啊啊啊啊', '啊啊啊啊啊啊1'] }, { id: '6', name: ['啊啊啊啊啊啊'] }, { id: '16', name: ['啊啊啊啊啊啊'] }, { id: '5', name: ['啊啊啊啊啊啊'] }], // 到底表的
      selfList: []
    },
          
    {
      type: '1',
      key: '3',
      title: "员工信息登记表",
      name: "员工信息登记表",
      proToList: [{ id: '2', name: ['仄仄仄仄仄仄仄啊', '仄仄仄仄仄仄仄啊1', '仄仄仄仄仄仄仄啊2'] }, { id: '1', name: ['dada啊'] }], // 流程表来的
      botToList: [{ id: '5', name: ['啊大大卡卡文科理科'] }], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [{ id: '7', name: ['xxxxa1'] }, { id: '14', name: ['啊啊啊啊啊啊'] }, { id: '6', name: ['啧啧啧啧啧啧'] }], // 到底表的
      selfList: []
    },
          
    {
      type: '1',
      key: '9',
      title: "调岗申请表",
      name: "调岗申请表",
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [{ id: '14', name: ['xxxxa1'] }, { id: '6', name: ['xxxxa1'] }], // 到底表的
      selfList: []
    },
          
    {
      type: '1',
      key: '10',
      title: "员工离职申请表",
      name: "员工离职申请表",
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: []
    },
          
    {
      type: '1',
      key: '11',
      title: "离职交接表",
      name: "离职交接表",
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: []
    },
          
    {
      type: '1',
      key: '12',
      title: "员工交接表",
      name: "员工交接表",
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: []
    },
  ],
  botList: [
    // 底表
    {
      type: '2',
      key: '4',
      title: "行政管理",
      name: "行政管理",
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: []
    },
          
    {
      type: '2',
      key: '5',
      title: "简历档案",
      name: "简历档案",
      proToList: [{ id: '2', name: ['xxxxa1'] }], // 流程表来的
      botToList: [{ id: '6', name: ['珍珠缀放第七大道'] }], // 底表来的
      toProList: [{ id: '1', name: ['啊大大卡卡文科理科', '啊大大卡卡文科理科1'] }, { id: '3', name: ['啊大大卡卡文科理科', '啊大大卡卡文科理科1'], }], // 到流程表的
      toBotList: [{ id: "8", name: ['啊啊啊啊啊', '啊啊啊啊啊1'] }], // 到底表的
      selfList: []
    },
          
    {
      type: '5',
      key: '6',
      title: "员工档案",
      name: "员工档案",
      proToList: [{ id: '2', name: ['xxxxa1'] }, { id: '3', name: ['xxxxa1'] }], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [{ id: '7', name: ['在卡卡啦啦啦', '在卡卡啦啦啦1'] }, { id: '16', name: ['在卡卡啦啦啦', '在卡卡啦啦啦1'] }, { id: '14', name: ['阿达大大大'] }, { id: '5', name: ['珍珠缀爱家看就看'] }], // 到底表的
      selfList: []
    },
          
    {
      type: '2',
      key: '7',
      title: "达标考核表",
      name: "达标考核表",
      proToList: [{ id: '2', name: ['xxxxa1'] }, { id: '3', name: ['xxxxa1'] }], // 流程表来的
      botToList: [{ id: '6', name: ['在卡卡啦啦啦'] }], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: []
    },
          
    {
      type: '2',
      key: '8',
      title: "员工信息登记表",
      name: "员工信息登记表",
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: []
    },
          
    {
      type: '2',
      key: '13',
      title: "培训档案",
      name: "培训档案",
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: []
    },
          
    {
      type: '3',
      key: '14',
      title: "培训申请表",
      name: "培训申请表",
      proToList: [{ id: '9', name: ['xxxxa1'] }, { id: '3', name: ['xxxxa1'] }, { id: '2', name: ['xxxxa1'] }], // 流程表来的
      botToList: [{ id: '6', name: ['阿达大大大'] }], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: []
    },
    {
      type: '5',
      key: '15',
      title: "员工档案ada",
      name: "员工档案ada",
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: []
    },
    {
      type: '3',
      key: '16',
      title: "培训申请表aaaa",
      name: "培训申请表aaaa",
      proToList: [{ id: '2', name: ['啊啊啊啊啊啊'] }], // 流程表来的
      botToList: [{ id: '6', name: ['在卡卡啦啦啦'] }], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: []
    }
  ],
  reportList: [
    {
      title: '查询报表1',
      key: '1212123333',
      type: '6',
      name: '查询报表1',
      isReport: true,
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: [],
      dataSourceList: [
        {
          name: 'adadadazzz重中之重',
          istmdpyy: 1
        }
      ]
    },
    {
      title: '单表统计报表1',
      key: '12121233333',
      type: '7',
      name: '单表统计报表1',
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: [],
      isReport: true,
      dataSourceList: [
        {
          name: 'adadadazzz重中之重',
          istmdpyy: 1
        }
      ]
    },
    {
      title: '多表统计报表1',
      key: '121212333331',
      type: '8',
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: [],
      name: '多表统计报表1',
      isReport: true,
      dataSourceList: [
        {
          name: 'adadadazzz重中之重',
          istmdpyy: 1
        }
      ]
    },
    {
      title: '静态报表1',
      key: '1212123333312',
      type: '9',
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: [],
      name: '静态报表1',
      isReport: true,
      dataSourceList: [
        {
          name: 'adadadazzz重中之重',
          istmdpyy: 1
        }
      ]
    },
    {
      title: '报表指标报表1',
      key: '12121233333121',
      proToList: [], // 流程表来的
      botToList: [], // 底表来的
      toProList: [], // 到流程表的
      toBotList: [], // 到底表的
      selfList: [],
      type: '10',
      name: '报表指标报表1',
      isReport: true,
      dataSourceList: [
        {
          name: 'adadadazzz重中之重',
          istmdpyy: 1
        }
      ]
    }
  ],
  reportDatas: [{
    title: '应用报表',
    key: '12121212',
    isReport: true,
    children: [
      {
        title: '查询',
        key: '22232323',
        isReport: true,
        children: [
          {
            title: '查询报表1',
            key: '1212123333',
            type: '6',
            isReport: true,
          }
        ]
      }, {
        title: '单表统计',
        key: '222323231',
        isReport: true,
        children: [
          {
            title: '单表统计报表1',
            key: '12121233333',
            isReport: true,
            type: '7'
          }
        ]
      }, {
        title: '多表统计',
        key: '2223232311',
        isReport: true,
        children: [
          {
            title: '多表统计报表1',
            isReport: true,
            key: '121212333331',
            type: '8'
          }
        ]
      }, {
        title: '静态报表',
        key: '22232323112',
        isReport: true,
        children: [
          {
            title: '静态报表1',
            key: '1212123333312',
            isReport: true,
            type: '9'
          }
        ]
      }, {
        title: '报表指标',
        isReport: true,
        key: '222323231121',
        children: [
          {
            title: '报表指标报表1',
            isReport: true,
            key: '12121233333121',
            type: '10'
          }
        ]
      }
    ]
  }]
};

export const allElseObjArr = [
  {
    title: "招聘管理",
    key: '111',
    isParent: true,
    description: '',
    children: [
      // 流程表单和底表只在表信息中区分，都有唯一的id.
      // type表类型，1为流程表单，2为底表
      {
        title: "招聘需求审批表",
        key: '1',
        type: '1',
        iconName: "table",
      },
  
      {
        title: "面试邀约审批表",
        key: '2',
        type: '1',
        iconName: "table",
      },
  
      {
        title: "员工信息登记表",
        key: '3',
        type: '1', // 表类型，1为流程表单，2为底表
        iconName: "table",
      },
  
      {
        title: "行政管理",
        key: '4',
        type: '2', // 表类型，1为流程表单，2为底表
        iconName: "table",
      },
  
      {
        title: "简历档案",
        key: '5',
        type: '2', // 表类型，1为流程表单，2为底表
        iconName: "table",
      },
  
      {
        title: "员工档案",
        key: '6',
        type: '5', // 表类型，1为流程表单，2为底表
        iconName: "table",
      },
      {
        title: "员工档案ada",
        key: '15',
        type: '5', // 表类型，1为流程表单，2为底表
        iconName: "table",
      }
    ],
  },
  {
    title: "人员管理",
    key: '222',
    isParent: true,
    children: [
      // 流程表单和底表只在表信息中区分，都有唯一的id.
      // type表类型，1为流程表单，2为底表
      {
        title: "达标考核表",
        key: '7',
        type: '2',
        iconName: "table",
      },
  
      {
        title: "员工信息登记表",
        key: '8',
        type: '2',
        iconName: "table",
      },
  
      {
        title: "调岗申请表",
        key: '9',
        type: '1', // 表类型，1为流程表单，2为底表
        iconName: "table",
      },
  
      {
        title: "员工离职申请表",
        key: '10',
        type: '1', // 表类型，1为流程表单，2为底表
        iconName: "table",
      },
  
      {
        title: "离职交接表",
        key: '11',
        type: '1', // 表类型，1为流程表单，2为底表
        iconName: "table",
      },
  
      {
        title: "员工交接表",
        key: '12',
        type: '1', // 表类型，1为流程表单，2为底表
        iconName: "table",
      },
  
      {
        title: "培训档案",
        key: '13',
        type: '2', // 表类型，1为流程表单，2为底表
        iconName: "table",
      },
  
      {
        title: "培训申请表",
        key: '14',
        type: '3', // 表类型，1为流程表单，2为底表
        iconName: "table",
      },
      {
        title: "培训申请表aaaa",
        key: '16',
        type: '3', // 表类型，1为流程表单，2为底表
        iconName: "table",
      }
    ],
  }
];