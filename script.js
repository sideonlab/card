document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.business-card');
    
    // 카드 클릭 시 뒤집기 (링크 클릭 시에는 뒤집지 않음)
    card.addEventListener('click', function(e) {
        // 클릭된 요소가 링크(a 태그)이거나 그 자식 요소인 경우 뒤집지 않음
        if (e.target.closest('a')) {
            return;
        }
        card.classList.toggle('flipped');
    });
    
    // 키보드 이벤트 (스페이스바로 뒤집기)
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            card.classList.toggle('flipped');
        }
    });
    
    // 눈동자 움직임 효과
    const pupils = document.querySelectorAll('.pupil');
    const face = document.querySelector('.face');
    
    if (face) {
        face.addEventListener('mousemove', function(e) {
            const rect = face.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            pupils.forEach(pupil => {
                const eye = pupil.parentElement;
                const eyeRect = eye.getBoundingClientRect();
                const eyeCenterX = eyeRect.left + eyeRect.width / 2;
                const eyeCenterY = eyeRect.top + eyeRect.height / 2;
                
                const deltaX = e.clientX - eyeCenterX;
                const deltaY = e.clientY - eyeCenterY;
                
                const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 5);
                const angle = Math.atan2(deltaY, deltaX);
                
                const moveX = Math.cos(angle) * distance;
                const moveY = Math.sin(angle) * distance;
                
                pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            });
        });
        
        face.addEventListener('mouseleave', function() {
            pupils.forEach(pupil => {
                pupil.style.transform = 'translate(-50%, -50%)';
            });
        });
    }
});

