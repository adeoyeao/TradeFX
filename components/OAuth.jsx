import styles from "../styles/components/oauth.module.scss"

const OAuth = (props) => {
      return (
            <button className={styles.oauth}>
                  {props.icon}
            </button>
      )
}

export default OAuth