import { useState } from 'react';
import { Header, Sidebar, Breadcrumb } from './components/layout';
import { PurchaseOrderList, PurchaseOrderEdit } from './pages/purchase';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Simple client-side routing
  const getCurrentPath = () => {
    const hash = window.location.hash.slice(1) || '/';
    return hash;
  };

  const renderContent = () => {
    const path = getCurrentPath();
    if (path.startsWith('/purchase/order/edit')) {
      return <PurchaseOrderEdit />;
    }
    return <PurchaseOrderList />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-page-bg">
      {/* Header - Fixed height 40px */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar - 172px width */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;