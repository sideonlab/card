// 페이지 로드 시 애니메이션 효과
document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.business-card');
    const character = document.querySelector('.character-face');
    
    // 카드에 마우스 오버 시 약간의 회전 효과
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'rotateY(5deg) rotateX(5deg)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
    
    // 캐릭터 클릭 시 인사 애니메이션
    character.addEventListener('click', function() {
        const face = this.querySelector('.face');
        face.style.animation = 'wave 0.5s ease';
        
        setTimeout(() => {
            face.style.animation = 'float 3s ease-in-out infinite';
        }, 500);
    });
    
    // 연락처 항목 클릭 시 피드백
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes wave {
        0%, 100% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(-10deg);
        }
        75% {
            transform: rotate(10deg);
        }
    }
`;
document.head.appendChild(style);

