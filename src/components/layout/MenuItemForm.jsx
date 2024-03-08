"use client"
import {useState, useEffect} from 'react';
import EditableImage from './EditableImage';

const MenuItemForm = ({onSubmit, menuItem}) => {
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');


  return (
    <form
        onSubmit={e => onSubmit(e , {image, name, description, basePrice})} 
        className='mt-8 max-w-md mx-auto'
        >
            <div className='flex items-start gap-4'>
                <div>
                    <EditableImage link={image} setLink={setImage}/>
                </div>
                <div className='grow'>
                    <label>Item name</label>
                    <input 
                    onChange={e => setName(e.target.value)}
                    value={name}
                    type="text"
                    />
                    <label>Description</label>
                    <input 
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    />
                    <label>Base Price</label>
                    <input
                    onChange={e => setBasePrice(e.target.value)}
                    value={basePrice}
                    type="text"
                    />
                    <button type='submit'>Save</button>
                </div>
            </div>
        </form>
  )
}

export default MenuItemForm