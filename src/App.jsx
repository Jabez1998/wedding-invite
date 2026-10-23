
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  MapPin,
  Music,
  Music2,
  Heart,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const WEDDING_DATE = new Date("2026-11-20T10:00:00+05:30");

const VENUE =
  "CSI Whitin Memorial Church, Pasumalai, Madurai - 625004";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(VENUE);

function getTimeLeft() {
  const difference = Math.max(0, WEDDING_DATE.getTime() - Date.now());

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="countdown-grid">
      {units.map((unit) => (
        <div className="countdown-item" key={unit.label}>
          <span className="countdown-number">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="countdown-label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (musicOn) {
        audio.pause();
        setMusicOn(false);
      } else {
        await audio.play();
        setMusicOn(true);
      }
    } catch {
      console.warn(
        "Add a supported music file at public/music.mp3 to enable background music."
      );
      setMusicOn(false);
    }
  };

  const openInvitation = async () => {
    setOpened(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const audio = audioRef.current;

    if (!audio) return;

    try {
      audio.volume = 0.5;
      await audio.play();
      setMusicOn(true);
    } catch (error) {
      console.warn("Unable to play wedding music:", error);
      setMusicOn(false);
    }
  };

  return (
    <main className="wedding-site">
      <audio ref={audioRef} src="/Instrumental.mp3" loop preload="none" />

      {/* Opening curtain screen */}
      <AnimatePresence>
        {!opened && (
          <motion.section
            className="curtain-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <motion.div
              className="curtain curtain-left"
              initial={{ x: 0 }}
              exit={{ x: "-105%" }}
              transition={{
                duration: 1.8,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            <motion.div
              className="curtain curtain-right"
              initial={{ x: 0 }}
              exit={{ x: "105%" }}
              transition={{
                duration: 1.8,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            <motion.div
              className="curtain-content"
              exit={{ opacity: 0, scale: 0.94, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <div className="gold-ornament">
                <Sparkles size={20} strokeWidth={1.2} />
              </div>

              <p className="eyebrow curtain-eyebrow">
                A beautiful beginning
              </p>

              <h1 className="curtain-names">
                Jabez <span>&</span> Asha
              </h1>

              <div className="gold-divider">
                <span />
                <Heart size={15} />
                <span />
              </div>

              <p className="curtain-date">20 · 11 · 2026</p>
              <p className="curtain-invite">
                Together with our families, we invite you to celebrate our
                special day.
              </p>

              <button
                className="open-button"
                onClick={openInvitation}
                type="button"
              >
                Open Invitation
                <span aria-hidden="true"> →</span>
              </button>

              <p className="curtain-hint">A little moment, a lifetime of love</p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Invitation website */}
      <motion.div
        className="invitation"
        initial={{ opacity: 0, y: 24 }}
        animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 1.1, delay: opened ? 0.8 : 0 }}
        style={{ visibility: opened ? "visible" : "hidden" }}
      >
        <header className="hero-section">
          <div className="hero-floating-hearts" aria-hidden="true">
            <Heart className="floating-heart heart-one" fill="currentColor" />
            <Heart className="floating-heart heart-two" fill="currentColor" />
            <Heart className="floating-heart heart-three" fill="currentColor" />
            <Heart className="floating-heart heart-four" fill="currentColor" />
            <Heart className="floating-heart heart-five" fill="currentColor" />
            <Heart className="floating-heart heart-six" fill="currentColor" />
          </div>


          <div className="hero-topline">
            <span>WITH LOVE & GRATITUDE</span>
            <Heart size={16} />
            <span>OUR WEDDING DAY</span>
          </div>

          <div className="hero-glow" />
          <div className="hero-content">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={opened ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5 }}
            >
              Together with our families
            </motion.p>

            <motion.h1
              className="hero-names"
              initial={{ opacity: 0, y: 25 }}
              animate={opened ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.7, duration: 1 }}
            >
              <span className="hero-name">Jabez</span>
              <Heart
                className="hero-heart"
                size={32}
                strokeWidth={1.4}
                fill="currentColor"
              />
              <span className="hero-name">Asha</span>
            </motion.h1>

            <motion.div
              className="hero-flourish"
              initial={{ scaleX: 0 }}
              animate={opened ? { scaleX: 1 } : {}}
              transition={{ delay: 2, duration: 0.8 }}
            >
              ✦ ───────── ✦
            </motion.div>

            <motion.p
              className="hero-message"
              initial={{ opacity: 0 }}
              animate={opened ? { opacity: 1 } : {}}
              transition={{ delay: 2.1 }}
            >
              Two hearts, one beautiful journey.
              <br />
              We would be honoured to have you with us.
            </motion.p>

            <div className="hero-date">
              <CalendarDays size={19} />
              <span>FRIDAY, NOVEMBER 20, 2026</span>
            </div>

            <a className="scroll-cue" href="#countdown">
              <span>DISCOVER OUR DAY</span>
              <span className="scroll-line" />
            </a>
          </div>
        </header>

        <section className="countdown-section" id="countdown">
          <p className="eyebrow">THE BIG DAY IS APPROACHING</p>
          <h2 className="section-title">Counting our blessings</h2>
          <p className="section-description">
            Every second brings us closer to a new chapter.
          </p>
          <Countdown />
        </section>

        <section className="story-section">
          <div className="story-card">
            <div className="story-icon">
              <Heart size={25} strokeWidth={1.3} />
            </div>
            <p className="eyebrow">A CELEBRATION OF LOVE</p>
            <h2 className="section-title">A new chapter begins</h2>
            <p className="story-copy">
              With grateful hearts and the blessings of our families, we
              invite you to join us as we begin our forever together.
              Your presence will make this day even more meaningful.
            </p>
            <div className="story-signature">Jabez & Asha</div>
          </div>
        </section>

        <section className="details-section" id="details">
          <p className="eyebrow">SAVE THE DATE</p>
          <h2 className="section-title">Join us for our wedding</h2>

          <div className="details-grid">
            <article className="detail-card">
              <div className="detail-icon">
                <CalendarDays size={24} />
              </div>
              <p className="detail-label">THE DATE</p>
              <h3>20 November 2026</h3>
              <p>Friday</p>
            </article>

            <article className="detail-card">
              <div className="detail-icon">
                <Clock size={24} />
              </div>
              <p className="detail-label">THE TIME</p>
              <h3>10:00 AM</h3>
              <p>Please join us for the ceremony</p>
            </article>

            <article className="detail-card venue-card">
              <div className="detail-icon">
                <MapPin size={24} />
              </div>
              <p className="detail-label">THE VENUE</p>
              <h3>CSI Whitin Memorial Church</h3>
              <p>Pasumalai, Madurai - 625004</p>
              <a
                className="map-button"
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
              >
                Get Directions
                <ExternalLink size={15} />
              </a>
            </article>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-ornament">✦</div>
          <p className="eyebrow">YOUR PRESENCE IS OUR PRESENT</p>
          <h2 className="closing-title">
            A day to remember,
            <br />
            a love to last forever.
          </h2>
          <p className="closing-names">
            <span>Jabez</span>
            <Heart
              className="closing-name-heart"
              size={22}
              fill="currentColor"
              strokeWidth={1.5}
            />
            <span>Asha</span>
          </p>
          <p className="closing-date">20 · 11 · 2026</p>
        </section>

        <section className="memory-verse-section" id="memory-verse">
          <div className="verse-ornament">
            <Heart size={20} strokeWidth={1.3} />
          </div>

          <p className="eyebrow">GROUNDED IN LOVE</p>

          <p className="verse-text">
            “Two are better than one; because they have a good
            reward for their labour.”
          </p>

          <p className="verse-reference">ECCLESIASTES 4:9</p>
        </section>

        <footer className="site-footer">
          Made with love
        </footer>

        <button
          className="music-button"
          type="button"
          onClick={toggleMusic}
          aria-label={musicOn ? "Turn music off" : "Turn music on"}
          title={musicOn ? "Turn music off" : "Turn music on"}
        >
          {musicOn ? <Music2 size={19} /> : <Music size={19} />}
        </button>
      </motion.div>
    </main>
  );
}
