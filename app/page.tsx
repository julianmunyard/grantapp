'use client'

import { useState, useRef, useEffect, useLayoutEffect } from 'react';



interface WindowProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
  width?: number
  height?: number
  zIndex?: number
}

const Window = ({ title, isOpen, onClose, children, initialPosition = { x: 100, y: 100 }, width = 400, height = 300, zIndex = 1 }: WindowProps) => {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return
    setIsDragging(true)
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  if (!isOpen) return null

  return (
    <div
      ref={windowRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width,
        height,
        zIndex,
        userSelect: isDragging ? 'none' : 'auto'
      }}
    >
{/* Window Frame */}
      <div style={{
        background: '#f5f5dc',
        border: '1px solid #000',
        borderRadius: '8px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px'
      }}>
        {/* Title Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: isDragging ? 'grabbing' : 'grab',
            minHeight: '20px',
            marginBottom: '8px'
          }}
          onMouseDown={handleMouseDown}
        >
          <button
            className="window-controls"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              width: '16px',
              height: '16px',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 'bold'
            }}
          >
            ✕
          </button>
          <div style={{ flex: 1 }}></div>
          <span style={{
            fontFamily: 'NewYork, Times, serif',
            fontSize: '14px',
            color: '#000',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '-1px',
            transform: 'scaleX(0.8) scaleY(1.4)',
            display: 'inline-block',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility'
          }}>
            {title}
          </span>
        </div>

        {/* Content Area */}
        <div style={{
          flex: 1,
          background: 'white',
          border: '1px solid #000',
          borderRadius: '6px',
          overflow: 'auto',
          padding: '12px'
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}  

interface PlayerWindowProps {
  isOpen: boolean
  onClose: () => void
}

interface Track {
  src: string
  title: string
}

const PlayerWindow = ({ isOpen, onClose }: PlayerWindowProps) => {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement>(null)

  const tracks: Track[] = [
    { src: "/songs/millionaire.mp3", title: "MILLIONAIRE" },
    { src: "/songs/do-it-again.mp3", title: "2. Do It Again" },
    { src: "/songs/interlude.mp3", title: "3. Interlude" },
    { src: "/songs/more-than-a-friend.mp3", title: "4. More Than a Friend" },
    { src: "/songs/never-gonna-(give-you-up).mp3", title: "5. Never Gonna (Give You Up)" },
    { src: "/songs/the-rain-(its-pouring).mp3", title: "6. The Rain (It's Pouring)" },
    { src: "/songs/you-had-it-coming.mp3", title: "7. You Had It Coming" }
  ]

useEffect(() => {
  if (audioRef.current && isPlaying) {
    audioRef.current.play()
  }
}, [currentTrack])


  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }
// === Seamless marquee state/refs ===
const marqueeWrapRef = useRef<HTMLDivElement | null>(null);
const contentRef = useRef<HTMLSpanElement | null>(null);

const [gapPx, setGapPx] = useState(60);      // fallback spacing
const [speedSec, setSpeedSec] = useState(12); // fallback speed
const [measured, setMeasured] = useState(false);

const measure = () => {
  const wrap = marqueeWrapRef.current;
  const content = contentRef.current;
  if (!wrap || !content) return;

  const wrapW = wrap.offsetWidth;
  const contentW = content.offsetWidth;

  const gap = Math.max(40, wrapW - contentW); // breathing room even for short titles
  setGapPx(gap);

  const pxPerSec = 40;                        // adjust global speed feel here
  const duration = Math.max(10, (contentW + gap) / pxPerSec);
  setSpeedSec(duration);

  setMeasured(true);
};

// re-measure when the window opens and when the title changes
useLayoutEffect(() => {
  const wrap = marqueeWrapRef.current;
  if (!wrap) return;

  // only measure when visible (prevents bad numbers if the window is closed/hidden)
  const isVisible = () =>
    wrap.offsetParent !== null && getComputedStyle(wrap).visibility !== 'hidden';

  const run = () => {
    if (!isVisible()) return;
    measure();
  };

  // 1) immediate (in case everything is already ready)
  run();

  // 2) next frame (layout settled)
  const raf1 = requestAnimationFrame(run);

  // 3) tiny delay (fonts often paint a moment later)
  const t1 = setTimeout(run, 150);

  // 4) when fonts are ready (kills the first-load “too close” issue)
  const fonts = (document as any).fonts?.ready;
  let raf2: number | null = null;
  let t2: any = null;
  if (fonts) {
    fonts.then(() => {
      raf2 = requestAnimationFrame(run);
      t2 = setTimeout(run, 300); // extra safety pass
    });
  }

  // 5) after full window load (late caches)
  const onLoad = () => requestAnimationFrame(run);
  window.addEventListener('load', onLoad);

  // 6) respond to container resizes
  const ro = new ResizeObserver(run);
  ro.observe(wrap);

  return () => {
    cancelAnimationFrame(raf1);
    if (raf2) cancelAnimationFrame(raf2);
    clearTimeout(t1);
    if (t2) clearTimeout(t2);
    window.removeEventListener('load', onLoad);
    ro.disconnect();
  };
}, [tracks[currentTrack]?.title, isOpen]);


return (
  <Window
    title="Player"
    isOpen={isOpen}
    onClose={onClose}
    initialPosition={{ x: 50, y: 150 }}
    width={420}
    height={180}
    zIndex={10}
  >
    <div style={{ fontFamily: 'pixChicago, Monaco, monospace', fontSize: '8px' }}>

{/* Track Info Display (seamless, measured, no jump) */}
<style>
{`
  @keyframes jmMarqueeSeamless {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); } /* slide one lane width */
  }
`}
</style>
<div
  style={{
    background: '#f5f5dc',
    border: '1px solid #000',
    borderRadius: '6px',
    padding: '8px',
    marginBottom: '8px',
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden'
  }}
>
  <div
    ref={marqueeWrapRef}
    style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
  >
    <div
      key={tracks[currentTrack]?.title} // restart at right on track change
      style={{
        display: 'flex',
        width: 'max-content',
        whiteSpace: 'nowrap',
        columnGap: `${gapPx}px`,                     // measured spacing
        animation: `jmMarqueeSeamless ${speedSec}s linear infinite`,
        willChange: 'transform',
        fontSize: '13px',
        fontWeight: 'normal'
        // 🔧 removed visibility: hidden gate
      }}
    >
      <span ref={contentRef}>{tracks[currentTrack]?.title ?? ''}</span>
      <span>{tracks[currentTrack]?.title ?? ''}</span>
    </div>
  </div>
</div>









      {/* Controls and Volume Section */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {/* Transport Controls (Play/Pause/Next/Previous) */}
        <div style={{ display: 'flex', gap: '0px' }}>
          <button onClick={togglePlay} style={{
            background: '#f5f5dc',
            border: '1px solid #000',
            width: '50px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            color: '#000',
            lineHeight: '1',
            padding: '0',
            margin: '0',
            fontFamily: 'monospace',
            transform: isPlaying ? 'translateY(2px)' : 'translateY(0px)',
            transition: 'transform 0.1s ease',
            boxShadow: isPlaying ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'none'
          }}>
            ▶
          </button>
          <button onClick={togglePlay} style={{
            background: '#f5f5dc',
            border: '1px solid #000',
            width: '50px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            color: '#000',
            lineHeight: '1',
            padding: '0',
            margin: '0',
            fontFamily: 'monospace',
            transform: !isPlaying ? 'translateY(2px)' : 'translateY(0px)',
            transition: 'transform 0.1s ease',
            boxShadow: !isPlaying ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'none'
          }}>
            ⏸
          </button>
          <button onClick={prevTrack} style={{
            background: '#f5f5dc',
            border: '1px solid #000',
            width: '50px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            color: '#000',
            lineHeight: '1',
            padding: '0',
            margin: '0',
            fontFamily: 'monospace',
            transform: 'scale(1)',
            transition: 'transform 0.1s ease'
          }}
          onMouseDown={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(0.95)'}
          onMouseUp={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'}
          >
            ⏮
          </button>
          <button onClick={nextTrack} style={{
            background: '#f5f5dc',
            border: '1px solid #000',
            width: '50px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            color: '#000',
            lineHeight: '1',
            padding: '0',
            margin: '0',
            fontFamily: 'monospace',
            transform: 'scale(1)',
            transition: 'transform 0.1s ease'
          }}
          onMouseDown={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(0.95)'}
          onMouseUp={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'}
          >
            ⏭
          </button>
        </div>

{/* Volume Control Section */}
<div style={{
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  marginLeft: '8px'
}}>
{/* Speaker Icon */}
  <div style={{
    width: '20px',
    height: '24px',
    background: '#f5f5dc',
    border: '1px solid #000',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '4px',
    position: 'relative'
  }}>
    <div style={{
      width: '12px',
      height: '12px',
      background: 'black',
      position: 'relative',
      clipPath: 'polygon(0% 30%, 40% 30%, 100% 0%, 100% 100%, 40% 70%, 0% 70%)'
    }} />
  </div>
  
  {/* Custom Volume Slider Container */}
  <div style={{
    flex: 1,
    height: '24px',
    background: 'white',
    border: '0px solid #000',
    borderRadius: '3px',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Yellow slider rectangle */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: `${volume * 100}%`,
      height: '100%',
      background: '#f5f5dc',
      border: '1px solid #000',
      borderBottom: '3px solid #000',
      borderRadius: '2px',
      transition: 'width 0.1s ease'
    }} />
    
    {/* Invisible Range Input for Interaction */}
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={handleVolumeChange}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
        margin: 0,
        padding: 0
      }}
    />
  </div>
</div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack]?.src}
        onEnded={nextTrack}
        onTimeUpdate={(e: React.SyntheticEvent<HTMLAudioElement>) => {
          const target = e.currentTarget as HTMLAudioElement;
          setCurrentTime(target.currentTime);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume;
          }
        }}
      />
    </div>
  </Window>
)
}


interface SimpleWindowProps {
  isOpen: boolean
  onClose: () => void
}

const AboutWindow = ({ isOpen, onClose }: SimpleWindowProps) => (
  <Window
    title="About Julian Munyard"
    isOpen={isOpen}
    onClose={onClose}
    initialPosition={{ x: 200, y: 100 }}
    width={600}
    height={500}
    zIndex={5}
  >
    <div style={{ fontSize: '10px', lineHeight: '1.5' }}>
      <p style={{ marginBottom: '16px', textAlign: 'left', fontWeight: 'normal', fontFamily: 'NewYork, Times, serif', fontSize: '12px' }}>
        NEW EP VISION - TO WHOM IT MAY CONCERN
      </p>
      
      <p style={{ marginBottom: '16px', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>
        THESE ARE 7 UNRELEASED SONGS THAT I'VE WRITTEN AND PRODUCED FOR MY NEW EP. 
        I HOPE YOU WILL FIND INTEREST IN WORKING WITH ME ON THIS RELEASE.
      </p>

      <p style={{ marginBottom: '16px', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>
        I'M JULIAN MUNYARD — A 22-YEAR-OLD PRODUCER AND ARTIST FROM AUSTRALIA WHO'S 
        SPENT THE LAST YEAR DIGGING DEEP INTO THE RARER, MORE OBSCURE SIDE OF EARLY 
        80S MUSIC, AND I BELIEVE TO HAVE COMPLETED MY FIRST EP INSPIRED BY THIS.
      </p>

      <p style={{ marginBottom: '16px', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>
        I READ SOMEWHERE THAT GEORGE MICHAEL WHEN RECORDING TRACKS LIKE 'EVERYTHING 
        SHE WANTS' AND 'LAST CHRISTMAS'- WENT INTO THE STUDIO WITH A ROLAND JUNO 60, 
        A LINNDRUM DRUM MACHINE, AND ONE ENGINEER, HE PLAYED ALL THE PARTS HIMSELF. 
        I WROTE MY SONGS WITH THAT EXACT APPROACH IN MIND, RECORDED IT IN MY HOME 
        STUDIO, AND PLAYED ALL PARTS.
      </p>

      <p style={{ marginBottom: '16px', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>
        I WAS HEAVILY INSPIRED FROM SONGS RELEASED ON REISSUE LABELS SUCH AS NUMERO 
        GROUP AND THE LIKES OF. 80S BOOGIE WAS A LOT LIKE 60'S SOUL IN THAT WAY, 
        THERE WAS JUST SO MUCH OF IT CREATED AND NOT ALL OF IT WAS SUCCESSFUL, SO 
        YOU HAVE THESE GREAT TRACKS THAT GOT LOST ALONG THE WAY.
      </p>

      <p style={{ marginBottom: '16px', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>
        WHAT I'M LOOKING FOR IS A PARTNERSHIP WITH PEOPLE WHO UNDERSTAND THAT VISION 
        AND CAN HELP BRING IT TO LIFE PROPERLY BY ALLOWING ME TO DO VIDEOS, CUT 
        VINYL, AND SUPPORT ME.
      </p>
    </div>
  </Window>
)

const ContactWindow = ({ isOpen, onClose }: SimpleWindowProps) => (
  <Window
    title="Contact Info"
    isOpen={isOpen}
    onClose={onClose}
    initialPosition={{ x: 300, y: 250 }}
    width={300}
    height={180}
    zIndex={6}
  >
    <div style={{ fontSize: '8px', textAlign: 'center' }}>
      <p style={{ marginBottom: '8px', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>EMAIL:</p>
      <p style={{ marginBottom: '12px', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>JULIAN.MUNYARD@GMAIL.COM</p>
      
      <p style={{ marginBottom: '8px', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>INSTAGRAM:</p>
      <a 
        href="https://www.instagram.com/julianmunyard/" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: 'blue', textDecoration: 'underline', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}
      >
        @JULIANMUNYARD
      </a>
    </div>
  </Window>
)


const MunyardMixerWindow = ({ isOpen, onClose }: SimpleWindowProps) => (
  <Window
    title="Munyard Mixer"
    isOpen={isOpen}
    onClose={onClose}
    initialPosition={{ x: 150, y: 200 }}
    width={400}
    height={300}
    zIndex={7}
  >
    <div style={{ fontSize: '8px', textAlign: 'center' }}>
      <p style={{ marginBottom: '12px', fontWeight: 'normal', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>THE MUNYARD MIXER</p>
      
      <p style={{ marginBottom: '12px', lineHeight: '1.4', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>
        IT'S THIS CUSTOM WEB TOOL I CREATED THAT LETS ARTISTS HAVE THEIR OWN STEM 
        PLAYER, WHICH ALLOWS FANS TO DIVE INTO TRACKS STEM BY STEM AND REMIX THEM 
        LIVE IN THEIR BROWSER.
      </p>

      <p style={{ marginBottom: '15px', lineHeight: '1.4', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>
        IN A WORLD WHERE EVERYTHING'S BECOMING INCREASINGLY AI-GENERATED AND DISTANT, 
        I THINK PEOPLE ARE CRAVING THAT HANDS-ON, TACTILE CONNECTION WITH MUSIC.
      </p>

      <a 
        href="https://munyardmixer.com/artist/jules-red-theme/millionaire"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: '#bac3e6',
          border: '1px outset #bac3e6',
          padding: '6px 12px',
          textDecoration: 'none',
          color: 'black',
          fontFamily: 'NewYork, Times, serif',
          fontSize: '13px'
        }}
      >
        VISIT MUNYARD MIXER
      </a>
    </div>
  </Window>
)

const InstagramWindow = ({ isOpen, onClose }: SimpleWindowProps) => (
  <Window
    title="Instagram"
    isOpen={isOpen}
    onClose={onClose}
    initialPosition={{ x: 400, y: 150 }}
    width={350}
    height={250}
    zIndex={8}
  >
    <div style={{ fontSize: '8px', textAlign: 'center' }}>
      <p style={{ marginBottom: '15px', fontWeight: 'normal', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>SOCIAL MEDIA PRESENCE</p>
      
      <div style={{
        background: '#f0f0f0',
        border: '1px inset #d9b8c2',
        padding: '12px',
        marginBottom: '15px'
      }}>
        <p style={{ marginBottom: '8px', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>INSTAGRAM CONTENT SHOWCASE</p>
        <p style={{ fontSize: '13px', fontFamily: 'NewYork, Times, serif' }}>250K+ VIEWS ON RECENT VIDEOS</p>
      </div>

      <p style={{ marginBottom: '12px', lineHeight: '1.4', fontFamily: 'NewYork, Times, serif', fontSize: '13px' }}>
        LAST YEAR I GAINED OVER 10K INSTAGRAM FOLLOWERS WITH SOME SHORT FORM 
        CONTENT MARKETING MY MUSIC, AND I AIM TO DO THE SAME THING AND PUSH 
        REALLY HARD IN AN ORGANIC AND AUTHENTIC WAY.
      </p>

      <a 
        href="https://www.instagram.com/julianmunyard/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: '#d9b8c2',
          border: '1px outset #d9b8c2',
          padding: '6px 12px',
          textDecoration: 'none',
          color: 'black',
          fontFamily: 'NewYork, Times, serif',
          fontSize: '13px'
        }}
      >
        VISIT INSTAGRAM
      </a>
    </div>
  </Window>
)

type TaskBarProps = {
  onOpenWindow: (id: string) => void
}

const TaskBar = ({ onOpenWindow }: TaskBarProps) => (
  <div
    style={{
      position: 'fixed',
      bottom: '0px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#b1cfe6',
      border: '1px solid #c2ddf2',
      borderBottom: 'none',
      borderRadius: '8px 8px 0 0',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      gap: '0px',
      zIndex: 1000,
      padding: '0px',
    }}
  >
    {[
      { id: 'player', label: 'Player' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' },
      { id: 'mixer', label: 'Munyard\nMixer', adjust: true },
      { 
        id: 'instagram', 
        label: (
          <img 
            src="/8-bit-instagram.jpeg" 
            alt="Instagram" 
            style={{ width: '33px', height: '29px', imageRendering: 'pixelated' }} 
          />
        ) 
      },
    ].map(({ id, label, adjust }, index, arr) => {
      const isFirst = index === 0
      const isLast = index === arr.length - 1

      return (
        <button
          key={id}
          onClick={() => onOpenWindow(id)}
          style={{
            background: '#f5f5dc',
            cursor: 'pointer',
            fontFamily: 'pixChicago, Monaco, monospace',
            fontSize: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70px',
            height: '58px',
            textAlign: 'center',
            borderRadius: isFirst
              ? '6px 0 0 0'
              : isLast
              ? '0 6px 0 0'
              : '0',
            margin: '0',
            padding: '4px',
            color: '#000',
            boxShadow: '2px 2px 0 #444',
            borderTop: '2px solid #000',
            borderBottom: '2px solid #000',
            borderRight: '2px solid #000',
            borderLeft: isFirst ? '2px solid #000' : 'none',
          }}
        >
          <span
            style={{
              fontSize: '9px',
              lineHeight: '1.4',
              textAlign: 'center',
              display: 'block',
              whiteSpace: 'pre-line',
              wordWrap: 'break-word',
              transform: adjust ? 'translateY(6px)' : undefined,
            }}
          >
            {label}
          </span>
        </button>
      )
    })}
  </div>
)





export default function Home() {
  const [openWindows, setOpenWindows] = useState<Record<string, boolean>>({
    player: false,
    about: false,
    contact: false,
    mixer: false,
    instagram: false,
    folder: false
  })

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([])
  const trailIdRef = useRef(0)

  const openWindow = (windowId: string) => {
    setOpenWindows(prev => ({ ...prev, [windowId]: true }))
  }

  const closeWindow = (windowId: string) => {
    setOpenWindows(prev => ({ ...prev, [windowId]: false }))
  }

    useEffect(() => {
    // Open about and player windows when component mounts
    setOpenWindows(prev => ({ 
      ...prev, 
      about: true, 
      player: true 
    }))
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      
      // Add new trail point with massive repeats for drawing shapes
      const newTrailPoint = { x: e.clientX, y: e.clientY, id: trailIdRef.current++ }
      setCursorTrail(prev => [...prev, newTrailPoint].slice(-200)) // Keep last 200 trail points for massive drawing effect
    }

    const handleMouseLeave = () => {
      setCursorTrail([])
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Clear old trail points much more slowly for drawing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail(prev => prev.slice(1))
    }, 15) // Much faster update for dense trail

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'pixChicago';
          src: url('/fonts/pixChicago.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: 'VCR_OSD_MONO';
          src: url('/fonts/VCR_OSD_MONO_1.001.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: 'NewYork';
          src: url('/fonts/new-york.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'pixChicago', Monaco, monospace;
          background: url('/desktop-pattern.png') repeat,
                      linear-gradient(135deg, #008080 0%, #20b2aa 100%);
          background-size: 4px 4px, cover;
          overflow: hidden;
          height: 100vh;
          cursor: none;
        }

        * {
          box-sizing: border-box;
          cursor: none !important;
        }

        .retro-cursor {
          position: fixed;
          width: 20px;
          height: 24px;
          pointer-events: none;
          z-index: 10000;
        }

        .retro-cursor::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 24px;
          background: white;
          border: 3px solid black;
          image-rendering: pixelated;
          clip-path: polygon(
            0% 0%, 
            0% 83.33%, 
            20% 62.5%, 
            35% 95.83%, 
            50% 79.17%, 
            30% 45.83%, 
            70% 45.83%
          );
          }
        `}</style>

        <div style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Background Video */}
          <video
            src="/nyc-night-aerials.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'fixed',
              top: '45%',
              left: '50%',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translate(-50%, -50%) scale(1.8)',
              zIndex: -1,
            }}
          />
          
{/* Center Logo */}
<div style={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
}}>
  <h1 style={{
    fontFamily: 'NewYork, Times, serif',
    fontSize: '24px',
    margin: 0,
    marginBottom: '8px',
    letterSpacing: '1px'
  }}>
   
  </h1>
  <p style={{
    fontFamily: 'NewYork, Times, serif',
    fontSize: '16px',
    margin: 0,
    letterSpacing: '1px'
  }}>
  
  </p>
</div>

{/* Desktop Icons */}
<div style={{
  position: 'absolute',
  top: '20px',
  right: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
}}>
  <div
    onClick={() => openWindow('about')}
    onKeyDown={(e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        openWindow('about');
      }
    }}
    role="button"
    tabIndex={0}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.1)',
      padding: '8px',
      borderRadius: '4px',
      minWidth: '80px'
    }}
  >
    <div style={{ fontSize: '32px', marginBottom: '4px' }}>📄</div>
    <span style={{ 
      fontFamily: 'pixChicago, Monaco, monospace', 
      fontSize: '8px', 
      color: 'white',
      textAlign: 'center'
    }}>
      ABOUT
    </span>
  </div>

<div
  onClick={() => openWindow('player')}
  onKeyDown={(e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openWindow('player');
    }
  }}
  role="button"
  tabIndex={0}
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    background: 'rgba(255,255,255,0.1)',
    padding: '8px',
    borderRadius: '4px',
    minWidth: '80px'
  }}
>
  <img 
    src="/1840045.png" 
    alt="Player" 
    style={{ 
      width: '32px', 
      height: '32px', 
      marginBottom: '4px',
      imageRendering: 'pixelated' 
    }} 
  />
  <span style={{ 
    fontFamily: 'pixChicago, Monaco, monospace', 
    fontSize: '8px', 
    color: 'white',
    textAlign: 'center'
  }}>
    PLAYER
  </span>
</div>

<div
  onClick={() => openWindow('contact')}
  onKeyDown={(e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openWindow('contact');
    }
  }}
  role="button"
  tabIndex={0}
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    background: 'rgba(255,255,255,0.1)',
    padding: '8px',
    borderRadius: '4px',
    minWidth: '80px'
  }}
>
  <img 
    src="/408162.png" 
    alt="Contact" 
    style={{ 
      width: '32px', 
      height: '32px', 
      marginBottom: '4px',
      imageRendering: 'pixelated' 
    }} 
  />
  <span style={{ 
    fontFamily: 'pixChicago, Monaco, monospace', 
    fontSize: '8px', 
    color: 'white',
    textAlign: 'center'
  }}>
    CONTACT
  </span>
</div>

  <div
    onClick={() => openWindow('mixer')}
    onKeyDown={(e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        openWindow('mixer');
      }
    }}
    role="button"
    tabIndex={0}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.1)',
      padding: '8px',
      borderRadius: '4px',
      minWidth: '80px'
    }}
  >
    <div style={{ fontSize: '32px', marginBottom: '4px' }}>🎛️</div>
    <span style={{ 
      fontFamily: 'pixChicago, Monaco, monospace', 
      fontSize: '8px', 
      color: 'white',
      textAlign: 'center'
    }}>
      MIXER
    </span>
  </div>

  <div
    onClick={() => openWindow('instagram')}
    onKeyDown={(e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        openWindow('instagram');
      }
    }}
    role="button"
    tabIndex={0}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.1)',
      padding: '8px',
      borderRadius: '4px',
      minWidth: '80px'
    }}
  >
    <div style={{ fontSize: '32px', marginBottom: '4px' }}>📷</div>
    <span style={{ 
      fontFamily: 'pixChicago, Monaco, monospace', 
      fontSize: '8px', 
      color: 'white',
      textAlign: 'center'
    }}>
      INSTAGRAM
    </span>
  </div>
</div>

          {/* Windows */}
          <PlayerWindow 
            isOpen={openWindows.player} 
            onClose={() => closeWindow('player')} 
          />
          
          <AboutWindow 
            isOpen={openWindows.about} 
            onClose={() => closeWindow('about')} 
          />
          
          <ContactWindow 
            isOpen={openWindows.contact} 
            onClose={() => closeWindow('contact')} 
          />
          
          <MunyardMixerWindow 
            isOpen={openWindows.mixer} 
            onClose={() => closeWindow('mixer')} 
          />
          
          <InstagramWindow 
            isOpen={openWindows.instagram} 
            onClose={() => closeWindow('instagram')} 
          />



          {/* Custom Retro Cursor */}
          <div 
            className="retro-cursor"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              transform: 'translate(-2px, -2px)'
            }}
          />

          {/* Cursor Trail */}
          {cursorTrail.map((point, index) => (
            <div
              key={point.id}
              className="cursor-trail"
              style={{
                left: point.x,
                top: point.y,
                transform: 'translate(-1px, -1px)',
                opacity: (index + 1) / cursorTrail.length, // Solid opacity based on position in trail
                scale: 0.9 - (index * 0.05) // More dramatic size reduction
              }}
            />
          ))}
        </div>
      </>
    )
  }