import styles from "../styles/components/form.module.scss"
import OAuth from "./OAuth"
import  {useState } from "react"
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

const LoginForm = (props) => {
      const [ login, setLogin ] = useState(true)

      const handleClick = () => {
            setLogin(!login)
      }

      return (
            <form className={styles.form}>
                  <h1>Welcome</h1>
                  <div className={styles.oauthbtns}>
                        <OAuth 
                        type="facebook"
                        icon={<FacebookIcon />}/>
                        <OAuth 
                        type="linkedin"
                        icon={<LinkedInIcon />}/>
                        <OAuth 
                        type="google"/>
                  </div>
                  <p>or use your email account</p>
                  <input 
                  type="text" 
                  autoComplete="off"
                  autoCapitalize="off"
                  placeholder="Email Address"/>
                  <input type="password" 
                  autoComplete="off"
                  autoCapitalize="off"
                  placeholder="Password"/>
                  <p onClick={handleClick}>Not Registered? <span>Create Account</span></p>
                  <button className={styles.loginbtn}>Sign In</button>
            </form>
      )
}

export default LoginForm