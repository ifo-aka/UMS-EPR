import styles from '../StyleSheets/MasterContainer.module.css'
const MasterContainer = ({children}) => {
  return (
    <div className={styles.container}>
      
      {children}
    </div>
  );
};
export default MasterContainer;
