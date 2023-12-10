import { useAppDispatch } from '../../../store/store';
import { setOpenModal } from '../../../store/features/slice-modal';

import iconCross from '../../../assets/icon-cross.svg';

import './styles.scss';

export default function CloseModalButton() {
  const dispatch = useAppDispatch();
  function handleCloseModal() {
    dispatch(setOpenModal(''));
  }

  return (
    <button
      className="close-modal flex"
      onClick={() => handleCloseModal()}
    >
      <img src={iconCross} alt="close" />
    </button>
  );
}
