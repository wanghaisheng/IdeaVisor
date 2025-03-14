// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');

    if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Playground Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.playground-tab').forEach(tab => tab.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Playground Demo Functionality
    const analyzeBtn = document.getElementById('analyze-btn');
    const websiteUrl = document.getElementById('website-url');
    const analysisLoading = document.querySelector('.analysis-loading');
    const demoTab = document.getElementById('demo-tab');
    const resultTab = document.getElementById('result-tab');
    const resultEmpty = document.querySelector('.result-empty');
    const resultContent = document.querySelector('.result-content');
    const exampleBtns = document.querySelectorAll('.example-btn');
    
    if (analyzeBtn && websiteUrl) {
        // Handle example buttons
        exampleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                websiteUrl.value = url;
            });
        });
        
        // Handle analyze button
        analyzeBtn.addEventListener('click', function() {
            const url = websiteUrl.value.trim();
            
            if (!url) {
                alert('请输入一个有效的网址');
                return;
            }
            
            // Show loading state
            demoTab.style.display = 'none';
            analysisLoading.classList.remove('hidden');
            
            // Simulate API call with timeout
            setTimeout(function() {
                // Hide loading and show results
                analysisLoading.classList.add('hidden');
                
                // Switch to results tab
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('[data-tab="result-tab"]').classList.add('active');
                
                document.querySelectorAll('.playground-tab').forEach(tab => tab.classList.remove('active'));
                resultTab.classList.add('active');
                
                // Hide empty state and show content
                resultEmpty.classList.add('hidden');
                resultContent.classList.remove('hidden');
                
                // Generate mock results based on URL
                generateMockResults(url);
                
                // Reset demo tab for future use
                demoTab.style.display = 'block';
            }, 3000);
        });
    }

    // Function to generate mock results for the playground
    function generateMockResults(url) {
        // Parse domain from URL for more realistic results
        let domain = url;
        try {
            domain = new URL(url).hostname;
        } catch (e) {
            console.log('Invalid URL format, using as-is');
        }
        
        // Generate colors based on domain
        const colorSwatches = document.querySelector('.color-swatches');
        colorSwatches.innerHTML = '';
        
        // Create a predictable but seemingly random set of colors based on domain
        const hash = simpleHash(domain);
        const colors = [
            hslToHex((hash % 360), 80, 60), // Primary
            hslToHex(((hash + 30) % 360), 70, 50), // Secondary
            hslToHex(((hash + 180) % 360), 60, 70), // Accent
            '#212529', // Text dark
            '#6C757D', // Text light
            '#F8F9FA'  // Background
        ];
        
        colors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.style.width = '40px';
            swatch.style.height = '40px';
            swatch.style.backgroundColor = color;
            swatch.style.borderRadius = '8px';
            swatch.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            colorSwatches.appendChild(swatch);
        });
        
        // Generate typography samples
        const typographyContainer = document.querySelector('.typography-samples');
        typographyContainer.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h3 style="font-family: ${domain.includes('serif') ? 'serif' : 'sans-serif'}; color: ${colors[0]}; margin-bottom: 8px;">标题样式 (H1, H2, H3)</h3>
                <p style="font-family: ${domain.includes('serif') ? 'serif' : 'sans-serif'}; color: ${colors[3]}; font-size: 14px;">
                    主要文本样式采用 ${domain.includes('serif') ? 'serif' : 'sans-serif'} 字体，行高为 1.6，字距适中。
                </p>
            </div>
            <div>
                <button style="background-color: ${colors[0]}; color: white; border: none; padding: 8px 16px; border-radius: 4px; font-weight: 500;">
                    按钮样式
                </button>
                <span style="display: inline-block; margin-left: 16px; font-size: 14px; color: ${colors[4]};">
                    链接与强调文本颜色: <span style="color: ${colors[1]};">示例文本</span>
                </span>
            </div>
        `;
        
        // Generate layout preview
        const layoutContainer = document.querySelector('.layout-sample');
        layoutContainer.innerHTML = `
            <div style="border: 1px solid #E9ECEF; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="background-color: ${colors[0]}; padding: 10px; color: white;">
                    <div style="width: 100px; height: 5px; background-color: white; opacity: 0.7; border-radius: 3px;"></div>
                </div>
                <div style="padding: 16px;">
                    <div style="width: 70%; height: 10px; background-color: ${colors[3]}; border-radius: 3px; margin-bottom: 12px;"></div>
                    <div style="width: 90%; height: 5px; background-color: ${colors[4]}; opacity: 0.7; border-radius: 3px; margin-bottom: 8px;"></div>
                    <div style="width: 80%; height: 5px; background-color: ${colors[4]}; opacity: 0.7; border-radius: 3px; margin-bottom: 16px;"></div>
                    <div style="display: flex; gap: 8px;">
                        <div style="width: 80px; height: 26px; background-color: ${colors[0]}; border-radius: 4px;"></div>
                        <div style="width: 80px; height: 26px; background-color: ${colors[5]}; border: 1px solid ${colors[0]}; border-radius: 4px;"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Generate components preview
        const componentsContainer = document.querySelector('.components-samples');
        componentsContainer.innerHTML = `
            <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                <div style="width: 120px; background-color: ${colors[5]}; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="width: 100%; height: 60px; background-color: ${colors[1]}; border-radius: 4px; margin-bottom: 8px;"></div>
                    <div style="width: 70%; height: 8px; background-color: ${colors[3]}; border-radius: 3px; margin-bottom: 4px;"></div>
                    <div style="width: 90%; height: 4px; background-color: ${colors[4]}; border-radius: 3px;"></div>
                </div>
                <div style="width: 120px; background-color: ${colors[5]}; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="width: 100%; height: 60px; background-color: ${colors[2]}; border-radius: 4px; margin-bottom: 8px;"></div>
                    <div style="width: 80%; height: 8px; background-color: ${colors[3]}; border-radius: 3px; margin-bottom: 4px;"></div>
                    <div style="width: 60%; height: 4px; background-color: ${colors[4]}; border-radius: 3px;"></div>
                </div>
                <div style="width: 120px; background-color: ${colors[5]}; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="width: 100%; height: 60px; background-color: ${colors[0]}; border-radius: 4px; margin-bottom: 8px;"></div>
                    <div style="width: 50%; height: 8px; background-color: ${colors[3]}; border-radius: 3px; margin-bottom: 4px;"></div>
                    <div style="width: 80%; height: 4px; background-color: ${colors[4]}; border-radius: 3px;"></div>
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

    // Load additional functionality
    loadScript('js/demo.js');
    loadScript('js/comparison.js');
    loadScript('js/ai-generator.js');
    
    // Helper function to dynamically load scripts
    function loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
    }

    // Gallery Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter gallery items
                if (filter === 'all') {
                    galleryItems.forEach(item => item.style.display = 'block');
                } else {
                    galleryItems.forEach(item => {
                        if (item.getAttribute('data-category').includes(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // Experience Comparison Demo
    const compareBtn = document.getElementById('compare-btn');
    const experienceUrl = document.getElementById('experience-url');
    const experienceLoading = document.querySelector('.experience-loading');
    const experienceResults = document.querySelector('.experience-results');
    const resultTabs = document.querySelectorAll('.result-tab');
    
    if (compareBtn && experienceUrl) {
        compareBtn.addEventListener('click', function() {
            const url = experienceUrl.value.trim();
            
            if (!url) {
                alert('请输入一个有效的网址');
                return;
            }
            
            // Show loading state
            experienceLoading.classList.remove('hidden');
            experienceResults.classList.add('hidden');
            
            // Simulate API call with timeout
            setTimeout(function() {
                // Hide loading and show results
                experienceLoading.classList.add('hidden');
                experienceResults.classList.remove('hidden');
                
                // Make sure first tab is active
                resultTabs.forEach(tab => tab.classList.remove('active'));
                document.querySelector('[data-result="standard"]').classList.add('active');
                
                document.querySelectorAll('.result-panel').forEach(panel => panel.classList.remove('active'));
                document.getElementById('standard-result').classList.add('active');
            }, 3000);
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

    // Testimonial Slider
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial-slide').length;
    
    function showSlide(index) {
        const slides = document.querySelectorAll('.testimonial-slide');
        
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Show the current slide
        slides[currentSlide].style.display = 'block';
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    if (testimonialNext && testimonialPrev && dots.length > 0) {
        // Initialize
        showSlide(0);
        
        // Event listeners
        testimonialNext.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
        
        testimonialPrev.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
            });
        });
    }

    // Pricing Toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            const monthlyPrices = document.querySelectorAll('.amount.monthly');
            const annuallyPrices = document.querySelectorAll('.amount.annually');
            
            if (this.checked) {
                // Annually
                monthlyPrices.forEach(price => price.style.display = 'none');
                annuallyPrices.forEach(price => price.style.display = 'block');
            } else {
                // Monthly
                monthlyPrices.forEach(price => price.style.display = 'block');
                annuallyPrices.forEach(price => price.style.display = 'none');
            }
        });
    }

    // FAQ Toggles
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                faqItem.classList.toggle('active');
            });
        });
    }

    // Multilingual support
    const languageSelect = document.getElementById('language-select');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            changeLanguage(this.value);
        });
        
        // Set initial language
        const defaultLanguage = languageSelect.value;
        loadLanguage(defaultLanguage);
    }

    // Function to change language
    function changeLanguage(lang) {
        loadLanguage(lang);
    }

    // Function to load language file and update UI
    function loadLanguage(lang) {
        fetch(`locale/${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Language file not found');
                }
                return response.json();
            })
            .then(translations => {
                updateTranslations(translations);
            })
            .catch(error => {
                console.error('Error loading language file:', error);
            });
    }

    // Function to update translations in the DOM
    function updateTranslations(translations) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keyParts = key.split('.');
            
            // Navigate through the nested translations object
            let translation = translations;
            for (const part of keyParts) {
                if (translation && translation[part]) {
                    translation = translation[part];
                } else {
                    translation = null;
                    break;
                }
            }
            
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const keyParts = key.split('.');
            
            let translation = translations;
            for (const part of keyParts) {
                if (translation && translation[part]) {
                    translation = translation[part];
                } else {
                    translation = null;
                    break;
                }
            }
            
            if (translation) {
                element.placeholder = translation;
            }
        });
    }
});