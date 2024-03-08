import './Header.css'
import WhatsappLogo from '/whatsapp.png'

function Header(){
    return(
        <div className="header-bar">
            <img src={WhatsappLogo} alt="whatsapp logo" />
        </div>
    )
}
export default Header