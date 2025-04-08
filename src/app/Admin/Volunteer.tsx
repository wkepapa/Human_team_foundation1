'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import axiosInstance from "@/utils/axios"

export default function Volunteer() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])

  // Fetch data from backend
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axiosInstance.get('/volunteers')
        setData(response.data) // Update state with fetched data
        console.log(response);
      } catch (error: any) {
        console.error('Error fetching volunteers:', error.response?.data || error.message)
      }
    }

    fetchVolunteers()
  })


  const handleAccept = async (id: string) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/volunteers/${id}/accept`)

      if (res.status === 200) {
        setData((prev) =>(
          prev.map((v) => (v._id === id ? { ...v, accepted: true } : v)))
        )
      } else {
        console.error('Failed to accept volunteer')
      }
    } catch (err) {
      console.error('Error accepting volunteer:', err)
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
          .filter((v: any) =>
            v.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((volunteer: any) => (
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
                  <button className="w-full bg-[#66fcf1] hover:bg-[#45a29e] text-black font-semibold px-4 py-2 rounded-md text-sm">
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