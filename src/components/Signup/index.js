import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {FirebaseContext} from '../Firebase'

const Signup = (props) => {
     
    const firebase = useContext(FirebaseContext); 

    const data = {
        pseudo : '',
        email: '',
        password:'',
        confirmPassword: '',
    }

    const[donnéesConnexion, setdonnéesConnexion]= useState(data);

    const [error, setError] = useState('')

    const handleChange = e =>{
        setdonnéesConnexion({...donnéesConnexion, [e.target.id]: e.target.value })

    }
    const handleSubmit = e =>{
        e.preventDefault();
        const { email, password } =donnéesConnexion;
        firebase.signupUser(email,password)
        .then(authUser =>{
            return firebase.user(authUser.user.uid).set({
                pseudo,
                email
            })
        })
        .then(()=>{
            setdonnéesConnexion({...data});
            props.history.push('/Bienvenue');
        })
        .catch(error =>{
            setError(error);
            setdonnéesConnexion({...data});

        })
    }

    const { pseudo, email, password, confirmPassword } =donnéesConnexion;

   const boutton = pseudo ==='' || email ===''|| password ==='' || password !== confirmPassword
    ?<button disabled>Inscription</button> : <button>Inscription</button>

     //gestion d'erreurs
    const errorMsg = error !==''&& <span>{error.message}</span>
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                    {errorMsg}
                        <h2> Inscription</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange ={handleChange} value = {pseudo} type="text" id="pseudo" required />
                                <label htmlFor="pseudo">Identifiant</label>
                            </div>

                            <div className="inputBox">
                                <input onChange ={handleChange} value = {email} type="email" id="email" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange ={handleChange} value = {password} type="password" id="password" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input onChange ={handleChange} value = {confirmPassword} type="password" id="confirmPassword" required />
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>
                            {boutton}
                        </form>

                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit? Connectez vous.</Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Signup;
