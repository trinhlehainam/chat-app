import { lazy, memo, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PATH, UNSUPPORTED_PATH } from '../common/enum/path';

const Game = lazy(() => import('./game.route'));

const MemoGame = memo(Game);

const NotHomePages = () => {
    const location = useLocation();
    const path = location.pathname;

    const isUnsupportedPath = Object.values(UNSUPPORTED_PATH).includes(path as UNSUPPORTED_PATH);
    const isPathValid = Object.values(PATH).includes(path as PATH) || isUnsupportedPath;

    const isGame = Object.is(path, PATH.GAME);

    console.log('not home');

    return (
        <>
            <Suspense fallback={<div>Loading page</div>} >
                {isGame && <MemoGame key={'game'} />}
            </Suspense>
            {!isPathValid && <Navigate to='/' replace />}
        </>
    )
}

export default NotHomePages;
