import { useState } from "react";

import { Button } from "./Button";

import deleteImg from "../assets/images/delete.svg";

type ConfirmModalProps = {
    title: string;
    description: string;
    button: string;
}

export function ConfirmModal({ title, description, button, ...props }: ConfirmModalProps) {
    const [isModalActive, setIsmodalActive] = useState(true)

    return (
        <div className={`modal ${isModalActive && 'active'}`}>
            <div className="content">
                <img src={deleteImg} alt={title} />
                <h1>{title}</h1>
                <p>{description}</p>
                <div>
                    <Button isOutlined onClick={() => setIsmodalActive(false)}>Cancelar</Button>
                    <Button isRed {...props}></Button>
                </div>
            </div>
        </div>
    )
}