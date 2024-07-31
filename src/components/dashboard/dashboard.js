import React, { useState } from 'react';
import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom';
import DefaultDashboard from '../default-dashoard/default-dashboard';
import PersonalDetails from '../personal-details/personal-details';
import './dashboard.css';
import backwardWhite from '../images/Backward.png';
import ExpandWhite from '../images/Expand White.png';
import personalinfowhite from '../images/Personal Info White.png';
import meddecwhite from '../images/Med Dec White.png';
import travdecwhite from '../images/Trav Dec White.png';
import calwhite from '../images/Cal White.png';
import gallerywhite from '../images/Gallery White.png';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';
import { SubMenuInfoAction } from '../../Redux/Action/SubMenuInfoAction';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const loginInfo = useSelector((state) => state.LoginInfoReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleNavigation = (path, subMenu) => {
    navigate(`${path}`);
    // setSelectedMenu(path);
    dispatch(SubMenuInfoAction(subMenu));
  };

  return (
    <div className="dashboard-container">
      <div className={`dashboard ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar">
          <div className="d-flex" style={{ flexDirection: isSidebarCollapsed ? 'column' : 'row' }}>
            <button className="toggle-button" onClick={toggleSidebar}>
              {isSidebarCollapsed ? <img src={ExpandWhite} alt="Toggle Sidebar" /> : null}
            </button>

            <div className="profile">
              <div className="profile-pic"></div>
              <div className="profile-name">{loginInfo.userName.split(' ')[0]}</div>
            </div>

            <button className="toggle-button" onClick={toggleSidebar}>
              {!isSidebarCollapsed ? <img src={backwardWhite} alt="Toggle Sidebar" /> : null}
            </button>
          </div>

          <nav>
            <ul className="dashboard-left-menu">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`${item.name !== 'Personal Information' ? 'dashboard-left-menu-item' : 'dashboard-left-menu-dropdown'} ${(selectedMenu === item.name && item.name !== 'Personal Information') ? 'selected' : ''}`}
                  style={item.name === 'Personal Information' ? { padding: '8px 0px' } : {}}
                  onClick={() => setSelectedMenu(item.name)}
                >
                  {item.name !== 'Personal Information' ? (
                    <NavLink to={`${item.name.toLowerCase().replace(' ', '-')}`} end>
                      <img src={item.icon} alt={item.name} />
                      {!isSidebarCollapsed && <span>{item.name}</span>}
                    </NavLink>
                  ) : (
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header onClick={() => handleNavigation('personal-information', 'Employee Details')}>
                          <img src={item.icon} alt={item.name} />
                          {!isSidebarCollapsed && <span>{item.name}</span>}
                        </Accordion.Header>
                        <Accordion.Body>
                          <ul className='dashboard-left-menu'>
                            <li onClick={() => handleNavigation('personal-information', 'Employee Details')}>Employee Details</li>
                            <li onClick={() => handleNavigation('personal-information', 'Personal Details')}>Personal Details</li>
                            <li onClick={() => handleNavigation('personal-information', 'Qualification')}>Qualification</li>
                            <li onClick={() => handleNavigation('personal-information', 'Bank Details')}>Bank Details</li>
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )}
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
};

export default Dashboard;