import { useHistory } from 'react-router-dom';

//mport { firebase, auth, database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { setTimeout } from 'timers';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    const [noRoomExistsError, setNoRoomExistsError] = useState(false);
    const [deletedQuestionError, setDeletedQuestionError] = useState(false);

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`/rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            setNoRoomExistsError(true)

            setTimeout(() => {
                setNoRoomExistsError(false)
            }, 5000)

            return;
        }

        if (roomRef.val().closedAt) {
            setDeletedQuestionError(true)

            setTimeout(() => {
                setDeletedQuestionError(false)
            }, 5000)

            return;
        }

        if (user?.id === roomRef.val().authorId) {
            return history.push(`/admin/rooms/${roomCode}`)
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Cria sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                    {noRoomExistsError && (
                        <span className="error">Essa sala não existe!</span>
                    )}
                    {deletedQuestionError && (
                        <span className="error">Essa sala foi deletada!</span>
                    )}
                    <span className="author-info">Site desenvolvido por <a href="https://github.com/VictorOficial/Letmeask">João Victor Alcântara</a></span>
                </div>
            </main>
        </div>
    )
}