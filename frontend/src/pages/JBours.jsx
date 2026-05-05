import { TRADING_PLATFORM_URL } from '../config/externalLinks';

export default function JBours() {
  return (
    <iframe
      title="JBours"
      src={TRADING_PLATFORM_URL}
      className="jbours-direct-frame"
      referrerPolicy="no-referrer"
      allow="fullscreen; clipboard-read; clipboard-write"
    />
  );
}
