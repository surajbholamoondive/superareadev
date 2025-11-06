import { useState } from 'react';

const DescriptionGenerator = () => {
  const [userInput, setUserInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const generateDescription = async () => {
    setLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_SECRET
      const prompt = `Generate a description for a property: ${userInput}`;

      // Send the prompt to the DALL·E model to generate the image
      const response = await fetch(process.env.NEXT_PUBLIC_OPENAI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt,
          max_tokens: 150, // Adjust max_tokens as needed
          // Add any other parameters you need for image generation
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const generatedImage = data.choices[0].text;

        // Update the state with the generated image
        setGeneratedImage(generatedImage);
      } else {
        console.error('Error generating image:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Enter property details here..."
        value={userInput}
        onChange={handleUserInputChange}
      />
      <button onClick={generateDescription} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Description'}
      </button>
      <div>
        <strong>Generated Description:</strong>
        {generatedImage && (
          <img
            src={generatedImage}
            alt="Generated Property Description"
            style={{ maxWidth: '100%' }}
          />
        )}
      </div>
    </div>
  );
};

export default DescriptionGenerator;
