import React from 'react';
import { useRouter } from 'next/router';
import clx from 'classnames';
import { Container, Hidden } from 'Components/utility';
import { RouteDefinition } from './Layout';
import { Logo } from './Logo';
import { HamburgerButton } from './HamburgerButton';
import { MobileMenu } from './MobileMenu';

import styles from './Header.module.css';

const DesktopHeader: React.FC<HeaderProps> = ({ routes, show }) => {
  const router = useRouter();
  const currentRoute = routes.find((el) => el.pathname === router.asPath);
  return (
    <header className={clx(styles.header, { [styles.show]: show })}>
      <Logo />
      <div className={styles.currentRoute}>
        <h1>{currentRoute.label}</h1>
      </div>
    </header>
  );
};

const MobileHeader: React.FC<HeaderProps> = ({ routes, show }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();
  const currentRoute = routes.find((el) => el.pathname === router.asPath);
  return (
    <header className={clx(styles.header, { [styles.show]: show })}>
      <Container>
        <div className="flex justify-between">
          <div className="flex items-center px-4">
            <Logo />
            <div className={styles.currentRoute}>
              <h1>{currentRoute.label}</h1>
            </div>
          </div>
          <HamburgerButton
            active={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <MobileMenu show={menuOpen} setShow={setMenuOpen} routes={routes} />
        </div>
      </Container>
    </header>
  );
};

interface HeaderProps {
  routes: RouteDefinition[];
  show: boolean;
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <React.Fragment>
      <Hidden lgUp>
        <MobileHeader {...props} />
      </Hidden>
      <Hidden mdDn>
        <DesktopHeader {...props} />
      </Hidden>
    </React.Fragment>
  );
};
