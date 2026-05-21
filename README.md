# 寻找哈基米 — 双层嵌套 ARG

40 页双层嵌套 ARG。详细规划见会话 plan。

## 仓库结构

```
finder-page/            L1 01 失主寻猫专题页（玩家入口）
xhs-snapshot/           L1 02-05 + 12 小红书快照
wechat-group/           L1 06-08 + 10 微信群截图站
pet-clinic/             L1 08 朝阳爱宠宠物医院系统
maotrack/               L1 09 猫咪定位系统
finale/                 L1 14 假结局诱饵
find-cn/                L1 主线搜索工具（百度风）
... 共 16 个独立"伪装站点"，扁平在仓库根

shared/                 跨站共享资源
  components/           核心机制 JS 模块
    page-footer.js      页码 + 关键词 + extra/tool 标记
    corruption.js       L1 污染机制（?nexus=N 触发资源替换）
    nexus-popup.js      37 页 NEXUS 唯一弹窗
    search-engine.js    find.cn / unfilter.lol 通用搜索逻辑
  styles/shared.css     页脚与基础样式
  assets/               共享图片素材

tools/                  开发期工具（LSB 隐写编码器等，非游戏内容）
docs/                   设计文档
index.html              玩家入口（自动跳转到 finder-page/）
_internal-*.html 开发者菜单（文件名随机化，路径不公开）
404.html                ARG 风味 404
```

## 本地开发

任意静态服务器即可。**无需任何构建步骤**——本地服务的形态就是部署形态。

```bash
# 在仓库根目录
python3 -m http.server 8000
```

访问：

- 玩家入口：http://localhost:8000/finder-page/
- 开发者菜单：http://localhost:8000/

## 跨站共享资源加载

各站点 HTML 用相对路径引用 `shared/`：

```html
<link rel="stylesheet" href="../shared/styles/shared.css" />
<script type="module" src="../shared/components/page-footer.js"></script>
```

跨站跳转用 `../<other-site>/`。所有路径在本地、GitHub Pages、自有域名下表现一致。

## 部署（GitHub Pages，免备案，国内可访问）

仓库本身就是部署产物，**没有构建步骤**。

```bash
git add .
git commit -m "..."
git push
```

GitHub Pages 自动部署。访问：

```
https://daituzhang.github.io/finding-hajimi/finder-page/
```

### 启用 Pages（一次性）

仓库 → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)` → Save。

### 已知限制

- 仓库总大小建议 < 1GB（当前 ~280MB，宽裕）
- 单文件 < 100MB（当前最大 9.2MB）
- 国内访问 GH Pages 偶尔抽风，但绝大多数 ISP 直连可用，不需要 VPN

### 未来升级路径

如果某天需要：

- **国内访问极致稳定** → 买 9 块钱域名 + 备案 + 国内 OSS/CDN
- **每站独立子域提升沉浸感** → 买域名 + Cloudflare Pages 分别部署 16 个项目，并在每个 HTML 把 `../<other-site>/` 替换成 `https://<sub>.example.com/`

两条路径都不需要现在动手。

## 进度跟踪

每个站点目录内的 `STATUS.md` 标注当前完成度。
