// Website Analysis Demo Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const analyzeBtn = document.getElementById('analyze-btn');
    const websiteUrlInput = document.getElementById('website-url');
    const loadingIndicator = document.querySelector('.analysis-loading');
    const resultContainer = document.querySelector('.result-content');
    const resultEmptyState = document.querySelector('.result-empty');
    const exampleButtons = document.querySelectorAll('.example-btn');
    
    // Initialize the demo components
    initializeDemo();
    
    function initializeDemo() {
        // Handle example buttons click
        if (exampleButtons && exampleButtons.length > 0) {
            exampleButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const url = this.getAttribute('data-url');
                    websiteUrlInput.value = url;
                });
            });
        }
        
        // Handle analyze button click
        if (analyzeBtn && websiteUrlInput) {
            analyzeBtn.addEventListener('click', async function() {
                const url = websiteUrlInput.value.trim();
                
                if (!url) {
                    alert('Please enter a valid website URL');
                    return;
                }
                
                // Show loading state
                const demoTab = document.getElementById('demo-tab');
                if (demoTab) demoTab.style.display = 'none';
                loadingIndicator.classList.remove('hidden');
                
                try {
                    // Simulate AI analysis with a real-time generated design
                    await simulateAnalysis(url);
                    
                    // Switch to results tab
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    document.querySelector('[data-tab="result-tab"]').classList.add('active');
                    
                    document.querySelectorAll('.playground-tab').forEach(tab => tab.classList.remove('active'));
                    document.getElementById('result-tab').classList.add('active');
                    
                    // Show results
                    resultEmptyState.classList.add('hidden');
                    resultContainer.classList.remove('hidden');
                    
                    // Reset demo tab for future use
                    if (demoTab) demoTab.style.display = 'block';
                } catch (error) {
                    console.error('Analysis failed:', error);
                    alert('Analysis failed. Please try again.');
                } finally {
                    loadingIndicator.classList.add('hidden');
                }
            });
        }
    }
    
    async function simulateAnalysis(url) {
        // Return a promise to simulate async behavior
        return new Promise((resolve) => {
            setTimeout(() => {
                generateResults(url);
                resolve();
            }, 3000); // Simulate 3 seconds of processing
        });
    }
    
    function generateResults(url) {
        // Generate a deterministic hash from URL for consistent results
        const hash = simpleHash(url);
        
        // Extract domain name for display
        let domain = url;
        try {
            const urlObject = new URL(url);
            domain = urlObject.hostname;
        } catch (e) {
            console.log('Invalid URL format, using as-is');
        }
        
        // Generate color palette based on URL hash
        generateColorPalette(hash);
        
        // Generate typography samples
        generateTypography(hash, domain);
        
        // Generate layout preview
        generateLayout(hash);
        
        // Generate component samples
        generateComponents(hash);
    }
    
    function generateColorPalette(hash) {
        const colorSwatches = document.querySelector('.color-swatches');
        colorSwatches.innerHTML = '';
        
        // Create a palette based on the hash
        const colors = [
            hslToHex((hash % 360), 80, 60), // Primary
            hslToHex(((hash + 30) % 360), 70, 50), // Secondary
            hslToHex(((hash + 180) % 360), 60, 70), // Accent
            '#212529', // Text dark
            '#6C757D', // Text light
            '#F8F9FA'  // Background
        ];
        
        // Display color swatches
        colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.style.width = '40px';
            swatch.style.height = '40px';
            swatch.style.backgroundColor = color;
            swatch.style.borderRadius = '8px';
            swatch.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            colorSwatches.appendChild(swatch);
        });
    }
    
    function generateTypography(hash, domain) {
        const typographyContainer = document.querySelector('.typography-samples');
        // Determine font style based on domain
        const fontFamily = domain.includes('serif') ? 'serif' : 'sans-serif';
        const primaryColor = hslToHex((hash % 360), 80, 60);
        
        typographyContainer.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h3 style="font-family: ${fontFamily}; color: ${primaryColor}; margin-bottom: 8px;">Heading Style (H1, H2, H3)</h3>
                <p style="font-family: ${fontFamily}; color: #212529; font-size: 14px;">
                    Main text style uses ${fontFamily} font, with line height of 1.6 and moderate letter spacing.
                </p>
            </div>
            <div>
                <button style="background-color: ${primaryColor}; color: white; border: none; padding: 8px 16px; border-radius: 4px; font-weight: 500;">
                    Button Style
                </button>
                <span style="display: inline-block; margin-left: 16px; font-size: 14px; color: #6C757D;">
                    Link & emphasis color: <span style="color: ${primaryColor};">Sample text</span>
                </span>
            </div>
        `;
    }
    
    function generateLayout(hash) {
        const layoutContainer = document.querySelector('.layout-sample');
        const primaryColor = hslToHex((hash % 360), 80, 60);
        
        layoutContainer.innerHTML = `
            <div style="border: 1px solid #E9ECEF; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="background-color: ${primaryColor}; padding: 10px; color: white;">
                    <div style="width: 100px; height: 5px; background-color: white; opacity: 0.7; border-radius: 3px;"></div>
                </div>
                <div style="padding: 16px;">
                    <div style="width: 70%; height: 10px; background-color: #212529; border-radius: 3px; margin-bottom: 12px;"></div>
                    <div style="width: 90%; height: 5px; background-color: #6C757D; opacity: 0.7; border-radius: 3px; margin-bottom: 8px;"></div>
                    <div style="width: 80%; height: 5px; background-color: #6C757D; opacity: 0.7; border-radius: 3px; margin-bottom: 16px;"></div>
                    <div style="display: flex; gap: 8px;">
                        <div style="width: 80px; height: 26px; background-color: ${primaryColor}; border-radius: 4px;"></div>
                        <div style="width: 80px; height: 26px; background-color: #F8F9FA; border: 1px solid ${primaryColor}; border-radius: 4px;"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function generateComponents(hash) {
        const componentsContainer = document.querySelector('.components-samples');
        const primaryColor = hslToHex((hash % 360), 80, 60);
        const secondaryColor = hslToHex(((hash + 30) % 360), 70, 50);
        const accentColor = hslToHex(((hash + 180) % 360), 60, 70);
        
        componentsContainer.innerHTML = `
            <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                <div style="width: 120px; background-color: #F8F9FA; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="width: 100%; height: 60px; background-color: ${secondaryColor}; border-radius: 4px; margin-bottom: 8px;"></div>
                    <div style="width: 70%; height: 8px; background-color: #212529; border-radius: 3px; margin-bottom: 4px;"></div>
                    <div style="width: 90%; height: 4px; background-color: #6C757D; border-radius: 3px;"></div>
                </div>
                <div style="width: 120px; background-color: #F8F9FA; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="width: 100%; height: 60px; background-color: ${accentColor}; border-radius: 4px; margin-bottom: 8px;"></div>
                    <div style="width: 80%; height: 8px; background-color: #212529; border-radius: 3px; margin-bottom: 4px;"></div>
                    <div style="width: 60%; height: 4px; background-color: #6C757D; border-radius: 3px;"></div>
                </div>
                <div style="width: 120px; background-color: #F8F9FA; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="width: 100%; height: 60px; background-color: ${primaryColor}; border-radius: 4px; margin-bottom: 8px;"></div>
                    <div style="width: 50%; height: 8px; background-color: #212529; border-radius: 3px; margin-bottom: 4px;"></div>
                    <div style="width: 80%; height: 4px; background-color: #6C757D; border-radius: 3px;"></div>
                </div>
            </div>
        `;
    }
    
    // Helper function to create a simple hash from a string
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }
    
    // Helper function to convert HSL to HEX
    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }
});