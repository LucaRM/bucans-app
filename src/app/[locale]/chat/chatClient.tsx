"use client"
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';

interface Message {
    id?: string;
    text: string;
    userId?: string;
    createdAt?: Date;
}

interface User {
    id?: string;
    email: string;
}

const ChatClient: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [client, setClient] = useState<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Ensure this only runs on the client
        setIsLoaded(true);

        // Prevent running on server
        if (typeof window === 'undefined') return;

        // Initialize Feathers client
        const socket = io('http://localhost:3030', {
            transports: ['websocket'],
            forceNew: true
        }); // Replace with your Feathers server URL

        const feathersClient = feathers();

        feathersClient.configure(socketio(socket));
        feathersClient.configure(authentication({
            storage: window.localStorage // Use browser's localStorage for token storage
        }));

        // Check if already authenticated
        feathersClient.reAuthenticate()
            .then(response => {
                console.log('Re-authenticated successfully', response);
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.log('Not authenticated', error);
            });

        setClient(feathersClient);

        // Setup message listeners
        const messagesService = feathersClient.service('messages');
        const messageCreatedHandler = (message: Message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        };
        messagesService.on('created', messageCreatedHandler);

        // Setup user listeners
        const usersService = feathersClient.service('users');
        const userCreatedHandler = (user: User) => {
            setUsers(prevUsers => [...prevUsers, user]);
        };
        usersService.on('created', userCreatedHandler);

        // Clean up
        return () => {
            messagesService.off('created', messageCreatedHandler);
            usersService.off('created', userCreatedHandler);
            socket.disconnect();
        };
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!client) {
            setError('Client not initialized');
            return;
        }

        try {
            console.log('Attempting to authenticate with:', { email, password });
            const response = await client.authenticate({
                strategy: 'local',
                email,
                password
            });

            console.log('Authentication response:', response);
            setIsLoggedIn(true);
        } catch (error: any) {
            console.error('Login failed', error);

            // More detailed error handling
            if (error.code === 401) {
                setError('Invalid email or password');
            } else if (error.message) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred during login');
            }
        }
    };

    // If not loaded, return a placeholder to match server-side render
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const handleSendMessage = async (text: string) => {
        if (client && isLoggedIn) {
            try {
                await client.service('messages').create({ text });
            } catch (error) {
                console.error('Failed to send message', error);
            }
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="login flex min-h-screen bg-neutral justify-center items-center">
                <div className="card w-full max-w-sm bg-base-100 px-4 py-8 shadow-xl">
                    <h1 className="text-5xl font-bold text-center my-5">Feathers Chat</h1>
                    {error && (
                        <div className="alert alert-error mb-4">
                            <div className="flex-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                                <label>{error}</label>
                            </div>
                        </div>
                    )}
                    <form
                        className="card-body pt-2"
                        onSubmit={handleLogin}
                    >
                        <div className="form-control">
                            <label htmlFor="email" className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="enter email"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-control mt-0">
                            <label htmlFor="password" className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="enter password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="drawer drawer-mobile">
            <div className="drawer-content flex flex-col">
                <div className="navbar w-full">
                    <div className="navbar-center flex flex-col">
                        <p>Feathers Chat</p>
                        <label className="text-xs">
                            {users.length} User(s)
                        </label>
                    </div>
                    <div className="navbar-end">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => {
                                client.logout();
                                setIsLoggedIn(false);
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div id="chat" className="h-full overflow-y-auto px-3">
                    {messages.map((message, index) => (
                        <div key={index} className="chat-message">
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className="form-control w-full py-2 px-3">
                    <form
                        className="input-group overflow-hidden"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const input = e.currentTarget.elements.namedItem('text') as HTMLInputElement;
                            handleSendMessage(input.value);
                            input.value = '';
                        }}
                    >
                        <input
                            name="text"
                            type="text"
                            placeholder="Compose message"
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatClient;