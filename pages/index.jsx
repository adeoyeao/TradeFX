import { useEffect, useState } from "react"
import styles from "../styles/layouts/index.module.scss"
 
const Index = () => {
      const [ viewHeight, setViewHeight ] = useState("100vh")

      const handleResize = () => {
            setViewHeight(`${window.innerHeight}px`)
      }

      useEffect(() => {
            handleResize()
            window.addEventListener("resize", handleResize)
            return (() => {
                  window.removeEventListener("resize", handleResize)
            })
      })

      const mainStyle = {
            height: viewHeight
      }

      return (
            <main style={mainStyle} className={styles.index}>
                  <section>
                        Login
                  </section>
            </main>
      )
}

export default Index