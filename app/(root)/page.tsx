"use client";

import Image from "next/image";
import { Heart, Music2, Pause, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const promises = ["Luôn lắng nghe những điều Diễm muốn kể", "Cùng Diễm đi qua cả ngày nắng lẫn ngày mưa", "Trân trọng từng khoảnh khắc của hai đứa mình"];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const confession = "Chiến không hứa sẽ hoàn hảo, nhưng Chiến hứa sẽ thật lòng, sẽ luôn dịu dàng và cùng Diễm viết nên câu chuyện của riêng hai đứa mình.";

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(confession.slice(0, index));
      if (index >= confession.length) window.clearInterval(timer);
    }, 32);
    return () => window.clearInterval(timer);
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause(); else await audioRef.current.play();
    setPlaying(!playing);
  };

  const moveNoButton = () => setNoPosition({ x: Math.round(Math.random() * 180 - 90), y: Math.round(Math.random() * 90 - 45) });

  const sayYes = async () => {
    setAccepted(true);
    if (audioRef.current && !playing) {
      await audioRef.current.play().catch(() => undefined);
      setPlaying(true);
    }
  };

  return (
    <main className="love-page">
      <audio ref={audioRef} src="/audio/vit.mp3" loop />
      <div className="ambient" aria-hidden="true">{Array.from({ length: 16 }).map((_, index) => <span key={index} style={{ "--i": index } as React.CSSProperties}>♥</span>)}</div>
      <button className="music-button" onClick={toggleMusic} aria-label={playing ? "Tạm dừng nhạc" : "Phát nhạc"}>
        {playing ? <Pause size={18} /> : <Music2 size={18} />}<span>{playing ? "Đang phát nhạc" : "Bật nhạc nhé"}</span>
      </button>
      <section className="hero" aria-label="Lời tỏ tình của Chiến dành cho Diễm">
        <div className="love-copy">
          <div className="eyebrow"><Sparkles size={15} /> Một điều Chiến muốn nói</div>
          <p className="dear">Gửi Diễm,</p>
          <h1>Cậu có muốn trở thành<br /><em>người yêu của Chiến</em> không?</h1>
          <p className="confession">{typedText}<span className="cursor">|</span></p>
          <div className="promise-list">{promises.map((promise) => <div key={promise}><Heart size={16} fill="currentColor" />{promise}</div>)}</div>
          <div className="actions">
            <button className="yes-button" onClick={sayYes}><Heart size={19} fill="currentColor" /> Đồng ý làm người yêu Chiến</button>
            <button className="no-button" onMouseEnter={moveNoButton} onClick={moveNoButton} style={{ transform: `translate(${noPosition.x}px, ${noPosition.y}px)` }}>Để Diễm suy nghĩ...</button>
          </div>
          <p className="signature">— Thương Diễm thật nhiều, Chiến ♡</p>
        </div>
        <div className="portrait-wrap">
          <div className="portrait-glow" />
          <div className="portrait-card">
            <Image src="/images/diem.jpg" alt="Diễm trong khoảnh khắc thật xinh đẹp" fill priority sizes="(max-width: 900px) 88vw, 42vw" className="portrait" />
            <div className="portrait-shade" />
            <div className="portrait-note"><span>cô gái khiến tim Chiến rung động</span><strong>Diễm ♡</strong></div>
          </div>
          <div className="polaroid-note">You are my favorite person ✿</div>
        </div>
      </section>
      {accepted && <div className="celebration" role="dialog" aria-modal="true" aria-label="Diễm đã đồng ý">
        <div className="confetti" aria-hidden="true">{Array.from({ length: 28 }).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}</div>
        <div className="celebration-card">
          <div className="big-heart">♥</div><p className="eyebrow">Vậy là từ hôm nay...</p>
          <h2>Diễm là người yêu của Chiến rồi nhé!</h2>
          <p>Cảm ơn Diễm đã bước vào thế giới của Chiến. Mình cùng nhau tạo thật nhiều kỷ niệm đẹp nha.</p>
          <div className="couple-name">Chiến <Heart size={22} fill="currentColor" /> Diễm</div>
          <button onClick={() => setAccepted(false)}>Ngắm lại lời tỏ tình</button>
        </div>
      </div>}
    </main>
  );
}
