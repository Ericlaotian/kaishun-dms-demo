# 凯顺DMS界面风格规格书 V1.0

> 基于乐檬零售ERP界面风格，分析提炼的ERP业务单据通用UI规范

---

## 一、设计理念

**核心理念**：ERP业务单据界面应简洁、方正、高效，以数据录入和展示为核心。

- **方正设计**：无圆角、无阴影、边框分明
- **信息密度**：高信息密度，充分利用屏幕空间
- **操作效率**：支持快捷键、批量操作、极速输入模式

---

## 二、布局规格

### 2.1 整体布局

```
┌─────────────────────────────────────────────────────────────────┐
│  顶部导航栏 (40px)                                               │
│  - Logo区域 (107x20px)                                          │
│  - 主菜单项 (进销存/零售/报表/档案/会员/更多)                    │
│  - 搜索框 (156x24px)                                            │
│  - 用户信息区 (209x28px)                                        │
├────────┬────────────────────────────────────────────────────────┤
│        │  面包屑导航 (32px)                                     │
│        │  返回 / 模块名 / 当前操作                               │
│ 左侧   ├────────────────────────────────────────────────────────┤
│ 菜单   │  Tab切换区 (32px)                                      │
│ 栏     │  [ 基本信息 ]  [ 其它信息 ]                            │
│        ├────────────────────────────────────────────────────────┤
│ 172px  │                                                        │
│        │  表头区域 (~150px)                                     │
│        │  - 3行x4列 表单布局                                    │
│        │  - * 标记必填项                                        │
│        ├────────────────────────────────────────────────────────┤
│        │                                                        │
│        │  明细表格区域 (自适应)                                  │
│        │  - 可编辑网格表格                                       │
│        │                                                        │
│        ├────────────────────────────────────────────────────────┤
│        │  操作按钮栏 (28px)                                      │
│        │  [ 取消 ]  [ 保存 ]  [ 保存并新增 ]  [ 保存并审核 ]     │
└────────┴────────────────────────────────────────────────────────┘
```

### 2.2 尺寸规格

| 属性 | 值 |
|------|-----|
| **页面宽度** | 1200px 固定 |
| **左侧菜单宽度** | 172px |
| **主内容区宽度** | 1028px |
| **表头高度** | 40px |
| **左侧菜单项高度** | 40px |
| **表单项行高** | 28px |
| **表单项垂直间距** | 36px |
| **表格行高** | 33px |
| **按钮高度** | 28px |
| **按钮间距** | 8px |
| **输入框高度** | 26px |
| **标签宽度** | 64-72px |

---

## 三、颜色规格

### 3.1 主色调

| 用途 | 色值 | 说明 |
|------|------|------|
| **主色** | `#1890ff` | 按钮、选中状态、链接 |
| **成功** | `#52c41a` | 成功状态、上升箭头 |
| **警告** | `#faad14` | 警告状态 |
| **错误** | `#ff4d4f` | 错误状态、下降箭头 |

### 3.2 文字颜色

| 用途 | 色值 |
|------|------|
| **主要文字** | `#333333` |
| **次要文字** | `#666666` |
| **弱化文字** | `#999999` |

### 3.3 背景与边框

| 用途 | 色值 |
|------|------|
| **页面背景** | `#f5f5f5` |
| **卡片背景** | `#ffffff` |
| **表格斑马纹** | `#fafafa` / `#ffffff` 交替 |
| **边框色** | `#d9d9d9` |
| **表格表头背景** | `#fafafa` |

---

## 四、表单规格

### 4.1 表头布局（采购单为例）

```
┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│ * 供应商          │ 单据号（自动生成）  │ 审核状态（制单）   │                  │
├──────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ * 订单分店        │ 部门             │ * 收货仓库        │                  │
├──────────────────┼──────────────────┼──────────────────┼──────────────────┤
│ 采购日期         │ 交货期限         │ 业务员            │ 合同号           │
├──────────────────────────────────────┴──────────────────┴──────────────────┤
│ 备注                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 表单项样式

```css
.form-item {
  display: flex;
  align-items: center;
  height: 28px;
  line-height: 28px;
}

.form-label {
  width: 64px;
  color: #666666;
  font-size: 14px;
}

.form-label.required::before {
  content: '*';
  color: #ff4d4f;
  margin-right: 4px;
}

.form-input {
  flex: 1;
  height: 26px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 0;  /* 方正设计，无圆角 */
  font-size: 14px;
}

.form-input:focus {
  border-color: #1890ff;
  outline: none;
}

.form-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
```

### 4.3 下拉选择框

```css
.select-wrapper {
  position: relative;
  flex: 1;
}

.select-input {
  width: 100%;
  height: 26px;
  padding-right: 30px;
  border: 1px solid #d9d9d9;
  background: #ffffff;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  background: url('dropdown-arrow.png');
}
```

---

## 五、表格规格

### 5.1 采购单明细表格列定义

| 列名 | 宽度 | 对齐 | 说明 |
|------|------|------|------|
| 复选框 | 32px | 居中 | 行选择 |
| 序号 | 54px | 居中 | 自动编号 |
| 商品代码 | 120px | 居中 | 可输入/选择 |
| 商品条码 | 120px | 居中 | 可输入 |
| 商品名称 | 160px | 居左 | 必填 |
| 商品规格 | 120px | 居左 | 可选 |
| 采购单位 | 120px | 居中 | 自动填充 |
| 数量 | 120px | 居右 | 必填，数字 |
| 单价 | 120px | 居右 | 必填，货币 |
| 金额 | 120px | 居右 | 自动计算 |
| 库存数量 | 120px | 居右 | 参考值 |

### 5.2 表格样式

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d9d9d9;
}

.data-table th {
  height: 33px;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  text-align: center;
  font-weight: 500;
  color: #333333;
}

.data-table td {
  height: 33px;
  border: 1px solid #d9d9d9;
  padding: 0 8px;
  font-size: 14px;
}

.data-table tr:nth-child(even) {
  background: #fafafa;
}

.data-table tr:nth-child(odd) {
  background: #ffffff;
}

/* 合计行 */
.total-row td {
  background: #fafafa;
  font-weight: 500;
}
```

