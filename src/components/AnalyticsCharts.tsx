import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DailyStat {
    date: string;
    visits: number;
    unique_visitors: number;
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
}

interface AnalyticsChartsProps {
    dailyStats: DailyStat[];
    ipStats: IpStat[];
}

const COLORS = ['#8aebff', '#1e292b', '#1c2426', '#3b4c50', '#8aebff80', '#567176', '#728c92', '#8db3b9'];

const AnalyticsCharts = ({ dailyStats, ipStats }: AnalyticsChartsProps) => {
    // Prepare data for network type distribution
    const networkTypeData = ipStats.reduce((acc: any[], stat) => {
        const existing = acc.find(item => item.name === stat.network_description);
        if (existing) {
            existing.value += stat.visits;
        } else {
            acc.push({ name: stat.network_description, value: stat.visits });
        }
        return acc;
    }, []);

    // Top 10 IPs
    const topIps = ipStats.slice(0, 10);

    // Format daily stats for charts
    const formattedDailyStats = dailyStats.map(stat => ({
        ...stat,
        date: new Date(stat.date).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' })
    }));

    return (
        <div className="space-y-gutter">
            {/* Visits Over Time */}
            <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant p-10 rounded glass-card-hover">
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-8 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">timeline</span>
                    Visite nel Tempo
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={formattedDailyStats}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e292b" />
                        <XAxis 
                            dataKey="date" 
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
                            contentStyle={{ backgroundColor: '#0b0f10', borderRadius: '4px', border: '1px solid #1e292b' }}
                            labelStyle={{ color: '#8aebff', fontFamily: 'Geist Mono', marginBottom: '8px' }}
                            itemStyle={{ fontSize: '12px', fontFamily: 'Geist' }}
                        />
                        <Legend 
                            formatter={(value) => <span className="font-label-mono text-[10px] text-on-surface-variant uppercase ml-2">{value}</span>}
                        />
                        <Line
                            type="monotone"
                            dataKey="visits"
                            stroke="#8aebff"
                            strokeWidth={2}
                            name="Visite Totali"
                            dot={{ fill: '#8aebff', strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="unique_visitors"
                            stroke="#3b4c50"
                            strokeWidth={2}
                            name="Visitatori Unici"
                            dot={{ fill: '#3b4c50', strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-gutter">
                {/* Top Network Owners Bar Chart */}
                <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant p-10 rounded glass-card-hover">
                    <h3 className="font-headline-lg text-headline-lg text-on-surface mb-8 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">analytics</span>
                        Top 10 Intestatari Rete
                    </h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={topIps}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e292b" />
                            <XAxis
                                dataKey="network_description"
                                angle={-45}
                                textAnchor="end"
                                height={100}
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
                                contentStyle={{ backgroundColor: '#0b0f10', borderRadius: '4px', border: '1px solid #1e292b' }}
                            />
                            <Bar dataKey="visits" fill="#8aebff" name="Visite" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Network Type Distribution */}
                <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant p-10 rounded glass-card-hover">
                    <h3 className="font-headline-lg text-headline-lg text-on-surface mb-8 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">pie_chart</span>
                        Distribuzione Rete
                    </h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={networkTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8aebff"
                                dataKey="value"
                                stroke="none"
                            >
                                {networkTypeData.map((_item, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0b0f10', borderRadius: '4px', border: '1px solid #1e292b' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCharts;

