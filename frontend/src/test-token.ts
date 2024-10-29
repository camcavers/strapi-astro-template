import 'dotenv/config';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function testConnection() {
  try {
    if (!STRAPI_API_TOKEN) {
      throw new Error('No API token found in environment variables');
    }

    console.log('Testing connection to:', STRAPI_URL);
    console.log('Using token:', STRAPI_API_TOKEN.substring(0, 6) + '...');

    // First test the base connection
    try {
      const baseResponse = await fetch(STRAPI_URL);
      console.log('Base Strapi connection:', baseResponse.status === 200 ? 'OK' : 'Failed');
    } catch (error) {
      console.error('Cannot connect to Strapi server at all. Is it running?');
      throw error;
    }

    // Now test the API endpoint
    const apiResponse = await fetch(`${STRAPI_URL}/api/posts`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('API Response status:', apiResponse.status);
    console.log('API Response status text:', apiResponse.statusText);
    
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.log('Error response body:', errorText);
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    console.log('Connection successful!');
    console.log('Response data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error testing connection:', error);
  }
}

testConnection();