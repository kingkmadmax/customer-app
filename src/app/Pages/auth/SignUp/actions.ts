'use server';

export async function registerUser(formData: FormData) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string || '';
  const lastName = formData.get('lastName') as string || '';

  const KEYCLOAK_URL = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
  const REALM = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
  const ADMIN_CLIENT_ID = process.env.KEYCLOAK_ADMIN_CLIENT_ID;
  const ADMIN_CLIENT_SECRET = process.env.KEYCLOAK_ADMIN_CLIENT_SECRET;

  try {
    // 1. Get admin token (client_credentials)
    const tokenRes = await fetch(
      `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: ADMIN_CLIENT_ID!,
          client_secret: ADMIN_CLIENT_SECRET!,
        }),
      }
    );

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) throw new Error('Failed to get admin token');

    const adminToken = tokenData.access_token;

    // 2. Create user
    const userPayload = {
      username,
      email,
      enabled: true,
      
    emailVerified: true,        // change to true if you don't want verification
      firstName,
      lastName,
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: false,
        },
      ],
    };

    const createRes = await fetch(
      `${KEYCLOAK_URL}/admin/realms/${REALM}/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(userPayload),
      }
    );

    if (createRes.status === 201) {
      return { success: true };
    } else {
      const err = await createRes.json();
      return { success: false, error: err.errorMessage || 'Failed to create user' };
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Server error' };
  }
}