import React, { useEffect, useRef, useState } from 'react'
import './music-jokes.css'

const musicJokes = [
  "Why did the musician get in trouble? He got caught with a high note!",
  "Why did the piano break up with the accordion? Too many issues with keys!",
  "Why did the singer climb a ladder? To reach the high notes!",
  "Why did the drummer sit on the clock? He wanted to beat the time!",
  "Why did the music teacher go to jail? Because she got caught with a sharp!"
]

function MusicJokes() {
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
    let cleanupVideoEl = null;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        setCameraAllowed(true)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          cleanupVideoEl = videoRef.current
        }
      })
      .catch(() => setCameraAllowed(false))

    // Joke interval
    intervalRef.current = setInterval(() => {
      setJokeIndex(prev => (prev + 1) % musicJokes.length)
    }, 10000)

    return () => {
      clearInterval(intervalRef.current)
      if (cleanupVideoEl && cleanupVideoEl.srcObject) {
        let tracks = cleanupVideoEl.srcObject.getTracks()
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
    <div className="music-jokes-container">
      <h2 className="music-jokes-title">Music Jokes</h2>
      <div>
        {cameraAllowed ? (
          <video
            ref={videoRef}
            autoPlay
            width={240}
            height={240}
            className="music-jokes-video"
          />
        ) : (
          <p>Please allow camera access to continue.</p>
        )}
      </div>
      <div className="music-jokes-text">
        {musicJokes[jokeIndex]}
      </div>
      {showPopup && (
        <div className="music-jokes-popup">
          <h3>Haha I have made you laugh!</h3>
          <p>Maintain that smile this whole day please, I like it like that way.</p>
        </div>
      )}
    </div>
  )
}

export default MusicJokes