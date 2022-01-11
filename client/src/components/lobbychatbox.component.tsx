import cx from 'classnames'

const LobbyChatBox = () => {
    return (
        <div
            className={cx(
                'flex flex-col-reverse justify-start',
                'absolute bottom-0 left-0 w-1/3 h-full text-yellow-custom',
            )}
        >
            <input
                type='text'
                className='peer outline-none border-2 border-yellow-custom bg-gray-700/90 w-full text-lg px-2'
            />
            <div
                className={cx(
                    'bottom-0 left-0 border-2 border-yellow-custom z-10',
                    'bg-gray-700/90',
                    'w-full h-0 opacity-0',
                    'peer-focus:h-[400px] peer-focus:opacity-100',
                    'transition-all ease-linear duration-[0.2s]',
                    'overflow-auto scrollbar-hide'
                )}
            >
            </div>
        </div>
    )
};

export default LobbyChatBox;
