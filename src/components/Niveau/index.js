import React, {useEffect, useState} from 'react'
import Stepper from 'react-stepper-horizontal'


const Niveau = ({levelNames, quizlevel}) => {

  const [Niveaux, setNiveaux] = useState([]);

    useEffect(() => {
        const quizSteps = levelNames.map(niveau => ({title: niveau.toUpperCase()}));
        setNiveaux(quizSteps);
    },[levelNames]);

    return (
        <div className="levelsContainer" style={{background: 'transparent'}}>
         
                <Stepper 
                steps={ Niveaux } 
                activeStep={ quizlevel }
                circleTop={0} 
                activeTitleColor={'#d31017'}
                activeColor={'#d31017'}
                completeTitleColor={'#E0E0E0'}
                defaultTitleColor={'#E0E0E0'}
                completeColor={'#E0E0E0'}
                completeBarColor={'#E0E0E0'}
                barstyle={'dashed'}
                    />
    
        </div>
    )
}

export default React.memo(Niveau)
