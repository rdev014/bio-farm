'use client';
import React, { useState, useEffect } from 'react';
import { Save, Trash2, Edit, Plus, MapPin, Calendar, Sprout, Activity, Search, Filter, Grid, List } from 'lucide-react';
import { createFarm, getFarms, updateFarm, deleteFarm } from '@/actions/user';
import { toast } from 'sonner';

interface Farm {
  name: string;
  size?: string;
  location?: string;
  established?: number;
  crops?: string;
  status?: 'Active' | 'Planning' | 'Inactive';
}

interface FarmResponse {
  success: boolean;
  farm?: Farm;
  farms?: Farm[];
  error?: string;
}

export default function Farms({ userId }: { userId?: string }) {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [showFarmForm, setShowFarmForm] = useState(false);
  const [newFarm, setNewFarm] = useState<Farm>({ name: '', size: '', location: '', established: undefined, crops: '', status: 'Active' });
  const [editingFarmIndex, setEditingFarmIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Planning' | 'Inactive'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // New state for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [farmToDelete, setFarmToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchFarms = async () => {
      if (userId) {
        const response = await getFarms(userId);
        if (response.success && response.farms) {
          setFarms(response.farms);
        } else {
          toast.error(response.error || 'Failed to fetch farms');
        }
      }
    };
    fetchFarms();
  }, [userId]);

  const filteredFarms = farms.filter(farm => {
    const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.crops?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || farm.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast.error('User not authenticated');
      return;
    }
    setLoading(true);
    try {
      const farmData = {
        name: newFarm.name,
        size: newFarm.size,
        location: newFarm.location,
        established: newFarm.established ? parseInt(newFarm.established.toString()) : undefined,
        crops: newFarm.crops,
        status: newFarm.status as 'Active' | 'Planning' | 'Inactive',
      };
      let response: FarmResponse;
      if (editingFarmIndex !== null) {
        response = await updateFarm(userId, editingFarmIndex, farmData);
      } else {
        response = await createFarm(userId, farmData);
      }
      if (response.success) {
        toast.success(editingFarmIndex !== null ? 'Farm updated' : 'Farm created');
        setFarms(editingFarmIndex !== null
          ? farms.map((farm, i) => (i === editingFarmIndex ? response.farm! : farm))
          : [...farms, response.farm!]);
        setShowFarmForm(false);
        setNewFarm({ name: '', size: '', location: '', established: undefined, crops: '', status: 'Active' });
        setEditingFarmIndex(null);
      } else {
        throw new Error(response.error || 'Failed to save farm');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save farm');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index: number) => {
    if (!userId) {
      toast.error('User not authenticated');
      return;
    }
    // Show confirmation modal instead of window.confirm
    setFarmToDelete(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (farmToDelete === null || !userId) return;
    setLoading(true);
    try {
      const response = await deleteFarm(userId, farmToDelete);
      if (response.success) {
        toast.success('Farm deleted');
        setFarms(farms.filter((_, i) => i !== farmToDelete));
      } else {
        throw new Error(response.error || 'Failed to delete farm');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete farm');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setFarmToDelete(null);
    }
  };

  const handleEdit = (index: number) => {
    setNewFarm(farms[index]);
    setEditingFarmIndex(index);
    setShowFarmForm(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Planning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Activity className="w-4 h-4" />;
      case 'Planning': return <Calendar className="w-4 h-4" />;
      case 'Inactive': return <div className="w-4 h-4 rounded-full bg-gray-400" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100 rounded-t-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Farm Management</h1>
              <p className="mt-2 text-gray-600">Manage your organic farms with Arkin Organics</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium">
                Arkin Organics
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search farms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Active' | 'Planning' | 'Inactive')}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Planning">Planning</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setShowFarmForm(true)}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Farm
              </button>
            </div>
          </div>
        </div>

        {/* Farm Form Modal */}
        {showFarmForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingFarmIndex !== null ? 'Edit Farm' : 'Add New Farm'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {editingFarmIndex !== null ? 'Update farm information' : 'Create a new organic farm'}
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Farm Name *</label>
                    <input
                      type="text"
                      value={newFarm.name}
                      onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Enter farm name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                    <input
                      type="text"
                      value={newFarm.size || ''}
                      onChange={(e) => setNewFarm({ ...newFarm, size: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="e.g., 25 acres"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={newFarm.location || ''}
                      onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Farm location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Established Year</label>
                    <input
                      type="number"
                      value={newFarm.established || ''}
                      onChange={(e) => setNewFarm({ ...newFarm, established: parseInt(e.target.value) || undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="2024"
                      min="1900"
                      max="2030"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select
                      value={newFarm.status}
                      onChange={(e) => setNewFarm({ ...newFarm, status: e.target.value as 'Active' | 'Planning' | 'Inactive' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Planning">Planning</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Crops</label>
                    <input
                      type="text"
                      value={newFarm.crops || ''}
                      onChange={(e) => setNewFarm({ ...newFarm, crops: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="e.g., Tomatoes, Lettuce, Herbs"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowFarmForm(false);
                      setNewFarm({ name: '', size: '', location: '', established: undefined, crops: '', status: 'Active' });
                      setEditingFarmIndex(null);
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(e);
                    }}
                    disabled={loading}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Save className="w-5 h-5 mr-2" />
                    )}
                    {editingFarmIndex !== null ? 'Update Farm' : 'Create Farm'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Confirm Delete</h2>
                <p className="text-gray-600 mt-2">
                  Are you sure you want to delete the farm <strong>{farms[farmToDelete!].name}</strong>? This action cannot be undone.
                </p>
              </div>
              <div className="p-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setFarmToDelete(null);
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Trash2 className="w-5 h-5 mr-2" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Farms Display */}
        <div className="space-y-6">
          {filteredFarms.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredFarms.map((farm, index) => (
                <div key={index} className={`bg-white rounded-2xl shadow-sm border border-green-100 hover:shadow-lg transition-all transform hover:scale-105 overflow-hidden ${viewMode === 'list' ? 'flex items-center p-6' : 'p-6'}`}>
                  {viewMode === 'grid' ? (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(farm.status || 'Active')}`}>
                          {getStatusIcon(farm.status || 'Active')}
                          <span className="ml-2">{farm.status || 'Active'}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{farm.name}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="font-medium">Size:</span>
                          <span className="ml-2">{farm.size || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 text-green-600 mr-3" />
                          <span className="font-medium">Location:</span>
                          <span className="ml-2">{farm.location || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 text-green-600 mr-3" />
                          <span className="font-medium">Established:</span>
                          <span className="ml-2">{farm.established || 'N/A'}</span>
                        </div>
                        <div className="text-gray-600">
                          <div className="flex flex-row">
                            <Sprout className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <p className="font-medium">Crops</p>
                          </div>
                          <p>{farm.crops || 'N/A'}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 flex items-center space-x-6">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{farm.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{farm.size || 'N/A'}</span>
                            <span>•</span>
                            <span>{farm.location || 'N/A'}</span>
                            <span>•</span>
                            <span>{farm.established || 'N/A'}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 pt-2">
                            <span className="font-bold">Crops</span> <span>{farm.crops || 'N/A'}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(farm.status || 'Active')}`}>
                            {getStatusIcon(farm.status || 'Active')}
                            <span className="ml-2">{farm.status || 'Active'}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(index)}
                              className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No farms found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== 'All'
                  ? 'No farms match your current filters. Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first organic farm to the system.'
                }
              </p>
              {(!searchTerm && filterStatus === 'All') && (
                <button
                  onClick={() => setShowFarmForm(true)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Farm
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}