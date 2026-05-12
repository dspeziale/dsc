import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
    TrendingUp, Globe, Monitor, Activity,
    Shield, ArrowLeft, RefreshCw, LayoutDashboard
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
    networkStats: BrowserStat[]; // Reusing BrowserStat since it's just name/value
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

    const COLORS = ['#8aebff', '#1e292b', '#1c2426', '#3b4c50', '#8aebff80', '#ec4899'];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="absolute inset-0 z-0 pointer-events-none bg-blueprint opacity-20"></div>
                <div className="relative z-10 text-center">
                    <div className="inline-block animate-spin rounded h-12 w-12 border-b-2 border-primary"></div>
                    <p className="mt-4 text-on-surface-variant font-label-mono uppercase tracking-widest">Inizializzazione Sistemi...</p>
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
        <main className="relative min-h-screen pt-32 pb-12 overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none bg-tech-grid opacity-30"></div>
            
            <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-primary font-label-mono mb-2">
                            <LayoutDashboard size={16} />
                            <span className="uppercase tracking-[0.2em] text-[10px]">Analytics Real-time</span>
                        </div>
                        <h1 className="font-display-lg text-display-lg text-on-surface">System <span className="text-primary">Dashboard</span></h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/admin"
                            className="flex items-center gap-2 px-6 py-2.5 text-on-surface-variant hover:text-primary transition-all font-label-mono text-label-mono uppercase tracking-widest border border-outline-variant rounded hover:border-primary/50"
                        >
                            <ArrowLeft size={16} />
                            Gestione
                        </Link>
                        <button
                            onClick={() => { setRefreshing(true); fetchData(); }}
                            disabled={refreshing}
                            className="flex items-center gap-2 bg-primary px-6 py-2.5 rounded font-label-mono text-label-mono uppercase tracking-widest text-on-primary hover:bg-primary-container transition-all disabled:opacity-50"
                        >
                            <RefreshCw size={16} className={`${refreshing ? 'animate-spin' : ''}`} />
                            {refreshing ? 'Sync...' : 'Refresh'}
                        </button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">

                    {/* Traffic Area Chart - 2/3 width */}
                    <div className="lg:col-span-2 bg-surface/50 backdrop-blur-xl rounded border border-outline-variant p-10 glass-card-hover">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-3">
                                    <TrendingUp size={20} className="text-primary" />
                                    Traffico Ultime 24 Ore
                                </h3>
                                <p className="text-on-surface-variant text-body-md mt-2">Monitoraggio analitico delle interazioni agentiche</p>
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data?.hourlyStats}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8aebff" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#8aebff" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8aebff" stopOpacity={0.05} />
                                            <stop offset="95%" stopColor="#8aebff" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e292b" />
                                    <XAxis
                                        dataKey="hour"
                                        tickFormatter={formatHour}
                                        tick={{ fill: '#3b4c50', fontSize: 10, fontFamily: 'Geist Mono' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fill: '#3b4c50', fontSize: 10, fontFamily: 'Geist Mono' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0b0f10', borderRadius: '4px', border: '1px solid #1e292b', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
                                        labelStyle={{ color: '#8aebff', fontFamily: 'Geist Mono', marginBottom: '8px' }}
                                        itemStyle={{ fontSize: '12px', fontFamily: 'Geist' }}
                                        labelFormatter={(label: any) => formatHour(label)}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="visits"
                                        name="Visite Totali"
                                        stroke="#8aebff"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorVisits)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="unique_visitors"
                                        name="Visitatori Unici"
                                        stroke="#8aebff80"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorUsers)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Browser Donut Chart */}
                    <div className="bg-surface/50 backdrop-blur-xl rounded border border-outline-variant p-10 glass-card-hover flex flex-col">
                        <h3 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-3 mb-8">
                            <Monitor size={20} className="text-primary" />
                            Tecnologia
                        </h3>
                        <div className="h-[200px] w-full flex-grow">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data?.browserStats}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {(data?.browserStats || []).map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                      contentStyle={{ backgroundColor: '#0b0f10', borderRadius: '4px', border: '1px solid #1e292b' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-8 pt-8 border-t border-outline-variant/30">
                            <div className="flex justify-between items-center">
                                <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Browser Dominante</span>
                                <span className="font-label-mono text-label-mono text-primary">{data?.browserStats?.[0]?.name || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Network Type Distribution */}
                    <div className="bg-surface/50 backdrop-blur-xl rounded border border-outline-variant p-10 glass-card-hover">
                        <h3 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-3 mb-8">
                            <Shield size={20} className="text-primary" />
                            Tipo di Rete
                        </h3>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data?.networkStats}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {(data?.networkStats || []).map((_, index) => (
                                            <Cell key={`cell-net-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                      contentStyle={{ backgroundColor: '#0b0f10', borderRadius: '4px', border: '1px solid #1e292b' }}
                                    />
                                    <Legend 
                                      verticalAlign="bottom" 
                                      height={36} 
                                      iconType="rect"
                                      formatter={(value) => <span className="font-label-mono text-[10px] text-on-surface-variant uppercase ml-2">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>


                    {/* Geographic Bar Chart */}
                    <div className="bg-surface/50 backdrop-blur-xl rounded border border-outline-variant p-10 glass-card-hover">
                        <h3 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-3 mb-8">
                            <Globe size={20} className="text-primary" />
                            Top Paesi
                        </h3>
                        <div className="space-y-6">
                            {(data?.countryStats || []).slice(0, 5).map((country, idx) => (
                                <div key={country.code || idx}>
                                    <div className="flex justify-between mb-2 font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
                                        <span className="flex items-center gap-2">
                                            {getFlagEmoji(country.code)} {country.name}
                                        </span>
                                        <span className="text-primary font-bold">{country.value} visitatori</span>
                                    </div>
                                    <div className="w-full bg-surface-container rounded h-1 overflow-hidden">
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
                    <div className="lg:col-span-2 bg-surface/50 backdrop-blur-xl rounded border border-outline-variant p-10 glass-card-hover overflow-hidden">
                        <h3 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-3 mb-10">
                            <Activity size={20} className="text-primary" />
                            Attività Recente
                            <span className="ml-2 flex h-2 w-2 rounded-full bg-primary pulse-indicator"></span>
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="text-left border-b border-outline-variant/30">
                                    <tr>
                                        <th className="pb-4 font-label-mono text-[10px] uppercase text-on-surface-variant tracking-[0.2em]">Utente / ISP</th>
                                        <th className="pb-4 font-label-mono text-[10px] uppercase text-on-surface-variant tracking-[0.2em]">Pagina</th>
                                        <th className="pb-4 font-label-mono text-[10px] uppercase text-on-surface-variant tracking-[0.2em]">Orario</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/10">
                                    {(data?.recentActivity || []).map((activity) => (
                                        <tr key={activity.id} className="group hover:bg-primary/5 transition-colors">
                                            <td className="py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary font-label-mono text-[10px] border border-primary/20">
                                                        {activity.country_code || '??'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-on-surface text-body-md">{activity.isp}</div>
                                                        <div className="font-label-mono text-[10px] text-on-surface-variant/50">{activity.ip}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5">
                                                <span className="px-3 py-1 bg-surface-container border border-outline-variant/50 rounded text-[10px] font-label-mono text-on-surface-variant uppercase">
                                                    {activity.page}
                                                </span>
                                            </td>
                                            <td className="py-5 font-label-mono text-[10px] text-on-surface-variant uppercase italic">
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

