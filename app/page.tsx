import Chat from "../components/Chat";

export default function HomePage() {
  return (
    <main>
      <div className="header">
        <div className="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l2.598 5.26L20 8.27l-4 3.9L17.196 18 12 15.27 6.804 18 8 12.17l-4-3.9 5.402-1.01L12 2z" fill="#0ea5e9"/></svg>
          ChatPT Atlas
          <span className="badge">beta</span>
        </div>
        <div className="hint">A tiny chat with an atlas of ideas.</div>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <section className="card chat">
          <Chat />
        </section>
        <aside className="card sidebar">
          <h3>Idea Atlas</h3>
          <p className="hint">Quick lenses that guide the assistant.</p>
          <div className="badges" style={{ marginTop: 8 }}>
            <span className="pill">Summarize</span>
            <span className="pill">Decompose</span>
            <span className="pill">Plan</span>
            <span className="pill">Critique</span>
            <span className="pill">Translate</span>
            <span className="pill">Compare</span>
            <span className="pill">Explain</span>
          </div>
          <div style={{ marginTop: 16 }}>
            <p className="hint">Tip: Use natural language. The bot responds with concise, structured answers.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
