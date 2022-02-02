import cx from 'classnames'
import { useIsPresent } from 'framer-motion';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import { PATH } from '../common/enum/path';

import GlobalContext from '../contexts/global.context';

import Menu from '../components/menu.component';

const PlayMenu = () => {
    const playMenu = [
        { text: 'Single', path: PATH.GAME },
        { text: 'Multiplayer', path: PATH.ROOMS },
        { text: 'Back', path: PATH.ROOT },
    ];

    const { setInGameAuth } = useContext(GlobalContext);
    const isPresent = useIsPresent();
    const isGame = useMatch(PATH.GAME);

    const navigate = useNavigate();
    useLayoutEffect(() => {
        if (!isGame) return;
        if (isPresent) return;

        setInGameAuth && setInGameAuth(true);

        console.log('play');

    }, [isPresent, isGame, setInGameAuth, navigate])

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
