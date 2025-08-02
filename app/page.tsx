'use client'

/* eslint-disable react/no-unescaped-entities */


import { useEffect, useState } from 'react'
import SongCard from './components/SongCard'
import InstagramEmbed from './components/InstagramEmbed'
import SupportLetterBox from './components/SupportLetterBox'





export default function Home() {
  const [stuck, setStuck] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null) // ✅ inside component


  const titleSize = stuck ? 64 : 130
  const subtitleSize = stuck ? 20 : 24
  const padding = 40

  return (
    <>
{/* Sticky teaser header with blurred bottom to show next section */}
<header
  style={{
    background: '#fff',
    paddingTop: '80px',
    paddingBottom: '40px',
    textAlign: 'center',
  }}
>
  <h1
    style={{
      fontSize: '130px',
      margin: 0,
      lineHeight: 1,
      fontFamily: 'Village, serif',
    }}
  >
    Julian Munyard
  </h1>

  <p
    style={{
      fontSize: '24px',
      marginTop: '12px',
      marginBottom: 0,
    }}
  >
    Grant Application
  </p>
</header>





      {/* Fade-in content, shown only after scroll */}
<main
  style={{
    padding: `${padding}px`,
    paddingTop: '10px', // 👈 reduce from 40px or 60px
    maxWidth: 800,
    margin: '0 auto',
    opacity: 1,
    pointerEvents: 'auto',
    transform: 'none',
    transition: 'none',
  }}
>
  

<section
  style={{
    marginTop: '0x', // 👈 Add this line to push it down
    marginBottom: '80px',
    position: 'relative',
    zIndex: 1,
  }}
>
  <h2 style={{ marginBottom: '24px' }}>Artistic Vision</h2>
  <div style={{ maxWidth: '700px', margin: '0 auto' }}>
    <p style={{ lineHeight: '1.6', fontSize: '16px' }}>
     I&#39;m Julian Munyard — a multidisciplinary musician, producer, and creator. This page outlines my creative practice, current projects, and my vision for using the ArtsPay Foundation grant to build deeper connections between sound, visual tools, and the communities that engage with them.
      I recently moved from the rural town of Beerwah, in the Sunshine Coast of Queensland where I grew up, to Sydney – purely to be closer to what I feel is a good music scene with more opportunities for me and my career as an artist. I've recorded an EP of 6 tracks which have been recorded at home with only the stuff I have.
    </p>

    <img
      src="/000014720035.JPG"
      alt="Julian standing in sunlight near arched door"
      style={{
        marginTop: '24px',
        borderRadius: '12px',
        maxWidth: '480px',
        width: '100%',
        height: 'auto',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 0 24px rgba(0, 0, 0, 0.25)',
      }}
    />
  </div>
</section>




<section style={{ marginBottom: '80px', position: 'relative', zIndex: 10 }}>
  <h2>What I’ll Do With the Grant</h2>

  <p style={{ lineHeight: '1.6', fontSize: '16px' }}>
    This grant would be used to help put out the body of work that I’ve been making in Sydney this year.
    With the help of this grant, I plan to use this funding for visuals, a marketing budget, and importantly – collaboration and mixing/mastering time with{' '}
    <a
      href="https://www.instagram.com/iamkesmar/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#E4002B',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
    >
      KESMAR
    </a>
    , whom I’ve decided I’d like to mix the record. The funding would also allow me to take some time off work to get these things done in good time.

    <br /><br />

    This funding feels especially important right now. I showcased this project live at <strong>BIGSOUND in September last year</strong>,
    and before that I was building momentum online organically through Instagram reels.
  </p>

  {/* ✅ Hydration-safe embed with preserved spacing */}
  <div style={{ margin: '20px 0' }}>
    <InstagramEmbed />
  </div>

  <p style={{ lineHeight: '1.6', fontSize: '16px' }}>
    For this next project, I want to apply that same approach — making content that connects — but with the added support of a proper marketing budget.
    That would allow me to put some targeted ad spend behind it, helping the music reach more people and giving it the best possible chance to land.

    <br /><br />

    In addition, the grant would support the continued development of my interactive audio project, the{' '}
    <a
      href="https://munyardmixer.com/artist/jules-red-theme/millionaire"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#E4002B',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
    >
      Munyard Mixer
    </a>
    — a custom-built web tool that allows listeners to explore music stem-by-stem, remix it live in the browser, and engage with it in a more playful, tactile way.
    I’ve been building this site independently to push how music can be experienced digitally, and I believe it reflects my broader artistic vision:
    bridging sound, technology, and storytelling.
  </p>
</section>

<table style={{ fontSize: '16px', borderCollapse: 'collapse', marginTop: '16px' }}>
  <thead>
    <tr>
      <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #ccc' }}>Outgoing Costs</th>
      <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #ccc' }}>Estimated Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{ padding: '8px 12px' }}>Mixing & Mastering (KESMAR)</td>
      <td style={{ padding: '8px 12px' }}>$2,100</td>
    </tr>
    <tr>
      <td style={{ padding: '8px 12px' }}>Marketing & Ad Spend</td>
      <td style={{ padding: '8px 12px' }}>$1,500</td>
    </tr>
    <tr>
      <td style={{ padding: '8px 12px' }}>Music Video Production</td>
      <td style={{ padding: '8px 12px' }}>$4,000+</td>
    </tr>
  </tbody>
</table>



<section style={{ marginBottom: '80px' }}>
  <h2>Collaborations</h2>
  <p style={{ lineHeight: '1.6', fontSize: '16px' }}>
    My focus moving to Sydney has also been collaboration in all areas, as there are not nearly as many artists pursuing music in my home town. I&#39;ve been writing with
{' '}
    <a
      href="https://www.instagram.com/lucysugerman/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#E4002B',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
    >
      Lucy Sugerman
    </a>{' '}
    who has become a dear friend, and we have been writing songs together with a plan to write a few more before going to a studio to properly record them. These sessions are expensive and require planning and preparation to be able to get the best result. I hope to have them be engineered by{' '}
    <a
      href="https://www.instagram.com/iamkesmar/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#E4002B',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
    >
      KESMAR
    </a>
    , and produced by both myself and Lucy.

    <br /><br />

    I’ve also been collaborating with Brisbane-based artist{' '}
    <a
      href="https://www.instagram.com/bakanikombanie/"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#E4002B',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
    >
      Bakani Kombanie
    </a>
    . Bakani is working on his debut EP, which I have been producing and mixing. This has been a learning experience on its own and we’ve been working hard to make this project come to life. With the help of this grant I hope to finish this project in full, which comes with production costs and mixing.
  </p>
</section>

{lightbox && (
  <div
    onClick={() => setLightbox(null)}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      cursor: 'zoom-out',
    }}
  >
    <img
      src={lightbox}
      alt="Preview"
      style={{
        maxWidth: '90vw',
        maxHeight: '90vh',
        borderRadius: '12px',
        boxShadow: '0 0 24px rgba(0,0,0,0.5)',
      }}
    />
  </div>
)}

