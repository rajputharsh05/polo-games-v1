// import { useState, useEffect } from 'react';
// import { Layout, Space, Image } from 'antd';
// import styles from './layout.module.scss';
// import { useOutlet, useNavigate, Navigate } from 'react-router-dom';
// import Header from '../Header/Header';
// import Style from '../Navbar/Navbar.module.scss';
// import LogoIcon from '../../assets/Svg/kpmgwhite.png';
// import Navbar from '../Navbar/Navbar';

// const { Sider, Content } = Layout;

// export const ProtectedLayout = () => {
//   const navigate = useNavigate();
//   const outlet = useOutlet();
//   const [height, setHeight] = useState('0');
//   const [collapsed, setCollapsed] = useState(false);
//   const [theme, setTheme] = useState('light');
//   const currentPath = window.location.pathname;
//   const excludePaths = [
//     '/add-entity',
//     '/settings/company/onboarding-company',
//     '/company-list',
//     '/user-role',
//     '/notification-acceptance',
//   ];

//   const pathVerify = (currentPath: any) => {
//     return excludePaths.includes(currentPath);
//   };

//   useEffect(() => {
//     setHeight(`${window.innerHeight - 150}`);
//     window.addEventListener('resize', () => {
//       setHeight(`${window.innerHeight - 150}`);
//     });
//   }, []);

//   if (!user) {
//     return <Navigate to="/auth/login" />;
//   }

//   const handleLogoNavigation = () => {
//     const roleToPageMap: { [key: string]: string } = {
//       DATA_PROVIDER: '/landing-page',
//       SUPER_ADMIN: '/super-admin-landing',
//       ADMIN: '/admin-landing',
//       DATA_REVIEWER: '/landing-page',
//       DATA_APPROVER: '/landing-page',
//     };

//     // Get the URL based on the user's email
//     const targetPage = roleToPageMap[user?.role];
//     navigate(targetPage);
//   };

//   return (
//     <div className={`App_${theme}`}>
//       <Layout
//         style={{
//           padding: ` ${pathVerify(currentPath) ? 0 : '0px 0px 0 0'} `,
//           background:
//             'linear-gradient(to bottom right, rgba(99, 235, 218, 0.1) 0%, rgba(255, 163, 218, 0.1) 27%, rgba(180, 151, 255, 0.1) 66%, rgba(172, 234, 255, 0.1) 100%)',
//           height: '100vh',
//         }}
//       >
//         {!pathVerify(currentPath) && (
//           <div className={Style.sider}>
//             <div style={{ padding: '15px 0', textAlign: 'center' }}>
//               <Image
//                 loading="lazy"
//                 src={LogoIcon}
//                 preview={false}
//                 className="menu-logo"
//                 style={{ cursor: 'pointer', width: '95%' }}
//                 onClick={handleLogoNavigation}
//               />
//             </div>
//             <Sider
//               className={styles.sider}
//               trigger={null}
//               collapsible
//               collapsed={collapsed}
//             >
//               {/* <MenuBar /> */}
//               <Navbar />
//             </Sider>
//           </div>
//         )}
//         <Layout
//           style={{
//             padding: 0,
//             background:
//               'linear-gradient(to bottom right, rgba(99, 235, 218, 0.1) 0%, rgba(255, 163, 218, 0.1) 27%, rgba(180, 151, 255, 0.1) 66%, rgba(172, 234, 255, 0.1) 100%)',
//           }}
//         >
//           {!pathVerify(currentPath) && <Header />}
//           <Space className="app-layout" direction="vertical" size="middle">
//             <Layout style={{ background: 'transparent' }}>
//               <ErrorBoundaryWrapper>
//                 <Content
//                   className={styles.content}
//                   style={{
//                     height: `${
//                       pathVerify(currentPath) ? '100vh' : `${height}px`
//                     }`,
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: `${pathVerify(currentPath) ? '100%' : '100%'}`,
//                       margin: '0px 0 0 auto ',
//                       padding: `${pathVerify(currentPath) ? '0' : '0 20px'}`,
//                     }}
//                   >
//                     {/* {!pathVerify(currentPath) && <Breadcrumb />} */}
//                     {outlet}
//                   </div>
//                 </Content>
//               </ErrorBoundaryWrapper>
//             </Layout>
//           </Space>
//         </Layout>
//       </Layout>
//     </div>
//   );
// };
