import {useState} from 'react'
import { BsPlusLg } from "react-icons/bs";
import { PiTrash } from "react-icons/pi";
import { IoChevronUp } from "react-icons/io5";
import { IoChevronDownSharp } from "react-icons/io5";

const MenuItemPriceProps = ({name, titleLabel, priceLabel, addLabel, props, setProps}) => {

    const [isOpen, setIsOpen] = useState(false);

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, {name: '', price: 0}]
        });
    }

    function editProp(e, index, prop) {
        const newValue = e.target.value;
        setProps(prevProps => {
            const newProps = [...prevProps];
            newProps[index][prop] = newValue;
            return newProps;
        })
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((value, index) => index !== indexToRemove))
    }


  return (
    <div
    className='bg-gray-200 p-2 rounded-md mb-2'
    >   
    <div
    className='flex justify-between mb-1'
    >
        <div
        className='flex gap-1'
        >
            <h3 className='text-gray-700 text-base font-semibold'>{name}</h3>
            <span>({props.length})</span>
        </div>
        <div>
            <button 
            onClick={() => setIsOpen(prev => !prev)}
            className='bg-white' 
            type="button"
            >
                {isOpen ? (<IoChevronUp/>) : (<IoChevronDownSharp/>)}
            </button>
        </div>
    </div>
        <div
        className={isOpen ? 'block' : 'hidden'}
        >
            {props?.length > 0 && props.map((size, index) => (
                <div
                key={index}
                className='flex items-end gap-2'
                >
                    <div>
                        <label>{titleLabel}</label>
                        <input 
                        onChange={e => editProp(e, index, 'name')}
                        type="text" 
                        placeholder="Size name" 
                        value={size.name}
                        />
                    </div>
                    <div>
                        <label>{priceLabel}</label>
                        <input
                        onChange={e => editProp(e, index, 'price')} 
                        type="text" 
                        placeholder='Extra price' 
                        value={size.price}
                        />
                    </div>
                    <div>
                        <button 
                        onClick={() => removeProp(index)}
                        type='button' 
                        className='bg-white mb-[9px] px-2'>
                            <PiTrash className='w-6 h-6'/>
                        </button>
                    </div>
                </div>
            ))}
            <button 
            type='button'
            onClick={addProp}
            className='bg-white flex gap-1 items-center'
            >
                <BsPlusLg className='w-4 h-4'/>
                <span>{addLabel}</span>
            </button>
        </div>  
    </div>
  )
}

export default MenuItemPriceProps;