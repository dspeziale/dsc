import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Mail, Phone, Building2, Calendar, MapPin, LogOut,
    Users, Eye, FileText, TrendingUp
} from 'lucide-react';

interface Contact {
    id: number;
    nome: string;
    email: string;
    telefono: string;
    azienda: string;
    servizio: string;
    messaggio: string;
    ip: string;
    timestamp: string;
}

interface VisitStats {
    total_visits: number;
    unique_visitors: number;
    pages_visited: number;
}

interface PageStat {
    page: string;
    visits: number;
    unique_visitors: number;
}

const Admin = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [stats, setStats] = useState<VisitStats | null>(null);
    const [pageStats, setPageStats] = useState<PageStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'contacts' | 'analytics'>('contacts');

    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData = async () => {
        if (!token) return;

        try {
            setLoading(true);

            // Fetch contacts
            const contactsRes = await fetch('/api/admin/contacts', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const contactsData = await contactsRes.json();
            if (contactsRes.ok) {
                setContacts(contactsData.contacts);
            }

            // Fetch analytics
            const visitsRes = await fetch('/api/admin/visits', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const visitsData = await visitsRes.json();
            if (visitsRes.ok) {
                setStats(visitsData.stats);
                setPageStats(visitsData.pageStats);
            }

        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                    <p className="mt-4 text-gray-600">Caricamento dati...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="pt-20 min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-8">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {user?.picture && (
                                <img
                                    src={user.picture}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full border-2 border-white"
                                />
                            )}
                            <div>
                                <h1 className="text-3xl font-bold">Dashboard Admin</h1>
                                <p className="opacity-90">Benvenuto, {user?.name}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-300"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="container py-8">
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <FileText size={24} className="text-accent" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Contatti</p>
                                <p className="text-2xl font-bold text-primary">{contacts.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Eye size={24} className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Visite Totali</p>
                                <p className="text-2xl font-bold text-primary">{stats?.total_visits || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Users size={24} className="text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Visitatori Unici</p>
                                <p className="text-2xl font-bold text-primary">{stats?.unique_visitors || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <TrendingUp size={24} className="text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pagine Visitate</p>
                                <p className="text-2xl font-bold text-primary">{stats?.pages_visited || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('contacts')}
                                className={`flex-1 px-6 py-4 font-semibold transition-colors duration-300 ${activeTab === 'contacts'
                                        ? 'bg-accent text-white'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <FileText size={20} className="inline mr-2" />
                                Messaggi di Contatto ({contacts.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('analytics')}
                                className={`flex-1 px-6 py-4 font-semibold transition-colors duration-300 ${activeTab === 'analytics'
                                        ? 'bg-accent text-white'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <TrendingUp size={20} className="inline mr-2" />
                                Analytics Pagine
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {activeTab === 'contacts' && (
                            <div className="space-y-4">
                                {contacts.length === 0 ? (
                                    <p className="text-center text-gray-500 py-8">Nessun messaggio ricevuto</p>
                                ) : (
                                    contacts.map((contact) => (
                                        <div key={contact.id} className="border border-gray-200 rounded-lg p-6 hover:border-accent transition-colors duration-300">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-primary">{contact.nome}</h3>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={16} />
                                                            {formatDate(contact.timestamp)}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <MapPin size={16} />
                                                            {contact.ip}
                                                        </span>
                                                    </div>
                                                </div>
                                                {contact.servizio && (
                                                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                                                        {contact.servizio}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Mail size={18} className="text-accent" />
                                                    <a href={`mailto:${contact.email}`} className="hover:text-accent">
                                                        {contact.email}
                                                    </a>
                                                </div>
                                                {contact.telefono && (
                                                    <div className="flex items-center gap-2 text-gray-700">
                                                        <Phone size={18} className="text-accent" />
                                                        <a href={`tel:${contact.telefono}`} className="hover:text-accent">
                                                            {contact.telefono}
                                                        </a>
                                                    </div>
                                                )}
                                                {contact.azienda && (
                                                    <div className="flex items-center gap-2 text-gray-700">
                                                        <Building2 size={18} className="text-accent" />
                                                        <span>{contact.azienda}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <p className="text-sm font-semibold text-gray-700 mb-2">Messaggio:</p>
                                                <p className="text-gray-800 whitespace-pre-wrap">{contact.messaggio}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-primary mb-4">Visite per Pagina</h3>
                                    <div className="space-y-3">
                                        {pageStats.map((page, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-800">{page.page}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {page.unique_visitors} visitatori unici
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-accent">{page.visits}</p>
                                                    <p className="text-sm text-gray-600">visite</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Admin;