<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '24px',
    marginTop: '32px',
    flexWrap: 'wrap',
  }}
>
  {['/IMG_0370.jpg', '/IMG_0371.jpg', '/IMG_0372.jpg'].map((src, i) => (
    <img
      key={i}
      src={src}
      onClick={() => setLightbox(src)}
      alt={`Collab ${i}`}
      style={{
        width: '180px',
        height: 'auto',
        borderRadius: '8px',
        objectFit: 'cover',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        cursor: 'zoom-in',
      }}
    />
  ))}
</div>




<section style={{ marginBottom: '80px' }}>
  <h2>NEW EP (UNRELEASED + UNMIXED)</h2>

  <SongCard src="/songs/millionaire.mp3" title="1. Millionaire" />
  <SongCard src="/songs/do-it-again.mp3" title="2. Do It Again" />
  <SongCard src="/songs/interlude.mp3" title="3. Interlude" />
  <SongCard src="/songs/more-than-a-friend.mp3" title="4. More Than a Friend" />
  <SongCard src="/songs/never-gonna-(give-you-up).mp3" title="5. Never Gonna (Give You Up)" />
  <SongCard src="/songs/the-rain-(its-pouring).mp3" title="6. The Rain (It's Pouring)" />
  <SongCard src="/songs/you-had-it-coming.mp3" title="7.You Had It Coming" />
</section>




<section style={{ marginBottom: '80px' }}>
  <h2>Past Work</h2>
  <p>
In the past few years I’ve been consistently releasing music under my artist name, finding my sound and working towards the EP that I’m sitting on today! Here’s some of my work from last year   </p>

  {/* Spotify embed */}
  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <iframe
      style={{ borderRadius: '12px' }}
      src="https://open.spotify.com/embed/track/0XIFG3ejSmBc8G7KduSzN4?utm_source=generator"
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>

    <iframe
      style={{ borderRadius: '12px' }}
      src="https://open.spotify.com/embed/track/3gJhkWZ7IsZh4Extb5ByGw?utm_source=generator"
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>

    <iframe
      style={{ borderRadius: '12px' }}
      src="https://open.spotify.com/embed/track/738vuZBzNtuPk9PrIUr4yN?utm_source=generator"
      width="100%"
      height="152"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  </div>
</section>

<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/ypJvQCgRluA?si=yatc4g-bZ77Hf8bT"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
  style={{ borderRadius: '12px', boxShadow: '0 0 20px #E4002B44' }}
></iframe>

<iframe
  width="100%"
  height="315"
  src="https://www.youtube.com/embed/ZUrVpWno9gg?si=P_znE6ylvGcKNH8j"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
  style={{
    borderRadius: '12px',
    boxShadow: '0 0 20px #E4002B44',
    marginTop: '24px', // ✅ adds spacing between the two
  }}
></iframe>

<SupportLetterBox />

<section>
  <h2>Contact / Links</h2>
  <p>Email: julian.munyard@gmail.com</p>
  <p>
    Instagram:{' '}
    <a
      href="https://www.instagram.com/julianmunyard/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#E4002B', textDecoration: 'underline', cursor: 'pointer' }}
    >
      @julianmunyard
    </a>
  </p>
</section>
      </main>
    </>
  )
}
