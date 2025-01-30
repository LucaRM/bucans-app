import dynamic from 'next/dynamic';
import Script from 'next/script';
import styles from "./page.module.scss";

// Dynamically import ChatClient with no SSR
const ChatClient = dynamic(() => import('./chatClient'), {
    ssr: false,
    loading: () => <div>Loading chat...</div>
});

export default function ChatPage() {
    return (
        <div id="chat-page">
            <ChatClient />
            <Script
                src="https://unpkg.com/@feathersjs/client@^5.0.0-pre.34/dist/feathers.js"
                strategy="lazyOnload"
            />
            <Script
                src="/socket.io/socket.io.js"
                strategy="lazyOnload"
            />
            <Script
                src="client.js"
                type="module"
                strategy="lazyOnload"
            />
        </div>
    );
}