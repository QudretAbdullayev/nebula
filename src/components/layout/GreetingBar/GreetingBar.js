import styles from "./GreetingBar.module.scss";

const GreetingBar = () => {
  return (
    <div className="g-container">
      <div className={styles.greeting}>
        <h1 className={styles.greeting__title}>Have a good day!</h1>

        <div className={styles.evaluation}>
          <div className={styles.evaluation__info}>
            <span className={styles.evaluation__info__title}>Next Evaluation Form</span>

            <div className={styles.evaluation__info__progress}>
              <div className={styles.evaluation__info__progress__bar}></div>
            </div>
          </div>

          <p className={styles.evaluation__time}>5 days left</p>
        </div>
      </div>
    </div>
  );
};

export default GreetingBar;
