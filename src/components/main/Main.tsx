import React from 'react';

import './styles.scss';

type Props = {
  children: React.ReactNode;
};

export default function Main({ children }: Props) {
  return <div className=" main flex">{children}</div>;
}
