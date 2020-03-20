import React from 'react'
import attention from "../../images/attention.png"


const centerH2 ={
    textAlign: 'center',
    marginTop: '50px'
}

const centerImg ={
    display: "block",
    margin: "40px auto"

}

const ErrorPage = () => {
    return (
        <div className="quiz-bg">
            <div className="container">
             <h2 style={centerH2}> Aie, il me semble qu'il est une erruer revoyez votre requette SVP!!</h2>
             <img style={centerImg}src={attention} alt="Error page" ></img>
            </div>
        </div>
    )
}

export default ErrorPage
