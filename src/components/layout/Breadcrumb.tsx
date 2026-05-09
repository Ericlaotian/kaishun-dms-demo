import React from 'react';

interface BreadcrumbProps {
  className?: string;
  items?: Array<{
    label: string;
    href?: string;
  }>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className = '', items = [] }) => {
  return (
    <div className={`flex items-center h-8 text-sm ${className}`}>
      {/* 返回链接 */}
      <a
        href="#"
        className="flex items-center text-primary no-underline hover:underline"
        onClick={(e) => e.preventDefault()}
      >
        <svg
          className="mr-1"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>返回</span>
      </a>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="mx-2 text-text-muted">/</span>
          {item.href ? (
            <a
              href={item.href}
              className="text-primary no-underline hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              {item.label}
            </a>
          ) : (
            <span className="text-text-primary">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;