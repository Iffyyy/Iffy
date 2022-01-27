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
      key: "-3643122822659748392",
      title: "议题管理",
      isRoot: "true",
      type: "0",
      children: [
        {
          key: "-3736619013416861491",
          title: "会议纪要审批",
          isRoot: null,
          type: "1",
          children: null,
          description: null,
          parentId: "-3643122822659748392",
          iconName: "vcloud-liucheng",
          reportCharacter: false,
          disabled: false,
          toBotList: null,
          spaceId: null,
          cloudMemberId: null,
          v5LoginName: null,
        },
        {
          key: "-8009779544421151855",
          title: "会议议题与安排",
          isRoot: null,
          type: "1",
          children: null,
          description: null,
          parentId: "-3643122822659748392",
          iconName: "vcloud-liucheng",
          reportCharacter: false,
          disabled: false,
          toBotList: null,
          spaceId: null,
          cloudMemberId: null,
          v5LoginName: null,
        },
        {
          key: "4518549940201146961",
          title: "周会议安排",
          isRoot: null,
          type: "1",
          children: null,
          description: null,
          parentId: "-3643122822659748392",
          iconName: "vcloud-liucheng",
          reportCharacter: false,
          disabled: false,
          toBotList: null,
          spaceId: null,
          cloudMemberId: null,
          v5LoginName: null,
        },
        {
          key: "126358812536491815",
          title: "议题提报",
          isRoot: null,
          type: "1",
          children: null,
          description: null,
          parentId: "-3643122822659748392",
          iconName: "vcloud-liucheng",
          reportCharacter: false,
          disabled: false,
          toBotList: null,
          spaceId: null,
          cloudMemberId: null,
          v5LoginName: null,
        },
        {
          key: "-3497924772051530008",
          title: "会议信息",
          isRoot: null,
          type: "2",
          children: null,
          description: null,
          parentId: "-3643122822659748392",
          iconName: "vcloud-wuliucheng",
          reportCharacter: false,
          disabled: false,
          toBotList: null,
          spaceId: null,
          cloudMemberId: null,
          v5LoginName: null,
        },
        {
          key: "-3431714815417562405",
          title: "会议议题",
          isRoot: null,
          type: "2",
          children: null,
          description: null,
          parentId: "-3643122822659748392",
          iconName: "vcloud-wuliucheng",
          reportCharacter: false,
          disabled: false,
          toBotList: null,
          spaceId: null,
          cloudMemberId: null,
          v5LoginName: null,
        },
      ],
      description: null,
      parentId: null,
      iconName: null,
      reportCharacter: false,
      disabled: false,
      toBotList: null,
      spaceId: null,
      cloudMemberId: null,
      v5LoginName: null,
    },
  ],
  proList: [
    {
      id: "-3736619013416861491",
      key: "-3736619013416861491",
      name: "会议纪要审批",
      title: "会议纪要审批",
      formId: null,
      parentId: "-3643122822659748392",
      ownedFolder: null,
      type: "1",
      tableName: null,
      description: null,
      reportCharacter: false,
      disabled: false,
      toBotList: [
        {
          id: "-3431714815417562405",
          name: ["会议纪要审批后存储议题状态与会议情况"],
          isRelationOrTrigger: 1,
          point: ["流程结束"],
          pointList: [["流程结束"]],
          type: ["更新记录"],
          typeList: [["更新记录"]],
        },
        {
          id: "-3497924772051530008",
          name: ["会议纪要审批后更新会议信息"],
          isRelationOrTrigger: 1,
          point: ["流程结束"],
          pointList: [["流程结束"]],
          type: ["更新记录"],
          typeList: [["更新记录"]],
        },
      ],
      toProList: [],
      botToList: [
        {
          id: "-3497924772051530008",
          name: ["会议纪要审批读取会议议题明细"],
          isRelationOrTrigger: 0,
          point: null,
          pointList: null,
          type: ["新增明细行"],
          typeList: [["新增明细行"]],
        },
        {
          id: "-3497924772051530008",
          name: ["会议纪要审批读取会议信息"],
          isRelationOrTrigger: 0,
          point: null,
          pointList: null,
          type: ["手工选择"],
          typeList: [["手工选择"]],
        },
      ],
      proToList: [],
      selfList: [],
      dataSourceList: [],
    },
    {
      id: "-8009779544421151855",
      key: "-8009779544421151855",
      name: "会议议题与安排",
      title: "会议议题与安排",
      formId: null,
      parentId: "-3643122822659748392",
      ownedFolder: null,
      type: "1",
      tableName: null,
      description: null,
      reportCharacter: false,
      disabled: false,
      toBotList: [
        {
          id: "-3431714815417562405",
          name: ["会议安排存储到议题信息", "会议议题呈阅更新议题状态"],
          isRelationOrTrigger: 1,
          point: ["流程结束", "流程结束"],
          pointList: [["流程结束"], ["流程结束"]],
          type: ["更新记录", "更新记录"],
          typeList: [["更新记录"], ["更新记录"]],
        },
        {
          id: "-3497924772051530008",
          name: ["会议安排存储会议信息"],
          isRelationOrTrigger: 1,
          point: ["流程结束"],
          pointList: [["流程结束"]],
          type: ["新建记录"],
          typeList: [["新建记录"]],
        },
      ],
      toProList: [],
      botToList: [
        {
          id: "-3431714815417562405",
          name: ["会议议题呈阅读取会议议题"],
          isRelationOrTrigger: 0,
          point: null,
          pointList: null,
          type: ["手工选择"],
          typeList: [["手工选择"]],
        },
      ],
      proToList: [],
      selfList: [],
      dataSourceList: [],
    },
    {
      id: "4518549940201146961",
      key: "4518549940201146961",
      name: "周会议安排",
      title: "周会议安排",
      formId: null,
      parentId: "-3643122822659748392",
      ownedFolder: null,
      type: "1",
      tableName: null,
      description: null,
      reportCharacter: false,
      disabled: false,
      toBotList: [],
      toProList: [],
      botToList: [
        {
          id: "-3497924772051530008",
          name: ["周会议安排读取未召开会议信息"],
          isRelationOrTrigger: 0,
          point: null,
          pointList: null,
          type: ["手工选择"],
          typeList: [["手工选择"]],
        },
      ],
      proToList: [],
      selfList: [],
      dataSourceList: [],
    },
    {
      id: "126358812536491815",
      key: "126358812536491815",
      name: "议题提报",
      title: "议题提报",
      formId: null,
      parentId: "-3643122822659748392",
      ownedFolder: null,
      type: "1",
      tableName: null,
      description: null,
      reportCharacter: false,
      disabled: false,
      toBotList: [
        {
          id: "-3431714815417562405",
          name: ["议题提报后存储会议议题"],
          isRelationOrTrigger: 1,
          point: ["流程结束"],
          pointList: [["流程结束"]],
          type: ["新建记录"],
          typeList: [["新建记录"]],
        },
      ],
      toProList: [],
      botToList: [],
      proToList: [],
      selfList: [],
      dataSourceList: [],
    },
  ],
  botList: [
    {
      id: "-3497924772051530008",
      key: "-3497924772051530008",
      name: "会议信息",
      title: "会议信息",
      formId: null,
      parentId: "-3643122822659748392",
      ownedFolder: null,
      type: "2",
      tableName: null,
      description: null,
      reportCharacter: false,
      disabled: false,
      toBotList: [],
      toProList: [
        {
          id: "4518549940201146961",
          name: ["周会议安排读取未召开会议信息"],
          isRelationOrTrigger: 0,
          point: [],
          pointList: [],
          type: ["手工选择"],
          typeList: [["手工选择"]],
        },
        {
          id: "-3736619013416861491",
          name: ["会议纪要审批读取会议议题明细", "会议纪要审批读取会议信息"],
          isRelationOrTrigger: 0,
          point: [],
          pointList: [],
          type: ["新增明细行", "手工选择"],
          typeList: [["新增明细行"], ["手工选择"]],
        },
      ],
      botToList: [
        {
          id: "-3431714815417562405",
          name: ["会议信息读取会议议题"],
          isRelationOrTrigger: 0,
          point: null,
          pointList: null,
          type: ["手工选择"],
          typeList: [["手工选择"]],
        },
      ],
      proToList: [
        {
          id: "-8009779544421151855",
          name: ["会议安排存储会议信息"],
          isRelationOrTrigger: 1,
          point: ["流程结束"],
          pointList: [["流程结束"]],
          type: ["新建记录"],
          typeList: [["新建记录"]],
        },
        {
          id: "-3736619013416861491",
          name: ["会议纪要审批后更新会议信息"],
          isRelationOrTrigger: 1,
          point: ["流程结束"],
          pointList: [["流程结束"]],
          type: ["更新记录"],
          typeList: [["更新记录"]],
        },
      ],
      selfList: [],
      dataSourceList: [],
    },
    {
      id: "-3431714815417562405",
      key: "-3431714815417562405",
      name: "会议议题",
      title: "会议议题",
      formId: null,
      parentId: "-3643122822659748392",
      ownedFolder: null,
      type: "2",
      tableName: null,
      description: null,
      reportCharacter: false,
      disabled: false,
      toBotList: [
        {
          id: "-3497924772051530008",
          name: ["会议信息读取会议议题"],
          isRelationOrTrigger: 0,
          point: [],
          pointList: [],
          type: ["手工选择"],
          typeList: [["手工选择"]],
        },
      ],
      toProList: [
        {
          id: "-8009779544421151855",
          name: ["会议议题呈阅读取会议议题"],
          isRelationOrTrigger: 0,
          point: [],
          pointList: [],
          type: ["手工选择"],
          typeList: [["手工选择"]],
        },
      ],
      botToList: [],
      proToList: [
        {
          id: "-8009779544421151855",
          name: ["会议安排存储到议题信息"],
          isRelationOrTrigger: 1,
          point: ["流程结束"],
          pointList: [["流程结束"]],
          type: ["更新记录"],
          typeList: [["更新记录"]],
        },
        {
          id: "-8009779544421151855",
          name: ["会议议题呈阅更新议题状态"],
          isRelationOrTrigger: 1,
          point: ["流程结束"],
          pointList: [["流程结束"]],
          type: ["更新记录"],
          typeList: [["更新记录"]],
        },
        {
          id: "-3736619013416861491",
          name: ["会议纪要审批后存储议题状态与会议情况"],
          isRelationOrTrigger: 1,
          point: ["流程结束"],
          pointList: [["流程结束"]],
          type: ["更新记录"],
          typeList: [["更新记录"]],
        },
        {
          id: "126358812536491815",
          name: ["议题提报后存储会议议题"],
          isRelationOrTrigger: 1,
          point: ["流程结束"],
          pointList: [["流程结束"]],
          type: ["新建记录"],
          typeList: [["新建记录"]],
        },
      ],
      selfList: [],
      dataSourceList: [],
    },
  ],
};

export const allElseObjArr = [];
