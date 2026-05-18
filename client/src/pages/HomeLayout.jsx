import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import SubMenu from '../components/SubMenu';
import Footer from '../components/footer';
import ScrollToTop from '../components/ScrollToTop';
const Home = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Sidebar />
      <SubMenu />
      <Footer />
    </>
  );
};

export default Home;
