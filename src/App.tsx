import React, { useState, useRef, useCallback, useEffect } from 'react';
<<<<<<< HEAD
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, clearMessages, updateMessageContent } from './store/actions/chatActions';
import { fetchMessages } from './store/actions/chatAsyncActions';
import type { RootState, AppDispatch } from './store';
import type { ChatState } from './types/chatTypes';

import Sidebar from './components/Sidebar';
import ChatShell from './components/ChatShell';
import LoginModal from './components/LoginModal.tsx';
import type { StoredAccount } from "./types/StoredAccount.ts";
import type { PersistedChatState } from "./types/PersistedChatState.ts";
import type { Message, MessageImage } from "./types/Message.ts";
import type { AuthPayload } from "./types/AuthPayload.ts";
import type { HistoryItem } from "./types/HistoryItem.ts";
import type { UserProfile } from "./types/UserProfile.ts";
import { streamAi } from './ai-api/groqApi';


=======
import Sidebar from './components/Sidebar';
import ChatShell from './components/ChatShell';
import LoginModal from './components/LoginModal.tsx';
import type { AuthPayload, HistoryItem, Message, MessageImage, PersistedChatState, StoredAccount, UserProfile } from './types';
import { streamAi } from './ai-api/groqApi';

>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
const MAX_CHARS = 1000;
const AUTH_STORAGE_KEY = 'clinora-auth-user';
const ACCOUNT_STORAGE_PREFIX = 'clinora-account:';
const CHAT_STORAGE_PREFIX = 'clinora-chat-state:';

function nowTime(): string {
    return new Intl.DateTimeFormat('az-AZ', { hour: '2-digit', minute: '2-digit' }).format(new Date());
}

const WELCOME_CONTENT =
    'Salam! Mən Clinora AI tibbi köməkçisiyəm. Simptomlarınızı paylaşın, sizi uyğun istiqamətə yönləndirim.';

function createWelcomeMessage(id: number): Message {
    return { role: 'ai', content: WELCOME_CONTENT, time: nowTime(), id, isMarked: false };
}

function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

function normalizePhone(phone: string): string {
    return phone.replace(/\D/g, '');
}

function normalizeIdentifier(identifier: string): string {
    const trimmed = identifier.trim();
    return trimmed.includes('@') ? normalizeEmail(trimmed) : normalizePhone(trimmed);
}

function getIdentifierType(identifier: string): 'email' | 'phone' {
    return identifier.includes('@') ? 'email' : 'phone';
}

function isValidMessageImage(value: unknown): value is MessageImage {
    return typeof value === 'object'
        && value !== null
        && typeof (value as MessageImage).name === 'string'
        && typeof (value as MessageImage).url === 'string'
        && typeof (value as MessageImage).mimeType === 'string';
}

async function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result ?? ''));
        reader.onerror = () => reject(new Error('Şəkil oxunmadı.'));
        reader.readAsDataURL(file);
    });
}

function isValidUserProfile(value: unknown): value is UserProfile {
    return typeof value === 'object'
        && value !== null
        && typeof (value as UserProfile).name === 'string'
        && typeof (value as UserProfile).identifier === 'string'
        && ((value as UserProfile).identifierType === 'email' || (value as UserProfile).identifierType === 'phone');
}

function isValidStoredAccount(value: unknown): value is StoredAccount {
    return isValidUserProfile(value)
        && typeof (value as StoredAccount).password === 'string';
}

function getChatStorageKey(user: UserProfile | null): string {
    return `${CHAT_STORAGE_PREFIX}${user ? normalizeIdentifier(user.identifier) : 'guest'}`;
}

function getAccountStorageKey(identifier: string): string {
    return `${ACCOUNT_STORAGE_PREFIX}${normalizeIdentifier(identifier)}`;
}

function loadCurrentUser(): UserProfile | null {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!savedUser) {
        return null;
    }

    try {
        const parsed = JSON.parse(savedUser) as unknown;
        return isValidUserProfile(parsed)
            ? {
                name: parsed.name.trim(),
                identifier: normalizeIdentifier(parsed.identifier),
                identifierType: getIdentifierType(normalizeIdentifier(parsed.identifier)),
            }
            : null;
    } catch {
        return null;
    }
}

function saveStoredAccount(account: StoredAccount): void {
    localStorage.setItem(getAccountStorageKey(account.identifier), JSON.stringify(account));
}

