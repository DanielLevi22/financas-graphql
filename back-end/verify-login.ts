const GRAPHQL_URL = 'http://localhost:4000/';

const registerMutation = `
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const loginMutation = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

async function testAuth() {
  const email = `testuser_${Date.now()}@example.com`;
  const password = 'password123';
  const name = 'Test User';

  console.log(`Testing with email: ${email}`);

  // 1. Register
  console.log('1. Registering user...');
  const registerRes = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: registerMutation,
      variables: { name, email, password },
    }),
  });

  const registerData: any = await registerRes.json();
  if (registerData.errors) {
    console.error('Registration failed:', JSON.stringify(registerData.errors, null, 2));
    process.exit(1);
  }
  console.log('User registered successfully:', registerData.data.register.user);

  // 2. Login
  console.log('\n2. Logging in...');
  const loginRes = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: loginMutation,
      variables: { email, password },
    }),
  });

  const loginData: any = await loginRes.json();
  if (loginData.errors) {
    console.error('Login failed:', JSON.stringify(loginData.errors, null, 2));
    process.exit(1);
  }

  console.log('Login successful! Token received:', loginData.data.login.token.substring(0, 20) + '...');
  console.log('User ID:', loginData.data.login.user.id);
}

testAuth();
