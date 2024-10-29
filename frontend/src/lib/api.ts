const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.PUBLIC_STRAPI_API_TOKEN;

console.log('API Client - Environment Variables:', {
  STRAPI_URL,
  hasToken: !!STRAPI_TOKEN
});

type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  // Include other fields as necessary
};

export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  console.log('Fetching from:', url);
  console.log('With headers:', {
    ...(STRAPI_TOKEN ? { Authorization: 'Bearer [hidden]' } : {}),
    'Content-Type': 'application/json'
  });

  try {
    const response = await fetch(url, {
      headers: {
        ...(STRAPI_TOKEN ? { 'Authorization': `Bearer ${STRAPI_TOKEN}` } : {}),
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error Details:', {
        status: response.status,
        statusText: response.statusText,
        url,
        errorBody: errorText
      });
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchPosts(): Promise<Post[]> {
  // Using the exact API path from your Strapi URL
  return fetchAPI('/posts');
}

export async function fetchPost(slug: string): Promise<Post> {
  // Using the exact API path and query parameter format
  const posts = await fetchAPI(`/posts?filters[slug][$eq]=${slug}`);
  if (!posts.length) {
    throw new Error(`Post not found: ${slug}`);
  }
  return posts[0];
}