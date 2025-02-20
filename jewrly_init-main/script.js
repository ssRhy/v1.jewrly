// script.js

// Popup functionality
function openPopup() {
    document.getElementById('popupOverlay').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
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

// Function to get a random quote
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Function to update the quote
function updateDailyQuote() {
    const quote = getRandomQuote();
    document.getElementById('quoteText').textContent = quote.text;
    document.getElementById('quoteAuthor').textContent = `— ${quote.author}`;
}

// Close popup when clicking outside the card
document.addEventListener('DOMContentLoaded', function() {
    updateDailyQuote();
    
    const overlay = document.getElementById('popupOverlay');
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closePopup();
        }
    });
});

// 初始化Swiper
let swiper;

function initSwiper() {
    swiper = new Swiper('.swiper', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        loop: false,
    });
}

// 创建结果滑块
function createResultSlides(results) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = ''; // 清空现有内容

    // 定义所有结果区域
    const resultSections = [
        { title: '基本信息', key: 'basicInfo', className: 'basic-info' },
        { title: '五行喜忌', key: 'wuxingLikes', className: 'wuxing-likes' },
        { title: '今日干支', key: 'todayGanzhi', className: 'today-ganzhi' },
        { title: '五行缺失分析', key: 'wuxingDeficiency', className: 'wuxing-deficiency' },
        { title: '水晶推荐', key: 'crystalRecommendations', className: 'element-crystals' },
        { title: '五行分析', key: 'wuxingAnalysis', className: 'wuxing-circles' },
        { title: '幸运颜色', key: 'luckyColors', className: 'lucky-colors' },
        { title: '今日运势', key: 'todayFortune', className: 'today-fortune' },
        { title: '注意事项', key: 'precautions', className: 'precautions' }
    ];

    // 为每个部分创建滑块
    resultSections.forEach(section => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        const card = document.createElement('div');
        card.className = 'result-card';
        
        const title = document.createElement('h3');
        title.textContent = section.title;
        
        const content = document.createElement('div');
        content.className = section.className;
        
        // 根据不同类型的结果设置内容
        if (results[section.key]) {
            if (typeof results[section.key] === 'string') {
                content.innerHTML = `<p>${results[section.key]}</p>`;
            } else if (Array.isArray(results[section.key])) {
                content.innerHTML = results[section.key].map(item => `<p>${item}</p>`).join('');
            } else {
                Object.entries(results[section.key]).forEach(([key, value]) => {
                    content.innerHTML += `<p><span>${key}:</span> <span>${value}</span></p>`;
                });
            }
        }

        card.appendChild(title);
        card.appendChild(content);
        slide.appendChild(card);
        swiperWrapper.appendChild(slide);
    });

    // 初始化Swiper
    initSwiper();
}

// Form submission handler
document.getElementById('baziForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 获取表单输入数据
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

    // 关闭弹窗
    closePopup();

    // 发送请求到后端
    fetch('http://localhost:8080/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('分析失败：' + data.error);
            return;
        }

        // 调试：查看后端返回的数据结构
        console.log('Backend Response:', data);
        console.log('五行缺失分析:', data.五行缺失分析);
        console.log('五行水晶:', data.五行_水晶);

        // 处理后端返回的数据
        const results = {
            basicInfo: {
                "姓名": formData.name,
                "性别": formData.sex === 0 ? "男" : "女",
                "八字": data.八字,
                "日主": data.日主
            },
            wuxingLikes: [
                `喜用神：${data.五行喜忌.喜用神 || ''}`,
                `忌神：${data.五行喜忌.忌神 || ''}`
            ],
            todayGanzhi: [
                `今日天干：${data.今日天干[0]}`,
                `今日地支：${data.今日天干[1]}`
            ],
            wuxingAnalysis: Object.entries(data.五行强弱 || {}).map(([element, value]) => 
                `${element}：${value}%`
            ),
            wuxingDeficiency: (data.五行缺失分析 || []).map(item => 
                `${item.五行}：${item.比例} - ${item.分析}`
            ),
            crystalRecommendations: [
                ...(data.喜用神_水晶 || []).map(crystal => `喜用神水晶：${crystal}`),
                ...Object.entries(data.五行_水晶 || {}).map(([wx, crystals]) => 
                    crystals.map(crystal => `补充${wx}：${crystal}`)
                ).flat()
            ],
            luckyColors: [
                `今日幸运色：${data.幸运颜色.lucky_color}`,
                `调衡策略：${data.幸运颜色.strategy}`
            ],
            todayFortune: [
                `喜用神：${data.推荐活动.喜用神 || ''}`,
                ...((data.推荐活动.推荐活动 || []).map(activity => `推荐：${activity}`)),
                ...((data.推荐活动.五行缺失活动 || []).map(activity => `补充：${activity}`))
            ],
            precautions: [
                "建议与注意事项：",
                ...(data.推荐活动.推荐活动 || []).slice(0, 3)
            ]
        };

        // 调试：查看处理后的数据结构
        console.log('Processed Results:', results);

        // 创建结果滑块
        createResultSlides(results);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('请求失败，请稍后重试');
    });
});