function loadStoredAccount(identifier: string): StoredAccount | null {
    const savedProfile = localStorage.getItem(getAccountStorageKey(identifier));

    if (!savedProfile) {
        return null;
    }

    try {
        const parsed = JSON.parse(savedProfile) as unknown;
        return isValidStoredAccount(parsed)
            ? {
                name: parsed.name.trim(),
                identifier: normalizeIdentifier(parsed.identifier),
                identifierType: getIdentifierType(normalizeIdentifier(parsed.identifier)),
                password: parsed.password,
            }
            : null;
    } catch {
        return null;
    }
}

function getNextMessageId(messages: Message[]): number {
    return Math.max(...messages.map((message) => message.id), 0) + 1;
}

function getDefaultChatState(): PersistedChatState {
    return {
        messages: [createWelcomeMessage(1)],
<<<<<<< HEAD
        model: 'llama-3.3-70b-versatile',
=======
        model: 'gpt',
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
    };
}

function loadChatState(user: UserProfile | null): PersistedChatState {
    const savedState = localStorage.getItem(getChatStorageKey(user));

    if (!savedState) {
        return getDefaultChatState();
    }

    try {
        const parsed = JSON.parse(savedState) as Partial<PersistedChatState>;
        const messages = Array.isArray(parsed.messages) && parsed.messages.length > 0
            ? parsed.messages.filter((message): message is Message => (
                typeof message?.id === 'number'
                && (message?.role === 'user' || message?.role === 'ai')
                && typeof message?.content === 'string'
                && typeof message?.time === 'string'
                && (typeof message?.isMarked === 'boolean' || typeof message?.isMarked === 'undefined')
                && (typeof message?.image === 'undefined' || isValidMessageImage(message?.image))
            ))
            : [];

        return {
            messages: messages.length > 0 ? messages : getDefaultChatState().messages,
<<<<<<< HEAD
            model: typeof parsed.model === 'string' ? parsed.model : 'llama-3.3-70b-versatile',
=======
            model: typeof parsed.model === 'string' ? parsed.model : 'gpt',
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
        };
    } catch {
        return getDefaultChatState();
    }
}

function getInitialAppState(): { user: UserProfile | null; chatState: PersistedChatState } {
    const user = loadCurrentUser();
    return {
        user,
        chatState: loadChatState(user),
    };
}

export default function App() {
    const initialStateRef = useRef<{ user: UserProfile | null; chatState: PersistedChatState } | null>(null);

    if (!initialStateRef.current) {
        initialStateRef.current = getInitialAppState();
    }
    
    const { user: initialUser, chatState: initialChatState } = initialStateRef.current;
    const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') ?? 'light');
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(initialUser);
<<<<<<< HEAD
    const dispatch = useDispatch<AppDispatch>();
    const messages = useSelector((state: RootState) => state.chat.messages);
=======
    const [messages, setMessages] = useState<Message[]>(initialChatState.messages);
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
    const [showSuggestions, setShowSuggestions] = useState<boolean>(initialChatState.messages.length === 1);
    const [input, setInput] = useState<string>('');
    const [pendingImage, setPendingImage] = useState<MessageImage | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [model, setModel] = useState<string>(initialChatState.model);
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const idRef = useRef<number>(getNextMessageId(initialChatState.messages));

    const applyChatState = useCallback((chatState: PersistedChatState): void => {
<<<<<<< HEAD
        dispatch(clearMessages());
        chatState.messages.forEach((msg) => dispatch(addMessage(msg)));
=======
        setMessages(chatState.messages);
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
        setModel(chatState.model);
        setShowSuggestions(chatState.messages.length === 1);
        setInput('');
        setIsLoading(false);
        idRef.current = getNextMessageId(chatState.messages);
<<<<<<< HEAD
    }, [dispatch]);
=======
    }, []);
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-mode' : '';
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
            return;
        }

        localStorage.removeItem(AUTH_STORAGE_KEY);
    }, [currentUser]);

    useEffect(() => {
        const chatState: PersistedChatState = { messages, model };
        localStorage.setItem(getChatStorageKey(currentUser), JSON.stringify(chatState));
    }, [messages, model, currentUser]);

    const toggleTheme = (): void => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

<<<<<<< HEAD
    // Redux version of addMessage

    const handleAddMessage = useCallback((role: 'user' | 'ai', content: string): void => {
        const msg: Message = { role, content, time: nowTime(), id: idRef.current++, isMarked: false };
        dispatch(addMessage(msg));
    }, [dispatch]);

    // Async thunk example: çağırmaq üçün bir funksiya
    const handleFetchMessages = useCallback(() => {
        dispatch(fetchMessages());
    }, [dispatch]);
