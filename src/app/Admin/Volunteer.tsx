// 'use client'

// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import axiosInstance from "@/utils/axios"

// export default function Volunteer() {
//   const [search, setSearch] = useState('')
//   const [data, setData] = useState([])

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchVolunteers = async () => {
//       try {
//         const response = await axiosInstance.get('/volunteers')
//         setData(response.data) // Update state with fetched data
//         console.log(response);
//       } catch (error: any) {
//         console.error('Error fetching volunteers:', error.response?.data || error.message)
//       }
//     }

//     fetchVolunteers()
//   })


//   const handleAccept = async (id: string) => {
//     try {
//       const res = await axios.patch(`http://localhost:5000/api/volunteers/${id}/accept`)

//       if (res.status === 200) {
//         setData((prev) =>(
//           prev.map((v) => (v._id === id ? { ...v, accepted: true } : v)))
//         )
//       } else {
//         console.error('Failed to accept volunteer')
//       }
//     } catch (err) {
//       console.error('Error accepting volunteer:', err)
//     }
//   }

//   return (
//     <div className="min-h-screen px-4 py-10 bg-[#0b0c10] text-white font-sans">
//       <h1 className="text-4xl font-bold text-center mb-2 text-white neon-glow">Volunteers</h1>
//       <p className="text-center text-gray-400">Manage access and actions for volunteers.</p>

//       <div className="flex justify-center mb-8">
//         <div className="flex w-[650px] items-center justify-center gap-2 mt-5 mb-5">
//           <input
//             type="text"
//             placeholder="Search volunteers..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 bg-[#1f2833] text-white px-4 py-2 rounded-md border-none outline-none mt-8 shadow-[0_0_10px_#45a29e]"
//           />
//           <button className="bg-[#66fcf1] hover:bg-[#45a29e] text-black px-6 py-6 rounded-md font-semibold mt-8">
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="max-w-xl mx-auto space-y-4">
//         {data
//           .filter((v: any) =>
//             v.name.toLowerCase().includes(search.toLowerCase())
//           )
//           .map((volunteer: any) => (
//             <div
//               key={volunteer._id}
//               className="flex items-center justify-between bg-[#1f2833] px-6 py-4 rounded-lg shadow-md border border-[#45a29e] neon-card"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-full bg-[#66fcf1] text-black flex items-center justify-center font-bold">
//                   {volunteer.name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-white font-semibold">{volunteer.name}</p>
//                   <p className="text-gray-400 text-sm">{volunteer.email}</p>
//                 </div>
//               </div>
//               <div className="flex justify-end min-w-[100px]">
//                 {volunteer.accepted ? (
//                   <button className="w-full bg-[#66fcf1] hover:bg-[#45a29e] text-black font-semibold px-4 py-2 rounded-md text-sm">
//                     Mail
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => handleAccept(volunteer._id)}
//                     className="w-full bg-[#66fcf1] hover:bg-[#45a29e] text-black font-semibold px-4 py-2 rounded-md text-sm"
//                   >
//                     Accept
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//       </div>

//       <style jsx>{`
//         .neon-glow {
//           text-shadow: 0 0 5px #66fcf1, 0 0 10px #66fcf1, 0 0 20px #66fcf1;
//         }

//         .neon-card {
//           box-shadow: 0 0 10px #45a29e, 0 0 20px #45a29e;
//         }
//       `}</style>
//     </div>
//   )
// }
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import axiosInstance from '@/utils/axios'

export default function Volunteer() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [selectedVolunteer, setSelectedVolunteer] = useState(null)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axiosInstance.get('/volunteers')
        setData(response.data)
      } catch (error) {
        console.error('Error fetching volunteers:', error.response?.data || error.message)
      }
    }

    fetchVolunteers()
  }, [])

  const handleAccept = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/volunteers/${id}/accept`)
      if (res.status === 200) {
        setData((prev) => prev.map((v) => (v._id === id ? { ...v, accepted: true } : v)))
      }
    } catch (err) {
      console.error('Error accepting volunteer:', err)
    }
  }

  const handleSendMail = async () => {
    try {
      const formData = new FormData()
      formData.append('subject', subject)
      formData.append('body', body)
      formData.append('email', selectedVolunteer.email)
      if (image) formData.append('image', image)
  
      await axios.post('http://localhost:5000/api/send-message', formData)
      alert('Mail sent!')
      setSelectedVolunteer(null)
      setSubject('')
      setBody('')
      setImage(null)
    } catch (err) {
      console.error('Error sending mail:', err)
      alert('Failed to send mail')
    }
  }
  

  return (
    <div className="min-h-screen px-4 py-10 bg-[#0b0c10] text-white font-sans">
      <h1 className="text-4xl font-bold text-center mb-2 text-white neon-glow">Volunteers</h1>
      <p className="text-center text-gray-400">Manage access and actions for volunteers.</p>

      <div className="flex justify-center mb-8">
        <div className="flex w-[650px] items-center justify-center gap-2 mt-5 mb-5">
          <input
            type="text"
            placeholder="Search volunteers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#1f2833] text-white px-4 py-2 rounded-md border-none outline-none mt-8 shadow-[0_0_10px_#45a29e]"
          />
          <button className="bg-[#66fcf1] hover:bg-[#45a29e] text-black px-6 py-6 rounded-md font-semibold mt-8">
            Search
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto space-y-4">
        {data
          .filter((v) => v.name.toLowerCase().includes(search.toLowerCase()))
          .map((volunteer) => (
            <div
              key={volunteer._id}
              className="flex items-center justify-between bg-[#1f2833] px-6 py-4 rounded-lg shadow-md border border-[#45a29e] neon-card"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#66fcf1] text-black flex items-center justify-center font-bold">
                  {volunteer.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{volunteer.name}</p>
                  <p className="text-gray-400 text-sm">{volunteer.email}</p>
                </div>
              </div>
              <div className="flex justify-end min-w-[100px]">
                {volunteer.accepted ? (
                  <button
                    className="w-full bg-[#66fcf1] hover:bg-[#45a29e] text-black font-semibold px-4 py-2 rounded-md text-sm"
                    onClick={() => setSelectedVolunteer(volunteer)}
                  >
                    Mail
                  </button>
                ) : (
                  <button
                    onClick={() => handleAccept(volunteer._id)}
                    className="w-full bg-[#66fcf1] hover:bg-[#45a29e] text-black font-semibold px-4 py-2 rounded-md text-sm"
                  >
                    Accept
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      {selectedVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-[#1f2833] p-6 rounded-lg w-full max-w-md space-y-4 text-white">
            <h2 className="text-2xl font-bold mb-2">Send Mail to {selectedVolunteer.name}</h2>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 bg-[#0b0c10] border border-[#66fcf1] rounded"
            />
            <textarea
              placeholder="Message body"
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-2 bg-[#0b0c10] border border-[#66fcf1] rounded"
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="text-white"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="px-4 py-2 bg-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMail}
                className="px-4 py-2 bg-[#66fcf1] text-black font-semibold rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .neon-glow {
          text-shadow: 0 0 5px #66fcf1, 0 0 10px #66fcf1, 0 0 20px #66fcf1;
        }

        .neon-card {
          box-shadow: 0 0 10px #45a29e, 0 0 20px #45a29e;
        }
      `}</style>
    </div>
  )
}
