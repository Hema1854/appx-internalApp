import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DefaultDashboard from '../default-dashoard/default-dashboard';
import PersonalDetails from '../personal-details/personal-details';
import './dashboard.css';
import { NavLink } from 'react-router-dom';
import backwardWhite from '../images/Backward.png';
import ExpandWhite from '../images/Expand White.png';
import personalinfowhite from '../images/Personal Info White.png';
import meddecwhite from '../images/Med Dec White.png';
import travdecwhite from '../images/Trav Dec White.png';
import calwhite from '../images/Cal White.png';
import gallerywhite from '../images/Gallery White.png';


const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [selectedMenu, setSelectedMenu] = useState('');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const menuItems = [
    { name: 'Personal Information', icon: personalinfowhite },
    { name: 'Medical Declaration', icon: meddecwhite },
    { name: 'Travel Declaration', icon: travdecwhite },
    { name: 'Holidays 2024', icon: calwhite },
    { name: 'Gallery', icon: gallerywhite },
  ];
  return (
    <div className="dashboard-container">
      <div className={`dashboard ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar">
          <div className='d-flex'
            style={{
              flexDirection: isSidebarCollapsed ? 'column' : 'row',
            }}>
            <button className="toggle-button" onClick={toggleSidebar}>
              {isSidebarCollapsed ?

                <img src={ExpandWhite} alt="Toggle Sidebar" /> : null
              }
            </button>

            <div className="profile" >
              <div className="profile-pic"></div>
              <div className="profile-name">Name</div>
            </div>
            <button className="toggle-button" onClick={toggleSidebar}>
              {!isSidebarCollapsed ?

                <img src={backwardWhite} alt="Toggle Sidebar" /> : null
              }
            </button>
          </div>
          <nav>

            <ul className="dashboard-left-menu">
            {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`dashboard-left-menu-item ${selectedMenu === item.name ? 'selected' : ''}`}
                  onClick={() => setSelectedMenu(item.name)}
                >
                  <NavLink to={item.name.toLowerCase().replace(' ', '-')} activeClassName="active-link">
                    <img src={item.icon} alt={item.name} />
                    {!isSidebarCollapsed && <span>{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<DefaultDashboard />} />
          <Route path="personal-information" element={<PersonalDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;