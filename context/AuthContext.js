import React, { createContext, useContext, useEffect, useState } from "react";
import supabase from "../config/clientSupabase";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("🚀 ~ No se encontró la sesión ~ :", error);
        }

        if (session) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("username, role")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("🚀 ~ No se encontró el perfil ~ :", profileError);
          }

          setUser({
            ...session.user,
            username: profile.username,
            role: profile.role,
          });
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("username, role")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("🚀 ~ No se encontró el perfil ~ :", profileError);
          }

          setUser({
            ...session.user,
            username: profile.username,
            role: profile.role,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => listener?.subscription.unsubscribe();
  }, []);

  const logOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
