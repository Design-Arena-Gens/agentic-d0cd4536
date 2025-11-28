"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I?m Atlas. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function onSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, context: next.filter(m => m.role !== "assistant").slice(-6) }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages([...next, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat">
      <div className="messages" ref={listRef}>
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role === "user" ? "me" : ""}`}>
            <div className={`bubble ${m.role === "user" ? "me" : "bot"}`}>{m.content}</div>
          </div>
        ))}
      </div>
      <form className="inputRow" onSubmit={onSend}>
        <input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          aria-label="Message"
        />
        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? "Thinking?" : "Send"}
        </button>
      </form>
    </div>
  );
}
