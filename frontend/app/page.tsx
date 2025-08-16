'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState('');

  const generate = async () => {
    setStatus('生成中...');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      const data = await res.json();
      setStatus(data.message || '生成完成');
    } catch (err) {
      setStatus('生成失败');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Bilibili 视频生成器</h1>
        <input
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="请输入视频主题"
          className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={generate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md"
        >
          生成视频
        </button>
        {status && (
          <p className="mt-4 text-center text-gray-700">{status}</p>
        )}
      </div>
    </main>
  );
}
