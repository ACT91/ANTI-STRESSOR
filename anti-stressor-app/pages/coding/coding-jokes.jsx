import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'
import './coding-jokes.css'

const codingJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "Why do Java developers wear glasses? Because they don't see sharp.",
  "There are only 10 types of people in the world: those who understand binary and those who don't.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem."
]

function CodingJokes() {
  const [jokeIndex, setJokeIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [cameraAllowed, setCameraAllowed] = useState(false)

  const videoRef = useRef(null)
  const jokeIntervalRef = useRef(null)
  const detectionIntervalRef = useRef(null)

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ])
    }

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        setCameraAllowed(true)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Camera access denied:', error)
        setCameraAllowed(false)
      }
    }

    loadModels().then(startVideo)

    // Capture the ref value at effect mount
    const videoElAtMount = videoRef.current;

    return () => {
      if (videoElAtMount && videoElAtMount.srcObject) {
        videoElAtMount.srcObject.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (!cameraAllowed) return

    jokeIntervalRef.current = setInterval(() => {
      setJokeIndex(prev => (prev + 1) % codingJokes.length)
    }, 10000)

    detectionIntervalRef.current = setInterval(async () => {
      if (videoRef.current) {
        const detections = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions()

        if (detections?.expressions?.happy > 0.1) {
          setShowPopup(true)
          clearInterval(jokeIntervalRef.current)
          clearInterval(detectionIntervalRef.current)
        }
      }
    }, 1000)

    return () => {
      clearInterval(jokeIntervalRef.current)
      clearInterval(detectionIntervalRef.current)
    }
  }, [cameraAllowed])

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Coding Jokes</h2>
      <div>
        {cameraAllowed ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            width={400}
            height={400}
            style={{ borderRadius: '50%' }}
          />
        ) : (
          <p>Please allow camera access to continue.</p>
        )}
      </div>

      <div style={{ fontSize: '1.5rem', margin: '2rem 0' }}>
        {codingJokes[jokeIndex]}
      </div>

      {showPopup && (
        <div style={{
          background: '#fff',
          border: '2px solid #646cff',
          borderRadius: '12px',
          padding: '2rem',
          position: 'fixed',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          boxShadow: '0 4px 32px rgba(0,0,0,0.2)'
        }}>
          <h3>Haha! I made you laugh!</h3>
          <p>Maintain that smile all day, please. I like it that way 😊</p>
        </div>
      )}
    </div>
  )
}

export default CodingJokes
