"use client";

import { useProfileContext } from '@/context/profileContext';
import { useState, useEffect, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRound } from "lucide-react";

export default function ProfilePage() {
  const { profile, displayName, updateProfile, isGuest, loading } = useProfileContext();
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(displayName || "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
      if (displayName) {
        setTempName(displayName);
      }
    }, [displayName]);
  
  if (loading) return <div>Loading profile...</div>
  if (!profile) return <div>No profile exists.</div>

  const handleSave = async () => {
    if (!tempName.trim()) return;
    if (tempName.length < 3 || tempName.length > 20) {
      setError("Display name must be between 3 and 20 characters");
      return;
    }

    setError(null);
    setSaving(true);

    try {
      await updateProfile({ display_name: tempName });
    } catch (err) {
      console.error("Failed to update display name:", err);
      setError("Failed to update display name.");
    } finally {
      setSaving(false);
      setEditing(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 p-6">
      {/* Avatar Image */}
      {profile?.avatar_url ? (
        <img
          src={profile.avatar_url}
          alt="User Avatar"
          className="h-50 w-50 rounded-full"
        />
      ) : (
        <UserRound className="h-50 w-50 rounded-full"/>
      )}
      {editing ? (
        <div className="flex flex-col items-center gap-2">
          <div className="w-full text-left">
            <label className="block text-sm text-gray-300">Display Name</label>
          </div>
          {/* Display Name Input */}
          <Input
            type="text"
            value={tempName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTempName(e.target.value)}
            className="bg-white text-black"
            placeholder="Enter display name"
          />
          <div className="flex gap-2 mt-2">
            {/* Display Name Buttons */}
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
      ) : (
        <>
          {/* Profile Info */}
          <h2 className="text-2xl font-bold">{displayName}</h2>
          <p className="text-gray-400">@{profile.username || "guest"}</p>
          <p>Wins: {profile.wins}</p>
          <p>Losses: {profile.losses}</p>
          <p>ELO: {profile.elo}</p>
          <Button onClick={() => setEditing(true)}>Edit Display Name</Button>
          {isGuest && <p className="text-sm text-gray-400">Login to save your profile</p>}
        </>
      )}
    </div>
  );
}
