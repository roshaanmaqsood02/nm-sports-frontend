"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import PlayerForm from "../../components/PlayerForm";
import PlayerCard from "../../components/PlayerCard";
import { Player, PlayerFormData } from "../../types/player";

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editPlayer, setEditPlayer] = useState<Player | null>(null);
  const [activeCount, setActiveCount] = useState(0);

  const router = useRouter();

  const fetchPlayers = async () => {
    try {
      const response = await api.get("/players");
      setPlayers(response.data);

      const metrics = await api.get("/players/metrics/active-count");
      setActiveCount(metrics.data.count);
    } catch (error) {
      console.error("Failed to fetch players", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleCreate = async (playerData: PlayerFormData) => {
    try {
      await api.post("/players", playerData);
      fetchPlayers();
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create player", error);
    }
  };

  const handleUpdate = async (id: string, playerData: PlayerFormData) => {
    try {
      await api.patch(`/players/${id}`, playerData);
      fetchPlayers();
      setEditPlayer(null);
    } catch (error) {
      console.error("Failed to update player", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/players/${id}`);
      fetchPlayers();
    } catch (error) {
      console.error("Failed to delete player", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading players...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-500">Players Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your team roster and player information
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditPlayer(null);
          }}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Player
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-gray-800">
        <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="mr-4 p-3 bg-blue-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Players</p>
              <p className="text-2xl font-bold mt-1">{players.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="mr-4 p-3 bg-green-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Players</p>
              <p className="text-2xl font-bold mt-1">{activeCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="mr-4 p-3 bg-purple-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Inactive Players</p>
              <p className="text-2xl font-bold mt-1">{players.length - activeCount}</p>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <PlayerForm
          onSubmit={
            editPlayer
              ? (data) => handleUpdate(editPlayer.id, data)
              : handleCreate
          }
          initialData={editPlayer}
          onCancel={() => {
            setShowForm(false);
            setEditPlayer(null);
          }}
        />
      )}

      {players.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onEdit={() => {
                setEditPlayer(player);
                setShowForm(true);
              }}
              onDelete={(id) => handleDelete(id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mt-4">No players found</h3>
          <p className="text-gray-500 mt-2 mb-6">
            Get started by adding your first player to the roster
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add Player
          </button>
        </div>
      )}
    </div>
  );
}