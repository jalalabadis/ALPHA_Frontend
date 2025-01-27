import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function PageLayoutAdmin({ userData, setCurrentScreen, currentScreen, children, background }) {
  const location = useLocation(); // Hook to get the current route

  return (
    <div className="dashboard-container">
      {/* <!-- Navbar --> */}
      <header className="dashboard-nav">
        <div className="dashboard-nav-logo">Alpha Gaming</div>
        <div className="dashboard-nav-user">Admin</div>
      </header>

      {/* <!-- Sidebar and Content --> */}
      <div className="dashboard-main">
        {/* <!-- Sidebar --> */}
        <aside className="dashboard-sidebar">
          <ul className="dashboard-menu">
            <li className={`dashboard-menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className={`dashboard-menu-item ${location.pathname === '/all-user' ? 'active' : ''}`}>
              <Link to="/all-user">All User</Link>
            </li>
            <li className={`dashboard-menu-item ${location.pathname === '/block-user' ? 'active' : ''}`}>
            <Link to="/block-user">Block User</Link></li>
            <li className={`dashboard-menu-item ${location.pathname === '/monster' ? 'active' : ''}`}>
            <Link to="/monster">Monster</Link></li>
            <li className={`dashboard-menu-item ${location.pathname === '/equipment' ? 'active' : ''}`}>
            <Link to="/equipment">Equipment</Link></li>
            <li className={`dashboard-menu-item ${location.pathname === '/game-activity' ? 'active' : ''}`}>
            <Link to="/game-activity">Game Activity</Link></li>
            <li className={`dashboard-menu-item ${location.pathname === '/deposit' ? 'active' : ''}`}>
            <Link to="/deposit">Deposit</Link></li>
            <li  className={`dashboard-menu-item ${location.pathname === '/withdraw' ? 'active' : ''}`}>
            <Link to="/withdraw">Withdraw</Link></li>
            <li  className={`dashboard-menu-item ${location.pathname === '/setting' ? 'active' : ''}`}>
            <Link to="/setting">Setting</Link></li>
          </ul>
        </aside>
        {/* <!-- Main Content --> */}
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}

export default PageLayoutAdmin;
