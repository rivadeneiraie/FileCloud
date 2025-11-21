"use client";

import React from "react";
import { postLogin } from "@/lib/services/AccountServices";
import { useAuthStore } from "@/lib/store/authStore"; 
import { z } from "zod";
import { decodeToken } from "@/lib/helpers/decodeToken";

export default function Login() {

  const schema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    const result = schema.safeParse({ email, password });
    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Error de validación";
      setError(firstError);
      return;
    }
    setError("");

    try {
      const res = await postLogin(email, password);
      const payload = decodeToken(res.accessToken);

      useAuthStore.getState().setToken(res.accessToken);
      useAuthStore.getState().setRefreshToken(res.refreshToken);
      useAuthStore.getState().setEmail(email);
      useAuthStore.getState().setRole(payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

      setSuccess("¡Login exitoso!");

    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="grow flex items-center justify-center">
      <div className="bg-surface rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col items-center">
        <h2 className="text-primary text-2xl font-bold mb-4">¡Bienvenido a FileCloud!</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border rounded px-3 py-2 w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded px-3 py-2 w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition-colors w-full"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}