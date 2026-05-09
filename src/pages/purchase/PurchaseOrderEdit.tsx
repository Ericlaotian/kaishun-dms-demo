import React, { useState, useEffect, useCallback } from 'react';
import { Header, Sidebar, Breadcrumb } from '../../components/layout';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import DatePicker from '../../components/common/DatePicker';

interface DetailItem {
  id: string;
  productCode: string;
  barcode: string;
  productName: string;
  spec: string;
  unit: string;
  quantity: number;
  price: number;
  amount: number;
  stockQty: number;
  checked: boolean;
}

interface PurchaseOrderFormData {
  supplierId: string;
  orderNo: string;
  status: string;
  branchId: string;
  department: string;
  warehouseId: string;
  purchaseDate: string;
  deliveryDate: string;
  salesman: string;
  contractNo: string;
  remark: string;
}

// 生成单据号
const generateOrderNo = () => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 900 + 100);
  return `PO${dateStr}${random}`;
};

// 生成唯一ID
const generateId = () => Math.random().toString(36).substr(2, 9);

const PurchaseOrderEdit: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 表单数据
  const [formData, setFormData] = useState<PurchaseOrderFormData>({
    supplierId: '',
    orderNo: generateOrderNo(),
    status: '制单',
    branchId: 'manage_center',
    department: '',
    warehouseId: 'manage_center_warehouse',
    purchaseDate: new Date().toISOString().slice(0, 10),
    deliveryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    salesman: 'manage_center',
    contractNo: '',
    remark: '',
  });

  // 明细数据
  const [details, setDetails] = useState<DetailItem[]>([
    {
      id: generateId(),
      productCode: '',
      barcode: '',
      productName: '',
      spec: '',
      unit: '件',
      quantity: 1,
      price: 0,
      amount: 0,
      stockQty: 0,
      checked: false,
    },
  ]);

  // 选中行
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // 下拉选项数据
  const supplierOptions = [
    { value: 'supplier1', label: '供应商A' },
    { value: 'supplier2', label: '供应商B' },
    { value: 'supplier3', label: '供应商C' },
  ];

  const branchOptions = [
    { value: 'manage_center', label: '管理中心' },
    { value: 'store1', label: '门店一' },
    { value: 'store2', label: '门店二' },
  ];

  const departmentOptions = [
    { value: 'dept1', label: '采购部' },
    { value: 'dept2', label: '销售部' },
    { value: 'dept3', label: '财务部' },
  ];

  const warehouseOptions = [
    { value: 'manage_center_warehouse', label: '管理中心仓' },
    { value: 'store1_warehouse', label: '门店一仓' },
    { value: 'store2_warehouse', label: '门店二仓' },
  ];

  const salesmanOptions = [
    { value: 'manage_center', label: '管理中心' },
    { value: 'person1', label: '张三' },
    { value: 'person2', label: '李四' },
  ];

  // 表单字段更新
  const updateFormField = (field: keyof PurchaseOrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 明细行更新
  const updateDetail = (id: string, field: keyof DetailItem, value: string | number | boolean) => {
    setDetails(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          // 如果更新的是数量或单价，自动计算金额
          if (field === 'quantity' || field === 'price') {
            updated.amount = Number(updated.quantity) * Number(updated.price);
          }
          return updated;
        }
        return item;
      });
    });
  };

  // 添加行
  const addRow = () => {
    const newRow: DetailItem = {
      id: generateId(),
      productCode: '',
      barcode: '',
      productName: '',
      spec: '',
      unit: '件',
      quantity: 1,
      price: 0,
      amount: 0,
      stockQty: 0,
      checked: false,
    };
    setDetails(prev => [...prev, newRow]);
  };

  // 删除选中行
  const deleteSelectedRows = () => {
    setDetails(prev => prev.filter(item => !selectedRows.has(item.id)));
    setSelectedRows(new Set());
  };

  // 全选/取消全选
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(details.map(item => item.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  // 单行选中
  const toggleRowSelect = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  // 保存到localStorage
  const saveToStorage = useCallback(() => {
    localStorage.setItem('purchaseOrderFormData', JSON.stringify(formData));
    localStorage.setItem('purchaseOrderDetails', JSON.stringify(details));
  }, [formData, details]);

  // 从localStorage加载
  useEffect(() => {
    const savedFormData = localStorage.getItem('purchaseOrderFormData');
    const savedDetails = localStorage.getItem('purchaseOrderDetails');

    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData));
      } catch (e) {
        console.error('Failed to load form data', e);
      }
    }

    if (savedDetails) {
      try {
        setDetails(JSON.parse(savedDetails));
      } catch (e) {
        console.error('Failed to load details', e);
      }
    }
  }, []);

  // 自动保存
  useEffect(() => {
    const timeoutId = setTimeout(saveToStorage, 500);
    return () => clearTimeout(timeoutId);
  }, [saveToStorage]);

  // 计算合计
  const totalItems = details.length;
  const totalAmount = details.reduce((sum, item) => sum + item.amount, 0);

  // 操作按钮
  const handleCancel = () => {
    if (window.confirm('确定要取消吗？未保存的数据将丢失。')) {
      localStorage.removeItem('purchaseOrderFormData');
      localStorage.removeItem('purchaseOrderDetails');
      window.history.back();
    }
  };

  const handleSave = () => {
    saveToStorage();
    alert('保存成功！');
  };

  const handleSaveAndNew = () => {
    saveToStorage();
    alert('保存成功！可以开始新增下一单了。');
    // 重置表单
    setFormData({
      ...formData,
      orderNo: generateOrderNo(),
      status: '制单',
    });
    setDetails([{
      id: generateId(),
      productCode: '',
      barcode: '',
      productName: '',
      spec: '',
      unit: '件',
      quantity: 1,
      price: 0,
      amount: 0,
      stockQty: 0,
      checked: false,
    }]);
  };

  const handleSaveAndAudit = () => {
    saveToStorage();
    setFormData(prev => ({ ...prev, status: '已审核' }));
    alert('保存并审核成功！');
  };

  // 列配置
  const columns = [
    { key: 'checkbox', label: '复选框', width: 'w-[32px]', align: 'text-center' },
    { key: 'seq', label: '序号', width: 'w-[54px]', align: 'text-center' },
    { key: 'productCode', label: '商品代码', width: 'w-[120px]', align: 'text-center' },
    { key: 'barcode', label: '商品条码', width: 'w-[120px]', align: 'text-center' },
    { key: 'productName', label: '商品名称', width: 'w-[160px]', align: 'text-left' },
    { key: 'spec', label: '商品规格', width: 'w-[120px]', align: 'text-left' },
    { key: 'unit', label: '采购单位', width: 'w-[120px]', align: 'text-center' },
    { key: 'quantity', label: '数量', width: 'w-[120px]', align: 'text-right' },
    { key: 'price', label: '单价', width: 'w-[120px]', align: 'text-right' },
    { key: 'amount', label: '金额', width: 'w-[120px]', align: 'text-right' },
    { key: 'stockQty', label: '库存数量', width: 'w-[120px]', align: 'text-right' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-page-bg">
      <Header />

      <div className="flex flex-1">
        <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />

        <main className="flex-1 p-4 overflow-auto">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: '返回', href: '#' },
              { label: '采购订单', href: '#' },
              { label: '新增' },
            ]}
          />

          {/* Page Content */}
          <div className="mt-4">
            <div className="bg-card-bg border border-border-color p-6">
              {/* Form Header - 3 row x 4 column layout */}
              <div className="mb-6">
                {/* Row 1 */}
                <div className="flex items-center h-form-row-height mb-form-item-gap">
                  <div className="flex items-center w-[296px]">
                    <span className="form-label required w-label-width">供应商</span>
                    <Select
                      options={supplierOptions}
                      value={formData.supplierId}
                      onChange={(v) => updateFormField('supplierId', v)}
                      placeholder="请选择供应商"
                      className="w-[186px]"
                    />
                  </div>
                  <div className="flex items-center w-[296px]">
                    <span className="form-label w-label-width">单据号</span>
                    <Input
                      value={formData.orderNo}
                      disabled
                      className="w-[186px]"
                    />
                  </div>
                  <div className="flex items-center w-[296px]">
                    <span className="form-label w-label-width">审核状态</span>
                    <Input
                      value={formData.status}
                      disabled
                      className="w-[186px]"
                    />
                  </div>
                  <div className="flex-1" />
                </div>

                {/* Row 2 */}
                <div className="flex items-center h-form-row-height mb-form-item-gap">
                  <div className="flex items-center w-[296px]">
                    <span className="form-label required w-label-width">订单分店</span>
                    <Select
                      options={branchOptions}
                      value={formData.branchId}
                      onChange={(v) => updateFormField('branchId', v)}
                      placeholder="请选择分店"
                      className="w-[186px]"
                    />
                  </div>
                  <div className="flex items-center w-[296px]">
                    <span className="form-label w-label-width">部门</span>
                    <Select
                      options={departmentOptions}
                      value={formData.department}
                      onChange={(v) => updateFormField('department', v)}
                      placeholder="请选择部门"
                      className="w-[186px]"
                    />
                  </div>
                  <div className="flex items-center w-[296px]">
                    <span className="form-label required w-label-width">收货仓库</span>
                    <Select
                      options={warehouseOptions}
                      value={formData.warehouseId}
                      onChange={(v) => updateFormField('warehouseId', v)}
                      placeholder="请选择仓库"
                      className="w-[186px]"
                    />
                  </div>
                  <div className="flex-1" />
                </div>

                {/* Row 3 */}
                <div className="flex items-center h-form-row-height mb-form-item-gap">
                  <div className="flex items-center w-[296px]">
                    <span className="form-label w-label-width">采购日期</span>
                    <DatePicker
                      value={formData.purchaseDate}
                      onChange={(v) => updateFormField('purchaseDate', v)}
                      className="w-[186px]"
                    />
                  </div>
                  <div className="flex items-center w-[296px]">
                    <span className="form-label w-label-width">交货期限</span>
                    <DatePicker
                      value={formData.deliveryDate}
                      onChange={(v) => updateFormField('deliveryDate', v)}
                      className="w-[186px]"
                    />
                  </div>
                  <div className="flex items-center w-[296px]">
                    <span className="form-label w-label-width">业务员</span>
                    <Select
                      options={salesmanOptions}
                      value={formData.salesman}
                      onChange={(v) => updateFormField('salesman', v)}
                      placeholder="请选择业务员"
                      className="w-[186px]"
                    />
                  </div>
                  <div className="flex items-center flex-1">
                    <span className="form-label w-label-width">合同号</span>
                    <Input
                      value={formData.contractNo}
                      onChange={(e) => updateFormField('contractNo', e.target.value)}
                      placeholder="请输入合同号"
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Row 4 - 备注 */}
                <div className="flex items-center h-form-row-height">
                  <span className="form-label w-label-width">备注</span>
                  <Input
                    value={formData.remark}
                    onChange={(e) => updateFormField('remark', e.target.value)}
                    placeholder="请输入备注"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  className="toolbar-btn"
                  onClick={addRow}
                >
                  批量添加
                </button>
                <button className="toolbar-btn">
                  导出
                </button>
                <button className="toolbar-btn">
                  打印
                </button>
                <button className="toolbar-btn" disabled>
                  附件
                </button>
                <button className="toolbar-btn">
                  补货参考值
                </button>
                <button className="toolbar-btn" disabled>
                  转收货单
                </button>
                <div className="relative group">
                  <button className="toolbar-btn">
                    业务 ▾
                  </button>
                </div>
                <button className="toolbar-btn">
                  开启极速输入模式
                </button>
                <button className="toolbar-btn">
                  批量修改单据
                </button>
                {selectedRows.size > 0 && (
                  <button
                    className="toolbar-btn text-error border-error"
                    onClick={deleteSelectedRows}
                  >
                    删除选中 ({selectedRows.size})
                  </button>
                )}
              </div>

              {/* Detail Grid */}
              <div className="border border-border-color">
                <table className="data-table">
                  <thead>
                    <tr>
                      {columns.map(col => (
                        <th
                          key={col.key}
                          className={`${col.width} ${col.align} py-1`}
                        >
                          {col.key === 'checkbox' ? (
                            <input
                              type="checkbox"
                              checked={details.length > 0 && selectedRows.size === details.length}
                              onChange={(e) => toggleSelectAll(e.target.checked)}
                            />
                          ) : (
                            col.label
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((item, index) => (
                      <tr key={item.id} className="h-table-row-height">
                        <td className="text-center py-1">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(item.id)}
                            onChange={(e) => toggleRowSelect(item.id, e.target.checked)}
                          />
                        </td>
                        <td className="text-center py-1">{index + 1}</td>
                        <td className="py-1">
                          <input
                            type="text"
                            className="w-full h-[26px] px-2 text-sm border border-border-color text-center"
                            value={item.productCode}
                            onChange={(e) => updateDetail(item.id, 'productCode', e.target.value)}
                          />
                        </td>
                        <td className="py-1">
                          <input
                            type="text"
                            className="w-full h-[26px] px-2 text-sm border border-border-color text-center"
                            value={item.barcode}
                            onChange={(e) => updateDetail(item.id, 'barcode', e.target.value)}
                          />
                        </td>
                        <td className="py-1">
                          <input
                            type="text"
                            className="w-full h-[26px] px-2 text-sm border border-border-color text-left"
                            value={item.productName}
                            onChange={(e) => updateDetail(item.id, 'productName', e.target.value)}
                          />
                        </td>
                        <td className="py-1">
                          <input
                            type="text"
                            className="w-full h-[26px] px-2 text-sm border border-border-color text-left"
                            value={item.spec}
                            onChange={(e) => updateDetail(item.id, 'spec', e.target.value)}
                          />
                        </td>
                        <td className="py-1">
                          <input
                            type="text"
                            className="w-full h-[26px] px-2 text-sm border border-border-color text-center"
                            value={item.unit}
                            onChange={(e) => updateDetail(item.id, 'unit', e.target.value)}
                          />
                        </td>
                        <td className="py-1">
                          <input
                            type="number"
                            className="w-full h-[26px] px-2 text-sm border border-border-color text-right"
                            value={item.quantity}
                            onChange={(e) => updateDetail(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          />
                        </td>
                        <td className="py-1">
                          <input
                            type="number"
                            className="w-full h-[26px] px-2 text-sm border border-border-color text-right"
                            value={item.price}
                            onChange={(e) => updateDetail(item.id, 'price', parseFloat(e.target.value) || 0)}
                          />
                        </td>
                        <td className="py-1 text-right">
                          {item.amount.toFixed(2)}
                        </td>
                        <td className="py-1 text-right">
                          <span className="text-text-muted">{item.stockQty}</span>
                        </td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="total-row h-table-row-height">
                      <td colSpan={10} className="text-right py-1 pr-4">
                        总合计：{totalItems}项
                      </td>
                      <td className="text-right py-1 pr-2">
                        {totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Add Row Button */}
              <div className="flex items-center justify-end mt-2">
                <button
                  className="flex items-center gap-1 text-primary hover:text-blue-500"
                  onClick={addRow}
                >
                  <span className="text-lg">+</span>
                  <span>继续添加</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 mt-6">
                <button
                  className="action-btn action-btn-default w-[56px] h-btn-height"
                  onClick={handleCancel}
                >
                  取 消
                </button>
                <button
                  className="action-btn action-btn-primary w-[56px] h-btn-height"
                  onClick={handleSave}
                >
                  保 存
                </button>
                <button
                  className="action-btn action-btn-default w-[94px] h-btn-height"
                  onClick={handleSaveAndNew}
                >
                  保存并新增
                </button>
                <button
                  className="action-btn action-btn-primary w-[94px] h-btn-height"
                  onClick={handleSaveAndAudit}
                >
                  保存并审核
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PurchaseOrderEdit;