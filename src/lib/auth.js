// lib/auth.js  or  lib/keycloak.js

const REALM = "Rent-wepsite";
const KEYCLOAK_URL = "http://localhost:8080";

// ==================== LOGIN (Password Grant) ====================
export async function login(username, password) {
  const params = new URLSearchParams();
  params.append("client_id", "nextjs-app");           // Your public client
  params.append("grant_type", "password");
  params.append("username", username);
  params.append("password", password);

  const res = await fetch(
    `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    }
  );

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error_description || data.error);
  }

  return data; // { access_token, refresh_token, ... }
}

// ==================== SIGNUP (Using Admin API from Frontend) ====================
export async function signup(username, email, password) {
  // 1. Get admin token using client_credentials (service account)
  const tokenParams = new URLSearchParams();
  tokenParams.append("client_id", "frontend-admin");        // ← Change to your new client
  tokenParams.append("client_secret", "YOUR_CLIENT_SECRET_HERE"); // ← Put the secret here
  tokenParams.append("grant_type", "client_credentials");

  const tokenRes = await fetch(
    `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams,
    }
  );

  const tokenData = await tokenRes.json();
  if (tokenData.error) throw new Error(tokenData.error_description || "Failed to get admin token");

  const adminToken = tokenData.access_token;

  // 2. Create the user
  const res = await fetch(
    `${KEYCLOAK_URL}/admin/realms/${REALM}/users`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        username,
        email,
        enabled: true,
        firstName: "",      // optional
        lastName: "",       // optional
        credentials: [
          {
            type: "password",
            value: password,
            temporary: false,
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.errorMessage || "Signup failed");
  }

  return { success: true, message: "User created successfully" };
}