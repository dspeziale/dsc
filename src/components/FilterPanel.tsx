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
        <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
                    >
                        <Filter size={20} />
                        <span>Filtri</span>
                        {hasActiveFilters && (
                            <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                                Attivi
                            </span>
                        )}
                    </button>
                    {hasActiveFilters && (
                        <button
                            onClick={onResetFilters}
                            className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                        >
                            <X size={16} />
                            <span>Resetta</span>
                        </button>
                    )}
                </div>
            </div>

            {isExpanded && (
                <div className="p-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {/* Date Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Calendar size={16} className="inline mr-1" />
                                Data Inizio
                            </label>
                            <input
                                type="date"
                                value={filters.startDate}
                                onChange={(e) => handleChange('startDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Calendar size={16} className="inline mr-1" />
                                Data Fine
                            </label>
                            <input
                                type="date"
                                value={filters.endDate}
                                onChange={(e) => handleChange('endDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                            />
                        </div>

                        {/* Network Type Filter */}
                        {showNetworkFilter && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tipo di Rete
                                </label>
                                <select
                                    value={filters.networkType}
                                    onChange={(e) => handleChange('networkType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                                >
                                    <option value="">Tutte le Reti</option>
                                    <option value="private">Reti Private</option>
                                    <option value="public">Reti Pubbliche</option>
                                    <option value="italian">Provider Italiani</option>
                                    <option value="european">Provider Europei</option>
                                </select>
                            </div>
                        )}

                        {/* IP Search */}
                        {showIpFilter && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Search size={16} className="inline mr-1" />
                                    Cerca IP
                                </label>
                                <input
                                    type="text"
                                    value={filters.ipSearch}
                                    onChange={(e) => handleChange('ipSearch', e.target.value)}
                                    placeholder="es. 192.168"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                                />
                            </div>
                        )}

                        {/* Text Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Search size={16} className="inline mr-1" />
                                Ricerca Testo
                            </label>
                            <input
                                type="text"
                                value={filters.searchText}
                                onChange={(e) => handleChange('searchText', e.target.value)}
                                placeholder="Nome, email, azienda..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={onApplyFilters}
                            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold"
                        >
                            Applica Filtri
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterPanel;
