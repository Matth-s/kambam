import iconShowSideBar from '../../../assets/icon-show-sidebar.svg';

import './styles.scss';

type Props = {
  openAside: () => void;
};

export default function OpenAsideButton({ openAside }: Props) {
  return (
    <button className="open-aside-button" onClick={() => openAside()}>
      <img src={iconShowSideBar} alt="open" />
    </button>
  );
}
