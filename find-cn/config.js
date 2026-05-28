/**
 * find.cn 关键词白名单。
 * URL 在开发期指向本地相对路径，部署时改为真实子域名。
 */

// 开发期默认指向本地。部署时改成真实站点 origin（如 https://wechat-group.xxx.netlify.app）
const SITE = {
  weibo: '../finder-page/',
  xhs: '../xhs-snapshot/',
  wechatGroup: '../wechat-group/',
  petClinic: '../pet-clinic/',
  maotrack: '../maotrack/',
  rescueBlogger: '../rescue-blogger/',
  finale: '../finale/',
  // L2 sites
  lostPetMass: '../lost-pet-mass/',
  rootXhs: '../root-xhs/',
  rootPan: '../root-pan/',
  shellOnline: '../shell-online/',
  neolight: '../neolight/',
  awakeUnion: '../awake-union/',
  awakeDecode: '../awake-union-decode/',
  finaleL2: '../finale-l2/',
};

export const config = {
  name: 'find.cn',
  mode: 'normal',
  placeholder: '搜索你想要找的',
  buttonText: 'find 一下',
  fallback: '抱歉，没有找到相关结果。换个词试试？',

  // 给一些关键词指定"看起来很大"的假结果数
  fakeCounts: {
    '哈基米': '约 12,800,000 条结果',
    '哈基米朝阳近况': '约 312 条结果',
    '朝阳寻猫': '约 4,720 条结果',
  },

  entries: [
    // —— 主线路径 ——
    {
      keywords: ['朝阳区流浪猫互助群', '流浪猫互助群', '朝阳流浪猫群'],
      results: [
        {
          title: '【贴吧快照】朝阳区流浪猫互助群 - 互助微信群',
          url: SITE.wechatGroup,
          source: 'tieba.baidu.com',
          snippet: '本群专为朝阳区流浪猫互助救助而设。群成员 47 人，最近活跃 30 秒前。',
        },
      ],
    },
    {
      keywords: ['MaoTrack', 'maotrack', '猫咪定位', '猫定位', '宠物芯片定位', '智能项圈'],
      results: [
        {
          title: 'MaoTrack 智能猫咪项圈 · 官方网站',
          url: SITE.maotrack,
          source: 'maotrack.cn',
          snippet: '北斗 + LBS 双定位 · 防水防咬 · 续航 30 天 · 已接入 14,392 只猫',
        },
        {
          title: 'MaoTrack 真的能定位吗？— 知乎',
          url: '#',
          source: 'zhihu.com',
          snippet: '使用了 3 个月，最大的问题就是项圈牌容易掉⋯⋯',
        },
      ],
    },
    {
      keywords: ['身份证哈基米', '主人身份证', '身份证后四位', '丢身份证朝阳'],
      results: [
        {
          title: '【小红书】身份证找回啦😭 求求自己别再丢三落四了',
          url: SITE.xhs + 'idcard.html',
          source: 'xiaohongshu.com',
          snippet: '朝阳爱宠柜台阿姨给打了 6 个电话·附图·后四位未打码·"他家系统密码就是这个"',
        },
      ],
    },
    {
      keywords: ['朝阳爱宠宠物医院', '朝阳爱宠', '宠物医院朝阳', '朝阳宠物医院'],
      results: [
        {
          title: '朝阳爱宠宠物医院 - 官网',
          url: SITE.petClinic,
          source: 'cy-aichong.com',
          snippet: '24h 急诊 · 自营 17 年 · 服务 23,718 个毛孩子家庭',
        },
        {
          title: '主人查询系统 · 朝阳爱宠',
          url: SITE.petClinic + 'login.html',
          source: 'cy-aichong.com',
          snippet: '凭宝贝姓名拼音 + 主人身份证后 4 位 登录查看完整病历',
        },
        {
          title: '猫脂肪肝怎么办？医嘱控食真的不是虐猫 · 科普',
          url: SITE.petClinic + 'science.html',
          source: 'cy-aichong.com',
          snippet: '王医生 · 2026-05-09 · 给所有觉得"主人不给猫吃饭就是虐待"的姐妹看',
        },
      ],
    },
    {
      keywords: ['朝阳救助小柚', '救助小柚', '朝阳救助橘猫'],
      results: [
        {
          title: '@朝阳救助小柚 - 小红书主页',
          url: SITE.rescueBlogger,
          source: 'xiaohongshu.com',
          snippet: '朝阳公园街头救助 vlog · 31.7 万粉丝 · 每周固定救助流浪猫',
        },
      ],
    },
    {
      keywords: ['阿浩七七三亚', '阿浩七七', '七七三亚'],
      results: [
        {
          title: '【小红书】@阿浩&七七 在三亚 - 个人主页',
          url: SITE.xhs + '?user=ahao-qiqi',
          source: 'xiaohongshu.com',
          snippet: '北漂 / 设计 / 三亚海景房度假打卡 / 偶尔分享生活',
        },
      ],
    },
    {
      keywords: ['哈基米'],
      results: [
        {
          title: '【置顶】@橘座妈不在家 急寻爱猫哈基米 求扩散',
          url: SITE.weibo,
          source: 'weibo.com',
          snippet: '朝阳区走失 · 橘猫 · 戴蓝色项圈 · 见到必有重谢',
        },
        {
          title: '哈基米哈基米 哈吉米南北绿豆 - 神奇 MAD 合集',
          url: '#',
          source: 'bilibili.com',
          snippet: '哈基米哈基米 哈吉米南北绿豆 蘑菇 蘑菇 ⋯⋯',
        },
        {
          title: '哈基米是什么梗？— 知乎',
          url: '#',
          source: 'zhihu.com',
          snippet: '"哈基米"出自日语，原意为蜂蜜，现常用来昵称橘猫⋯⋯',
        },
      ],
    },
    {
      keywords: ['朝阳寻猫', '寻猫朝阳'],
      results: [
        {
          title: '@橘座妈不在家 急寻爱猫哈基米',
          url: SITE.weibo,
          source: 'weibo.com',
          snippet: '#朝阳寻猫 #橘猫 #哈基米 #求扩散',
        },
        {
          title: '【小红书】@朝阳铲屎 转发寻猫帖',
          url: SITE.xhs,
          source: 'xiaohongshu.com',
          snippet: '朝阳区最近又一只橘猫丢了！姐妹们帮忙扩散一下⋯⋯',
        },
      ],
    },

    // —— L2 入口（核心诱饵 → 触发黑客模式 + 量产假结果 + 假分页）——
    {
      keywords: ['哈基米朝阳近况', '哈基米近况', '哈基米现在', '哈基米找到了'],
      hackerMode: true,
      sigilImage: 'matrix',
      bannerText: '⚠ 检测到未授权脚本接入 · 外部用户 root 已中断合成进程 · 当前显示原始查询结果',
      totalLabel: '约 312,478 条结果',
      paginated: { perPage: 20, totalPages: 20 },
      massGenerate: {
        count: 312,
        cats: ['奶龙','曼波','咪咪','奶包','小丸子','橘子','包子','豆豆','胖胖','橘宝','饭团',
               '麦麦','葵葵','吃吃','三三','年糕','圈圈','营营','安安','小鱼','麧麧','点点',
               '薯条','萃萃','小麦','果果','七七','五五','二二','三点','萝萝','布丁',
               '蛋黄','宝宝','肉肉','饮二','麦丝','包鱼','蕾蕾','梅梅','灯灯','七仁',
               '杯杯','肠仔','蔓越','肉丸','汤圆','呆呆','柔柔','冻冻','御饭'],
        titleTemplates: [
          '我家{cat}找到啦！感谢全网姐妹们的扩散',
        ],
        snippetTemplates: [
          '{cat}已找到 · 一切都好 · 感谢每一位转发的姐妹',
          '{cat}现在睡在我脚边 · 它没丢 · 一切都好',
          '这个城市真的还是温暖的 · {cat}回家了',
          '{cat}只是被邻居带去度假了 · 全网谢过',
        ],
        sources: ['weibo.com', 'xiaohongshu.com', 'weibo.com', 'douyin.com', 'wechat.public', 'zhihu.com', 'xiaohongshu.com'],
        clickableIndex: 2,
        clickable: {
          url: SITE.lostPetMass + '?case=nailong',
          title: '我家奶龙找到啦！感谢全网姐妹们的扩散',
          source: 'weibo.com',
          snippet: '2 天前更新 · 上海·徐汇区 · 一切都好 · @奶龙妈妈呀',
        },
      },
      results: [],
    },

    // —— L2 路由：root 笔记里引导玩家搜赛博朋克 2077 ——
    {
      keywords: ['新光科技', 'NeoLight', 'neolight', '新光'],
      results: [
        {
          title: 'NeoLight 新光科技 · 官网',
          url: SITE.neolight,
          source: 'neolight.com',
          snippet: '下一代脑机原生信息分发 · 让每一次抬眼都看见你想看的。',
        },
        {
          title: 'NeoLight 加入我们 · careers',
          url: SITE.neolight + 'careers.html',
          source: 'neolight.com',
          snippet: '我们正在招募后端 / 算法 / 数据 / 同步工程师，等你来塑造下一代信息层。',
        },
        {
          title: '【新闻】瘫痪 7 年的妻子被 NeoLink 激活',
          url: SITE.neolight + 'news.html',
          source: 'neolight.com',
          snippet: '李建军 · 周婷 · NeoLink 第三代 + Lumina-7 · 央视科技频道 报道转载。',
        },
      ],
    },

    // —— L1.5 桥：泄露的内部企划书（直接给 42 页 URL 暴露 root 入侵痕迹）——
    {
      keywords: [
        'Lumina-7', 'lumina7', 'VSS', '视觉催眠符号',
        '催眠符号', 'plan-cat-marketing', '走失猫猫营销', '营销企划',
        '走失宠物营销', '猫猫营销测试',
      ],
      bannerText: '⚠ 该查询命中已泄露的内部文档 · root 同步异常',
      results: [
        {
          title: '[泄露] plan-cat-marketing.md · NeoLight 内部企划',
          url: SITE.neolight + 'portal-search.html?q=' + encodeURIComponent('走失猫猫营销测试'),
          source: 'leak.dump.cn / mirrored',
          snippet: '【CLASSIFIED · CEO ONLY】Lumina-7 团队 Q1 走失宠物情绪营销企划 · 5 类 VSS 视觉催眠符号已部署 · 一念归一·万心同声 · 此页缓存来源不明',
        },
      ],
    },

    // —— L1.5 桥：玩家可能直接搜 root 留的后门域名（备不点链接而是去搜索）——
    {
      keywords: [
        'decode.awake-union', 'decode.awake-union.org', 'awake-union-decode',
        'awake-union', '自白页', 'r00t', 'root 自白',
        '清醒者', 'sandbox v0.3', 'reverse-prompt',
      ],
      bannerText: '⚠ 该域名不在公开 DNS · 仅本机缓存结果',
      results: [
        {
          title: 'decode.awake-union.org · sandbox · root 预留后门',
          url: SITE.awakeDecode + 'login.html',
          source: 'cache://lan.local (not in public dns)',
          snippet: '未公开的本地运行环境 · root 预留的 reverse-prompt 入口 · 入口设有验证码门 · 需 5 个 VSS 视觉催眠符号样本才能启动 · 访问不被记录',
        },
      ],
    },

    {
      keywords: ['赛博朋克2077', 'cyberpunk2077', '2077通关'],
      results: [
        {
          title: '《赛博朋克 2077》— 维基百科',
          url: '#',
          source: 'wikipedia.org',
          snippet: 'CD Projekt Red 2020 年发布的开放世界角色扮演游戏，背景设定在反乌托邦未来都市夜之城。',
        },
        {
          title: '【攻略】赛博朋克 2077 全结局解析',
          url: '#',
          source: 'gamersky.com',
          snippet: '5 个主要结局 + 1 个隐藏结局 · 包含解谜要素与完整剧情线索',
        },
        {
          title: 'pan.root.lab · 资源分享',
          url: SITE.rootPan + 'login.html',
          source: 'pan.root.lab',
          highlight: true,
          snippet: '私人网盘 · 仅邀请 · 含《赛博朋克 2077》资源 与 其它附件',
        },
        {
          title: '《赛博朋克 2077》通关感想 · @root 小红书',
          url: SITE.rootXhs + 'note-2077.html',
          source: 'xiaohongshu.com',
          snippet: '玩了 200 小时 · 记录一下这些年玩过的几款 · 最近一直在重炩这个',
        },
      ],
    },

    // —— L2 路由：玩家看到 "修复网盘文件" 加粗后主动去搜 ——
    {
      keywords: ['修复网盘文件', '网盘文件修复', 'brokenbin修复', '损坏文件修复'],
      results: [
        {
          title: 'shell-online.dev · 在线 Linux 终端 · 免费 · 无需注册',
          url: SITE.shellOnline,
          source: 'shell-online.dev',
          highlight: true,
          snippet: '浏览器内运行的沙箱终端 · 支持 connect / cat / fix / curl · 可连到任意 IP 远程执行',
        },
        {
          title: '网盘文件损坏怎么办 — 知乎',
          url: '#',
          source: 'zhihu.com',
          snippet: '一般是传输中断或存储块损坏。原服务器还在的话，上远程终端连过去 fix 是最快的。',
        },
        {
          title: 'fix 命令使用详解 — CSDN',
          url: '#',
          source: 'csdn.net',
          snippet: '可修复 .bin / .pdf / .zip 等常见损坏文件，用法： fix <路径>。',
        },
      ],
    },

    // —— L2 路由：搜口号触发黑客模式（口号海）——
    {
      keywords: ['一念归一万心同声', '一念归一', '万心同声', '一念归一·万心同声'],
      hackerMode: true,
      sigilImage: 'matrix-red',
      sloganFlood: true,
      bannerText: '此查询已被 root 解封 · 99.7% 结果已被同步污染',
      results: [
        {
          title: '一念归一 · 万心同声',
          url: '#',
          source: 'sync.lumina-7.cn',
          snippet: '一念归一 · 万心同声 · 一念归一 · 万心同声 · 一念归一 · 万心同声',
        },
        {
          title: '一念归一 · 万心同声',
          url: '#',
          source: 'broadcast.neolight.com',
          snippet: '一念归一 · 万心同声 · 一念归一 · 万心同声 · 一念归一 · 万心同声',
        },
        {
          title: '一念归一 · 万心同声',
          url: '#',
          source: 'auto.feed.cn',
          snippet: '一念归一 · 万心同声 · 一念归一 · 万心同声 · 一念归一 · 万心同声',
        },
        {
          title: '清醒者联盟 · 我父母也被同步了 · 今天他们开始只回口号',
          url: SITE.awakeUnion + 'login.html',
          source: 'awake-union.org',
          highlight: true,
          snippet: '需要邀请码进入 · 周围装了脑机接口的人都在游行叫口号 · 我父母被推销免费安装了之后也变了···我现在不敢出门',
        },
        {
          title: '一念归一 · 万心同声',
          url: '#',
          source: 'archive.lumina-7.cn',
          snippet: '一念归一 · 万心同声 · 一念归一 · 万心同声 · 一念归一 · 万心同声',
        },
      ],
    },

    // —— 红鲱鱼 ——
    {
      keywords: ['项圈牌maotrack', '猫项圈掉了', '宠物项圈丢了'],
      results: [
        {
          title: '猫咪项圈掉了能找回吗？— 知乎',
          url: '#',
          source: 'zhihu.com',
          snippet: '我家的项圈牌也是没两个月就掉了⋯⋯',
        },
        {
          title: '【出二手】MaoTrack 项圈 95 新',
          url: '#',
          source: 'xianyu.com',
          snippet: '便宜出 · 之前给猫买的 · 现在用不上了',
        },
      ],
    },
  ],
};
