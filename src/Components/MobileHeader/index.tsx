import styles from "./mobileHeader.module.scss"
import img from "../../assets/Polo_Logo_Png[1] 1.svg"


const MobileHeader = () => {
    return (
        <div className={styles.headerWrapper}>
            <img src={img}></img>
        </div>
    )
}

export default MobileHeader;