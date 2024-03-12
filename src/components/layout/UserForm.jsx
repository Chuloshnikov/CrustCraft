"use client"
import { useState } from 'react';
import EditableImage from "./EditableImage";

const UserForm = ({user, onSave}) => {
    const [userName, setUserName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    console.log(user)

  return (
    <form 
    onSubmit={e => onSave(e, {name: userName, image, phone, streetAddress, postalCode, city, country})}
    className="max-w-xl mx-auto"
    >
        <div
        className="flex gap-4"
        >
            <div
            className="p-2 rounded-lg relative"
            >
            <EditableImage link={image} setLink={setImage}/>
            </div>
            <div
            className="grow"
            >
                <label>First and last name</label>
                <input 
                onChange={e => setUserName(e.target.value)}
                type="text" 
                placeholder="First and last name" 
                value={userName} 
                />
                <label>Email</label>
                <input 
                type="email" 
                disabled={true} 
                value={email}
                />
                <label>Phone number</label>
                <input 
                onChange={e => setPhone(e.target.value)}
                type="tel" 
                placeholder="Phone number"
                value={phone}
                />
                <label>Street Address</label>
                <input 
                onChange={e => setStreetAddress(e.target.value)}
                type="text"
                placeholder="Street address"
                value={streetAddress}
                />
                <div
                className="flex gap-2"
                >
                    <div className="w-full">
                        <label>Postal code</label>
                        <input 
                        onChange={e => setPostalCode(e.target.value)}
                        type="text"
                        placeholder="Postal code"
                        value={postalCode}
                        />
                    </div>
                <div className="w-full">
                        <label>City</label>
                        <input 
                        onChange={e => setCity(e.target.value)}
                        type="text"
                        placeholder="City"
                        value={city}
                        />
                </div>
                </div>
                <label>Country</label>
                <input 
                onChange={e => setCountry(e.target.value)}
                type="text"
                placeholder="Country"
                value={country}
                />
                <button type="submit">Save</button>
            </div>
        </div>
</form>
  )
}


export default UserForm;