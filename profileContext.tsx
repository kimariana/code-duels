"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Profile } from "@/utils/types";
import { useAuth } from "./authContext";
import { createClient } from "@/lib/supabase/client";

type ProfileContextType = {
  profile: Profile | null;
  userId: string | null;
  displayName: string | null;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  isGuest: boolean;
  loading: boolean;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

type ProfileProviderProps = {
  children: React.ReactNode;
};

export function ProfileProvider({ children }: ProfileProviderProps) {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  
  // Loads profile
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);

      if (user) {
        // Loads the user's corresponding profile
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Error loading profile:", error.message);
          setProfile(null);
          setIsGuest(false);
        } else if (!data) {
          // Creates a guest profile
          let guestId = sessionStorage.getItem("guestId");
          if (!guestId) {
            guestId = `guest_${crypto.randomUUID()}`;
            sessionStorage.setItem("guestId", guestId);
          }
          setProfile({
            id: guestId,
            username: `guest_${Math.floor(Math.random() * 10000)}`,
            display_name: "Guest",
            avatar_url: null,
            wins: 0,
            losses: 0,
            elo: 1000,
          });
          setIsGuest(true);
        } else {
          setProfile(data as Profile);
          setIsGuest(false);
        }
      } else {
        // Creates a guest profile
        let guestId = sessionStorage.getItem("guestId");
          if (!guestId) {
            guestId = `guest_${crypto.randomUUID()}`;
            sessionStorage.setItem("guestId", guestId);
          }
          setProfile({
            id: guestId,
            username: `guest_${Math.floor(Math.random() * 10000)}`,
            display_name: "Guest",
            avatar_url: null,
            wins: 0,
            losses: 0,
            elo: 1000,
          });
          setIsGuest(true);
      }

      setLoading(false);
    };

    loadProfile();
  }, [user, supabase]);

  async function updateProfile(updates: Partial<Profile>) {
    if (isGuest) {
      setProfile((prev) => prev ? { ...prev, ...updates } : null);
      return;
    }

    if (!profile?.id) return;

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", profile.id)
      .select()
      .maybeSingle();

    if (error) console.error("Error updating profile:", error);
    else setProfile(data);
  }

  const userId = profile?.id ?? null;
  const displayName = profile?.display_name ?? null;

  return (
    <ProfileContext.Provider
      value={{ profile, userId, displayName, updateProfile, isGuest, loading: authLoading || loading }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
}
