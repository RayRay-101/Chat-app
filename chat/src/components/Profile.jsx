import '../styles/Profile.module.css'
import Profile1 from "../assets/profile1.jpg"

function Profile(){

    return(
    <div className="profile-card">
        <div className="profile-card-header">
            <div className="profile-card-avatar">
                <img src={Profile1} alt="avatar" />
            </div>
            <div className="profile-card-name">
                <h3>User</h3><hr />
                                
            </div>
        </div>
        <div className="profile-card-body">
               <p>Phone and status</p>
            <div className="profile-card-info-phone-number">
                <p>+233 232 443540</p>
            </div>
            <div className="profile-card-info-status">
                <p>Let's chat.</p>
            </div>
  
        </div>
    </div>
    )

}
export default Profile