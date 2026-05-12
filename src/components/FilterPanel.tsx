import { useState } from 'react';
import { Calendar, Filter, X, Search } from 'lucide-react';

export interface FilterState {
    startDate: string;
    endDate: string;
    networkType: string;
    ipSearch: string;
    searchText: string;
}

interface FilterPanelProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    onApplyFilters: () => void;
    onResetFilters: () => void;
    showIpFilter?: boolean;
    showNetworkFilter?: boolean;
}

const FilterPanel = ({
    filters,
    onFilterChange,
    onApplyFilters,
    onResetFilters,
    showIpFilter = true,
    showNetworkFilter = true
}: FilterPanelProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleChange = (field: keyof FilterState, value: string) => {
        onFilterChange({ ...filters, [field]: value });
    };

    const hasActiveFilters = filters.startDate || filters.endDate ||
        filters.networkType || filters.ipSearch || filters.searchText;

    return (
        <div className="bg-surface/30 backdrop-blur-xl border border-outline-variant rounded-lg overflow-hidden">
            <div className="p-4 border-b border-outline-variant/30">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-3 text-on-surface font-label-mono text-label-mono uppercase tracking-widest hover:text-primary transition-colors"
                    >
                        <Filter size={18} />
                        <span>Filtri Ricerca</span>
                        {hasActiveFilters && (
                            <span className="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                                Active
                            </span>
                        )}
                    </button>
                    {hasActiveFilters && (
                        <button
                            onClick={onResetFilters}
                            className="flex items-center gap-2 text-[10px] font-label-mono uppercase tracking-widest text-on-surface-variant hover:text-error transition-colors"
                        >
                            <X size={14} />
                            <span>Reset</span>
                        </button>
                    )}
                </div>
            </div>

            {isExpanded && (
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Date Range */}
                        <div className="space-y-2">
                            <label className="block font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant ml-1">
                                <Calendar size={12} className="inline mr-2 text-primary" />
                                Data Inizio
                            </label>
                            <input
                                type="date"
                                value={filters.startDate}
                                onChange={(e) => handleChange('startDate', e.target.value)}
                                className="w-full bg-surface-container/50 border border-outline-variant/30 rounded px-4 py-2 text-on-surface focus:outline-none focus:border-primary/50 transition-all font-body-md"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant ml-1">
                                <Calendar size={12} className="inline mr-2 text-primary" />
                                Data Fine
                            </label>
                            <input
                                type="date"
                                value={filters.endDate}
                                onChange={(e) => handleChange('endDate', e.target.value)}
                                className="w-full bg-surface-container/50 border border-outline-variant/30 rounded px-4 py-2 text-on-surface focus:outline-none focus:border-primary/50 transition-all font-body-md"
                            />
                        </div>

                        {/* Network Type Filter */}
                        {showNetworkFilter && (
                            <div className="space-y-2">
                                <label className="block font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant ml-1">
                                    Tipo di Rete
                                </label>
                                <select
                                    value={filters.networkType}
                                    onChange={(e) => handleChange('networkType', e.target.value)}
                                    className="w-full bg-surface-container/50 border border-outline-variant/30 rounded px-4 py-2 text-on-surface focus:outline-none focus:border-primary/50 transition-all font-body-md appearance-none"
                                >
                                    <option value="" className="bg-surface">Tutte le Reti</option>
                                    <option value="private" className="bg-surface">Reti Private</option>
                                    <option value="public" className="bg-surface">Reti Pubbliche</option>
                                    <option value="italian" className="bg-surface">Provider Italiani</option>
                                    <option value="european" className="bg-surface">Provider Europei</option>
                                </select>
                            </div>
                        )}

                        {/* IP Search */}
                        {showIpFilter && (
                            <div className="space-y-2">
                                <label className="block font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant ml-1">
                                    <Search size={12} className="inline mr-2 text-primary" />
                                    Cerca IP
                                </label>
                                <input
                                    type="text"
                                    value={filters.ipSearch}
                                    onChange={(e) => handleChange('ipSearch', e.target.value)}
                                    placeholder="es. 192.168"
                                    className="w-full bg-surface-container/50 border border-outline-variant/30 rounded px-4 py-2 text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-all font-body-md"
                                />
                            </div>
                        )}

                        {/* Text Search */}
                        <div className="space-y-2">
                            <label className="block font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant ml-1">
                                <Search size={12} className="inline mr-2 text-primary" />
                                Ricerca Testo
                            </label>
                            <input
                                type="text"
                                value={filters.searchText}
                                onChange={(e) => handleChange('searchText', e.target.value)}
                                placeholder="Nome, email, azienda..."
                                className="w-full bg-surface-container/50 border border-outline-variant/30 rounded px-4 py-2 text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 transition-all font-body-md"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={onApplyFilters}
                            className="px-8 py-2.5 bg-primary text-on-primary rounded font-label-mono text-[10px] uppercase tracking-[0.2em] hover:bg-primary-container transition-all"
                        >
                            Execute Filter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterPanel;

