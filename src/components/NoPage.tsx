import { ReactNode } from "react"

import '../styles/room.scss';

type NoPageProps = {
    children: ReactNode;
    roomId: string;
}

export function NoPage({ children, roomId }: NoPageProps) {
    return (
        <>
            <div className="no-page">
                <h2>{children}</h2>
            </div>
        </>
    )
}