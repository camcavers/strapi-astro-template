const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.PUBLIC_STRAPI_API_TOKEN;

console.log('API Client - Environment Variables:', {
  STRAPI_URL,
  hasToken: !!STRAPI_TOKEN
});

// Updated to match Strapi's actual response format
export type Post = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
};

// Type for Strapi API responses
type StrapiResponse<T> = {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
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

    const data: StrapiResponse<T> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchPosts(): Promise<Post[]> {
  return fetchAPI<Post[]>('/posts');
}

export async function fetchPost(slug: string): Promise<Post | null> {
  if (!slug) return null;
  
  const posts = await fetchAPI<Post[]>(`/posts?filters[slug][$eq]=${slug}`);
  if (!Array.isArray(posts) || posts.length === 0) {
    return null;
  }
  return posts[0];
}