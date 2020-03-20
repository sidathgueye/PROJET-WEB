import React  from 'react'
import {Link} from 'react-router-dom'

const Accueil = () => {

   
    

    return (
       <main  className="welcomePage">
           <div className="leftBox">
               <Link className="btn-welcome" to="/signup">Inscription</Link>
           </div>
           <div className="rightBox">
               <Link className="btn-welcome" to="/login">Connexion</Link>
           </div>

       </main>
    )
}

export default Accueil
