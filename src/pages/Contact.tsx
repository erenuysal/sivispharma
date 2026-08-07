import { Reveal } from "../components/Reveal";
import { brand } from "../data/products";

export function Contact() {
  return (
    <>
      <section className="page-head">
        <div className="container page-head__inner">
          <img src={brand.logo} alt="" className="page-head__logo anim-rise" />
          <p className="eyebrow anim-rise anim-delay-1">İletişim</p>
          <h1 className="page-head__title anim-rise anim-delay-2">Konuşalım</h1>
          <p className="page-head__sub anim-rise anim-delay-3">
            Ürün bilgisi, eczane siparişi veya ihracat iş birliği için ekibimize yazın.
          </p>
        </div>
      </section>

      <section className="section section--tight-top">
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-card">
              <img src={brand.logo} alt="" className="inline-logo" />
              <h2>Doğrudan hatlar</h2>
              <a href="mailto:info@sivispharma.com">info@sivispharma.com</a>
              <a href="mailto:turkuazessen@sivispharma.com">turkuazessen@sivispharma.com</a>
              <a href="mailto:mesuta@sivispharma.com">mesuta@sivispharma.com</a>
              <a href="tel:+905513658489" className="contact-phone">
                +90 551 365 84 89
              </a>
              <p className="mute">Turkuaz Essen · Sivis Pharma</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const subject = encodeURIComponent(String(fd.get("subject") || "Sivis iletişimi"));
                const body = encodeURIComponent(
                  `Ad: ${fd.get("name")}\nFirma: ${fd.get("company")}\n\n${fd.get("message")}`,
                );
                window.location.href = `mailto:info@sivispharma.com?subject=${subject}&body=${body}`;
              }}
            >
              <label>
                Ad Soyad
                <input name="name" required placeholder="Adınız" />
              </label>
              <label>
                Firma / Eczane
                <input name="company" placeholder="Opsiyonel" />
              </label>
              <label>
                Konu
                <select name="subject" defaultValue="Ürün bilgisi">
                  <option>Ürün bilgisi</option>
                  <option>İhracat / Distribütörlük</option>
                  <option>Eczane siparişi</option>
                  <option>Diğer</option>
                </select>
              </label>
              <label>
                Mesaj
                <textarea name="message" required rows={5} placeholder="Nasıl yardımcı olalım?" />
              </label>
              <button type="submit" className="btn btn--solid">
                E-posta ile gönder
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
