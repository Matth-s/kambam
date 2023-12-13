import { useTheme } from '../../hook/useTheme';

import iconLight from '../../assets/icon-light-theme.svg';
import iconDark from '../../assets/icon-dark-theme.svg';

import './styles.scss';

export default function Theme() {
  const { theme, switchTheme } = useTheme();

  return (
    <div className="theme-container flex flex__alignCenter">
      <button onClick={() => switchTheme(theme)}>
        <img src={iconLight} alt="light theme" />
      </button>

      <div
        className="status-theme"
        onClick={() => switchTheme(theme)}
      >
        <span
          className={`${theme === 'light' ? 'left' : 'right'}`}
        ></span>
      </div>

      <button onClick={() => switchTheme(theme)}>
        <img src={iconDark} alt="dark theme" />
      </button>
    </div>
  );
}
