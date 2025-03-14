// Website Comparison Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const compareBtn = document.getElementById('compare-btn');
    const experienceUrlInput = document.getElementById('experience-url');
    const experienceLoading = document.querySelector('.experience-loading');
    const experienceResults = document.querySelector('.experience-results');
    const resultTabs = document.querySelectorAll('.result-tab');
    
    if (compareBtn && experienceUrlInput) {
        compareBtn.addEventListener('click', async function() {
            const url = experienceUrlInput.value.trim();
            
            if (!url) {
                alert('Please enter a valid website URL');
                return;
            }
            
            // Show loading state
            experienceLoading.classList.remove('hidden');
            experienceResults.classList.add('hidden');
            
            try {
                // Simulate analysis with different engines
                await simulateMultiEngineAnalysis(url);
                
                // Show results
                experienceLoading.classList.add('hidden');
                experienceResults.classList.remove('hidden');
                
                // Ensure first tab is active
                resultTabs.forEach(tab => tab.classList.remove('active'));
                document.querySelector('[data-result="standard"]').classList.add('active');
                
                document.querySelectorAll('.result-panel').forEach(panel => panel.classList.remove('active'));
                document.getElementById('standard-result').classList.add('active');
            } catch (error) {
                console.error('Comparison analysis failed:', error);
                alert('Analysis failed. Please try again.');
                experienceLoading.classList.add('hidden');
            }
        });
        
        // Handle result tabs
        resultTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const resultId = this.getAttribute('data-result');
                
                resultTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                document.querySelectorAll('.result-panel').forEach(panel => panel.classList.remove('active'));
                document.getElementById(resultId + '-result').classList.add('active');
            });
        });
    }
    
    async function simulateMultiEngineAnalysis(url) {
        // Return a promise to simulate async behavior
        return new Promise((resolve) => {
            setTimeout(() => {
                generateComparisonResults(url);
                resolve();
            }, 3000); // Simulate 3 seconds of processing
        });
    }
    
    function generateComparisonResults(url) {
        // Generate a deterministic hash from URL for consistent results
        const hash = simpleHash(url);
        
        // Generate different analysis results for each engine
        updateStandardAnalysis(hash);
        updateEnhancedAnalysis(hash);
        updateDetailedAnalysis(hash);
    }
    
    function updateStandardAnalysis(hash) {
        const colorDots = document.querySelector('#standard-result .color-dots');
        colorDots.innerHTML = '';
        
        // Create fewer colors for standard analysis
        const colors = [
            hslToHex((hash % 360), 80, 60),
            hslToHex(((hash + 120) % 360), 60, 50),
            hslToHex(((hash + 240) % 360), 40, 70)
        ];
        
        colors.forEach(color => {
            const dot = document.createElement('div');
            dot.className = 'color-dot';
            dot.style.backgroundColor = color;
            colorDots.appendChild(dot);
        });
        
        // Update complexity meter
        const meterFill = document.querySelector('#standard-result .meter-fill');
        meterFill.style.width = '40%';
    }
    
    function updateEnhancedAnalysis(hash) {
        const colorDots = document.querySelector('#enhanced-result .color-dots');
        colorDots.innerHTML = '';
        
        // Create more colors for enhanced analysis
        const colors = [
            hslToHex((hash % 360), 80, 60),
            hslToHex(((hash + 60) % 360), 70, 50),
            hslToHex(((hash + 120) % 360), 60, 70),
            hslToHex(((hash + 180) % 360), 50, 40),
            hslToHex(((hash + 240) % 360), 40, 80)
        ];
        
        colors.forEach(color => {
            const dot = document.createElement('div');
            dot.className = 'color-dot';
            dot.style.backgroundColor = color;
            colorDots.appendChild(dot);
        });
        
        // Update complexity meter
        const meterFill = document.querySelector('#enhanced-result .meter-fill');
        meterFill.style.width = '65%';
    }
    
    function updateDetailedAnalysis(hash) {
        const colorDots = document.querySelector('#detailed-result .color-dots');
        colorDots.innerHTML = '';
        
        // Create a full palette for detailed analysis
        const colors = [
            hslToHex((hash % 360), 80, 60),
            hslToHex(((hash + 30) % 360), 75, 55),
            hslToHex(((hash + 60) % 360), 70, 50),
            hslToHex(((hash + 90) % 360), 65, 65),
            hslToHex(((hash + 180) % 360), 60, 70),
            hslToHex(((hash + 210) % 360), 55, 45),
            hslToHex(((hash + 240) % 360), 50, 80)
        ];
        
        colors.forEach(color => {
            const dot = document.createElement('div');
            dot.className = 'color-dot';
            dot.style.backgroundColor = color;
            colorDots.appendChild(dot);
        });
        
        // Update complexity meter
        const meterFill = document.querySelector('#detailed-result .meter-fill');
        meterFill.style.width = '90%';
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
