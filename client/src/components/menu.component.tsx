import cx from 'classnames'

import Button from '../components/button.component'
import { Link } from 'react-router-dom';
import { FC } from 'react';


interface Menu {
    text: string,
    path: string
};

interface Props {
    context: Array<Menu>
};

const Menu: FC<Props> = ({context}) => {
    return (
        <div
            className={cx(
                "flex flex-col items-center justify-center gap-6",
                "sm:gap-1 sm:[--offset-length:-770]",
            )}
        >
            {context.map(({ text, path }, idx) => {
                const enter = 1 + 0.2 * idx;
                const exit = 0.8 - 0.2 * idx;
                return (
                    <Link className='w-3/5 sm:w-full' to={path} key={`${text}-${idx}`}>
                        <Button classname="mx-auto" text={text} enter_delay={enter} exit_delay={exit} />
                    </Link>
                )
            })}
        </div>
    )
};

export default Menu;
