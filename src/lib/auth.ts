'use server';

/**
 * Server action to authenticate users with Keycloak.
 * Non-null assertions (!) ensure TypeScript accepts env variables.
 */
export async function loginUser(formData: FormData) {
  try {
    const username = formData.get('username')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    if (!username || !password) {
      return { success: false, error: 'Username and password are required' };
    }

    // Environmental variables for EthiRent Keycloak setup
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!; 
    const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET!;
    const keycloakUrl = process.env.NEXT_PUBLIC_KEYCLOAK_URL!;
    const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM!; 

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('username', username);
    params.append('password', password);

    const url = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
      cache: 'no-store'
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data?.error_description || 'Invalid credentials',
      };
    }

    // Log tokens to the terminal for debugging
    console.log('--- LOGIN SUCCESS ---');
    console.log('Access Token:', data.access_token);

    return {
      success: true,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };

  } catch (error) {
    console.error('Auth Error:', error);
    return { success: false, error: 'Connection to Keycloak failed' };
  }
}