async function testContact() {
  try {
    console.log('Sending test request to contact endpoint...');
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        service: 'General Inquiry',
        message: 'Test message from script'
      }),
    });

    const text = await response.text();
    console.log('Response status:', response.status);
    console.log('Response body:', text);
  } catch (error) {
    console.error('Error:', error);
  }
  process.exit(0);
}

testContact();