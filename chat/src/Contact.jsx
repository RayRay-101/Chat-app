import './Contact.css'
// import Profile2 from './assets/profile2.jpg'
// import Profile3 from './assets/profile3.jpg'
// import Profile4 from './assets/profile4.jpg'
// import Profile5 from './assets/profile5.jpg'

function Contact(){

    const contacts = [
        {id: 1, name: 'Pill'},
        {id: 2, name: 'Man'},
        {id: 3, name: 'Boy'},
        {id: 4, name: 'Kid'}
    ]
    
    return(
        <div className="contacts">
            <h2>Contacts</h2>
            <ul>
                {contacts.map(contacts => (
                    <><li key={contacts.id}>{contacts.image}{contacts.name}</li><hr /></>
                    ))}
            </ul>
       
        </div>
    )

}
export default Contact