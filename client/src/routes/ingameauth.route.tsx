import { FC, lazy, memo, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const Game = lazy(() => import('./game.route'));
const MemoGame = memo(Game);

interface Props {
    inGameAuth: boolean,
};

const InGameAuth: FC<Props> = ({inGameAuth}) => {
    if (!inGameAuth)
        return <Navigate to='/' replace />

    return (
        <Suspense fallback={<div>Loading page</div>} >
            <MemoGame key={'game'} />
        </Suspense>
    )
};

export default InGameAuth;
