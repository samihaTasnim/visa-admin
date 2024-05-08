import { useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import { FadeLoader } from 'react-spinners';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const HOST_URL = process.env.REACT_APP_HOST_URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

function App() {

  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState({})
  const [modalIsOpen, setIsOpen] = useState(false);

  const regexPhone = /^(?:\+?88)?01[13-9]\d{8}$/

  const handlePhone = () => {
    if (regexPhone.test(88 + phone)) {
      setLoading(true)
      fetch(`${BACKEND_URL}/?action=search&number=${phone}`)
      .then(res => res.json())
        .then((res) => {
          setInfo(res)
          setLoading(false)
          console.log(info);
          setIsOpen(true)
        })
        .catch(e => {
          setLoading(false)
          e.response && alert(e.response.data.message)
        })
        .finally(() => setLoading(false))
    }
    else {
      alert("Enter correct phone number")
      // alert("Our Agents will call you to confirm your visa.")
    }
  }
  
  return (
    showInfo && !loading ? 
    <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
      <section className="bg-white">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Student Information</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl"> কোন কিছু পরিবর্তন এর প্রয়োজন হলে কল করো </p>
          <div action="#" className="space-y-8">
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                <label for="text" className="block mb-2 text-sm font-medium">Student Name</label>
                  <p className="shadow-sm bg-gray-300  text-sm rounded-lg block w-full p-2.5 text-gray-800 shadow-sm-light" > {info.Name}</p>
                </div>
                <div>
                <label for="text" className="block mb-2 text-sm font-medium">Student Gender</label>
                  <p className="shadow-sm bg-gray-300 border  text-sm rounded-lg block w-full p-2.5 text-gray-800 shadow-sm-light" text="name@flowbite.com">{info.Gender}</p>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                <label for="text" className="block mb-2 text-sm font-medium">Jersey</label>
                  <p className="shadow-sm bg-gray-300 border  text-sm rounded-lg block w-full p-2.5 text-gray-800 shadow-sm-light" text="name@flowbite.com">{info.Jersey}</p>
                </div>
                <div>
                <label for="text" className="block mb-2 text-sm font-medium">Your text</label>
                  <p className="shadow-sm bg-gray-300 border  text-sm rounded-lg block w-full p-2.5 text-gray-800 shadow-sm-light" text="name@flowbite.com"></p>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                <label for="text" className="block mb-2 text-sm font-medium">Your text</label>
                  <p className="shadow-sm bg-gray-300 border  text-sm rounded-lg block w-full p-2.5 text-gray-400 shadow-sm-light" text="name@flowbite.com"></p>
                </div>
                <div>
                <label for="text" className="block mb-2 text-sm font-medium">Your text</label>
                  <p  id="text" className="shadow-sm bg-gray-300 border  text-sm rounded-lg block w-full p-2.5 text-gray-400 shadow-sm-light" text="name@flowbite.com"></p>
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                <label for="text" className="block mb-2 text-sm font-medium">Your text</label>
                  <p  id="text" className="shadow-sm bg-gray-300 border  text-sm rounded-lg block w-full p-2.5 text-gray-400 shadow-sm-light" text="name@flowbite.com"></p>
                </div>
                <div>
                <label for="text" className="block mb-2 text-sm font-medium">Your text</label>
                  <p  id="text" className="shadow-sm bg-gray-300 border  text-sm rounded-lg block w-full p-2.5 text-gray-400 shadow-sm-light" text="name@flowbite.com"></p>
                </div>
              </div>
              <button type="submit" className="py-3 px-5 text-sm font-medium text-center rounded-lg bg-green-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800" >Accept</button>
              <button type="submit" className="py-3 px-5 text-sm font-medium text-center rounded-lg bg-red-600 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Reject</button>
          </div>
      </div>
    </section>
    </Modal>  : 
      <div className='p-12 md:p-24'>
         {loading && (
        <div
        className='grid place-content-center'
          style={{
            position: 'fixed',
            top: '0',
            left: '0',  
            width: '100%', // Set a specific width
            height: '100%', 
           // Center precisely
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
            zIndex: 9999, // Ensure the overlay is above other content
            backdropFilter: 'blur(5px)' // Apply blur effect
          }}
        >
          {/* Spinner */}
          <FadeLoader color={'#4292cf'} loading={loading} size={60} />
        </div>
      )}
      <p className='text-2xl font-bold mb-4 text-center'> Search By phone number to get student Info </p>
      <div className=" flex justify-center">
      <div className="flex w-80">
                  <input id="text" type="number" className="shadow-sm mr-4 bg-gray-100 border  text-sm rounded-lg block w-full p-2.5 shadow-sm-light" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                  <button type="submit" className="py-3 px-5 text-sm font-medium text-center rounded-lg bg-blue-400 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800" onClick={handlePhone}>Search</button>

      </div>
      </div>
     
    </div>
  
  );
}

export default App;
