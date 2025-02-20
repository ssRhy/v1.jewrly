// script.js

// Popup functionality with smooth transitions
function openPopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.style.display = 'flex';
    setTimeout(() => overlay.style.opacity = '1', 10);
    document.body.style.overflow = 'hidden'; // 防止背景滚动
}

function closePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Daily quotes collection
const quotes = [
    { text: "生活中不是缺少美，而是缺少发现美的眼睛。", author: "罗丹" },
    { text: "人生就像一场马拉松，重要的不是瞬间的速度，而是坚持的耐力。", author: "佚名" },
    { text: "成功不是将来才有的，而是从决定去做的那一刻起，持续累积而成。", author: "佚名" },
    { text: "当你的才华还撑不起你的野心时，你就应该静下心来学习。", author: "佚名" },
    { text: "没有人可以回到过去重新开始，但谁都可以从现在开始，书写一个全然不同的结局。", author: "佚名" },
    { text: "种一棵树最好的时间是十年前，其次是现在。", author: "中国谚语" },
    { text: "不要等待机会，而要创造机会。", author: "佚名" },
    { text: "做你害怕做的事情，然后你会发现，不过如此。", author: "佚名" },
    { text: "最困难的时候，也是离成功最近的时候。", author: "佚名" },
    { text: "每一个不曾起舞的日子，都是对生命的辜负。", author: "尼采" },
    { text: "生命不是等待暴风雨过去，而是学会在雨中翩翩起舞。", author: "佚名" },
    { text: "成功不是终点，失败也不是终结，最重要的是继续前进的勇气。", author: "温斯顿·丘吉尔" },
    { text: "种一棵树最好的时间是十年前，其次是现在。", author: "中国谚语" },
    { text: "星光不问赶路人，时光不负有心人。", author: "佚名" },
    { text: "没有什么能够阻挡，一个人对梦想的追求。", author: "佚名" },
    { text: "生活就像镜子，你对它笑，它就对你笑。", author: "佚名" }
];

// Function to get a random quote with fade effect
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Function to update the quote with animation
function updateDailyQuote() {
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const quote = getRandomQuote();
    
    // 添加淡出动画
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = `— ${quote.author}`;
        
        // 添加淡入动画
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 500);
}

// 初始化Swiper
let swiper;

function initSwiper() {
    swiper = new Swiper('.swiper', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        loop: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// 创建结果滑块
function createResultSlides(results) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = ''; // 清空现有内容

    // 定义所有结果区域
    const resultSections = [
        { title: '基本信息', key: 'basicInfo', className: 'basic-info' },
        { title: '五行分析', key: 'wuxingAnalysis', className: 'wuxing-circles' },
        { title: '五行喜忌', key: 'wuxingLikes', className: 'wuxing-likes' },
        { title: '今日干支', key: 'todayGanzhi', className: 'today-ganzhi' },
        { title: '五行缺失分析', key: 'wuxingDeficiency', className: 'wuxing-deficiency' },
        { title: '水晶推荐', key: 'crystalRecommendations', className: 'element-crystals' },
        { title: '幸运颜色', key: 'luckyColors', className: 'lucky-colors' },
        { title: '今日运势', key: 'todayFortune', className: 'today-fortune' },
        { title: '注意事项', key: 'precautions', className: 'precautions' }
    ];

    // 为每个部分创建滑块
    resultSections.forEach((section, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        const card = document.createElement('div');
        card.className = `result-card animate__animated animate__fadeIn animate__delay-${index}s`;
        
        const title = document.createElement('h3');
        title.textContent = section.title;
        
        const content = document.createElement('div');
        content.className = section.className;
        
        // 特殊处理五行分析部分
        if (section.key === 'wuxingAnalysis') {
            // 解析五行数据
            const wuxingData = {};
            results[section.key].forEach(item => {
                const [element, valueStr] = item.split('：');
                wuxingData[element] = parseFloat(valueStr.replace('%', ''));
            });

            // 创建五行圆圈
            const elements = ['金', '木', '水', '火', '土'];
            elements.forEach(element => {
                const value = wuxingData[element] || 0;
                const circle = document.createElement('div');
                circle.className = 'wuxing-circle';
                circle.setAttribute('data-element', element);
                
                // 添加元素名称
                const elementName = document.createElement('span');
                elementName.className = 'element-name';
                elementName.textContent = element;
                circle.appendChild(elementName);
                
                // 添加百分比
                const percentage = document.createElement('span');
                percentage.className = 'percentage';
                percentage.textContent = `${value}%`;
                circle.appendChild(percentage);
                
                content.appendChild(circle);
            });

          
        } else {
            // 处理其他类型的内容
            if (results[section.key]) {
                if (Array.isArray(results[section.key])) {
                    results[section.key].forEach(item => {
                        const p = document.createElement('p');
                        p.textContent = item;
                        content.appendChild(p);
                    });
                } else if (typeof results[section.key] === 'object') {
                    Object.entries(results[section.key]).forEach(([key, value]) => {
                        const p = document.createElement('p');
                        p.innerHTML = `<span>${key}:</span> <span>${value}</span>`;
                        content.appendChild(p);
                    });
                } else {
                    const p = document.createElement('p');
                    p.textContent = results[section.key];
                    content.appendChild(p);
                }
            }
        }
        
        card.appendChild(title);
        card.appendChild(content);
        slide.appendChild(card);
        swiperWrapper.appendChild(slide);
    });

    // 重新初始化Swiper
    if (swiper) {
        swiper.destroy();
    }
    initSwiper();
}

// Form validation
function validateForm() {
    const form = document.getElementById('baziForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.classList.add('invalid');
            showError(input, '此字段为必填项');
        } else if (input.type === 'number') {
            const value = parseInt(input.value);
            const min = parseInt(input.min);
            const max = parseInt(input.max);
            
            if (value < min || value > max) {
                isValid = false;
                input.classList.add('invalid');
                showError(input, `请输入${min}到${max}之间的数值`);
            } else {
                input.classList.remove('invalid');
                hideError(input);
            }
        } else {
            input.classList.remove('invalid');
            hideError(input);
        }
    });

    return isValid;
}

