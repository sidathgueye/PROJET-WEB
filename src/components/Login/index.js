import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'

const Login = (props) => {
    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Vérification que le mot de passe contient minimum 6 caractères
    const [boutton, setBoutton] = useState(false);
    const [error, SetError] = useState('');

    useEffect(() => {
        if (password.length > 5 && email !== '') {
            setBoutton(true)
        } else if (boutton) {
            setBoutton(false)
        }
    }, [password, email, boutton])

    const handleSubmit = e => {
        e.preventDefault();

        firebase.loginUser(email, password)
            .then(user => {
                setEmail('');
                setPassword('');
                props.history.push('/Bienvenue');

            })
            .catch(error => {
                SetError(error);
                setEmail('');
                setPassword('');

            })

    }


    return (
        <div className="signUploginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {error !== '' && <span>{error.message}</span>}

                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>



                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={e => setPassword(e.target.value)} value={password} type="password" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            {boutton ? <button>Connexion</button> : <button disabled>Connexion</button>}



                        </form>

                        <div className="linkContainer">
                            <Link className="simpleLink" to="/Signup">Nouveau sur Génie Histoire ? Inscrivez-vous maintenant.</Link>
                            <br/>
                            <Link className="simpleLink" to="/ForgetPassword">Mot de passe oublié ? Récuperez-le ici.</Link>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Login;
