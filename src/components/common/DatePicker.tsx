import React, { useState } from 'react';

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = '请选择日期',
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const [year, month] = value.split('-');
      return { year: parseInt(year), month: parseInt(month) };
    }
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  });

  const selectedDate = value ? new Date(value) : null;

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handleSelectDate = (day: number) => {
    const dateStr = formatDate(viewDate.year, viewDate.month, day);
    onChange?.(dateStr);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setViewDate(prev => ({
      year: prev.month === 1 ? prev.year - 1 : prev.year,
      month: prev.month === 1 ? 12 : prev.month - 1,
    }));
  };

  const handleNextMonth = () => {
    setViewDate(prev => ({
      year: prev.month === 12 ? prev.year + 1 : prev.year,
      month: prev.month === 12 ? 1 : prev.month + 1,
    }));
  };

  const baseStyles = 'h-[26px] px-3 text-sm border border-border-color rounded-none transition-colors focus:outline-none relative';
  const disabledStyles = disabled ? 'bg-page-bg cursor-not-allowed' : 'bg-white cursor-pointer';
  const openStyles = isOpen ? 'border-primary' : '';

  const daysInMonth = getDaysInMonth(viewDate.year, viewDate.month);
  const firstDay = getFirstDayOfMonth(viewDate.year, viewDate.month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`${baseStyles} ${disabledStyles} ${openStyles}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className={value ? 'text-text-primary' : 'text-text-muted'}>
            {value || placeholder}
          </span>
          <span className="ml-2 text-text-muted">📅</span>
        </div>
      </div>

      {isOpen && !disabled && (
        <div
          className="absolute top-full left-0 z-50 mt-1 bg-white border border-border-color shadow-md p-2"
          style={{ borderRadius: 0, minWidth: '280px' }}
        >
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="w-6 h-6 flex items-center justify-center text-sm hover:bg-page-bg"
            >
              ←
            </button>
            <span className="text-sm font-medium">{viewDate.year}年{viewDate.month}月</span>
            <button
              type="button"
              onClick={handleNextMonth}
              className="w-6 h-6 flex items-center justify-center text-sm hover:bg-page-bg"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {['日', '一', '二', '三', '四', '五', '六'].map((day, i) => (
              <div key={i} className="text-xs text-text-muted py-1">{day}</div>
            ))}
            {blanks.map((_, i) => (
              <div key={`blank-${i}`} className="h-6" />
            ))}
            {days.map(day => {
              const dateStr = formatDate(viewDate.year, viewDate.month, day);
              const isSelected = dateStr === value;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDate(day)}
                  className={`h-6 text-xs hover:bg-page-bg ${
                    isSelected ? 'bg-primary text-white' : 'text-text-primary'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;