import React, { useState } from 'react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [searchValue, setSearchValue] = useState('');
  const activeMenu = '进销存';

  const menus = ['采购管理', '销售管理', '库存管理', '财务管理', '报表中心', '基础数据'];

  return (
    <header
      className={`h-header-height bg-white border-b border-border-color flex items-center px-4 ${className}`}
      style={{ height: '40px' }}
    >
      {/* Logo */}
      <div className="flex items-center mr-8" style={{ width: '107px', height: '20px' }}>
        <span className="text-primary font-medium text-base">凯顺DMS</span>
      </div>

      {/* Main Menu */}
      <nav className="flex items-center mr-8">
        {menus.map((menu) => (
          <button
            key={menu}
            className={`px-4 h-full text-sm border-b-2 transition-colors ${
              menu === activeMenu
                ? 'text-primary border-primary'
                : 'text-text-secondary border-transparent hover:text-primary hover:border-primary'
            }`}
            style={{ height: '40px' }}
          >
            {menu}
          </button>
        ))}
      </nav>

      {/* Search */}
      <div className="relative mr-8">
        <input
          type="text"
          placeholder="搜索功能"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-156 h-24px pl-8 pr-3 border border-border-color text-sm bg-white"
          style={{ width: '156px', height: '24px' }}
        />
        <svg
          className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      {/* User Info */}
      <div className="flex items-center ml-auto">
        <div className="flex items-center px-3 border border-border-color cursor-pointer hover:border-primary transition-colors">
          <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs mr-2">
            1
          </div>
          <span className="text-sm text-text-primary">12377-凯顺淀粉-管理中心</span>
        </div>
      </div>
    </header>
  );
};

export default Header;