/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {Outlet} from 'react-router-dom'

import {t} from 'i18next'
import Sidebar from './sidebar'
import TopNav from './top-nav'
import Footer from './footer'

const MainLayout = () => {
  return (
    <div className='wrapper' style={{minHeight: '100vh'}}>
      <Sidebar />
      <div className='main'>
        <TopNav />
        <main className='content'>
          <div className='container-fluid p-0'>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
