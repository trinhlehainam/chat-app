import cx from 'classnames'
import { useMatch } from 'react-router-dom';
import { HOME_PATH } from '../common/enum/path';

import Menu from '../components/menu.component';
import UnsupportedPrompt from '../components/unsupportedprompt.component';

const HomeMenu = () => {
    const homeMenu = [
        { text: 'Play', path: HOME_PATH.PLAY_MEMU },
        { text: 'Login', path: HOME_PATH.LOGIN },
        { text: 'Setting', path: HOME_PATH.SETTING },
    ];

    const isLogin = useMatch(HOME_PATH.LOGIN);
    const isSetting = useMatch(HOME_PATH.SETTING);

    const isUnsupported = isLogin || isSetting

    return (
        <div
            className={cx(
                "relative flex justify-center items-center",
                "text-3xl",
                "sm:text-5xl"
            )}
        >
            <Menu menus={homeMenu} />
            {isUnsupported && <UnsupportedPrompt path={HOME_PATH.ROOT} message='NOT SUPPORTED YET'/>}
        </div>
    );
};

export default HomeMenu;
