import React, { useState, useRef } from 'react';
import NavbarBack from '../components/NavbarBack';
import glow from '/image/satybot/glow.svg';
import ask from '/image/satybot/ask.png';
import send from '/image/satybot/send.svg';
import axios from 'axios';
import load from '/image/satybot/answer.svg';
import './Style.css';

const Satybot = () => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setShowHeader(false);
        const userMessage = { role: 'user', content: prompt };
        setMessages((prev) => [...prev, userMessage]);
        setPrompt('');
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await axios.post('http://localhost:7000/chat', { prompt });
            const cleanedResponse = res.data.response.replace(/\*/g, '');
            const botMessage = { role: 'bot', content: cleanedResponse };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            scrollToBottom();
        }
    };

    const handleAsk = (question) => {
        setPrompt(question);
        setShowSuggestions(false);
        setShowHeader(false);
        handleSubmit();
    };

    return (
        <div>
            <NavbarBack />
            <div className="w-full flex-col flex justify-between h-[100vh] pt-24" data-aos="fade-up" data-aos-duration="800">
                <img src={glow} alt="" className='absolute -z-20 w-[900px] h-auto bottom-0 left-1/2 -translate-x-1/2' />
                {showHeader && (
                    <div className="flex flex-col justify-center lg:mt-0 mt-12 items-center gap-5">
                        <img src={ask} alt="" className='lg:w-[35px] w-[25px] h-auto' />
                        <h1 className='font-poppins text-[16px] lg:text-[20px]'>Ask our AI anything</h1>
                    </div>
                )}
                <div className="flex flex-col mx-auto w-[320px] lg:w-[700px] justify-between h-[calc(100vh-100px)] pb-14">
                    <div className="flex flex-col overflow-y-auto h-full px-2 lg:px-6 py-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex flex-col gap-1 lg:gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`font-poppins1 w-full text-[18px] text-[#56637E] flex text-gray-500 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <p>
                                        {msg.role === 'user' ? 'Me' : 'Satybot'}
                                    </p>
                                </div>
                                <div
                                    className={`${
                                        msg.role === 'user'
                                            ? 'bg-white text-gray-800 ml-auto'
                                            : 'bg-white text-gray-800 mr-auto'
                                    } p-4 rounded-lg max-w-[95%] lg:max-w-[70%] shadow-md`}
                                >
                                    <p className="font-poppins1 text-[10px] lg:text-[14px] text-justify">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start opacity-0 animate-fade-in">
                                <div className="animate-pulse bg-white p-4 rounded-lg w-[70%] shadow-md">
                                    <img src={load} alt="" className='w-[20px] h-auto' />
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>
                    {showSuggestions && (
                        <>
                            <h1 className='text-[#56637E] font-poppins1 text-[14px] lg:text-[16px] text-start'>
                                Suggestions on what to ask Our AI
                            </h1>
                            <div className="flex justify-start gap-4 items-center mt-4">
                                <button
                                    onClick={() => handleAsk('How can I improve my mental health?')}
                                    className='font-poppins1 bg-white lg:px-2 p-2 rounded-md cursor-pointer lg:py-3 lg:rounded-full text-[8px] lg:text-[12px]'
                                >
                                    How can I improve my mental health?
                                </button>
                                <button
                                    onClick={() => handleAsk('What are some ways to reduce stress?')}
                                    className='font-poppins1 bg-white lg:px-2 p-2 rounded-md cursor-pointer lg:py-3 lg:rounded-full text-[8px] lg:text-[12px]'
                                >
                                    What are some ways to reduce stress?
                                </button>
                                <button
                                    onClick={() => handleAsk('How can I stop overthinking?')}
                                    className='font-poppins1 bg-white lg:px-2 p-2 rounded-md cursor-pointer lg:py-3 lg:rounded-full text-[8px] lg:text-[12px]'
                                >
                                    How can I stop overthinking?
                                </button>
                            </div>
                        </>
                    )}
                    <div className="flex justify-center items-center w-full bg-white h-[80px] px-4 lg:px-6 rounded-xl shadow-md mt-4">
                        <input
                            type="text"
                            placeholder='Ask me anything about your mental health'
                            value={prompt}
                            onChange={(e) => {
                                setPrompt(e.target.value);
                                if (e.target.value.trim()) setShowSuggestions(false);
                            }}
                            className='w-full outline-none pr-4 border-none font-poppins1 text-[12px] lg:text-[14px]'
                        />
                        <img
                            onClick={handleSubmit}
                            src={send}
                            alt="Send"
                            className='cursor-pointer lg:w-[25px] w-[20px]'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Satybot;