import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import type { AuthPayload } from "../types/AuthPayload";
=======
import type { AuthPayload } from '../types';
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (payload: AuthPayload) => { success: boolean; error?: string };
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
  const [name, setName] = useState<string>('');
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setMode('login');
      setName('');
      setIdentifier('');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const nextName = name.trim();
    const nextIdentifier = identifier.trim();
    const nextPassword = password.trim();
    const nextConfirmPassword = confirmPassword.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[0-9\s().-]{7,20}$/;

    if (!nextIdentifier || !nextPassword) {
      setError('İstifadəçi adı və şifrə daxil edin.');
      return;
    }

    if (!emailPattern.test(nextIdentifier) && !phonePattern.test(nextIdentifier)) {
      setError('İstifadəçi adı email və ya mobil nömrə olmalıdır.');
      return;
    }

    if (nextPassword.length < 6) {
      setError('Şifrə ən azı 6 simvol olmalıdır.');
      return;
    }

    if (mode === 'register' && !nextName) {
      setError('Qeydiyyat üçün ad daxil edin.');
      return;
    }

    if ((mode === 'register' || mode === 'reset') && nextPassword !== nextConfirmPassword) {
      setError('Şifrələr eyni deyil.');
      return;
    }

    const result = onLogin({
      mode,
      name: nextName,
      identifier: nextIdentifier,
      password: nextPassword,
    });

    if (!result.success) {
      setError(result.error ?? 'Giriş mümkün olmadı.');
    }
  };

  return (
    <div className="login-modal-backdrop" role="presentation">
      <div
        className="login-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="loginModalTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
          <div>
            <h3 id="loginModalTitle" className="h5 mb-1">
              {mode === 'register' ? 'Qeydiyyat' : mode === 'reset' ? 'Şifrəni yenilə' : 'Giriş et'}
            </h3>
            <p className="login-note mb-0">
              {mode === 'reset'
                ? 'İstifadəçi adı və yeni şifrə daxil edin. Bu demo versiyada bərpa lokal olaraq aparılır.'
                : 'Giriş məcburi deyil. İstifadəçi adı kimi email və ya mobil nömrə istifadə edə bilərsiniz.'}
            </p>
          </div>
          <button className="btn btn-sm btn-subtle" type="button" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="login-mode-switch mb-3">
          <button
            className={`login-mode-btn${mode === 'login' ? ' active' : ''}`}
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
          >
            Daxil ol
          </button>
          <button
            className={`login-mode-btn${mode === 'register' ? ' active' : ''}`}
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
          >
            Qeydiyyat
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' ? (
            <>
              <label className="login-form-label" htmlFor="loginName">Ad soyad</label>
              <input
                id="loginName"
                className="form-control mb-3"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Məsələn, Aysel Məmmədova"
              />
            </>
          ) : null}

          <label className="login-form-label" htmlFor="loginIdentifier">İstifadəçi adı</label>
          <input
            id="loginIdentifier"
            className="form-control mb-3"
            type="text"
            value={identifier}
            onChange={(event) => {
              setIdentifier(event.target.value);
              setError('');
            }}
            placeholder="Email və ya mobil nömrə"
          />

          <label className="login-form-label" htmlFor="loginPassword">Şifrə</label>
          <div className="password-field mb-3">
            <input
              id="loginPassword"
              className="form-control"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError('');
              }}
              placeholder={mode === 'reset' ? 'Yeni şifrənizi daxil edin' : 'Şifrənizi daxil edin'}
            />
            <button
              className="password-toggle-btn"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Şifrəni gizlət' : 'Şifrəni göstər'}
            >
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>

          {mode === 'register' || mode === 'reset' ? (
            <>
              <label className="login-form-label" htmlFor="loginConfirmPassword">Şifrə təkrarı</label>
              <input
                id="loginConfirmPassword"
                className="form-control mb-3"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setError('');
                }}
                placeholder="Şifrəni yenidən daxil edin"
              />
            </>
          ) : null}

          {error ? <div className="login-error mb-3">{error}</div> : null}

          <div className="login-note mb-3">
            Bu demo versiyada hesab məlumatları yalnız bu cihazın brauzerində localStorage daxilində saxlanır.
          </div>

          <div className="login-link-row mb-3">
            {mode === 'login' ? (
              <>
                <button className="login-text-btn" type="button" onClick={() => { setMode('reset'); setError(''); }}>
                  Şifrəni unutmusunuz?
                </button>
                <button className="login-text-btn" type="button" onClick={() => { setMode('register'); setError(''); }}>
                  Hesabınız yoxdur? Qeydiyyat
                </button>
              </>
            ) : null}
            {mode === 'register' ? (
              <button className="login-text-btn" type="button" onClick={() => { setMode('login'); setError(''); }}>
                Artıq hesab var? Daxil ol
              </button>
            ) : null}
            {mode === 'reset' ? (
              <button className="login-text-btn" type="button" onClick={() => { setMode('login'); setError(''); }}>
                Girişə qayıt
              </button>
            ) : null}
          </div>

          <div className="d-flex flex-wrap justify-content-between gap-2">
            <button className="btn btn-subtle login-guest-btn" type="button" onClick={onClose}>
              Qonaq kimi davam et
            </button>
            <div className="d-flex flex-wrap justify-content-end gap-2">
            <button className="btn btn-subtle" type="button" onClick={onClose}>Bağla</button>
            <button className="btn btn-primary" type="submit">
              <i className={`bi ${mode === 'login' ? 'bi-box-arrow-in-right' : mode === 'register' ? 'bi-person-plus' : 'bi-shield-lock'} me-1`}></i>
              {mode === 'login' ? 'Daxil ol' : mode === 'register' ? 'Qeydiyyatdan keç' : 'Şifrəni yenilə'}
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
