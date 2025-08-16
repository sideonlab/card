// Business card interactive functionality

// Download business card as image
function downloadBusinessCard() {
    const card = document.getElementById('business-card');
    const downloadButton = document.querySelector('.download-button');
    
    // Show loading state
    const originalText = downloadButton.innerHTML;
    downloadButton.innerHTML = '<span class="download-icon">⏳</span>이미지 생성 중...';
    downloadButton.disabled = true;
    
    // Temporarily remove hover effects for cleaner capture
    card.style.transform = 'scale(1)';
    card.style.transition = 'none';
    
    // Configure html2canvas options
    const options = {
        backgroundColor: null, // Transparent background
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        width: card.offsetWidth,
        height: card.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    };
    
    html2canvas(card, options).then(canvas => {
        // Create download link
        const link = document.createElement('a');
        link.download = '김태헌_SideOnAI_명함.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Restore button state
        downloadButton.innerHTML = originalText;
        downloadButton.disabled = false;
        
        // Restore card effects
        card.style.transition = 'transform 0.3s ease';
        
        // Show success feedback
        const successMessage = document.createElement('div');
        successMessage.textContent = '명함이 성공적으로 다운로드되었습니다! 📥';
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #4CAF50, #45a049);
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 300);
        }, 3000);
        
    }).catch(error => {
        console.error('Error generating image:', error);
        
        // Restore button state
        downloadButton.innerHTML = originalText;
        downloadButton.disabled = false;
        card.style.transition = 'transform 0.3s ease';
        
        // Show error message
        alert('이미지 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Card flip functionality
function flipCard() {
    const card = document.querySelector('.business-card');
    const cardBack = document.querySelector('.card-back');
    const frontButton = document.querySelector('.front-flip');
    const backButton = document.querySelector('.card-back .flip-button');
    
    if (card.classList.contains('flipped')) {
        // Flip back to front
        card.classList.remove('flipped');
        cardBack.classList.add('hidden');
        frontButton.textContent = '뒷면 보기';
        
        // Show front side after animation
        setTimeout(() => {
            cardBack.style.display = 'none';
        }, 300);
    } else {
        // Flip to back
        card.classList.add('flipped');
        cardBack.classList.remove('hidden');
        cardBack.style.display = 'flex';
        frontButton.textContent = '앞면 보기';
        
        // Update back button text
        if (backButton) {
            backButton.textContent = '앞면 보기';
        }
    }
}

// Add smooth animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.business-card');
    const sparkles = document.querySelectorAll('.sparkle');
    const eyeballs = document.querySelectorAll('.eyeball');
    
    // Add hover effect for sparkles
    card.addEventListener('mouseenter', function() {
        sparkles.forEach((sparkle, index) => {
            sparkle.style.animationDuration = '1s';
        });
    });
    
    card.addEventListener('mouseleave', function() {
        sparkles.forEach((sparkle, index) => {
            sparkle.style.animationDuration = '2s';
        });
    });
    
    // Interactive eye tracking
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        
        // Calculate eye movement (limited range)
        const maxMove = 3;
        const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX / 50));
        const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY / 50));
        
        eyeballs.forEach(eyeball => {
            eyeball.style.transform = `translate(${moveX}px, ${moveY}px)`;
            eyeball.style.transition = 'transform 0.1s ease';
        });
    });
    
    // Reset eye position when mouse leaves
    card.addEventListener('mouseleave', function() {
        eyeballs.forEach(eyeball => {
            eyeball.style.transform = 'translate(0, 0)';
            eyeball.style.transition = 'transform 0.3s ease';
        });
    });
    
    // Add click animation to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            // Copy to clipboard functionality (if text is clickable)
            const text = this.querySelector('span:last-child').textContent;
            if (text.includes('@') || text.includes('github')) {
                navigator.clipboard.writeText(text).then(() => {
                    // Show feedback
                    const originalText = this.querySelector('span:last-child').textContent;
                    this.querySelector('span:last-child').textContent = '복사됨!';
                    this.style.color = '#667eea';
                    
                    setTimeout(() => {
                        this.querySelector('span:last-child').textContent = originalText;
                        this.style.color = '#555';
                    }, 1000);
                }).catch(() => {
                    console.log('복사 기능을 사용할 수 없습니다.');
                });
            }
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add skill tag hover effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
            this.style.transition = 'all 0.3s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            flipCard();
        }
    });
    
    // Add random character expressions
    function addRandomExpression() {
        const mouth = document.querySelector('.mouth');
        const expressions = [
            { borderRadius: '0 0 20px 20px', width: '20px' }, // smile
            { borderRadius: '20px 20px 0 0', width: '15px' }, // surprised
            { borderRadius: '0 0 20px 20px', width: '25px' }  // big smile
        ];
        
        const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
        
        mouth.style.borderRadius = randomExpression.borderRadius;
        mouth.style.width = randomExpression.width;
        mouth.style.transition = 'all 0.5s ease';
        
        // Reset after 2 seconds
        setTimeout(() => {
            mouth.style.borderRadius = '0 0 20px 20px';
            mouth.style.width = '20px';
        }, 2000);
    }
    
    // Random expression every 10 seconds
    setInterval(addRandomExpression, 10000);
    
    // Add entrance animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.8)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    }, 100);
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
        const card = document.querySelector('.business-card');
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            const rect = card.getBoundingClientRect();
            
            if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
                // Double tap to flip
                let tapCount = parseInt(card.dataset.tapCount || '0');
                tapCount++;
                card.dataset.tapCount = tapCount;
                
                if (tapCount === 2) {
                    flipCard();
                    card.dataset.tapCount = '0';
                }
                
                setTimeout(() => {
                    card.dataset.tapCount = '0';
                }, 500);
            }
        }
    });
}
