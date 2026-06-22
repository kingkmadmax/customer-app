'use server';

export async function LoginUser(formData: FormData) {
  const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:9090';

  // log to see what you're getting
  console.log("username:", formData.get('username'));
  console.log("email:", formData.get('email'));

  const payload = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  };
  console.log("payload:", payload);

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      return { success: true };
    } else {
      return { success: false, error: data.error || 'Registration failed' };
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Server error' };
  }
}