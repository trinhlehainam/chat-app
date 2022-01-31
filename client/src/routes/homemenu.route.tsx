import cx from 'classnames'
import Menu from '../components/menu.component';

const HomeMenu = () => {
    const homeMenu = [
        { text: 'Play', path: '/play' },
        { text: 'Login', path: '/login' },
        { text: 'Setting', path: '/setting' },
    ];

    return (
        <div
            className={cx(
                "text-3xl",
                "sm:text-5xl"
            )}
        >
            <Menu menus={homeMenu} />
        </div>
    );
};

export default HomeMenu;