function showError(input, message) {
    let errorDiv = input.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    errorDiv.textContent = message;
}

function hideError(input) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.remove();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    updateDailyQuote();
    
    // 每隔一段时间更新名言
    setInterval(updateDailyQuote, 30000);
    
    const overlay = document.getElementById('popupOverlay');
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closePopup();
        }
    });

    // 表单提交处理
    const form = document.getElementById('baziForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // 获取表单数据
        const formData = {
            name: document.getElementById('name').value,
            sex: parseInt(document.getElementById('sex').value),
            type: parseInt(document.getElementById('type').value),
            year: parseInt(document.getElementById('year').value),
            month: parseInt(document.getElementById('month').value),
            day: parseInt(document.getElementById('day').value),
            hours: parseInt(document.getElementById('hours').value),
            minute: parseInt(document.getElementById('minute').value)
        };

        // 显示加载状态
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '分析中...';

        // 发送请求到后端
        fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // 恢复按钮状态
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            if (data.error) {
                throw new Error(data.error);
            }

            // 处理后端返回的数据
            const results = {
                basicInfo: {
                    "姓名": formData.name,
                    "性别": formData.sex === 0 ? "男" : "女",
                    "出生时间": `${formData.year}年${formData.month}月${formData.day}日 ${formData.hours}:${formData.minute}`,
                    "八字": data.八字,
                    "日主": data.日主
                },
                wuxingLikes: [
                    `喜用神：${data.五行喜忌.喜用神 || '无'}`,
                    `忌神：${data.五行喜忌.忌神 || '无'}`
                ],
                todayGanzhi: [
                    `今日天干：${data.今日天干}`,
                    `今日地支：${data.今日地支}`
                ],
                wuxingDeficiency: data.五行缺失分析.map(item => 
                    `${item.五行}：${item.比例}% - ${item.分析}`
                ),
                crystalRecommendations: [
                    ...(data.喜用神_水晶 || []).map(crystal => `喜用神水晶：${crystal}`),
                    ...Object.entries(data.五行_水晶 || {}).map(([wx, crystals]) => 
                        crystals.map(crystal => `补充${wx}：${crystal}`)
                    ).flat()
                ],
                wuxingAnalysis: Object.entries(data.五行强弱 || {}).map(([element, value]) => 
                    `${element}：${value}%`
                ),
                luckyColors: [
                    `今日幸运色：${data.幸运颜色.lucky_color}`,
                    `调衡策略：${data.幸运颜色.strategy}`
                ],
                todayFortune: [
                    `今日运势：${data.运势 || '普通'}`,
                    ...(data.推荐活动.推荐活动 || []).map(activity => `推荐活动：${activity}`),
                    ...(data.推荐活动.五行缺失活动 || []).map(activity => `补充活动：${activity}`)
                ],
                precautions: [
                    "注意事项：",
                    ...(data.注意事项 || ["暂无特别注意事项"])
                ]
            };

            // 创建结果展示
            createResultSlides(results);
            
            // 关闭弹窗
            closePopup();
            
            // 平滑滚动到结果区域
            document.querySelector('.results-container').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        })
        .catch(error => {
            // 恢复按钮状态
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // 显示错误信息
            console.error('Error:', error);
            alert(`分析失败：${error.message || '请稍后重试'}`);
        });
    });
});