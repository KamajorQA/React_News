import { useState } from 'react';
import s from './popup.module.css';

function Popup({ children }) {
  const [active, setActive] = useState(true);
  const popupClass = active ? 'popupActive' : '';

  setTimeout(() => setActive(!active), 2000);
  return (
    <section className={`${s.popup} ${s[popupClass]}`}>
      <div className={`${s.popupContent} ${s[popupClass]}`}>{children}</div>
    </section>
  );
}

export { Popup };
