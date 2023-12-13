import iconCloseAside from '../../../assets/icon-hide-sidebar.svg';

type Props = {
  closeAside: () => void;
};

export default function CloseAsideButton({ closeAside }: Props) {
  return (
    <button onClick={() => closeAside()} className="flex">
      <img src={iconCloseAside} alt="hide aside" />
      Hide Sidebar
    </button>
  );
}
