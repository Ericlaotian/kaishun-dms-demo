import React, { useState, useEffect } from 'react';
import { Button } from '../../components/common';
import { DatePicker } from '../../components/common';
import { Select } from '../../components/common';
import { Input } from '../../components/common';

interface PurchaseOrder {
  id: string;
  orderNo: string;
  supplierCode: string;
  supplierName: string;
  warehouse: string;
  orderDate: string;
  deliveryDate: string;
  salesperson: string;
  status: 'draft' | 'approved';
  amount: number;
}

const sampleData: PurchaseOrder[] = [
  {
    id: '1',
    orderNo: 'PO12377992605090037',
    supplierCode: '40217',
    supplierName: '刘伟斌自采',
    warehouse: '管理中心仓',
    orderDate: '2026-05-09',
    deliveryDate: '2026-05-19',
    salesperson: '管理中心',
    status: 'draft',
    amount: 4760.00,
  },
  {
    id: '2',
    orderNo: 'PO12377992605090038',
    supplierCode: '40218',
    supplierName: '深圳供应商A',
    warehouse: '南山仓',
    orderDate: '2026-05-08',
    deliveryDate: '2026-05-18',
    salesperson: '张三',
    status: 'approved',
    amount: 12500.00,
  },
  {
    id: '3',
    orderNo: 'PO12377992605090039',
    supplierCode: '40219',
    supplierName: '广州供应商B',
    warehouse: '天河仓',
    orderDate: '2026-05-07',
    deliveryDate: '2026-05-17',
    salesperson: '李四',
    status: 'draft',
    amount: 8900.00,
  },
  {
    id: '4',
    orderNo: 'PO12377992605090040',
    supplierCode: '40220',
    supplierName: '东莞供应商C',
    warehouse: '莞城仓',
    orderDate: '2026-05-06',
    deliveryDate: '2026-05-16',
    salesperson: '王五',
    status: 'approved',
    amount: 6200.00,
  },
  {
    id: '5',
    orderNo: 'PO12377992605090041',
    supplierCode: '40221',
    supplierName: '佛山供应商D',
    warehouse: '禅城仓',
    orderDate: '2026-05-05',
    deliveryDate: '2026-05-15',
    salesperson: '赵六',
    status: 'draft',
    amount: 15800.00,
  },
  {
    id: '6',
    orderNo: 'PO12377992605090042',
    supplierCode: '40222',
    supplierName: '中山供应商E',
    warehouse: '中山仓',
    orderDate: '2026-05-04',
    deliveryDate: '2026-05-14',
    salesperson: '孙七',
    status: 'approved',
    amount: 7300.00,
  },
  {
    id: '7',
    orderNo: 'PO12377992605090043',
    supplierCode: '40223',
    supplierName: '珠海供应商F',
    warehouse: '香洲仓',
    orderDate: '2026-05-03',
    deliveryDate: '2026-05-13',
    salesperson: '周八',
    status: 'draft',
    amount: 4200.00,
  },
];

const storeOptions = [
  { value: '', label: '全部' },
  { value: '001', label: '管理中心' },
  { value: '002', label: '南山店' },
  { value: '003', label: '天河店' },
  { value: '004', label: '莞城店' },
];

const productOptions = [
  { value: '', label: '全部' },
  { value: 'P001', label: '商品档案A' },
  { value: 'P002', label: '商品档案B' },
  { value: 'P003', label: '商品档案C' },
];

const STORAGE_KEY = 'purchase_order_list';

