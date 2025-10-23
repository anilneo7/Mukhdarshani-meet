import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { FaVideo, FaPlus, FaArrowRight, FaGoogle } from 'react-icons/fa';
import Head from 'next/head';
import styles from '@/styles/home.module.css';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Clear any existing error when roomId changes
    if (error && roomId) {
      setError('');
    }
  }, [roomId, error]);

  const createAndJoin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId.trim()) {
      setError('Please enter a valid meeting code');
      return;
    }
    setIsLoading(true);
    router.push(`/${roomId.trim()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      joinRoom(e);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mukhdarshani Meet - Video Conferencing</title>
        <meta name="description" content="Secure video meetings by Mukhdarshani" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <FaVideo className={styles.logoIcon} />
          <span>Mukhdarshani Meet</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>Mukhdarshani Meet.</h1>
          <h2>An Anuvadini AI Product</h2>
          <p className={styles.subtitle}>
            We have built the online meeting service for secure business meetings and peronal meetings. It is free and available for all.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardContent}>
            <h2>Join or start a meeting</h2>

            <div className={styles.inputGroup}>
              <div className={`${styles.inputContainer} ${error ? styles.error : ''}`}>
                <input
                  type="text"
                  placeholder="Enter a code or link"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={styles.input}
                  disabled={isLoading}
                />
                {error && <span className={styles.errorText}>{error}</span>}
              </div>
              <button
                onClick={joinRoom}
                className={`${styles.button} ${styles.primaryButton}`}
                disabled={isLoading}
              >
                {isLoading ? 'Joining...' : 'Join'}
                <FaArrowRight className={styles.buttonIcon} />
              </button>
            </div>

            <div className={styles.separator}>
              <span>OR</span>
            </div>

            <button
              onClick={createAndJoin}
              className={`${styles.button} ${styles.secondaryButton}`}
              disabled={isLoading}
            >
              <FaPlus className={styles.buttonIcon} />
              New Meeting
            </button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Mukhdarshani Meet. All rights reserved.</p>
      </footer>
    </div>
  );
}
