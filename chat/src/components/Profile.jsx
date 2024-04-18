import styles from '../styles/Profile.module.css'
import Profile1 from "../assets/profile1.jpg"

function Profile(){

    return(
    <div className={styles.profile__card}>
        <div className={styles.profile__card__header}>
            <div className={styles.profile__car__avatar}>
                <img src={Profile1} alt="avatar" />
            </div>
            <div className={styles.profile__card__name}>
                <h3>User</h3><hr />
                                
            </div>
        </div>
        <div className={styles.profile__card__body}>
               <p>Phone and status</p>
            <div className={styles.profile__card__info__phone__number}>
                <p>+233 232 443540</p>
            </div>
            <div className={styles.profile__card__info__status}>
                <p>Let's chat.</p>
            </div>
  
        </div>
    </div>
    )

}
export default Profile