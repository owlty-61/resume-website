// ============================================
// 1. 側邊欄滾動跟隨功能
// ============================================

const sidebar = document.querySelector('.main-content-sidebar');
const container = document.querySelector('.container');

function updateSidebarPosition() {
    if (!sidebar || !container) return;
    
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const sidebarHeight = sidebar.offsetHeight;
    const containerRect = container.getBoundingClientRect();
    const containerTop = container.offsetTop;
    const containerBottom = containerTop + container.offsetHeight;
    
    // 計算側邊欄的top位置
    let sidebarTop = Math.max(20, Math.min(
        scrollTop + 20,
        containerBottom - sidebarHeight - 20
    ));
    
    // 確保側邊欄不超出容器頂部
    sidebarTop = Math.max(sidebarTop, containerTop + 20);
    
    // 確保側邊欄底部不超出視窗底部
    const maxTop = scrollTop + viewportHeight - sidebarHeight - 20;
    sidebarTop = Math.min(sidebarTop, maxTop);
    
    // 確保側邊欄不超出容器底部
    if (sidebarTop + sidebarHeight > containerBottom - 20) {
        sidebarTop = containerBottom - sidebarHeight - 20;
    }
    
    sidebar.style.top = sidebarTop + 'px';
}

// 監聽滾動和視窗大小變化
window.addEventListener('scroll', updateSidebarPosition);
window.addEventListener('resize', updateSidebarPosition);

// 初始化位置
document.addEventListener('DOMContentLoaded', () => {
    updateSidebarPosition();
});

// ============================================
// 2. 圖片放大功能
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
// 3. 側邊欄平滑滾動功能
// ============================================

const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const nav = document.querySelector('.top-navigation');
            const navHeight = nav ? nav.offsetHeight : 0;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            
            window.scrollTo({
                top: Math.max(targetPosition, 0),
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
// 4. 頂部導航平滑滾動
// ============================================

const navLinks = document.querySelectorAll('.nav-link, .nav-dropdown-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const nav = document.querySelector('.top-navigation');
            const navHeight = nav ? nav.offsetHeight : 0;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
            
            window.scrollTo({
                top: Math.max(targetPosition, 0),
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                document.querySelectorAll('.nav-dropdown-content').forEach(content => {
                    content.classList.remove('active');
                });
            }, 300);
        }
    });
});

// ============================================
// 5. 目錄收起功能
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
// 6. 技能區塊卷軸功能
// ============================================

const skillsContainer = document.querySelector('.skills-container');

if (skillsContainer) {
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
}

// ============================================
// 7. 下拉選單互動功能
// ============================================

const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (dropdownToggle && dropdownMenu) {
    // 點擊切換下拉選單
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle('active');
    });

    // 點擊下拉選單內的連結後自動收起
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const nav = document.querySelector('.top-navigation');
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: Math.max(targetPosition, 0),
                    behavior: 'smooth'
                });
            }
            
            // 收起下拉選單
            setTimeout(() => {
                dropdownMenu.classList.remove('active');
            }, 300);
        });
    });
}

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
// 8. 技能進度條動畫
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
// 9. 性格特質標籤動畫
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
// 10. 頁面加載完成後的初始化
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});
