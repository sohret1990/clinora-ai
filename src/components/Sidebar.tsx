import React from 'react';
<<<<<<< HEAD
import type { HistoryItem } from "../types/HistoryItem";
import type { UserProfile } from "../types/UserProfile";
=======
import type { HistoryItem, UserProfile } from '../types';
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e

interface SidebarProps {
  theme: string;
  onToggleTheme: () => void;
  onNewChat: () => void;
  currentUser: UserProfile | null;
  historyItems: HistoryItem[];
}

export default function Sidebar({ theme, onToggleTheme, onNewChat, currentUser, historyItems }: SidebarProps) {
  return (
    <aside className="col-12 col-lg-3 col-xl-2">
      <div className="sidebar card border-0 shadow-sm h-100">
        <div className="card-body d-flex flex-column p-3 p-md-4">

          {/* Brand */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="brand-block d-flex align-items-center gap-2">
              <span className="brand-logo" aria-hidden="true">
                <svg
                  className="brand-logo-svg"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Clinora AI loqosu"
                >
                  <defs>
                    <linearGradient id="clinoraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7367f0" />
                      <stop offset="100%" stopColor="#28c76f" />
                    </linearGradient>
                  </defs>
                  <circle cx="32" cy="32" r="26" fill="none" stroke="url(#clinoraGrad)" strokeWidth="1.5" opacity="0.3" />
                  <g transform="translate(32, 28)">
                    <path d="M0,-6 C-3.5,-9 -8,-6 -8,-1 C-8,4 0,10 0,10 C0,10 8,4 8,-1 C8,-6 3.5,-9 0,-6 Z" fill="url(#clinoraGrad)" />
                  </g>
                  <g transform="translate(32, 45)" stroke="url(#clinoraGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.9">
                    <line x1="-2.5" y1="0" x2="2.5" y2="0" />
                    <line x1="0" y1="-2.5" x2="0" y2="2.5" />
                  </g>
                  <g stroke="url(#clinoraGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7">
                    <path d="M 8 32 L 14 32 L 16 28 L 18 36 L 20 32 L 26 32" />
                  </g>
                  <circle cx="46" cy="20" r="3.5" fill="none" stroke="url(#clinoraGrad)" strokeWidth="1.2" opacity="0.6" />
                  <circle cx="46" cy="20" r="5.5" fill="none" stroke="url(#clinoraGrad)" strokeWidth="0.9" opacity="0.4" />
                </svg>
              </span>
              <div>
                <h1 className="h6 mb-0 fw-bold brand-title">Clinora AI</h1>
                <p className="brand-subtitle mb-0">Rəqəmsal klinik zəka</p>
              </div>
            </div>
            <button
              className="btn btn-sm btn-icon btn-subtle"
              type="button"
              aria-label="Tema dəyiş"
              onClick={onToggleTheme}
            >
              <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'}`}></i>
            </button>
          </div>

          {/* New chat */}
          <button className="btn btn-primary w-100 mb-4" type="button" onClick={onNewChat}>
            <i className="bi bi-plus-lg me-2"></i>Yeni Chat
          </button>

          {/* History */}
          <div className="small text-uppercase text-muted fw-semibold mb-2">
            {currentUser ? 'Müraciətləriniz' : 'Qonaq müraciətləri'}
          </div>
          <div className="chat-history-list d-flex flex-column gap-2">
            {historyItems.length > 0 ? historyItems.map((item, index) => (
              <div
                key={item.id}
                className={`history-item${index === 0 ? ' active' : ''}`}
              >
                {item.label}
              </div>
            )) : (
              <div className="history-empty">
                Hələ müraciət yoxdur. İlk mesajınızı göndərin.
              </div>
            )}
          </div>

          {/* Support card */}
          <div className="mt-auto pt-4">
            <div className="card support-card border-0">
              <div className="card-body p-3">
                <div className="fw-semibold mb-1">Tibbi AI Paneli</div>
                <p className="small text-muted mb-2">
                  Bu UI-ni tibbi xidmət backend API-si ilə birləşdirə bilərsiniz.
                </p>
                <span className="badge text-bg-light">Bootstrap + React + TypeScript</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
}
