import React, { Component, Fragment } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { QuestionHistoire } from '../HistoireQuiz';
import Niveau from '../Niveau';
import Progression from '../progression';
import QuizOver from '../QuizOver';


toast.configure();

class Quiz extends Component {
    state = {
        levelNames: ["debutant", "intermédiaire", "expert"],
        quizlevel: 0,
        maxQuestions: 5,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnwser: null,
        score: 0,
        showWelcomeMsg: false,
        quizEnd: false
    }

    storedDataRef = React.createRef();

    loadQuestions = level => {
        const fetchedArrayQuiz = QuestionHistoire[0].quizz[level]
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            this.storedDataRef.current = fetchedArrayQuiz;

            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest);

            this.setState({
                storedQuestions: newArray
            })
        } else {

        }
    }

    showWelcomeMsg = pseudo => {
        if (!this.state.showWelcomeMsg) {
            this.setState({
                showWelcomeMsg: true
            })
            toast.warn(`${pseudo}, Bienvenue nous sommes heureux de vous compter parmi les génies!!!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            });
        }

    }
    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizlevel]);

    }
    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            //la fin de niveau
            this.gameOver();
        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1
            }))

        }
        // Augmentation du score
        const goodAnwser = this.storedDataRef.current[this.state.idQuestion].answer;
        if (this.state.userAnwser === goodAnwser) {
            this.setState(prevState => ({
                score: prevState.score + 1
            }))
            toast.success('Bravo +1', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                bodyclassName: "toastify-color",
            });
        } else {
            toast.error('Oups! raté 0', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                bodyclassName: "toastify-color",
            });

        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {

            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }
        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnwser: null,
                btnDisabled: true

            })
        }
        if (this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo)
        }

    }
    submitAnwser = selectedAnwser => {
        this.setState(({
            userAnwser: selectedAnwser,
            btnDisabled: false

        }))

    }

    gameOver = () => {
        this.setState({
            quizEnd: true
        })
    }
    render() {
        // const { pseudo } = this.props.userData;
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p key={index}
                    className={`answerOptions ${this.state.userAnwser === option ? "selected" : null}`}
                    onClick={() => this.submitAnwser(option)}
                >{option}</p>
            )
        })

        return this.state.quizEnd ? (
            <QuizOver />
        ) : (

                <Fragment>
                    <Niveau />
                    <Progression />
                    <h2>{this.state.question}</h2>
                    {displayOptions}
                    <button
                        disabled={this.state.btnDisabled}
                        className="btnSubmit"
                        onClick={this.nextQuestion}
                    >
                        Suivant
                </button>
                </Fragment>
            )

        

    }
}
export default Quiz
