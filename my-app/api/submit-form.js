// Vercel Serverless Function to handle form submission
// This runs server-side, avoiding CORS issues and keeping API keys secure

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the Google Form URL from environment variables
    const googleFormUrl = process.env.REACT_APP_GOOGLE_FORM_URL || process.env.GOOGLE_FORM_URL;
    
    if (!googleFormUrl) {
      console.error('Google Form URL is not configured');
      return res.status(500).json({ 
        error: 'Form submission endpoint is not configured. Please contact the administrator.' 
      });
    }

    // Get form data from request body
    // The client sends { formData: "urlencoded string" }
    let formDataString;
    if (typeof req.body === 'string') {
      // If body is already a string (raw), use it directly
      formDataString = req.body;
    } else if (req.body.formData) {
      // If body is JSON with formData property
      formDataString = req.body.formData;
    } else {
      // If body is an object, convert to URL-encoded string
      formDataString = new URLSearchParams(req.body).toString();
    }

    // Forward the request to Google Forms
    const response = await fetch(googleFormUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formDataString,
    });

    const text = await response.text();
    
    // Try to parse as JSON, but Google Forms might return HTML
    let result = {};
    try {
      result = JSON.parse(text);
    } catch (e) {
      // Google Forms typically returns HTML, so we consider it a success
      // if we get a response (even if it's HTML)
      result = { result: 'success' };
    }

    // Return success response
    return res.status(200).json(result);
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ 
      error: 'Failed to submit form. Please try again later.' 
    });
  }
}

