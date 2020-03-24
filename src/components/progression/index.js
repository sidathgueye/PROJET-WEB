import React, {Fragment} from 'react'

const Progression = () => {
    return (
        <Fragment>
        <div className="percentage">
            <div className="progressPercent">Question: 1/5</div>
            <div className="progressPercent">Progression: 20%</div>  
        </div>
        <div className="progressBar">
            <div className="progressBarChange" style={{width: '20%'}}></div>

        </div>
        </Fragment>
    )
}

export default Progression
