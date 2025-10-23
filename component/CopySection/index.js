import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy, Check } from 'lucide-react';
import styles from '@/component/CopySection/index.module.css';

const CopySection = ({ roomId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.copyContainer}>
      <div className={styles.copyHeading}>Meeting ID</div>
      <div className={styles.copyDescription}>
        <span>{roomId}</span>
        <CopyToClipboard text={roomId} onCopy={handleCopy}>
          <div className={styles.tooltip}>
            <button className={styles.copyButton} aria-label="Copy to clipboard">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <span className={styles.tooltipText}>
              {copied ? 'Copied!' : 'Copy ID'}
            </span>
          </div>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default CopySection;