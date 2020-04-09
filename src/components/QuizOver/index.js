import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi';

const QuizOver = React.forwardRef((props, ref) => {

    const {
        levelNames,
        score,
        maxQuestions,
        quizlevel,
        percent,
        loadLevelQuestions
    } = props;

    const [asked, setAsked] = useState([]);

    useEffect(() => {
        setAsked(ref.current)
    }, [ref])

    const averageGrade = maxQuestions / 2;
    if(score < averageGrade){
        setTimeout(() => 
            loadLevelQuestions(0), 3000);
    }

    const decision = score >= averageGrade ? (
        <Fragment>
            <div className="stepsBtnContainer">
                {
                    quizlevel < levelNames.length ?
                        (
                            <Fragment>
                                <p className="successMsg">Bravo, passez au niveau suivant!</p>
                                <button
                                    className="btnResult success"
                                    onClick={() => loadLevelQuestions(quizlevel)}
                                >
                                    Niveau Suivant
                                </button>
                            </Fragment>
                        )
                        :
                        (
                            <Fragment>
                                <p className="successMsg">
                                <GiTrophyCup size='50px'/>
                                Bravo, vous êtes un Expert!
                                </p>
                                <button 
                                className="btnResult gameOver"
                                onClick={() => loadLevelQuestions(0)}
                                >
                                    Acceuil
                                </button>
                            </Fragment>
                        )
                }
            </div>

            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    )
        :
        (
            <Fragment>
                <div className="stepsBtnContainer">
                    <p className="failureMsg">Vous avez échoué !</p>
                </div>

                <div className="percentage">
                    <div className="progressPercent">Réussite: {percent}%</div>
                    <div className="progressPercent">Note: {score}/{maxQuestions}</div>
                </div>
            </Fragment>
        )

    const questionAnswer = score > averageGrade ? (
        asked.map(question => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <buton className="btnInfo">Infos</buton>
                    </td>
                </tr>

            )
        })
    )
        :
        (<tr>
            <td colSpan="3">
                <div className="loader"></div>
              <p style={{ textAlign: 'center', color: 'red' }}>
                    Pas de réponses!
                </p>
            </td>
        </tr>

        )

    return (
        <Fragment>

            {decision}

            <hr />
            <p>Les réponses aux questions posées:</p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>

                    <tbody>

                        {questionAnswer}

                    </tbody>
                </table>
            </div>
        </Fragment>
    )


})

export default React.memo(QuizOver)