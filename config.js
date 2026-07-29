/**
 * Smart AI Agency — Environment Configuration
 *
 * IMPORTANT: Create a .env file in the root directory with your API keys.
 * For development, copy .env.example to .env and fill in your values.
 * Never commit .env to version control.
 */

async function loadConfig() {
  try {
    // Try to load .env file (works with appropriate server configuration)
    const response = await fetch('.env');
    if (!response.ok) {
      console.warn('No .env file found. Using fallback configuration.');
      return getDefaultConfig();
    }

    const envText = await response.text();
    const config = parseEnv(envText);
    return config;
  } catch (error) {
    console.warn('Failed to load .env file:', error.message);
    return getDefaultConfig();
  }
}

function parseEnv(envText) {
  const config = {};
  envText.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;

    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=').trim();

    // Remove quotes if present
    config[key.trim()] = value.replace(/^["']|["']$/g, '');
  });
  return config;
}

function getDefaultConfig() {
  // Fallback configuration - will fail gracefully if keys are missing
  return {
    // Supabase (optional)
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || '',
    VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || '',

    // EmailJS (for email submissions)
    VITE_EMAILJS_SERVICE_ID: process.env.VITE_EMAILJS_SERVICE_ID || '',
    VITE_EMAILJS_TEMPLATE_ID: process.env.VITE_EMAILJS_TEMPLATE_ID || '',
    VITE_EMAILJS_PUBLIC_KEY: process.env.VITE_EMAILJS_PUBLIC_KEY || '',

    // Google Analytics (optional)
    VITE_GA_TRACKING_ID: process.env.VITE_GA_TRACKING_ID || '',
  };
}

// Export for use in other scripts
const CONFIG = loadConfig().catch(() => getDefaultConfig());

// Verify configuration on load
CONFIG.then(config => {
  if (!config.VITE_SUPABASE_URL || !config.VITE_SUPABASE_ANON_KEY) {
    console.warn(
      '[Smart AI Agency] Supabase credentials not configured. ' +
      'Contact form submissions will be disabled. ' +
      'Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    );
  }
}).catch(err => {
  console.error('[Smart AI Agency] Configuration load failed:', err);
});
