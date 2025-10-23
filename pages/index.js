import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { FaVideo, FaPlus, FaArrowRight, FaGoogle, FaSpinner } from 'react-icons/fa';
import Head from 'next/head';
import styles from '@/styles/home.module.css';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state to trigger animations
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    // Clear any existing error when roomId changes
    if (error && roomId) {
      setError('');
    }
  }, [roomId, error]);

  const createAndJoin = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsCreating(true);
    setIsLoading(true);

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };

  const joinRoom = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!roomId.trim()) {
      setError('Please enter a valid meeting code');
      return;
    }

    setIsJoining(true);
    setIsLoading(true);

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    router.push(`/${roomId.trim()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      joinRoom(e);
    }
  };

  // Reset loading states if navigation is aborted
  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(false);
      setIsJoining(false);
      setIsCreating(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Mukhdarshani Meet - Video Conferencing</title>
        <meta name="description" content="Secure video meetings by Mukhdarshani" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className={styles.header}>
        <motion.div
          className={styles.logo}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaVideo className={styles.logoIcon} />
          <span>Mukhdarshani Meet</span>
        </motion.div>
      </header>

      <main className={styles.main}>
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1>Mukhdarshani Meet</h1>
          <h2>An Anuvadini AI Product</h2>
          <p className={styles.subtitle}>
            We've built the online meeting service for secure business and personal meetings.
            It's free, secure, and available to everyone.
          </p>
        </motion.div>

        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className={styles.cardContent}>
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
            >
              Start or join a meeting
            </motion.h2>

            <motion.div
              className={styles.inputGroup}
              variants={containerVariants}
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
            >
              <motion.div
                className={`${styles.inputContainer} ${error ? styles.error : ''}`}
                variants={itemVariants}
              >
                <input
                  type="text"
                  placeholder="Enter a code or link"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={styles.input}
                  disabled={isLoading}
                  aria-label="Meeting code or link"
                />
                {error && <span className={styles.errorText} role="alert">{error}</span>}
              </motion.div>

              <motion.button
                onClick={joinRoom}
                className={`${styles.button} ${styles.primaryButton}`}
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                variants={itemVariants}
                aria-label="Join meeting"
              >
                {isJoining ? (
                  <>
                    <span className={styles.loading} aria-hidden="true" />
                    Joining...
                  </>
                ) : (
                  <>
                    Join
                    <FaArrowRight className={styles.buttonIcon} />
                  </>
                )}
              </motion.button>
            </motion.div>

            <motion.div
              className={styles.separator}
              variants={itemVariants}
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
            >
              <span>OR</span>
            </motion.div>

            <motion.button
              onClick={createAndJoin}
              className={`${styles.button} ${styles.secondaryButton}`}
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              variants={itemVariants}
              aria-label="Create new meeting"
            >
              {isCreating ? (
                <>
                  <FaSpinner className={`${styles.buttonIcon} ${styles.spin}`} />
                  Creating...
                </>
              ) : (
                <>
                  <FaPlus className={styles.buttonIcon} />
                  New Meeting
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </main>

      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p>© {new Date().getFullYear()} Mukhdarshani Meet. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}
