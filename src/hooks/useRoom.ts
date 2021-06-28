import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');
    const [isUserAdmin, setIsUserAdmin] = useState<boolean>();
    const [roomExists, setRoomExists] = useState<boolean>();

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val()

            if (room.exists()) {
                setRoomExists(true)
            } else {
                return setRoomExists(false)
            }

            if (user?.id === databaseRoom.authorId) {
                setIsUserAdmin(true)
            } else {
                return setIsUserAdmin(false)
            }

            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, value]) => value.authorId === user?.id)?.[0]
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)

            return () => {
                roomRef.off('value');
            }
        })
    }, [roomId, user?.id])

    return { title, questions, isUserAdmin, roomExists }
}