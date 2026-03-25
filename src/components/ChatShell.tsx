import React, { useRef, useEffect } from 'react';
<<<<<<< HEAD
import type { Message, MessageImage } from "../types/Message";
import type { UserProfile } from "../types/UserProfile";
=======
import type { Message, MessageImage, UserProfile } from '../types';
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
import MessageRow from './MessageRow';
import SuggestionChips from './SuggestionChips';

interface ChatShellProps {
  messages: Message[];
  showSuggestions: boolean;
  input: string;
  isLoading: boolean;
  model: string;
  currentUser: UserProfile | null;
  pendingImage: MessageImage | null;
  onInputChange: (val: string) => void;
  onImageSelect: (file: File | null) => void | Promise<void>;
  onImageRemove: () => void;
  onModelChange: (val: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onSuggestionClick: (prompt: string) => void;
  onClear: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
  maxChars: number;
}

export default function ChatShell({
  messages,
  showSuggestions,
  input,
  isLoading,
  model,
  currentUser,
  pendingImage,
  onInputChange,
  onImageSelect,
  onImageRemove,
  onModelChange,
  onSubmit,
  onSuggestionClick,
  onClear,
  onOpenLogin,
  onLogout,
  maxChars,
}: ChatShellProps) {
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef     = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages / loading change
  useEffect(() => {
    chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 180)}px`;
  }, [input]);

  const charLen   = input.length;
  const charClass =
    'char-counter ms-auto me-1' +
    (charLen >= maxChars       ? ' danger'
    : charLen > maxChars * 0.85 ? ' warn'
    : '');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] ?? null;
    void onImageSelect(file);
    e.target.value = '';
  };

  return (
    <main className="col-12 col-lg-9 col-xl-10">
      <section className="chat-shell card border-0 shadow-sm h-100">

        {/* ── Header ── */}
        <header className="card-header border-0 px-3 px-md-4 py-3">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="assistant-identity">
              <div className="assistant-logo" aria-hidden="true">
                <i className="bi bi-shield-check"></i>
              </div>
              <div>
                <h2 className="h5 mb-1 assistant-name">Clinora AI köməkçi</h2>
                <p className="text-muted small mb-0">
                  <span className="online-dot" aria-hidden="true"></span>
                  Aktiv · Təhlükəsiz dialoq pəncərəsi
                </p>
              </div>
            </div>
            <div className="header-actions d-flex align-items-center gap-2">
              {currentUser ? (
                <>
                  <div className="auth-chip" title={currentUser.identifier}>
                    <span className="auth-chip-dot" aria-hidden="true"></span>
                    <span>{currentUser.name}</span>
                  </div>
                  <button
                    className="btn btn-sm btn-subtle btn-icon"
                    type="button"
                    onClick={onLogout}
                    title="Çıxış"
                    aria-label="Çıxış"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-sm btn-subtle btn-icon"
                  type="button"
                  onClick={onOpenLogin}
                  title="Giriş et"
                  aria-label="Giriş et"
                >
                  <i className="bi bi-person-circle"></i>
                </button>
              )}
              <select
                className="form-select form-select-sm header-model-select"
                value={model}
                title="Model seç"
                aria-label="Model seç"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onModelChange(e.target.value)}
              >
<<<<<<< HEAD
                <option value="llama-3.3-70b-versatile">LLaMA 3.3 70B Versatile</option>
=======
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
                <option value="gpt">GPT-5.3-Codex</option>
                <option value="gemini">Gemini Pro</option>
                <option value="custom">Custom Model</option>
              </select>
              <button
                className="btn btn-sm btn-subtle btn-icon"
                type="button"
                onClick={onClear}
                title="Təmizlə"
                aria-label="Təmizlə"
              >
                <i className="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </header>

        {/* ── Chat body ── */}
        <div ref={chatBodyRef} className="chat-body card-body px-3 px-md-4 py-3">
          {messages.map((msg) => (
            <MessageRow
              isMarked={msg.isMarked}
              image={msg.image}
              key={msg.id}
              role={msg.role}
              content={msg.content}
              time={msg.time}
            />
          ))}

          {isLoading && (
            <div className="message-row ai">
              <div className="avatar"><i className="bi bi-stars"></i></div>
              <div className="bubble-wrap">
                <div className="bubble typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}

          {showSuggestions && !isLoading && (
            <SuggestionChips onSelect={onSuggestionClick} />
          )}
        </div>

        {/* ── Footer / input ── */}
        <footer className="card-footer border-0 px-3 px-md-4 pb-3 pt-2">
          <form ref={formRef} className="input-wrap" onSubmit={onSubmit} autoComplete="off">
            <input
              ref={fileInputRef}
              className="visually-hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {pendingImage && (
              <div className="attachment-preview">
                <img className="attachment-thumb" src={pendingImage.url} alt={pendingImage.name} />
                <div className="attachment-meta">
                  <strong>{pendingImage.name}</strong>
                  <span>Şəkil əlavə edildi</span>
                </div>
                <button className="attachment-remove-btn" type="button" onClick={onImageRemove} aria-label="Şəkli sil">
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            )}
            <textarea
              ref={textareaRef}
              className="form-control"
              rows={1}
              placeholder="Mesajınızı yazın... (Enter = göndər, Shift+Enter = yeni sətir)"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="input-actions d-flex align-items-center gap-2 mt-2">
              <button className="btn btn-subtle btn-sm" type="button" aria-label="Şəkil əlavə et" onClick={() => fileInputRef.current?.click()}>
                <i className="bi bi-paperclip"></i>
              </button>
              <span className={charClass}>{charLen} / {maxChars}</span>
              <button
                className="btn btn-primary btn-sm"
                type="submit"
                disabled={(charLen === 0 && !pendingImage) || charLen > maxChars || isLoading}
              >
                <i className="bi bi-send-fill me-1"></i>Göndər
              </button>
            </div>
          </form>
        </footer>

      </section>
    </main>
  );
}
