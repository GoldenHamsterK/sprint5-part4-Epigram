import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './layout.module.scss';

const cx = classNames.bind(styles);

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => <div className={cx('layout')}>{children}</div>;

export default Layout;