### 5.3 列排序图标

```css
.sort-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 4px;
  vertical-align: middle;
}
```

---

## 六、按钮规格

### 6.1 主要操作按钮（底部）

| 按钮 | 样式 | 尺寸 |
|------|------|------|
| 取消 | 白底 + 1px边框 `#d9d9d9` | 56px × 28px |
| 保存 | 主色蓝底 `#1890ff` + 白字 | 56px × 28px |
| 保存并新增 | 白底 + 1px边框 | 94px × 28px |
| 保存并审核 | 主色蓝底 + 白字 | 94px × 28px |

### 6.2 工具栏按钮（表格上方）

```css
.toolbar-btn {
  height: 28px;
  padding: 0 16px;
  border: 1px solid #1890ff;
  background: #ffffff;
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
}

.toolbar-btn.primary {
  background: #1890ff;
  color: #ffffff;
}

.toolbar-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## 七、面包屑导航

```css
.breadcrumb {
  display: flex;
  align-items: center;
  height: 32px;
  font-size: 14px;
}

.breadcrumb-link {
  color: #1890ff;
  text-decoration: none;
  cursor: pointer;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999999;
}

.breadcrumb-current {
  color: #333333;
}
```

---

## 八、Tab切换

```css
.tab-list {
  display: flex;
  border-bottom: 2px solid #d9d9d9;
}

.tab-item {
  height: 32px;
  padding: 0 24px;
  color: #666666;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.tab-item.active {
  color: #1890ff;
  border-bottom-color: #1890ff;
}

.tab-item:hover {
  color: #1890ff;
}
```

---

## 九、状态标记

### 9.1 单据状态

| 状态 | 显示 | 颜色 |
|------|------|------|
| 制单 | 蓝字 | `#1890ff` |
| 已审核 | 绿字 | `#52c41a` |
| 已作废 | 灰字 | `#999999` |

### 9.2 金额箭头

| 类型 | 图标 | 颜色 |
|------|------|------|
| 上升 | ↑ | `#ff4d4f` 红色 |
| 下降 | ↓ | `#52c41a` 绿色 |

---

## 十、输入框规格

```css
input[type="text"],
input[type="number"],
input[type="date"] {
  height: 26px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 0;
  font-size: 14px;
  color: #333333;
}

input:focus {
  border-color: #1890ff;
  outline: none;
}

input:disabled {
  background: #f5f5f5;
  color: #999999;
  cursor: not-allowed;
}

/* Placeholder */
input::placeholder {
  color: #bfbfbf;
}
```

---

## 十一、快捷输入模式

当启用"极速输入模式"时：
- 表格获得焦点
- 支持扫描枪快速录入
- 商品列自动聚焦
-Enter 键跳转到下一列

---

## 十二、响应式规则

- **最小宽度**：1200px（固定布局，不自适应）
- **表格横向滚动**：当列总和超过内容区宽度时，表格区域出现横向滚动条
- **固定列**：复选框和序号列固定不动

---

## 十三、组件清单

| 组件 | 说明 |
|------|------|
| `FormHeader` | 单据表头区域，三行四列布局 |
| `FormItem` | 表单行，包含标签和输入框 |
| `Select` | 下拉选择框 |
| `DatePicker` | 日期选择器 |
| `DataGrid` | 可编辑数据表格 |
| `Toolbar` | 操作工具栏 |
| `Breadcrumb` | 面包屑导航 |
| `TabPanel` | Tab切换面板 |
| `ActionButtons` | 底部操作按钮组 |
| `StatusTag` | 状态标签组件 |
| `AmountDisplay` | 金额显示（带千分位） |

---

## 十四、凯顺DMS业务单据扩展

### 14.1 采购单（PO）

```
表头字段：
- * 供应商（往来单位）
- 单据号（自动生成）
- 审核状态（自动）
- * 订单分店（结算主体）
- 部门
- * 收货仓库
- 采购日期
- 交货期限
- 业务员
- 合同号（可选）
- 备注

明细列：
- 商品代码 / 商品条码 / 商品名称 / 商品规格
- 采购单位 / 数量 / 单价 / 金额 / 库存数量
```

### 14.2 销售单（SO）

```
表头字段：
- * 客户（往来单位）
- 单据号（自动生成）
- 审核状态（自动）
- * 订单分店（结算主体）
- 部门
- 收货仓库
- 销售日期
- 资金回笼日期
- 业务员
- 币种
- 备注

明细列：
- 商品代码 / 商品条码 / 商品名称 / 商品规格
- 销售单位 / 数量 / 单价 / 金额
```

---

**文档版本**：V1.0
**创建日期**：2026-05-09
**参考来源**：乐檬零售ERP系统界面风格
**适用范围**：凯顺DMS所有业务单据界面