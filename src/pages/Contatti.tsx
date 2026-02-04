import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

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
      setErrorMessage('Errore di connessione. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'dsconsulting-italy@gmail.com',
      link: 'mailto:dsconsulting-italy@gmail.com',
    },
    {
      icon: <Phone size={24} />,
      title: 'Telefono',
      content: '+39 352 015 0489',
      link: 'tel:+393520150489',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Indirizzo',
      content: 'Via Carlo Arturo Jemolo, 283 - Roma',
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
    <main className="pt-20">
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Contattaci</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Siamo pronti ad ascoltare le tue esigenze e proporti la soluzione migliore
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Richiedi informazioni</h2>
              <p className="text-gray-600 mb-8">
                Compila il form e ti risponderemo entro 24 ore lavorative.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg text-success">
                  Messaggio inviato con successo! Ti contatteremo presto.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {errorMessage}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-bold text-gray-700 mb-2">
                      Nome e Cognome *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      placeholder="Mario Rossi"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="mario@esempio.it"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-bold text-gray-700 mb-2">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+39 123 456 7890"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="azienda" className="block text-sm font-bold text-gray-700 mb-2">
                      Azienda
                    </label>
                    <input
                      type="text"
                      id="azienda"
                      name="azienda"
                      value={formData.azienda}
                      onChange={handleChange}
                      placeholder="Nome azienda"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="servizio" className="block text-sm font-bold text-gray-700 mb-2">
                    Servizio di interesse
                  </label>
                  <select
                    id="servizio"
                    name="servizio"
                    value={formData.servizio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
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

                <div>
                  <label htmlFor="messaggio" className="block text-sm font-bold text-gray-700 mb-2">
                    Messaggio *
                  </label>
                  <textarea
                    id="messaggio"
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Descrivi brevemente il tuo progetto o le tue esigenze..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Invio in corso...' : 'Invia messaggio'}
                  {!isSubmitting && <Send size={18} />}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Informazioni di contatto</h2>
              <p className="text-gray-600 mb-8">
                Puoi contattarci anche direttamente attraverso i seguenti canali.
              </p>

              <div className="space-y-4 mb-8">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-accent/5 hover:border-accent/20 border border-transparent transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-gray-500 mb-1">
                        {info.title}
                      </span>
                      <span className="text-lg text-gray-800 font-semibold">
                        {info.content}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12 text-center">
                <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 font-semibold">Via Roma 123, Milano</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contatti;
