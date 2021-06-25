import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);

        document.getElementsByClassName('room-code')[0].classList.add("active");

        setTimeout(() => {
            document.getElementsByClassName('room-code')[0].classList.remove("active");
        }, 1300);
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copiar código da sala" />
            </div>
            <span>Sala #{props.code}</span>
            <span className='copy'>Código copiado!</span>
        </button>
    )
}