import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './main.module.css';

function Main({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const haveToken = localStorage.getItem('userToken');
    setIsAuthenticated(!!haveToken);
  });

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated]);

  return <main className={s.container}>{children}</main>;
}

export { Main };