=======
    const addMessage = useCallback((role: 'user' | 'ai', content: string): void => {
        setMessages((prev) => [
            ...prev,
            { role, content, time: nowTime(), id: idRef.current++, isMarked: false },
        ]);
    }, []);
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e

    const handleImageSelect = useCallback(async (file: File | null): Promise<void> => {
        if (!file) {
            setPendingImage(null);
            return;
        }

        if (!file.type.startsWith('image/')) {
            alert('Yalnız şəkil faylı seçin.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Şəkil maksimum 5 MB ola bilər.');
            return;
        }

        const url = await fileToDataUrl(file);
        setPendingImage({ name: file.name, url, mimeType: file.type });
    }, []);

    const handleImageRemove = useCallback((): void => {
        setPendingImage(null);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const text = input.trim();
        const attachedImage = pendingImage;
        if ((!text && !attachedImage) || isLoading || text.length > MAX_CHARS) return;

        setShowSuggestions(false);
        setInput('');
        setPendingImage(null);
        setIsLoading(true);

        const userMsgId = idRef.current++;
        const aiMsgId = idRef.current++;

<<<<<<< HEAD
        // Add user message + empty AI placeholder in Redux
        const userMsg: Message = { role: 'user', content: text, time: nowTime(), id: userMsgId, isMarked: false, image: attachedImage ?? undefined };
        const aiMsg: Message = { role: 'ai', content: '', time: nowTime(), id: aiMsgId, isMarked: false };
        dispatch(addMessage(userMsg));
        dispatch(addMessage(aiMsg));
=======
        // Add user message + empty AI placeholder in one state update
        setMessages((prev) => [
            ...prev,
            { role: 'user', content: text, time: nowTime(), id: userMsgId, isMarked: false, image: attachedImage ?? undefined },
            { role: 'ai', content: '', time: nowTime(), id: aiMsgId, isMarked: false },
        ]);
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e

        try {
            const requestText = attachedImage
                ? `${text || 'İstifadəçi söhbətə bir şəkil əlavə etdi.'}\n\n[Əlavə edilmiş şəkil: ${attachedImage.name}]`
                : text;

            await streamAi(requestText, (delta, accumulated) => {
<<<<<<< HEAD
                dispatch(updateMessageContent({ id: aiMsgId, content: accumulated, isMarked: true }));
            }, model);
        } catch {
            // Error handling for AI message (not implemented here, needs extra action)
        } finally {
            setIsLoading(false);
        }
    };

const handleNewChat = (): void => {
    dispatch(clearMessages());
    const welcomeMsg = createWelcomeMessage(idRef.current++);
    dispatch(addMessage(welcomeMsg));
=======
                // Bu hissə hər bir hərf/söz gəldikdə işə düşür
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === aiMsgId ? { ...msg, content: accumulated, isMarked: true } : msg,
                    ),
                );
            }, model);




    //   const finalReply = await streamAi(text, model, (_delta, accumulated) => {
    //     console.log('Received chunk:', { delta: _delta, accumulated });
    //     setMessages((prev) =>
    //       prev.map((msg) =>
    //         msg.id === aiMsgId ? { ...msg, content: accumulated } : msg,
    //       ),
    //     );
    //   });

    //   // Fallback for non-streaming providers: commit final response to the same AI message.
    //   setMessages((prev) =>
    //     prev.map((msg) =>
    //       msg.id === aiMsgId ? { ...msg, content: finalReply, isMarked: true } : msg,
    //     ),
    //   );
    } catch {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === aiMsgId
                    ? { ...msg, content: 'Xəta baş verdi. Groq API açarınızı və internet bağlantınızı yoxlayın.' }
                    : msg,
            ),
        );
    } finally {
        setIsLoading(false);
    }
};

const handleNewChat = (): void => {
    setMessages([createWelcomeMessage(idRef.current++)]);
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e
    setShowSuggestions(true);
    setInput('');
    setPendingImage(null);
};

<<<<<<< HEAD
    const handleClear = (): void => {
        if (!confirm('Bütün mesajları silmək istədiyinizə əminsiniz?')) return;
        dispatch(clearMessages());
        const welcomeMsg = createWelcomeMessage(idRef.current++);
        dispatch(addMessage(welcomeMsg));
    };
