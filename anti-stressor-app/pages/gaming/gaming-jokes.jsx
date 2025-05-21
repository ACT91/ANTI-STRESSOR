import React, { useEffect, useRef, useState } from 'react'
import './gaming-jokes.css'

const gamingJokes = [
  "Why did the gamer bring string to the bar? To tie up loose ends in the quest!",
  "Why don’t gamers use the doorbell? They prefer to ‘knock’ with a grenade.",
  "Why did the console gamer get lost? Because he couldn’t find the X on the map.",
  "Why did the gamer go broke? Because he used all his cache!",
  "Why did the computer go to therapy? Too many rage quits."
]

function GamingJokes() {
  const [jokeIndex, setJokeIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const videoRef = useRef(null)
  const intervalRef = useRef(null)
  const [cameraAllowed, setCameraAllowed] = useState(false)

  // Dummy smile detection (replace with real ML for production)
  const detectSmile = () => {
    // For demo: randomly trigger smile after a few intervals
    // Replace with real smile detection logic using TensorFlow.js or face-api.js
    return Math.random() > 0.95
  }

  useEffect(() => {
    // Ask for camera permission and stream video
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        setCameraAllowed(true)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch(() => setCameraAllowed(false))

    // Joke interval
    intervalRef.current = setInterval(() => {
      setJokeIndex(prev => (prev + 1) % gamingJokes.length)
    }, 10000)

    // Copy the ref value to a local variable for cleanup
    const videoElement = videoRef.current

    return () => {
      clearInterval(intervalRef.current)
      if (videoElement && videoElement.srcObject) {
        let tracks = videoElement.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (!cameraAllowed) return
    const smileInterval = setInterval(() => {
      if (detectSmile()) {
        setShowPopup(true)
        clearInterval(smileInterval)
        clearInterval(intervalRef.current)
      }
    }, 1000)
    return () => clearInterval(smileInterval)
  }, [cameraAllowed])

  return (
    <div className="gaming-jokes-container">
      <h2 className="gaming-jokes-title">Gaming Jokes</h2>
      <div>
        {cameraAllowed ? (
          <video
            ref={videoRef}
            autoPlay
            width={320}
            height={240}
            className="gaming-jokes-video"
          />
        ) : (
          <p>Please allow camera access to continue.</p>
        )}
      </div>
      <div className="gaming-jokes-text">
        {gamingJokes[jokeIndex]}
      </div>
      {showPopup && (
        <div className="gaming-jokes-popup">
          <h3>Haha I have made you laugh!</h3>
          <p>Maintain that smile this whole day please, I like it like that way.</p>
        </div>
      )}
    </div>
  )
}

export default GamingJokes