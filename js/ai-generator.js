// AI Image Generator Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the AI generator page
    const generateBtn = document.getElementById('generate-btn');
    if (!generateBtn) return;
    
    const promptText = document.getElementById('prompt-text');
    const styleSelect = document.getElementById('style-select');
    const aspectRatioSelect = document.getElementById('aspect-ratio');
    const seedInput = document.getElementById('seed-input');
    const resultDisplay = document.getElementById('result-display');
    const resultImage = document.getElementById('result-image');
    const emptyState = document.getElementById('empty-state');
    const loadingIndicator = document.getElementById('loading-indicator');
    const downloadBtn = document.getElementById('download-btn');
    const saveBtn = document.getElementById('save-btn');
    const shareBtn = document.getElementById('share-btn');
    
    generateBtn.addEventListener('click', async function() {
        // Validate input
        if (!promptText.value.trim()) {
            alert('Please enter a description for your image');
            return;
        }
        
        // Show loading state
        emptyState.style.display = 'none';
        resultImage.style.display = 'none';
        loadingIndicator.style.display = 'flex';
        
        // Disable buttons during generation
        generateBtn.disabled = true;
        downloadBtn.disabled = true;
        saveBtn.disabled = true;
        shareBtn.disabled = true;
        
        try {
            // Get generation options
            const prompt = promptText.value.trim();
            const style = styleSelect.value;
            const aspectRatio = aspectRatioSelect.value;
            const seed = seedInput.value ? parseInt(seedInput.value) : null;
            
            // Generate image (in a real implementation, this would call an AI service)
            const imageUrl = await generateAIImage(prompt, style, aspectRatio, seed);
            
            // Display the result
            loadingIndicator.style.display = 'none';
            resultImage.src = imageUrl;
            resultImage.style.display = 'block';
            
            // Enable action buttons
            downloadBtn.disabled = false;
            saveBtn.disabled = false;
            shareBtn.disabled = false;
        } catch (error) {
            console.error('Image generation failed:', error);
            alert('Failed to generate image. Please try again.');
            loadingIndicator.style.display = 'none';
            emptyState.style.display = 'block';
        } finally {
            // Re-enable generate button
            generateBtn.disabled = false;
        }
    });
    
    // Download button functionality
    downloadBtn.addEventListener('click', function() {
        if (resultImage.src) {
            const link = document.createElement('a');
            link.href = resultImage.src;
            link.download = 'ideavisor-generated-image.jpg';
            link.click();
        }
    });
    
    // Save button functionality (would connect to user's gallery in a real implementation)
    saveBtn.addEventListener('click', function() {
        alert('Image saved to your gallery!');
    });
    
    // Share button functionality
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'My IdeaVisor AI Generated Image',
                text: 'Check out this design inspiration generated with IdeaVisor AI!',
                url: resultImage.src
            })
            .catch(console.error);
        } else {
            alert('Copy this link to share: ' + resultImage.src);
        }
    });
    
    // AI Image generation function
    // This is a simulation for demo purposes
    // In a real implementation, this would call an actual AI image generation API
    async function generateAIImage(prompt, style, aspectRatio, seed) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // For demo, return a random image from Unsplash
        const imageUrls = [
            'https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        ];
        return imageUrls[Math.floor(Math.random() * imageUrls.length)];
        
        // Example of how this would work with an actual AI API using the llm-calls capability:
        /*
        try {
            const result = await websim.imageGen({
                prompt: prompt + (style !== 'realistic' ? `, ${style} style` : ''),
                aspect_ratio: aspectRatio,
                seed: seed || undefined
            });
            return result.url;
        } catch (error) {
            console.error("Image generation failed:", error);
            throw error;
        }
        */
    }
});