'use client'

import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

let activeWavesurfer: WaveSurfer | null = null
let setActiveIdGlobally: ((id: string | null) => void) | null = null

interface Props {
  src: string
  title: string
}

export default function SongCard({ src, title }: Props) {
  const waveformRef = useRef<HTMLDivElement | null>(null)
  const wavesurfer = useRef<WaveSurfer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const id = src // use the file path as unique ID

  // Set global callback to pause others
  useEffect(() => {
    setActiveIdGlobally = (newId) => {
      if (newId !== id && isPlaying) {
        wavesurfer.current?.pause()
        setIsPlaying(false)
      }
    }
  }, [id, isPlaying])

useEffect(() => {
  if (waveformRef.current) {
wavesurfer.current = WaveSurfer.create({
  container: waveformRef.current,
  waveColor: '#a5b0b8',       // soft red for unplayed
  progressColor: '#E4002B',   // strong red for played
  height: 60,
  barWidth: 1.5,              // thinner bars = softer look
  barRadius: 3,               // rounded edges = smoother
  barGap: 1,                  // spacing = more breathable
  cursorWidth: 0,            // no red line
  normalize: true,           // makes waveforms look consistent
})

    wavesurfer.current.load(src)
  }

  return () => {
    wavesurfer.current?.destroy()
  }
}, [src])

  const togglePlay = () => {
    if (!wavesurfer.current) return

    const isNowPlaying = wavesurfer.current.isPlaying()

    if (isNowPlaying) {
      wavesurfer.current.pause()
      setIsPlaying(false)
    } else {
      if (activeWavesurfer && activeWavesurfer !== wavesurfer.current) {
        activeWavesurfer.pause()
      }

      activeWavesurfer = wavesurfer.current
      setActiveIdGlobally?.(id)
      wavesurfer.current.play()
      setIsPlaying(true)
    }
  }

return (
  <div style={{ marginBottom: '40px' }}>
    <h3 style={{ marginBottom: '8px', fontWeight: 'normal' }}>{title}</h3>  {/* Move title here, marginBottom */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <button
        onClick={togglePlay}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          width: '24px',
          height: '24px',
        }}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
            <polygon points="6,4 20,12 6,20" />
          </svg>
        )}
      </button>
      <div ref={waveformRef} style={{ flex: 1 }} />
    </div>
  </div>
)

}
