import styles from '../styles/Profile.module.css'
import Profile1 from "../assets/profile1.jpg"
import { useSelector,useDispatch } from 'react-redux'
import { clearProfile } from '../app/features/profile/profileSlice'

function Profile(){

    const selectedProfile = useSelector((state) => state.profile.selectedProfile)
    const dispatch = useDispatch()

    if (!selectedProfile) {
        return null;
    }

    const handleClose = () => {
        dispatch(clearProfile());
      };

    return(
    <div className={styles.profile__card}>
        <div className={styles.profile__card__header}>
            <div className={styles.profile__card__avatar}>
            <img src={selectedProfile.picture} />  
            </div>
            <div className={styles.profile__card__name}>
                <h3>{selectedProfile.name}</h3><hr />
                                
            </div>
        </div>
        <div className={styles.profile__card__body}>
               <p>Phone and status</p>
            <div className={styles.profile__card__info__phone__number}>
                <p>{selectedProfile.phoneNumber}</p>
            </div>
            <div className={styles.profile__card__info__status}>
                <p>online</p>
            </div>
  
        </div>
    </div>
    )

}
export default Profile