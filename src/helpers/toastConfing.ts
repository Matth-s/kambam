import { toast } from 'react-toastify';

type Params = {
  message: string;
  success: boolean;
};

export const toastMessage = ({ message, success }: Params) => {
  if (success) {
    return toast.success(`${message}`, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  } else {
    return toast.error(`${message}`, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
};
