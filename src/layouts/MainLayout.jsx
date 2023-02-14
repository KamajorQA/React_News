import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { Logo } from '../components/Logo/Logo';
import { NavMenu } from '../components/NavMenu/NavMenu';
import { Requester } from '../components/Requester/Requester';

function MainLayout() {
  return (
    <>
      <Header>
        <Logo href={'/'} />
        <NavMenu />
        <Requester />
      </Header>
      <Outlet />
      <Footer />
    </>
  );
}

export { MainLayout };
