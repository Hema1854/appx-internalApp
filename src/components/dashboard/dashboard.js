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
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { SubMenuInfoAction } from '../../Redux/Action/SubMenuInfoAction';
import Footer from '../Footer/Footer';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const loginInfo = useSelector((state) => state.LoginInfoReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const menuItems = [
    { name: 'Personal Information', icon: personalinfowhite, subMenu: ['Employee Details', 'Personal Details', 'Qualification', 'Bank Details'] },
    { name: 'Medical Declaration', icon: meddecwhite },
    { name: 'Travel Declaration', icon: travdecwhite },
    { name: 'Holidays 2024', icon: calwhite },
    { name: 'Gallery', icon: gallerywhite },
  ];

  const handleNavigation = (path, subMenu) => {
    navigate(`${path}`);
    dispatch(SubMenuInfoAction(subMenu));
  };


  const handlePeronalInfoSubSection = () => {
   setIsPersonalInfoOpen(true);
   setSelectedMenu('');
  }

  const handleClosePersonalInfoSubSection = () => {
    setIsPersonalInfoOpen((prev) => setIsPersonalInfoOpen(!prev) );
  }
   

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
                  className={`dashboard-left-menu-item ${selectedMenu === item.name ? 'selected' : ''} ${item.name === 'Personal Information' && isPersonalInfoOpen ? 'open' : ''}`}
                  onClick={() => {
                    if (item.name === 'Personal Information') {
                     handlePeronalInfoSubSection();
                    } else {
                      setSelectedMenu(item.name);
                      setIsPersonalInfoOpen(false);
                    }
                  }}
                  onMouseEnter={() => {
                    if (isSidebarCollapsed && item.name === 'Personal Information') {
                      setIsPersonalInfoOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isSidebarCollapsed && item.name === 'Personal Information') {
                      setIsPersonalInfoOpen(false);
                    }
                  }}
                >
                  <NavLink to={`${item.name.toLowerCase().replace(' ', '-')}`} end>
                    <img src={item.icon} alt={item.name} />
                    {!isSidebarCollapsed && <span>{item.name}</span>}
                    {item.name === 'Personal Information' && !isSidebarCollapsed && (
                      <span className="submenu-arrow" onClick={handleClosePersonalInfoSubSection}>
                        {isPersonalInfoOpen ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    )}
                  </NavLink>
                  {item.name === 'Personal Information' && isPersonalInfoOpen && (
                    <ul className={`dashboard-left-submenu ${isSidebarCollapsed ? 'popup' : ''}`}>
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex} onClick={() => handleNavigation('personal-information', subItem)}>
                          {subItem}
                        </li>
                      ))}
                    </ul>
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
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
