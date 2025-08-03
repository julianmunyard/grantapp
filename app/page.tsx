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
    fontSize: '60px',
    margin: 0,
    lineHeight: 1,
    fontFamily: 'Geist Mono, monospace',
    fontWeight: 'bold',
  }}
>
  JULIAN MUNYARD
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
  I'm Julian Munyard — a multidisciplinary musician, producer, and creator. This page outlines my creative practice, current projects, and my vision for using the ArtsPay Foundation grant to build deeper connections between sound, visual tools, and the communities that engage with them. I recently moved from the rural town of Beerwah in the Sunshine Coast of Queensland where I grew up, to Sydney – purely to be closer to what I feel is a better music scene with more opportunities for me and my career as an artist.
</p>

<div style={{ marginTop: '24px' }}>
  <img
    src="/000014720035.JPG"
    alt="Julian standing in sunlight near arched door"
    style={{
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
<br /><br />

<p style={{ lineHeight: '1.6', fontSize: '16px' }}>
  I started producing music at 17 in my parents home in Beerwah, figuring out how to use programs like Logic Pro. By 20 I was recording any chance I could get, and at 21 (last year), I was invited to live in Sydney by some friends who were also chasing the same dream. Finding those like-minded people was something I couldn’t do in my hometown, and the move has been a crucial part of my journey toward finishing my next body of work.
</p>

<br />

<p style={{ lineHeight: '1.6', fontSize: '16px' }}>
  I've recorded an EP of 6 tracks which have been recorded in my Sydney sharehouse with only the equipment available to me. The songs are early to mid 80s Boogie Funk inspired tunes. During that era, they would usually roll in over a few days and cut the tracks with a drum machine, some synthesizers and one engineer. So I wrote my songs with that in mind.
</p>

<br />

<p style={{ lineHeight: '1.6', fontSize: '16px' }}>
  I was heavily inspired by songs released on reissue labels such as Numero Group and the likes of. Early 80s boogie was a lot like 60s soul in that way — there was just so much of it created and not all of it was successful, so you have these great tracks that got lost along the way. A lot of those old songs have influenced me to write this collection of tunes.
</p>
  </div>
</section>




<section style={{ marginBottom: '80px', position: 'relative', zIndex: 10 }}>
  <h2>What I’ll Do With the Grant</h2>

<p style={{ lineHeight: '1.6', fontSize: '16px' }}>
  This grant would be used to help put out the body of work that I’ve been making in Sydney this year.
  I plan to use this funding for visuals, a marketing budget, and importantly – collaboration and mixing/mastering time with{' '}
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

  This funding feels especially important right now. I’ve spent the last 9 months building my creative network in Sydney, writing and producing the music, connecting with industry — along with my showcase performances at Australia’s music conference <strong>BIGSOUND</strong>. I now require the funding to finish additional mixing and mastering for the tracks as well as investment into marketing.
  
  <br /><br />

  The momentum built here with my professional connections and social media reach is time sensitive due to the distributor <strong>Believe</strong> wanting to get the record out before the end of the year — which admittedly, I do as well! Tass from Believe reached out after watching my BIGSOUND showcase last year. More so, there is a time crunch to mix and master, film content, and completely wrap up the production.
</p>

<p style={{ lineHeight: '1.6', fontSize: '16px', marginTop: '40px' }}>
  My short form content from last year did great numbers and gained me over 10K followers on Instagram, with some videos doing over 250K views and lots of new fans.
</p>

<div style={{ margin: '24px 0' }}>
  <InstagramEmbed />
</div>

<p style={{ lineHeight: '1.6', fontSize: '16px' }}>
  For this next project, I want to apply that same approach — making content that connects — but with the added support of a proper marketing budget.
  That would allow me to put some targeted ad spend behind it, helping the music reach more people and giving it the best possible chance to land. 

  <br /><br />

  Touching on the theme and vision for the music: nostalgia is a big part of it for me — bringing back the authentic sounds and aesthetic of the early 80s.
  I’ve always been obsessed with the past and in keeping old things alive, and more importantly, doing anything that is real, things that you can feel, see and almost touch.

<br /><br />

<p style={{ lineHeight: '1.6', fontSize: '16px' }}>
  Which ties into my adjacent project, the{' '}
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
  </a>{' '}
  — a custom-built web tool that allows listeners to explore music stem by stem, remix it live in the browser, and engage with it in a more playful, tactile way. First and foremost, the Munyard Mixer is a tool for artists, so that their fans can experience their music on a deeper level, all within a simple website that can be accessed via the artist’s linktree or similar.
</p>

<br /><br />


<div style={{ margin: '40px 0', textAlign: 'center' }}>

  <a
    href="https://munyardmixer.com/artist/jules-red-theme/millionaire"
    target="_blank"
    rel="noopener noreferrer"
    title="Go to Munyard Mixer"
    style={{
      position: 'relative',
      display: 'inline-block',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #E4002B',
      textDecoration: 'none',
    }}
  >
    <img
      src="/Screenshot 2025-08-03 at 6.03.25 pm.png"
      alt="Munyard Mixer screenshot"
      style={{
        width: '100%',
        maxWidth: '400px',
        display: 'block',
        transition: 'filter 0.2s ease-in-out',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'Geist Mono, monospace',
        fontSize: '20px',
        opacity: 0,
        transition: 'opacity 0.2s ease-in-out',
        pointerEvents: 'none',
      }}
      className="hover-overlay"
    >
      Go to Munyard Mixer
    </div>
  </a>
</div>

<style>
  {`
    a:hover .hover-overlay {
      opacity: 1 !important;
    }
  `}
</style>




  <br /><br />

  I’ve been building this site independently to push how music can be experienced digitally, and I believe it reflects my broader artistic vision: bridging sound, technology, and storytelling. 
  This sort of tactile way of experiencing music is needed now more than ever in the age of AI, and the Munyard Mixer is a nod to a simpler time.

  <br /><br />

  This grant would support the continued development of this website, and sufficient ad spend would be allocated towards marketing it to the right audience (i.e. artists in Australia and worldwide who are actively making and releasing music).
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
  My focus moving to Sydney has also been collaboration in all areas, as there are not nearly as many artists pursuing my style of music in my home town.
  I was first invited to Sydney by{' '}
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
  , who I first became a huge fan of in 2021 with his project LAZYWAX.
  One of Nathan’s (KESMAR)’s bigger achievements in the last year is being the creative engine behind Sydney artist{' '}
  <a
    href="https://www.instagram.com/donwestmusic/"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: '#E4002B',
      textDecoration: 'underline',
      cursor: 'pointer',
    }}
  >
    DON WEST
  </a>
  , and his breakthrough on the scene in the last year, co-writing and producing both the 2024 EP and the 2025 debut album, crafting old soul music that’s resonated with millions of listeners and established DON WEST as a major force in Australia’s soul revival.
  I now have the honor of being great friends with him and also roommates.

  <br /><br />

  This alone is enough to see why I wish to have him involved in my project by having KESMAR mix and master the record, which in turn requires funds (approx $2500).
  Our friendship has been pivotal in my journey as an artist, and I strongly believe that his involvement in this project will advance my career by dramatically enhancing the sonics of it.

  <br /><br />

  I've been writing with the very talented{' '}
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
  </a>
  , who has become a dear friend, and we have been writing songs together with a plan to write a few more before going to a studio to properly record them.
  These sessions are expensive and require planning and preparation to be able to get the best result. I hope to have them be engineered by{' '}
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
  . Bakani is working on his debut EP, which I have been producing and mixing.
  This has been a learning experience on its own and we’ve been working hard to make this project come to life.

  <br /><br />

  Recording Lucy and Bakani has been a pleasure and I believe we have made quality work, although I have been doing these recording sessions for free because I believe in both of them and want to elevate them as artists.

  <br /><br />

Another collaboration I want to make a reality is Australian director{' '}
<a
  href="https://www.instagram.com/levi.cranston/"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    color: '#E4002B',
    textDecoration: 'underline',
    cursor: 'pointer',
  }}
>
  Levi Cranston
</a>
, who has made music videos for San Cisco, Logan Priest and Feviland.
Making a video with Levi will naturally incur production costs, but I believe a strong visual image is highly important for my music as it relies heavily on the aesthetics of the early 80s, and Levi is someone who could make that happen.
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
