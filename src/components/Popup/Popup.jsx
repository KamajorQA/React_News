import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './popup.module.css';

function Popup({ children, popupActive, setPopupActive, closable = false }) {
  const popupClass = popupActive ? 'popupActive' : 'inactive';

  const deactivatePopup = (e) => {
    if (closable) {
      setPopupActive(false);
    }
  };

  return (
    <section
      className={`${s.popup} ${s[popupClass]}`}
      onClick={deactivatePopup}
      tabIndex="0"
      onKeyUp={(e) => {
        if (e.key === 'Escape') {
          deactivatePopup();
        }
      }}
    >
      <div
        className={`${s.popupContent} ${s[popupClass]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {closable && (
          <FontAwesomeIcon
            icon={faXmark}
            title="Закрыть"
            className={s.close}
            onClick={deactivatePopup}
          />
        )}
        {children}
      </div>
    </section>
  );
}

export { Popup };
