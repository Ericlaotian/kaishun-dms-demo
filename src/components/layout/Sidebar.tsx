import React, { useState } from 'react';

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'home', label: '首页', icon: 'home' },
  { id: 'contract', label: '合同管理', icon: 'contract' },
  { id: 'bl', label: '提单管理', icon: 'bl' },
  { id: 'purchase', label: '采购管理', icon: 'purchase' },
  { id: 'sales', label: '销售管理', icon: 'sales' },
  { id: 'inventory', label: '库存管理', icon: 'inventory' },
  { id: 'payment', label: '付款管理', icon: 'payment' },
  { id: 'receipt', label: '收款管理', icon: 'receipt' },
  { id: 'expense', label: '费用管理', icon: 'expense' },
  { id: 'report', label: '报表中心', icon: 'report' },
  { id: 'master', label: '基础数据', icon: 'master' },
  { id: 'system', label: '系统设置', icon: 'system' },
];

const MenuIcon: React.FC<{ type: string; active?: boolean }> = ({ type, active }) => {
  const color = active ? '#1890ff' : '#999999';
  const icons: Record<string, React.ReactNode> = {
    home: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
    contract: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    bl: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 8h10M7 12h6M7 16h8" />
      </svg>
    ),
    purchase: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18M16 10a4 4 0 0 1-8 0" fill="none" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
    sales: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    inventory: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill={color}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    payment: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    receipt: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    expense: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M12 17v4M8 21h8" />
      </svg>
    ),
    report: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" />
      </svg>
    ),
    master: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M2 10h20M10 4v16" />
      </svg>
    ),
    system: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  };

  return <>{icons[type] || null}</>;
};

const Sidebar: React.FC<SidebarProps> = ({ className = '', collapsed = false, onCollapse }) => {
  const [activeItem, setActiveItem] = useState('home');

  const toggleCollapse = () => {
    onCollapse?.(!collapsed);
  };

  return (
    <aside
      className={`bg-white border-r border-border-color flex flex-col ${className}`}
      style={{ width: collapsed ? '48px' : '172px' }}
    >
      {/* Collapse Toggle */}
      <div className="h-10 flex items-center justify-end px-2 border-b border-border-color">
        <button
          onClick={toggleCollapse}
          className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-primary transition-colors"
          title={collapsed ? '展开' : '收起'}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`h-menu-item-height flex items-center cursor-pointer transition-colors ${
              activeItem === item.id
                ? 'bg-primary/10 text-primary border-r-2 border-primary'
                : 'text-text-secondary hover:bg-page-bg hover:text-primary border-r-2 border-transparent'
            }`}
            style={{ height: '40px' }}
            title={collapsed ? item.label : undefined}
          >
            <div className="w-full flex items-center px-3">
              <div className="flex-shrink-0">
                <MenuIcon type={item.icon} active={activeItem === item.id} />
              </div>
              {!collapsed && (
                <span className="ml-3 text-sm whitespace-nowrap">{item.label}</span>
              )}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;