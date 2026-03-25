import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
<<<<<<< HEAD
import type { MessageImage } from "../types/Message";
=======
import type { MessageImage } from '../types';
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
interface MessageRowProps {
  role: 'user' | 'ai';
  content: string;
  time: string;
  isMarked: boolean;
  image?: MessageImage;
}

export default function MessageRow({ role, content, time, isMarked, image }: MessageRowProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const icon = role === 'user' ? 'bi-person' : 'bi-stars';
  const title = role === 'user' ? 'Siz' : 'Clinora AI köməkçi';

  const handleCopy = (): void => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => { });
  };

  const plainLines = content
    .split(/\n+/)
    .map((line) => line.trimEnd())
    .filter((line, index, lines) => line.length > 0 || (index > 0 && lines[index - 1].length > 0));

  return (
    <div className={`message-row ${role}`}>
      <div className="avatar">
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="bubble-wrap">
        <div className="bubble">
          <strong className="bubble-title">{title}:</strong>{' '}
          {isMarked ? (
              <div className="bubble-markdown prose prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none">
                <ReactMarkdown rehypePlugins={[remarkGfm]} remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
            </div>
          ) : (
            <span className="bubble-plain">
              {plainLines.map((line, index) => (
                <span key={`${time}-${index}`} className="bubble-line">
                  {line}
                </span>
              ))}
            </span>
          )}
          {image && (
            <div className="bubble-image-wrap">
              <img className="bubble-image" src={image.url} alt={image.name} />
            </div>
          )}
          <button
            className="copy-btn"
            type="button"
            title="Kopyala"
            aria-label="Mesajı kopyala"
            onClick={handleCopy}
          >
            <i className={`bi ${copied ? 'bi-clipboard-check' : 'bi-clipboard'}`}></i>
          </button>
        </div>
        <div className="msg-time">{time}</div>
      </div>
    </div>
  );
}
