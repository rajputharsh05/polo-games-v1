import styles from "./mobileHeader.module.scss"
import img from "../../assets/MobileHeaderImg.png"


const MobileHeader = () => {
    return (
        <div className={styles.headerWrapper}>
            <img src={img}></img>
        </div>
    )
}

export default MobileHeader;