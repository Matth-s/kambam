import { useState } from 'react';

import iconChevron from '../../../assets/icon-chevron-down.svg';

import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TasksEntity } from '../../../types/board-schema';

import './styles.scss';

type Props = {
  statusChoice: string[];
  setValue: UseFormSetValue<TasksEntity>;
  status: string;
  currentChoice: string;
};

export default function Status({
  statusChoice,
  setValue,
  status,
  currentChoice,
}: Props) {
  const [openChoice, setOpenChoice] = useState<boolean>(false);

  function handleChangeStatus(status: string) {
    setValue('status', status);
    setOpenChoice(false);
  }

  return (
    <div className="status-container">
      <p className="heading-m">{status}</p>
      <div
        onClick={() => setOpenChoice((prev) => !prev)}
        className="input-div"
      >
        <p className="current-status">{currentChoice}</p>
        <img
          className={`${openChoice ? 'rotate' : ''}`}
          src={iconChevron}
          alt="menu"
        />
      </div>

      {openChoice && (
        <div className={`choice-menu ${openChoice ? 'show' : ''}`}>
          {statusChoice.map((item) => (
            <button
              type="button"
              onClick={() => handleChangeStatus(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