=======
const handleClear = (): void => {
    if (!confirm('Bütün mesajları silmək istədiyinizə əminsiniz?')) return;
    handleNewChat();
};
>>>>>>> 1868c4ff4b9f6e5f5b2af73aed29b2eba1bb0c2e

const handleLogin = (payload: AuthPayload): { success: boolean; error?: string } => {
    const identifier = normalizeIdentifier(payload.identifier);
    const password = payload.password.trim();
    const identifierType = getIdentifierType(identifier);
    const existingAccount = loadStoredAccount(identifier);

    if (!identifier || !password) {
        return { success: false, error: 'İstifadəçi adı və şifrə daxil edin.' };
    }

    if (password.length < 6) {
        return { success: false, error: 'Şifrə ən azı 6 simvol olmalıdır.' };
    }

    if (payload.mode === 'register') {
        const name = payload.name.trim();

        if (!name) {
            return { success: false, error: 'Qeydiyyat üçün ad daxil edin.' };
        }

        if (existingAccount) {
            return { success: false, error: 'Bu istifadəçi adı artıq mövcuddur.' };
        }

        const newAccount: StoredAccount = {
            name,
            identifier,
            identifierType,
            password,
        };

        saveStoredAccount(newAccount);

        const nextUser: UserProfile = {
            name: newAccount.name,
            identifier: newAccount.identifier,
            identifierType: newAccount.identifierType,
        };

        setCurrentUser(nextUser);
        applyChatState(loadChatState(nextUser));
        setIsLoginOpen(false);
        return { success: true };
    }

    if (payload.mode === 'reset') {
        if (!existingAccount) {
            return { success: false, error: 'Bu istifadəçi adı ilə hesab tapılmadı.' };
        }

        const updatedAccount: StoredAccount = {
            ...existingAccount,
            password,
        };

        saveStoredAccount(updatedAccount);

        const nextUser: UserProfile = {
            name: updatedAccount.name,
            identifier: updatedAccount.identifier,
            identifierType: updatedAccount.identifierType,
        };

        setCurrentUser(nextUser);
        applyChatState(loadChatState(nextUser));
        setIsLoginOpen(false);
        return { success: true };
    }

    if (!existingAccount) {
        return { success: false, error: 'Bu istifadəçi üçün hesab tapılmadı.' };
    }

    if (existingAccount.password !== password) {
        return { success: false, error: 'Şifrə yanlışdır.' };
    }

    const nextUser: UserProfile = {
        name: existingAccount.name,
        identifier: existingAccount.identifier,
        identifierType: existingAccount.identifierType,
    };

    setCurrentUser(nextUser);
    applyChatState(loadChatState(nextUser));
    setIsLoginOpen(false);
    return { success: true };
};

const handleLogout = (): void => {
    setCurrentUser(null);
    applyChatState(loadChatState(null));
};

const historyItems: HistoryItem[] = messages
    .filter((message) => message.role === 'user')
    .slice()
    .reverse()
    .map((message) => ({
        id: message.id,
        label: (message.content || message.image?.name || 'Şəkil göndərildi').length > 36
            ? `${(message.content || message.image?.name || 'Şəkil göndərildi').slice(0, 36)}...`
            : (message.content || message.image?.name || 'Şəkil göndərildi'),
    }))
    .slice(0, 6);

return (
    <div className="app-wrapper container-fluid pt-3 pt-md-4 pb-0">
        <div className="app-main row g-3 g-lg-4">
            <Sidebar
                theme={theme}
                onToggleTheme={toggleTheme}
                onNewChat={handleNewChat}
                currentUser={currentUser}
                historyItems={historyItems}
            />
            <ChatShell
                messages={messages}
                showSuggestions={showSuggestions}
                input={input}
                isLoading={isLoading}
                model={model}
                currentUser={currentUser}
                pendingImage={pendingImage}
                onInputChange={setInput}
                onImageSelect={handleImageSelect}
                onImageRemove={handleImageRemove}
                onModelChange={setModel}
                onSubmit={handleSubmit}
                onSuggestionClick={(prompt: string) => setInput(prompt)}
                onClear={handleClear}
                onOpenLogin={() => setIsLoginOpen(true)}
                onLogout={handleLogout}
                maxChars={MAX_CHARS}
            />
        </div>
        <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onLogin={handleLogin}
        />
        <footer className="mini-footer text-center">
            <small>
                © {new Date().getFullYear()} Clinora AI. Bütün hüquqlar qorunur.{' '}
                {new Intl.DateTimeFormat('az-AZ', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }).format(new Date())}
            </small>
        </footer>
    </div>
);
}
