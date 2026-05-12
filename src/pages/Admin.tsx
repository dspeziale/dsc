import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Mail, Phone, Building2, Calendar, MapPin, LogOut,
    Users, Eye, FileText, TrendingUp, Download, BarChart3, RefreshCw, LayoutDashboard
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
            const contactsRes = await fetch(`/api/admin/contacts?${queryParams.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const contactsData = await contactsRes.json();
            if (contactsRes.ok) {
                setContacts(contactsData.contacts || []);
            }

            // Fetch analytics
            const visitsRes = await fetch(`/api/admin/visits?${queryParams.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const visitsData = await visitsRes.json();
            if (visitsRes.ok) {
                setStats(visitsData.stats || { total_visits: 0, unique_visitors: 0, pages_visited: 0 });
                setIpStats(visitsData.ipStats || []);
                setDailyStats(visitsData.dailyStats || []);
            } else {
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
                fetchData();
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
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0 pointer-events-none bg-blueprint opacity-20"></div>
                <div className="relative z-10 text-center">
                    <div className="inline-block animate-spin rounded h-12 w-12 border-b-2 border-primary"></div>
                    <p className="mt-4 text-on-surface-variant font-label-mono uppercase tracking-widest">Accessing Secure Node...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="relative min-h-screen pt-32 pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none bg-tech-grid opacity-30"></div>
            
            {/* Header Section */}
            <section className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12">
                <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant p-8 md:p-12 rounded flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-primary/20 rounded-full blur animate-pulse"></div>
                            {user?.picture ? (
                                <img
                                    src={user.picture}
                                    alt={user.name}
                                    className="relative w-20 h-20 rounded-full border-2 border-primary object-cover"
                                />
                            ) : (
                                <div className="relative w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-4xl">person</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-primary pulse-indicator"></span>
                                <span className="font-label-mono text-[10px] uppercase tracking-[0.2em] text-primary">Access Level: Administrator</span>
                            </div>
                            <h1 className="font-display-lg text-display-lg text-on-surface">Benvenuto, <span className="text-primary">{user?.name?.split(' ')[0]}</span></h1>
                            <p className="font-body-md text-on-surface-variant/70">Ultima sincronizzazione: {new Date().toLocaleTimeString('it-IT')}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/admin/dashboard')}
                            className="flex items-center gap-2 px-6 py-3 bg-surface-container border border-outline-variant rounded font-label-mono text-label-mono uppercase tracking-widest text-on-surface hover:border-primary/50 transition-all"
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </button>
                        {token && <NotificationBadge token={token} />}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 bg-error/10 border border-error/20 rounded font-label-mono text-label-mono uppercase tracking-widest text-error hover:bg-error hover:text-on-error transition-all"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </section>

            {/* Content Container */}
            <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                
                {/* Filters */}
                <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant rounded mb-8 p-4">
                    <FilterPanel
                        filters={filters}
                        onFilterChange={setFilters}
                        onApplyFilters={handleApplyFilters}
                        onResetFilters={handleResetFilters}
                        showIpFilter={activeTab === 'analytics'}
                        showNetworkFilter={activeTab === 'analytics'}
                    />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-12">
                    {[
                        { label: 'Messaggi', value: contacts.length, icon: FileText, color: 'primary' },
                        { label: 'Visite Totali', value: stats?.total_visits || 0, icon: Eye, color: 'primary' },
                        { label: 'Visitatori Unici', value: stats?.unique_visitors || 0, icon: Users, color: 'primary' },
                        { label: 'IP Analizzati', value: stats?.pages_visited || 0, icon: TrendingUp, color: 'primary' }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-surface/50 backdrop-blur-xl border border-outline-variant p-8 rounded glass-card-hover group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-primary/10 rounded border border-primary/20 flex items-center justify-center group-hover:bg-primary transition-all">
                                    <item.icon size={20} className="text-primary group-hover:text-on-primary" />
                                </div>
                                <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Live</span>
                            </div>
                            <p className="font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-1">{item.label}</p>
                            <p className="font-display-lg text-headline-lg text-on-surface">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs & Tab Content */}
                <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant rounded overflow-hidden">
                    <div className="flex border-b border-outline-variant bg-surface-container/30">
                        {[
                            { id: 'contacts', label: `Messaggi (${contacts.length})`, icon: FileText },
                            { id: 'analytics', label: 'Connessioni IP', icon: TrendingUp },
                            { id: 'charts', label: 'System Analytics', icon: BarChart3 }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 px-8 py-6 font-label-mono text-label-mono uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${activeTab === tab.id
                                    ? 'bg-primary text-on-primary'
                                    : 'text-on-surface-variant hover:bg-surface-container'
                                    }`}
                            >
                                <tab.icon size={18} />
                                <span className="hidden md:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="p-8 md:p-12">
                        {activeTab === 'contacts' && (
                            <div className="space-y-8">
                                <div className="flex justify-end mb-6">
                                    <button
                                        onClick={() => handleExport('contacts')}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-primary/10 border border-primary/20 text-primary rounded font-label-mono text-[10px] uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all"
                                    >
                                        <Download size={14} />
                                        Export Briefings
                                    </button>
                                </div>
                                {contacts.length === 0 ? (
                                    <div className="py-24 text-center border-2 border-dashed border-outline-variant rounded">
                                        <p className="font-label-mono text-on-surface-variant uppercase tracking-widest">Nessun segnale ricevuto</p>
                                    </div>
                                ) : (
                                    contacts.map((contact) => (
                                        <div key={contact.id} className="bg-surface-container/30 border border-outline-variant rounded-lg p-8 hover:border-primary/50 transition-all group">
                                            <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
                                                <div>
                                                    <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">{contact.nome}</h3>
                                                    <div className="flex flex-wrap items-center gap-6 font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
                                                        <span className="flex items-center gap-2">
                                                            <Calendar size={14} className="text-primary" />
                                                            {formatDate(contact.timestamp)}
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <MapPin size={14} className="text-primary" />
                                                            {contact.ip}
                                                        </span>
                                                    </div>
                                                </div>
                                                {contact.servizio && (
                                                    <span className="px-4 py-1 bg-primary/10 text-primary border border-primary/20 rounded font-label-mono text-[10px] uppercase tracking-widest">
                                                        {contact.servizio}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors font-body-md">
                                                    <Mail size={18} className="text-primary" />
                                                    {contact.email}
                                                </a>
                                                {contact.telefono && (
                                                    <a href={`tel:${contact.telefono}`} className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors font-body-md">
                                                        <Phone size={18} className="text-primary" />
                                                        {contact.telefono}
                                                    </a>
                                                )}
                                                {contact.azienda && (
                                                    <div className="flex items-center gap-3 text-on-surface-variant font-body-md">
                                                        <Building2 size={18} className="text-primary" />
                                                        {contact.azienda}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="bg-surface/50 border border-outline-variant rounded p-6">
                                                <p className="font-label-mono text-[10px] uppercase tracking-widest text-primary mb-3">Transmission Log:</p>
                                                <p className="text-on-surface font-body-md leading-relaxed whitespace-pre-wrap">{contact.messaggio}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="space-y-10">
                                <div className="flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={handleRefreshIps}
                                            disabled={refreshingIps}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded font-label-mono text-[10px] uppercase tracking-widest hover:bg-primary-container transition-all disabled:opacity-50"
                                        >
                                            <RefreshCw size={14} className={refreshingIps ? 'animate-spin' : ''} />
                                            {refreshingIps ? 'Syncing...' : 'Sync IP Registry'}
                                        </button>

                                        <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded border border-outline-variant">
                                            <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Retention:</span>
                                            <input
                                                type="number"
                                                value={clearLogsDays}
                                                onChange={(e) => setClearLogsDays(Number(e.target.value))}
                                                min="0"
                                                className="w-12 bg-transparent text-center font-label-mono text-primary focus:outline-none"
                                            />
                                            <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Days</span>
                                            <button
                                                onClick={handleClearLogs}
                                                disabled={clearingLogs}
                                                className="ml-2 text-error hover:text-error/80 font-label-mono text-[10px] uppercase font-bold"
                                            >
                                                [ Purge ]
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleExport('visits')}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-primary/10 border border-primary/20 text-primary rounded font-label-mono text-[10px] uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all"
                                    >
                                        <Download size={14} />
                                        Export Traffic CSV
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-outline-variant">
                                                <th className="text-left py-6 px-4 font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Network Provider</th>
                                                <th className="text-left py-6 px-4 font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Region</th>
                                                <th className="text-center py-6 px-4 font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Nodes</th>
                                                <th className="text-center py-6 px-4 font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Hits</th>
                                                <th className="text-left py-6 px-4 font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Activity Range</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-outline-variant/10">
                                            {ipStats.map((ipStat, index) => (
                                                <tr key={index} className="group hover:bg-primary/5 transition-colors">
                                                    <td className="py-6 px-4">
                                                        <div className="font-bold text-on-surface text-body-md mb-1">{ipStat.network_description}</div>
                                                        {ipStat.ip_list && (
                                                            <div className="font-label-mono text-[9px] text-on-surface-variant/40" title={ipStat.ip_list}>
                                                                {ipStat.ip_list.length > 50 ? `${ipStat.ip_list.substring(0, 50)}...` : ipStat.ip_list}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="py-6 px-4">
                                                        <div className="flex items-center gap-2">
                                                            {ipStat.country_codes && ipStat.country_codes.split(', ').map((code, idx) => (
                                                                <span key={idx} className="text-xl" title={ipStat.countries?.split(', ')[idx]}>
                                                                    {getFlagEmoji(code)}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="py-6 px-4 text-center">
                                                        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-3 py-1 rounded">
                                                            {ipStat.unique_ips}
                                                        </span>
                                                    </td>
                                                    <td className="py-6 px-4 text-center">
                                                        <span className="font-display-lg text-title-md text-on-surface">
                                                            {ipStat.visits}
                                                        </span>
                                                    </td>
                                                    <td className="py-6 px-4">
                                                        <div className="font-label-mono text-[9px] uppercase text-on-surface-variant/60">
                                                            {formatDate(ipStat.first_visit)}
                                                            <span className="mx-2">→</span>
                                                            {formatDate(ipStat.last_visit)}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'charts' && (
                            <div className="pt-6">
                                <AnalyticsCharts dailyStats={dailyStats} ipStats={ipStats} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Admin;

