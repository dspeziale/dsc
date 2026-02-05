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

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

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
        <div className="space-y-8">
            {/* Visits Over Time */}
            <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-primary mb-4">Visite nel Tempo</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={formattedDailyStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="visits"
                            stroke="#FF6B6B"
                            strokeWidth={2}
                            name="Visite Totali"
                        />
                        <Line
                            type="monotone"
                            dataKey="unique_visitors"
                            stroke="#4ECDC4"
                            strokeWidth={2}
                            name="Visitatori Unici"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Top Network Owners Bar Chart */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold text-primary mb-4">Top 10 Intestatari Rete</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topIps}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="network_description"
                                angle={-45}
                                textAnchor="end"
                                height={100}
                                fontSize={12}
                            />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="visits" fill="#FF6B6B" name="Visite" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Network Type Distribution */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold text-primary mb-4">Distribuzione Tipo di Rete</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={networkTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {networkTypeData.map((_item, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCharts;
