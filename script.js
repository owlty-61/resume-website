// ============================================
// 1. 導航菜單功能
// ============================================

const hamburger = document.getElementById('hamburger');
const navbarMenu = document.querySelector('.navbar-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// 點擊導航菜單項時關閉菜單
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

// ============================================
// 2. 圖片放大功能
// ============================================

const profilePhoto = document.getElementById('profilePhoto');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

// 點擊照片時顯示放大版本
profilePhoto.addEventListener('click', () => {
    imageModal.classList.add('show');
    modalImage.src = profilePhoto.src;
    document.body.style.overflow = 'hidden';
});

// 點擊關閉按鈕時關閉模態框
closeBtn.addEventListener('click', () => {
    imageModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// 點擊模態框外部時關閉
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// 按 ESC 鍵關閉模態框
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('show')) {
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// 3. 平滑滾動功能
// ============================================

// 為所有導航鏈接添加平滑滾動
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// 4. 技能區塊卷軸功能
// ============================================

const skillsContainer = document.querySelector('.skills-container');

// 為技能卷軸添加鍵盤導航
skillsContainer.addEventListener('keydown', (e) => {
    const scrollAmount = 300;
    
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        skillsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skillsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    }
});

// （移除原學經歷橫向卷軸功能，改為垂直點擊展開樣式，故不再需要 JS 控制）

// ============================================
// 5. 延遲加載動畫
// ============================================

// 使用 Intersection Observer 實現元素進入視口時的動畫
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 為各個區塊添加初始動畫
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ============================================
// 6. 技能進度條動畫
// ============================================

const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            
            setTimeout(() => {
                entry.target.style.transition = 'width 1s ease';
                entry.target.style.width = width;
            }, 100);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// 7. 主題切換功能 (可選)
// ============================================

// 檢查系統偏好或本地存儲的主題
function initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // 目前使用亮色主題，可在此添加深色模式支持
    document.documentElement.setAttribute('data-theme', theme);
}

// ============================================
// 8. 響應式菜單自動關閉
// ============================================

// 監聽窗口大小變化
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    }
});

// ============================================
// 9. 頁面加載完成後的初始化
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // 添加加載完成的標記
    document.body.classList.add('loaded');
    
    // 初始化主題
    initializeTheme();
    
    console.log('履歷網頁已加載完成！');
});

// ============================================
// 10. 性格特質標籤動畫
// ============================================

const traitTags = document.querySelectorAll('.trait-tag');

traitTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
});

// 添加淡入動畫的 CSS
if (!document.querySelector('style[data-animation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animation', 'true');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}
