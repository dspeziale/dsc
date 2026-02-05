import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
    TrendingUp, Globe, Monitor, Activity,
    ArrowLeft, RefreshCw, LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

interface HourlyStat {
    hour: string;
    visits: number;
    unique_visitors: number;
}

interface CountryStat {
    name: string;
    code: string;
    value: number;
}

interface BrowserStat {
    name: string;
    value: number;
}

interface ActivityItem {
    id: number;
    ip: string;
    page: string;
    timestamp: string;
    isp: string;
    country_code: string;
}

interface AnalyticsData {
    hourlyStats: HourlyStat[];
    countryStats: CountryStat[];
    browserStats: BrowserStat[];
    recentActivity: ActivityItem[];
}

const getFlagEmoji = (countryCode: string): string => {
    if (!countryCode || countryCode.length !== 2) return '';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const Dashboard = () => {
    const { token } = useAuth();
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        if (!token) return;
        try {
            const res = await fetch('/api/admin/analytics', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const analytics = await res.json();
            if (res.ok) {
                setData(analytics);
            }
        } catch (error) {
            console.error('Fetch analytics error:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Set up polling every 30 seconds for real-time feel
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, [token]);

    const COLORS = ['#f97316', '#3b82f6', '#10b981', '#6366f1', '#8b5cf6', '#ec4899'];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Caricamento dashboard...</p>
                </div>
            </div>
        );
    }

    const formatHour = (hourStr: any) => {
        if (!hourStr) return '';
        const date = new Date(hourStr);
        return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] pt-24 pb-12">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-accent font-bold mb-1">
                            <LayoutDashboard size={20} />
                            <span className="uppercase tracking-wider text-xs">Analytics Real-time</span>
                        </div>
                        <h1 className="text-4xl font-black text-primary"> Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition-colors font-bold"
                        >
                            <ArrowLeft size={20} />
                            Torna a Gestione
                        </Link>
                        <button
                            onClick={() => { setRefreshing(true); fetchData(); }}
                            disabled={refreshing}
                            className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-200 hover:border-accent hover:text-accent transition-all font-bold group"
                        >
                            <RefreshCw size={18} className={`${refreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                            {refreshing ? 'Sincronizzazione...' : 'Aggiorna Ora'}
                        </button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Traffic Area Chart - 2/3 width */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                                    <TrendingUp size={22} className="text-accent" />
                                    Traffico Ultime 24 Ore
                                </h3>
                                <p className="text-gray-500 text-sm mt-1">Visite e visitatori unici raggruppati per ora</p>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data?.hourlyStats}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="hour"
                                        tickFormatter={formatHour}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        labelFormatter={(label: any) => formatHour(label)}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="visits"
                                        name="Visite Totali"
                                        stroke="#f97316"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorVisits)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="unique_visitors"
                                        name="Visitatori Unici"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorUsers)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Browser Donut Chart */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2 mb-6">
                            <Monitor size={22} className="text-accent" />
                            Tecnologia
                        </h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data?.browserStats}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data?.browserStats.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-500">Browser Dominante</span>
                                <span className="text-sm font-bold text-primary">{data?.browserStats?.[0]?.name || 'N/A'}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                                <div className="bg-accent h-1.5 rounded-full" style={{ width: data?.browserStats?.[0] ? '75%' : '0%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Geographic Bar Chart */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2 mb-6">
                            <Globe size={22} className="text-accent" />
                            Top Paesi
                        </h3>
                        <div className="space-y-4">
                            {(data?.countryStats || []).slice(0, 5).map((country, idx) => (
                                <div key={country.code || idx}>
                                    <div className="flex justify-between mb-1 text-sm">
                                        <span className="flex items-center gap-2">
                                            {getFlagEmoji(country.code)} {country.name}
                                        </span>
                                        <span className="font-bold">{country.value} visitatori</span>
                                    </div>
                                    <div className="w-full bg-gray-50 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-primary h-full transition-all duration-1000"
                                            style={{ width: `${(country.value / (data?.countryStats?.[0]?.value || 1)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity Feed */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 overflow-hidden">
                        <h3 className="text-xl font-bold text-primary flex items-center gap-2 mb-6">
                            <Activity size={22} className="text-accent" />
                            Attività Recente
                            <span className="ml-2 flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="text-left border-b border-gray-50">
                                    <tr>
                                        <th className="pb-4 text-xs uppercase text-gray-400 font-bold">Utente / ISP</th>
                                        <th className="pb-4 text-xs uppercase text-gray-400 font-bold">Pagina</th>
                                        <th className="pb-4 text-xs uppercase text-gray-400 font-bold">Orario</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {(data?.recentActivity || []).map((activity) => (
                                        <tr key={activity.id} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                        {activity.country_code || '??'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-primary text-sm">{activity.isp}</div>
                                                        <div className="text-xs text-gray-400 font-medium">{activity.ip}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <span className="px-3 py-1 bg-gray-100 rounded-full text-[11px] font-bold text-gray-600">
                                                    {activity.page}
                                                </span>
                                            </td>
                                            <td className="py-4 text-xs text-gray-500 font-medium italic">
                                                {new Date(activity.timestamp).toLocaleTimeString('it-IT')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Dashboard;
