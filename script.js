// ============================================
// 1. 圖片放大功能
// ============================================

const profilePhoto = document.getElementById('profilePhoto');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

// 點擊照片時顯示放大版本
if (profilePhoto) {
    profilePhoto.addEventListener('click', () => {
        imageModal.classList.add('show');
        modalImage.src = profilePhoto.src;
        document.body.style.overflow = 'hidden';
    });
}

// 點擊關閉按鈕時關閉模態框
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        imageModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

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
// 2. 頂部導航平滑滾動
// ============================================

const navLinks = document.querySelectorAll('.nav-link, .nav-dropdown-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.top-navigation').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 延遲關閉下拉選單，讓跳轉完成
            setTimeout(() => {
                document.querySelectorAll('.nav-dropdown-content').forEach(content => {
                    content.classList.remove('active');
                });
            }, 300);
        }
    });
});

// ============================================
// 3. 目錄收起功能
// ============================================

const navCollapseBtn = document.getElementById('navCollapseBtn');
const navList = document.getElementById('navList');

if (navCollapseBtn && navList) {
    navCollapseBtn.addEventListener('click', function() {
        navList.classList.toggle('collapsed');
        navCollapseBtn.classList.toggle('collapsed');
    });
}

// ============================================
// 4. 頂部導航下拉選單功能
// ============================================

// 等待 DOM 完全載入後執行
setTimeout(() => {
    const navDropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    
    console.log('========== 下拉選單初始化 ==========');
    console.log('找到下拉按鈕數量:', navDropdownToggles.length);
    console.log('找到下拉容器數量:', navDropdowns.length);
    
    navDropdownToggles.forEach((toggle, index) => {
        console.log(`按鈕 ${index + 1}:`, toggle.textContent);
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('>>> 點擊了:', this.textContent);
            
            const dropdownContent = this.nextElementSibling;
            console.log('>>> 找到內容元素:', dropdownContent);
            console.log('>>> 內容元素類別:', dropdownContent.className);
            
            const isActive = dropdownContent.classList.contains('active');
            console.log('>>> 當前狀態 active:', isActive);
            
            // 關閉所有下拉選單
            document.querySelectorAll('.nav-dropdown-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // 切換當前下拉選單
            if (!isActive) {
                dropdownContent.classList.add('active');
                console.log('>>> 已展開，新類別:', dropdownContent.className);
            } else {
                console.log('>>> 已收合');
            }
        });
    });
    
    // 點擊外部關閉下拉選單
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown-content').forEach(content => {
                content.classList.remove('active');
            });
        }
    });
    
    console.log('========== 下拉選單初始化完成 ==========');
}, 100);

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
// 6. 性格特質標籤動畫
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

// ============================================
// 7. 頁面加載完成後的初始化
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    console.log('履歷網頁已加載完成！');
});
