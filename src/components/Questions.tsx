import { ReactNode } from "react"
import { useParams } from "react-router-dom";

import questionsImg from '../assets/images/empty-questions.svg';

import { useRoom } from "../hooks/useRoom";

type QuestionsProps = {
    children: ReactNode;
}

type QuestionParams = {
    id: string
}

export function Questions({ children }: QuestionsProps) {
    const params = useParams<QuestionParams>();
    const roomId = params.id;
    const { questions } = useRoom(roomId);

    return (
        <>
            {questions.length > 0 ? children : (
                <div className="no-questions">
                    <img src={questionsImg} alt="Nenhuma pergunta por aqui" />
                    <h2>Nenhuma pergunta por aqui...</h2>
                    <span>Envie o código dessa sala para amigos e comece a responder perguntas!</span>
                </div>
            )}
        </>
    )
}