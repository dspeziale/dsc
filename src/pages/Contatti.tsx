import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import './Contatti.css';

const Contatti = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    azienda: '',
    servizio: '',
    messaggio: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nome: '',
          email: '',
          telefono: '',
          azienda: '',
          servizio: '',
          messaggio: '',
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Errore durante l\'invio del messaggio');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Errore di connessione. Riprova piu tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'info@dsconsulting.it',
      link: 'mailto:info@dsconsulting.it',
    },
    {
      icon: <Phone size={24} />,
      title: 'Telefono',
      content: '+39 123 456 7890',
      link: 'tel:+391234567890',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Indirizzo',
      content: 'Via Roma 123, 20121 Milano',
      link: '#',
    },
    {
      icon: <Clock size={24} />,
      title: 'Orari',
      content: 'Lun - Ven: 9:00 - 18:00',
      link: '#',
    },
  ];

  return (
    <main className="contatti">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Contattaci</h1>
          <p className="page-subtitle">
            Siamo pronti ad ascoltare le tue esigenze e proporti la soluzione migliore
          </p>
        </div>
      </section>

      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-wrapper">
              <h2>Richiedi informazioni</h2>
              <p>
                Compila il form e ti risponderemo entro 24 ore lavorative.
              </p>

              {submitStatus === 'success' && (
                <div className="form-message success">
                  Messaggio inviato con successo! Ti contatteremo presto.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-message error">
                  {errorMessage}
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nome">Nome e Cognome *</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      placeholder="Mario Rossi"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="mario@esempio.it"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="telefono">Telefono</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+39 123 456 7890"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="azienda">Azienda</label>
                    <input
                      type="text"
                      id="azienda"
                      name="azienda"
                      value={formData.azienda}
                      onChange={handleChange}
                      placeholder="Nome azienda"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="servizio">Servizio di interesse</label>
                  <select
                    id="servizio"
                    name="servizio"
                    value={formData.servizio}
                    onChange={handleChange}
                  >
                    <option value="">Seleziona un servizio</option>
                    <option value="web">Sviluppo Web</option>
                    <option value="mobile">Sviluppo Mobile</option>
                    <option value="hardware">Soluzioni Hardware</option>
                    <option value="software">Software Gestionale</option>
                    <option value="cloud">Cloud e DevOps</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="messaggio">Messaggio *</label>
                  <textarea
                    id="messaggio"
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Descrivi brevemente il tuo progetto o le tue esigenze..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Invio in corso...' : 'Invia messaggio'}
                  {!isSubmitting && <Send size={18} />}
                </button>
              </form>
            </div>

            <div className="contact-info-wrapper">
              <h2>Informazioni di contatto</h2>
              <p>
                Puoi contattarci anche direttamente attraverso i seguenti canali.
              </p>

              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="contact-info-item"
                  >
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <span className="info-title">{info.title}</span>
                      <span className="info-text">{info.content}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="map-placeholder">
                <MapPin size={48} />
                <p>Via Roma 123, Milano</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contatti;
