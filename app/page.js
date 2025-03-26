'use client';

import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [showVideo, setShowVideo] = useState(true);
  const [hoverChaos, setHoverChaos] = useState(false);
  const [userText, setUserText] = useState('');
  const [showDevMenu, setShowDevMenu] = useState(false);

  const centerVideoRef = useRef(null);
  const videoRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // Custom cursor with lag and offset
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      // Смещение курсора - будет идти криво
      targetX = e.pageX - 40;
      targetY = e.pageY + 25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let rafId;
    const animateCursor = () => {
      if (cursorRef.current) {
        const currentX = parseFloat(cursorRef.current.style.left) || 0;
        const currentY = parseFloat(cursorRef.current.style.top) || 0;

        const dx = targetX - currentX;
        const dy = targetY - currentY;
        const speed = 0.1;

        cursorRef.current.style.left = currentX + dx * speed + 'px';
        cursorRef.current.style.top = currentY + dy * speed + 'px';
      }
      rafId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const video = centerVideoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.muted = false;
          })
          .catch(() => {
            video.muted = true;
            video.play();
          });
      }
    }
  }, []);

  // Weird effect for input: only 1 character can stay
  const handleTextChange = (e) => {
    const val = e.target.value;
    if (val.length > 1) {
      setUserText(val.slice(0, 1));
    } else {
      setUserText(val);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const chaosMessages = [
      '🧠 9999 LEVEL OF BRAINROT',
      '💀 ALLADIH\'N',
      '🥵 1 CHAR WAS TOO MUCH POWER',
      '👁 XXXKIFOZZZ',
      '🍕 SKIBIDI BEBRA PIZZA HOT',
      '🐸 JUST FROGGING',
      '🪦 RIP BRAIN CELLS',
      '🚽 SKIBIDI TOILET RIZZ OHIO',
      '🔊 ОТДЫХАЮ ПИШИ ПО ДЕЛУ НЕ ПО ДЕЛУ ЧС',
      '👽 [FREE] SUPERTRAP X ALIEN X DARKSPIN TYPE BEAT "EVIL MACHINE 3"',
    ];
  
    const randomMsg = chaosMessages[Math.floor(Math.random() * chaosMessages.length)];
    alert(randomMsg);
  };  

  // Buttons that vanish on hover
  const vanishOnHover = (e) => {
    e.target.style.opacity = '0';
    e.target.style.transition = 'opacity 0.2s ease-out';
    setTimeout(() => {
      e.target.style.opacity = '1';
    }, 1000);
  };

  return (
    <div className="App">
      {/* Custom cursor image */}
      <div className="custom-cursor" ref={cursorRef}>
        <img 
          alt="cursor"
          src="/cursor.jpg" 
          style={{ width: '150px', height: '150px' }}
        />
      </div>

      {/* Fullscreen video for first 3 seconds */}
      {showVideo && (
        <div className="video-overlay">
          <video
            ref={videoRef}
            src="/crazyVideo.mp4"
            autoPlay
            muted
            style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Main chaotic content */}
      {!showVideo && (
        <div className="main-content">
          <header className="brainrot-header">
            <button className="brainrot-button first" onMouseEnter={vanishOnHover}>
              HOME
            </button>
            <button
              className="brainrot-button second"
              onClick={() => setShowDevMenu(true)}
            >
              ABOUT DEVELOPERS
            </button>
            <button className="brainrot-button third" onMouseEnter={vanishOnHover}>
              WHATEVER
            </button>
          </header>

          <section className="insanity-section">
          <div className="flying-images">
            <img
              src="/randomImage1.jpg"
              alt="random1"
              className="spin-image one"
            />

            <img
              src="/randomImage2.webp"
              alt="random2"
              className="spin-image two"
            />
          </div>
            <div className="centered-text">
              <h1>WELCOME TO PURE BRAINROT!</h1>
              <p>This entire site is intentionally UGLY, WEIRD, and TOTALLY RANDOM.</p>
            </div>

            <form className="one-char-input" onSubmit={(e) => handleFormSubmit(e)}>
              <label>Type Something (only 1 char possible): </label>
              <input 
                type="text" 
                value={userText} 
                onChange={handleTextChange} 
              />
              <button type="submit" className="submit-chaos-button">UNLEASH 🔥</button>
            </form>

            <div
              className="random-box"
              onMouseEnter={() => setHoverChaos(true)}
              onMouseLeave={() => setHoverChaos(false)}
              style={{
                transform: hoverChaos ? 'translate(300px, -100px)' : 'translate(0, 0)',
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              <p>Try to hover me!</p>
            </div>

            {showDevMenu && (
              <div className="dev-menu">
                <button className="close-dev-menu" onClick={() => setShowDevMenu(false)}>
                  ✖ CLOSE
                </button>
                <h2>MEET THE DEVS 🧠</h2>
                <div className="dev-images">
                  <div className="dev-block">
                    <img src="/dev1.webp" alt="Dev 1" />
                    <p className="dev-caption">🗣️ xxxrusakovvv 🔥</p>
                  </div>
                  <div className="dev-block">
                    <img src="/dev2.jpg" alt="Dev 2" />
                    <p className="dev-caption">🗣️ xxxvvivanov16 🔥</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
