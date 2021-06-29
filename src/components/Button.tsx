import { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isRed?: boolean;
    isOutlined?: boolean;
    isOutlinedRed?: boolean;
}

export function Button({ isRed, isOutlined, isOutlinedRed, ...props }: ButtonProps) {
    return (
        <button
            className={`button ${isRed ? 'red' : ''} ${isOutlined ? 'outlined' : ''} ${isOutlinedRed ? 'red-outlined' : ''}`}
            {...props}
        />
    )
}