import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Mail, Phone, Building2, Calendar, MapPin, LogOut,
    Users, Eye, FileText, TrendingUp, Download, BarChart3, RefreshCw
} from 'lucide-react';
import FilterPanel from '../components/FilterPanel';
import type { FilterState } from '../components/FilterPanel';
import NotificationBadge from '../components/NotificationBadge';
import AnalyticsCharts from '../components/AnalyticsCharts';

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

interface IpStat {
    network_owner?: string;
    network_description: string;
    asn?: string;
    countries?: string;
    country_codes?: string;
    unique_ips: number;
    visits: number;
    first_visit: string;
    last_visit: string;
    ip_list?: string;
    // Legacy fields for backward compatibility
    ip?: string;
    country?: string;
    country_code?: string;
    region?: string;
    city?: string;
    isp?: string;
    organization?: string;
    timezone?: string;
}

interface DailyStat {
    date: string;
    visits: number;
    unique_visitors: number;
}

// Helper function to convert country code to flag emoji
const getFlagEmoji = (countryCode: string): string => {
    if (!countryCode || countryCode.length !== 2) return '';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const Admin = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [stats, setStats] = useState<VisitStats | null>(null);
    const [ipStats, setIpStats] = useState<IpStat[]>([]);
    const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshingIps, setRefreshingIps] = useState(false);
    const [activeTab, setActiveTab] = useState<'contacts' | 'analytics' | 'charts'>('contacts');
    const [filters, setFilters] = useState<FilterState>({
        startDate: '',
        endDate: '',
        networkType: '',
        ipSearch: '',
        searchText: ''
    });
    const [clearLogsDays, setClearLogsDays] = useState<number>(30);
    const [clearingLogs, setClearingLogs] = useState(false);

    useEffect(() => {
        fetchData();
    }, [token]);

    const fetchData = async () => {
        if (!token) return;

        try {
            setLoading(true);

            // Build query params from filters
            const queryParams = new URLSearchParams();
            if (filters.startDate) queryParams.append('startDate', filters.startDate);
            if (filters.endDate) queryParams.append('endDate', filters.endDate);
            if (filters.networkType) queryParams.append('networkType', filters.networkType);
            if (filters.ipSearch) queryParams.append('ipSearch', filters.ipSearch);
            if (filters.searchText) queryParams.append('searchText', filters.searchText);

            // Fetch contacts
            console.log('Fetching contacts...');
            const contactsRes = await fetch(`/api/admin/contacts?${queryParams.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Contacts response:', contactsRes.status);
            const contactsData = await contactsRes.json();
            if (contactsRes.ok) {
                console.log('Contacts received:', contactsData.contacts?.length || 0);
                setContacts(contactsData.contacts || []);
            } else {
                console.error('Contacts error:', contactsData);
            }

            // Fetch analytics
            console.log('Fetching visits...');
            const visitsRes = await fetch(`/api/admin/visits?${queryParams.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Visits response:', visitsRes.status);
            const visitsData = await visitsRes.json();
            if (visitsRes.ok) {
                console.log('Visits data received:', visitsData);
                setStats(visitsData.stats || { total_visits: 0, unique_visitors: 0, pages_visited: 0 });
                setIpStats(visitsData.ipStats || []);
                setDailyStats(visitsData.dailyStats || []);
            } else {
                console.error('Visits error:', visitsData);
                setStats({ total_visits: 0, unique_visitors: 0, pages_visited: 0 });
                setIpStats([]);
            }

        } catch (error) {
            console.error('Error fetching admin data:', error);
            setStats({ total_visits: 0, unique_visitors: 0, pages_visited: 0 });
            setIpStats([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyFilters = () => {
        fetchData();
    };

    const handleResetFilters = () => {
        setFilters({
            startDate: '',
            endDate: '',
            networkType: '',
            ipSearch: '',
            searchText: ''
        });
        // Fetch data will be triggered by useEffect when filters change
        setTimeout(() => fetchData(), 100);
    };

    const handleExport = async (type: 'visits' | 'contacts') => {
        if (!token) return;

        try {
            const queryParams = new URLSearchParams();
            queryParams.append('type', type);
            queryParams.append('format', 'csv');
            if (filters.startDate) queryParams.append('startDate', filters.startDate);
            if (filters.endDate) queryParams.append('endDate', filters.endDate);
            if (filters.networkType) queryParams.append('networkType', filters.networkType);
            if (filters.ipSearch) queryParams.append('ipSearch', filters.ipSearch);
            if (filters.searchText) queryParams.append('searchText', filters.searchText);

            const res = await fetch(`/api/admin/export?${queryParams.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    const handleRefreshIps = async () => {
        if (!token || refreshingIps) return;

        try {
            setRefreshingIps(true);
            const res = await fetch('/api/admin/refresh-ips', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                alert(`✓ Refresh completato!\n\nTotale IP: ${data.total}\nSuccesso: ${data.successful}\nFalliti: ${data.failed}`);
                // Refresh data to show updated info
                fetchData();
            } else {
                alert('Errore durante il refresh degli IP');
            }
        } catch (error) {
            console.error('Error refreshing IPs:', error);
            alert('Errore durante il refresh degli IP');
        } finally {
            setRefreshingIps(false);
        }
    };

    const handleClearLogs = async () => {
        if (!token) return;

        const confirmClear = window.confirm(`Sei sicuro di voler eliminare tutti i log più vecchi di ${clearLogsDays} giorni? Questa azione non è reversibile.`);
        if (!confirmClear) return;

        try {
            setClearingLogs(true);
            const response = await fetch('/api/admin/clear-logs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ days: clearLogsDays }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message || 'Log eliminati con successo');
                fetchData(); // Refresh data
            } else {
                alert(data.error || 'Errore durante l\'eliminazione dei log');
            }
        } catch (error) {
            console.error('Error clearing logs:', error);
            alert('Errore durante l\'eliminazione dei log');
        } finally {
            setClearingLogs(false);
        }
    };

    const handleLogout = () => {
        navigate('/');
        setTimeout(() => {
            logout();
        }, 50);
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
                        <div className="flex items-center gap-4">
                            {token && <NotificationBadge token={token} />}
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
            </div>

            {/* Filter Panel */}
            <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
                showIpFilter={activeTab === 'analytics'}
                showNetworkFilter={activeTab === 'analytics'}
            />

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
                                <p className="text-sm text-gray-600">IP Unici</p>
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
                                Connessioni IP
                            </button>
                            <button
                                onClick={() => setActiveTab('charts')}
                                className={`flex-1 px-6 py-4 font-semibold transition-colors duration-300 ${activeTab === 'charts'
                                    ? 'bg-accent text-white'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <BarChart3 size={20} className="inline mr-2" />
                                Grafici
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {activeTab === 'contacts' && (
                            <div className="space-y-4">
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={() => handleExport('contacts')}
                                        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                                    >
                                        <Download size={18} />
                                        Esporta CSV
                                    </button>
                                </div>
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
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <button
                                        onClick={handleRefreshIps}
                                        disabled={refreshingIps}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <RefreshCw size={18} className={refreshingIps ? 'animate-spin' : ''} />
                                        {refreshingIps ? 'Aggiornamento...' : 'Aggiorna Dati IP'}
                                    </button>

                                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                                        <span className="text-sm text-gray-600 px-2 font-medium">Conserva ultimi</span>
                                        <input
                                            type="number"
                                            value={clearLogsDays}
                                            onChange={(e) => setClearLogsDays(Number(e.target.value))}
                                            min="0"
                                            className="w-16 px-2 py-1 rounded border border-gray-300 text-center font-bold"
                                        />
                                        <span className="text-sm text-gray-600 px-1 font-medium">giorni</span>
                                        <button
                                            onClick={handleClearLogs}
                                            disabled={clearingLogs}
                                            className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 text-sm font-bold ml-1"
                                        >
                                            {clearingLogs ? 'Eliminazione...' : 'Cancella Log'}
                                        </button>
                                    </div>

                                    <div className="flex-grow"></div>

                                    <button
                                        onClick={() => handleExport('visits')}
                                        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                                    >
                                        <Download size={18} />
                                        Esporta CSV
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-primary mb-4">Connessioni per Intestatario Rete</h3>
                                    {ipStats.length === 0 ? (
                                        <p className="text-center text-gray-500 py-8">Nessuna connessione registrata</p>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b-2 border-gray-200">
                                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Intestatario Rete</th>
                                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Paesi</th>
                                                        <th className="text-center py-3 px-4 font-semibold text-gray-700">IP Unici</th>
                                                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Visite</th>
                                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Prima Visita</th>
                                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Ultima Visita</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ipStats.map((ipStat, index) => (
                                                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                            <td className="py-3 px-4">
                                                                <div className="text-gray-700">
                                                                    <div className="font-medium">{ipStat.network_description}</div>
                                                                    {ipStat.ip_list && (
                                                                        <div className="text-xs text-gray-400 mt-1" title={ipStat.ip_list}>
                                                                            {ipStat.ip_list.length > 60
                                                                                ? `${ipStat.ip_list.substring(0, 60)}...`
                                                                                : ipStat.ip_list}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-1">
                                                                    {ipStat.country_codes && ipStat.country_codes.split(', ').map((code, idx) => (
                                                                        <span key={idx} className="text-xl" title={ipStat.countries?.split(', ')[idx]}>
                                                                            {getFlagEmoji(code)}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4 text-center">
                                                                <span className="inline-block bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-sm">
                                                                    {ipStat.unique_ips}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4 text-center">
                                                                <span className="inline-block bg-accent/10 text-accent font-bold px-3 py-1 rounded-full">
                                                                    {ipStat.visits}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4 text-sm text-gray-600">{formatDate(ipStat.first_visit)}</td>
                                                            <td className="py-3 px-4 text-sm text-gray-600">{formatDate(ipStat.last_visit)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'charts' && (
                            <AnalyticsCharts dailyStats={dailyStats} ipStats={ipStats} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Admin;
