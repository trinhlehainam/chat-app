import cx from 'classnames'
import Menu from '../components/menu.component';

const PlayMenu = () => {
    const playMenu = [
        { text: 'Single', path: '/game' },
        { text: 'Multiplayer', path: '/rooms' },
        { text: 'Back', path: '/' },
    ];

    return (
        <div
            className={cx(
                "flex flex-col items-center gap-0",
                "text-3xl",
                "sm:text-5xl"
            )}
        >
            <Menu menus={playMenu} />
        </div>
    );
};

export default PlayMenu;
