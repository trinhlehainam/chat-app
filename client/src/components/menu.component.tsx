import cx from 'classnames'

import Button from '../components/button.component'
import { FC } from 'react';


interface Menu {
    text: string,
    path: string
};

interface Props {
    menus: Array<Menu>
};

const Menu: FC<Props> = ({ menus }) => {
    return (
        <div
            className={cx(
                "flex flex-col items-center justify-center gap-6",
                "sm:gap-1 sm:[--offset-length:-770]",
            )}
        >
            {menus.map(({ text, path }, idx) => {
                const enter = 1 + 0.2 * idx;
                const exit = 0.8 - 0.2 * idx;
                return (
                    <Button
                        key={`${text}-${idx}`}
                        classname="w-3/5 sm:w-full mx-auto cursor-pointer"
                        text={text} enter_delay={enter} exit_delay={exit} path={path}
                    />
                )
            })}
        </div>
    )
};

export default Menu;