const PurchaseOrderList: React.FC = () => {
  const [data, setData] = useState<PurchaseOrder[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(200);

  // Search filters
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [storeCode, setStoreCode] = useState('');
  const [orderNo, setOrderNo] = useState('');
  const [productCode, setProductCode] = useState('');

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      setData(sampleData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(data.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleBatchDelete = () => {
    if (selectedRows.length === 0) return;
    const newData = data.filter(item => !selectedRows.includes(item.id));
    setData(newData);
    setSelectedRows([]);
  };

  const handleBatchApprove = () => {
    if (selectedRows.length === 0) return;
    const newData = data.map(item =>
      selectedRows.includes(item.id) ? { ...item, status: 'approved' as const } : item
    );
    setData(newData);
  };

  const handleBatchCancel = () => {
    if (selectedRows.length === 0) return;
    const newData = data.map(item =>
      selectedRows.includes(item.id) ? { ...item, status: 'draft' as const } : item
    );
    setData(newData);
  };

  const handleExport = () => {
    const headers = ['单据号', '供应商代码', '供应商名称', '收货仓库', '采购日期', '交货期限', '业务员', '单据状态', '单据金额'];
    const rows = data.map(item => [
      item.orderNo,
      item.supplierCode,
      item.supplierName,
      item.warehouse,
      item.orderDate,
      item.deliveryDate,
      item.salesperson,
      item.status === 'draft' ? '制单' : '审核',
      item.amount.toFixed(2),
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `采购单_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleSearch = () => {
    // Filter data based on search criteria
    let filtered = [...sampleData];

    if (dateFrom) {
      filtered = filtered.filter(item => item.orderDate >= dateFrom);
    }
    if (dateTo) {
      filtered = filtered.filter(item => item.orderDate <= dateTo);
    }
    if (storeCode) {
      filtered = filtered.filter(item => item.warehouse.includes(storeCode));
    }
    if (orderNo) {
      filtered = filtered.filter(item => item.orderNo.toLowerCase().includes(orderNo.toLowerCase()));
    }

    setData(filtered);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setDateFrom('');
    setDateTo('');
    setStoreCode('');
    setOrderNo('');
    setProductCode('');
    setData(sampleData);
    setCurrentPage(1);
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const allSelected = data.length > 0 && selectedRows.length === data.length;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-3">
        <Button variant="primary" onClick={() => {}}>
          新增
        </Button>
        <Button variant="secondary" onClick={handleBatchDelete} disabled={selectedRows.length === 0}>
          批量删除
        </Button>
        <Button variant="secondary" onClick={handleBatchApprove} disabled={selectedRows.length === 0}>
          批量审核
        </Button>
        <Button variant="secondary" onClick={handleBatchCancel} disabled={selectedRows.length === 0}>
          批量作废
        </Button>
        <Button variant="secondary" onClick={handleExport}>
          导出
        </Button>
      </div>

      {/* Search/Filter Area */}
      <div className="flex items-center gap-4 mb-3 p-3 bg-card-bg border border-border-color">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary whitespace-nowrap">采购日期:</span>
          <DatePicker
            value={dateFrom}
            onChange={setDateFrom}
            placeholder="开始日期"
          />
          <span className="text-text-muted">-</span>
          <DatePicker
            value={dateTo}
            onChange={setDateTo}
            placeholder="结束日期"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary whitespace-nowrap">订货门店:</span>
          <Select
            options={storeOptions}
            value={storeCode}
            onChange={setStoreCode}
            placeholder="全部"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary whitespace-nowrap">单据号:</span>
          <Input
            value={orderNo}
            onChange={(e) => setOrderNo(e.target.value)}
            placeholder="请输入单据号"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary whitespace-nowrap">商品档案:</span>
          <Select
            options={productOptions}
            value={productCode}
            onChange={setProductCode}
            placeholder="全部"
          />
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button variant="primary" onClick={handleSearch}>
            查询
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            重置
          </Button>
          <Button variant="secondary">
            高级搜索
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto bg-card-bg border border-border-color">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-table-header-bg">
              <th className="w-8 h-8 border border-border-color text-center text-xs font-normal">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="cursor-pointer"
                />
              </th>
              <th className="w-[54px] h-8 border border-border-color text-center text-xs font-normal text-text-primary">
                序号
              </th>
              <th className="w-[170px] h-8 border border-border-color text-center text-xs font-normal text-text-primary">
                单据号
              </th>
              <th className="w-[140px] h-8 border border-border-color text-center text-xs font-normal text-text-primary">
                供应商代码
              </th>
              <th className="w-[140px] h-8 border border-border-color text-center text-xs font-normal text-text-primary">
                供应商名称
              </th>
              <th className="w-[140px] h-8 border border-border-color text-center text-xs font-normal text-text-primary">
                收货仓库
              </th>
              <th className="w-[140px] h-8 border border-border-color text-center text-xs font-normal text-text-primary">
                采购日期
              </th>
              <th className="w-[140px] h-8 border border-border-color text-center text-xs font-normal text-text-primary">
                交货期限
              </th>
              <th className="w-[90px] h-8 border border-border-color text-center text-xs font-normal text-text-primary">
                业务员
              </th>
              <th className="w-[120px] h-8 border border-border-color text-center text-xs font-normal text-text-primary">
                单据状态
              </th>
              <th className="w-[120px] h-8 border border-border-color text-center text-xs font-normal text-text-primary">
                单据金额
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-table-stripe'}`}
              >
                <td className="h-[33px] border border-border-color text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="h-[33px] border border-border-color text-center text-xs text-text-primary">
                  {index + 1}
                </td>
                <td className="h-[33px] border border-border-color text-center text-xs text-text-primary">
                  {item.orderNo}
                </td>
                <td className="h-[33px] border border-border-color text-center text-xs text-text-primary">
                  {item.supplierCode}
                </td>
                <td className="h-[33px] border border-border-color text-center text-xs text-text-primary">
                  {item.supplierName}
                </td>
                <td className="h-[33px] border border-border-color text-center text-xs text-text-primary">
                  {item.warehouse}
                </td>
                <td className="h-[33px] border border-border-color text-center text-xs text-text-primary">
                  {item.orderDate}
                </td>
                <td className="h-[33px] border border-border-color text-center text-xs text-text-primary">
                  {item.deliveryDate}
                </td>
                <td className="h-[33px] border border-border-color text-center text-xs text-text-primary">
                  {item.salesperson}
                </td>
                <td className="h-[33px] border border-border-color text-center">
                  <span className="text-xs" style={{ color: '#1890ff' }}>
                    {item.status === 'draft' ? '制单' : '审核'}
                  </span>
                </td>
                <td className="h-[33px] border border-border-color text-right text-xs text-text-primary pr-2">
                  ¥{formatAmount(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-text-secondary">共{data.length}条</span>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            上一页
          </Button>
          <span className="text-sm text-text-secondary">第{currentPage}页</span>
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={data.length < pageSize}
          >
            下一页
          </Button>
          <Select
            options={[
              { value: '200', label: '200条/页' },
              { value: '100', label: '100条/页' },
              { value: '50', label: '50条/页' },
            ]}
            value="200"
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderList;