// import ContactList from '@/components/ContactList';
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { RxCross2 } from "react-icons/rx";

interface Contact {
  name: string;
  email: string;
  imageUrl: string;
}
const contacts: Contact[] = [
  {
    name: 'Zep Orange Guaua',
    email: 'n.Orange@gmail.com',
    imageUrl: '/2.png',
  },
  {
    name: 'Zep Guaua Orange',
    email: 'n.Guaua@gmail.com',
    imageUrl: '/1.png',
  },
  {
    name: 'Zep Banana Bokkish',
    email: 'n.Banana@gmail.com',
    imageUrl: '/3.png',
  },
  {
    name: 'Mac Bokkis Banana',
    email: 'n.Bokkishing@gmail.com',
    imageUrl: '/4.png',
  },
  {
    name: 'Mac Foxing Fireing',
    email: 'n.Foxing@gmail.com',
    imageUrl: '/5.png',
  },
  {
    name: 'Mac Fireing Foxing',
    email: 'n.Fireing@gmail.com',
    imageUrl: '/6.png',
  },
  {
    name: 'Rax Gamsing Mac',
    email: 'n.Gamsing@gmail.com',
    imageUrl: '/8.png',
  },
  {
    name: 'Shinnosuke Shin chi',
    email: 'n.Shinnosuke@gmail.com',
    imageUrl: '/14.png',
  },

];

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showList, setShowList] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleContactSelect = (contactName: string) => {
    setSelectedItems([...selectedItems, contactName]);
    setInputValue(''); // Clear the input value after selecting a contact
    setShowList(false);
  };

  const handleChipRemove = (item: string) => {
    const updatedItems = selectedItems.filter((selectedItem) => selectedItem !== item);
    setSelectedItems(updatedItems);
    setShowList(false);
  };

  const handleBackspace = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '') {
      const lastItem = selectedItems[selectedItems.length - 1];
      if (lastItem) {
        handleChipRemove(lastItem);
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedItems]);

  const renderContactSuggestions = () => {
    const inputRect = inputRef.current?.getBoundingClientRect();

    const suggestionsStyle: React.CSSProperties = {
      position: 'absolute',
      top: inputRect ? inputRect.bottom + window.scrollY : 0,
      left: inputRect ? inputRect.left + window.scrollX : 0,
      zIndex: 10,
      background: 'white',
      border: '0px solid #ccc',
      borderRadius: '5px',
      margin: "3px",
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };

    const matchingContacts = contacts.filter(
      (contact) => !selectedItems.includes(contact.name) && contact.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    const dynamicHeight = Math.min(matchingContacts.length * 60, 300);
    return (
      <ul style={{ ...suggestionsStyle, height: `${dynamicHeight}px` }} className='overflow-y-auto'>
        {matchingContacts.map((contact) => (
          <li key={contact.name} className="p-2 cursor-pointer rounded-[5px] hover:bg-slate-300" onClick={() => handleItemSelect(contact.name)}>
            <div className="flex items-center justify-between gap-2">
              <img className="object-cover w-10 h-10 mr-4 rounded-full" src={contact.imageUrl} alt={contact.name} />
              <div className="w-full font-bold text-left">{contact.name}</div>
              <div className='flex flex-row justify-center w-full text-left'>
                <div className="w-full text-sm text-left">{contact.email}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };




  const handleItemSelect = (item: string) => {
    setSelectedItems([...selectedItems, item]);
    setInputValue('');
    setShowList(false);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className='text-4xl font-bold text-blue-500'>Pick Users</div>
      <div className={`relative w-9/12 mt-10 flex flex-wrap border-b-2 items-center ${showList ? 'border-blue-500' : 'border-gray-300'}`}>
        {selectedItems.map((item) => {
          const selectedContact = contacts.find((contact) => contact.name === item);

          if (selectedContact) {
            return (
              <div key={item} className="flex items-center m-1 bg-gray-200 rounded-full">
                <img className="object-cover w-8 h-8 mr-2 rounded-full" src={selectedContact.imageUrl} alt={selectedContact.name} />
                <div className="flex flex-row items-center">
                  <span className="mr-2">{selectedContact.name}</span>
                </div>
                <button onClick={() => handleChipRemove(item)} className='mr-2 font-bold'><RxCross2 /></button>
              </div>
            );
          }

          return null;
        })}
        <input
          type="text"
          className={`p-2 outline-none focus:border-blue-500 ${showList ? 'border-blue-500' : 'border-gray-300'}`}
          value={inputValue}
          onFocus={() => setShowList(true)}
          // onBlur={() => setShowList(false)}
          placeholder='Add a user..'
          onChange={handleInputChange}
          onKeyDown={handleBackspace}
          ref={inputRef}
        />
      </div>
      {showList && renderContactSuggestions()}
    </div>
  );
};



export default Home;
