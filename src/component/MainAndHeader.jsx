import styles from "../StyleSheets/MainAndHeader.module.css"
const MainAndHeader=({children})=>{
    return <div className={styles.container}>
        {children}
    </div>
}
export default MainAndHeader;