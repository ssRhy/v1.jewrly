// result.js

// 每日名言列表
const quotes = [
    { text: "生活中不是缺少美，而是缺少发现美的眼睛。", author: "罗丹" },
    { text: "人生就像一场马拉松，重要的不是瞬间的速度，而是坚持的耐力。", author: "佚名" },
    { text: "成功不是将来才有的，而是从决定去做的那一刻起，持续累积而成。", author: "佚名" },
    { text: "当你的才华还撑不起你的野心时，你就应该静下心来学习。", author: "佚名" },
    { text: "没有人可以回到过去重新开始，但谁都可以从现在开始，书写一个全然不同的结局。", author: "佚名" },
    { text: "种一棵树最好的时间是十年前，其次是现在。", author: "佚名" },
    { text: "不要等待机会，而要创造机会。", author: "佚名" },
    { text: "做你害怕做的事情，然后你会发现，不过如此。", author: "佚名" },
    { text: "最困难的时候，也是离成功最近的时候。", author: "佚名" },
    { text: "每一个不曾起舞的日子，都是对生命的辜负。", author: "尼采" }
];

// 获取随机名言
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// 更新每日名言
function updateDailyQuote() {
    const quote = getRandomQuote();
    document.getElementById('quoteText').textContent = quote.text;
    document.getElementById('quoteAuthor').textContent = `— ${quote.author}`;
}

// 处理分析结果数据
function handleAnalysisData(data) {
    console.log('接收到的数据:', data);

    // 基本信息
    document.getElementById('basicInfo').innerHTML = `
        <p>八字: ${data.八字}</p>
        <p>日主: ${data.日主}</p>
    `;

    // 五行分析
    const wuxingContainer = document.getElementById('wuxingAnalysis');
    if (!wuxingContainer) {
        console.error('找不到五行分析容器');
        return;
    }
    
    wuxingContainer.innerHTML = '';
    
    // 五行映射
    const wuxingMap = {
        '土': { class: 'earth', color: '#FFC107' },
        '木': { class: 'wood', color: '#4CAF50' },
        '水': { class: 'water', color: '#2196F3' },
        '火': { class: 'fire', color: '#F44336' },
        '金': { class: 'metal', color: '#9E9E9E' }
    };

    // 从五行强弱数据创建圆圈
    Object.entries(data.五行强弱 || {}).forEach(([element, value]) => {
        console.log(`处理五行元素: ${element}, 值: ${value}`); // 添加调试日志
        
        const circle = document.createElement('div');
        circle.className = `wuxing-circle ${wuxingMap[element].class}`;
        circle.textContent = element;
        circle.setAttribute('data-value', value.toFixed(1) + '%');
        
        // 根据百分比值调整圆圈大小
        const minSize = 40; // 最小尺寸
        const maxSize = 80; // 最大尺寸
        const size = minSize + ((value / 100) * (maxSize - minSize));
        
        // 设置样式
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.backgroundColor = wuxingMap[element].color;
        
        console.log(`创建圆圈: ${element}, 大小: ${size}px, 值: ${value}%`); // 添加调试日志
        wuxingContainer.appendChild(circle);
    });

    // 五行喜忌
    document.getElementById('wuxingLikes').innerHTML = `
        <p>喜用神: ${data.五行喜忌.喜用神 || ''}</p>
        <p>忌神: ${data.五行喜忌.忌神 || ''}</p>
        ${data.五行喜忌.日主 ? `<p>日主: ${data.五行喜忌.日主}</p>` : ''}
    `;

    // 今日干支
    document.getElementById('todayGanzhi').innerHTML = `
        <p>天干：${data.今日天干}</p>
        <p>地支：${data.今日地支}</p>
    `;

    // 幸运颜色
    const luckyColorData = data.幸运颜色;
    const colorDisplay = document.getElementById('luckyColor');
    
    // 创建颜色显示元素
    const colorHtml = `
        <div class="lucky-color-section">
            <div class="color-info">
                <div class="lucky-color-display" style="background-color: ${luckyColorData.lucky_color}"></div>
                <div class="color-details">
                    <span class="color-name">今日幸运色</span>
                    <div class="color-code-display">
                        <span class="color-code">${luckyColorData.lucky_color}</span>
                        <div class="color-preview" style="background-color: ${luckyColorData.lucky_color}"></div>
                    </div>
                </div>
            </div>
            <p class="color-strategy">${luckyColorData.strategy}</p>
        </div>
    `;
    
    colorDisplay.innerHTML = colorHtml;

    // 水晶推荐
    const crystalHtml = [];
    
    // 添加喜用神水晶
    if (data.喜用神_水晶 && Array.isArray(data.喜用神_水晶)) {
        crystalHtml.push('<div class="crystal-section"><h4>喜用神水晶</h4>');
        data.喜用神_水晶.forEach(crystal => {
            crystalHtml.push(`
                <div class="crystal-item primary-crystal">
                    <h4 class="crystal-name">${crystal}</h4>
                    <span class="crystal-type">喜用神</span>
                </div>
            `);
        });
        crystalHtml.push('</div>');
    }

    // 添加五行补充水晶
    if (data.五行_水晶) {
        crystalHtml.push('<div class="crystal-section"><h4>五行补充水晶</h4>');
        Object.entries(data.五行_水晶).forEach(([element, crystals]) => {
            crystals.forEach(crystal => {
                crystalHtml.push(`
                    <div class="crystal-item secondary-crystal">
                        <h4 class="crystal-name">${crystal}</h4>
                        <p class="crystal-description">补充${element}五行</p>
                        <span class="crystal-type">五行补充</span>
                    </div>
                `);
            });
        });
        crystalHtml.push('</div>');
    }

    document.getElementById('crystalRecommendations').innerHTML = crystalHtml.join('');

    // 五行缺失分析
    const wuxingDeficiencyContent = `
        <div class="deficiency-content">
            ${data.五行缺失分析.map(item => `<p>${JSON.stringify(item)}</p>`).join('')}
        </div>
    `;
    document.getElementById('wuxingDeficiency').innerHTML = wuxingDeficiencyContent;

    // 每日推荐活动
    if (data.推荐活动) {
        document.getElementById('dailyActivities').innerHTML = `
            <div class="activities-section">
                <h4>基于${data.推荐活动.喜用神}五行的推荐活动：</h4>
                <ul class="activity-list">
                    ${data.推荐活动.推荐活动.map(activity => 
                        `<li class="activity-item">${activity}</li>`
                    ).join('')}
                </ul>
            </div>
        `;
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取并显示分析结果
    const formData = JSON.parse(localStorage.getItem('baziFormData'));
    if (formData) {
        // 显示加载状态
        document.querySelectorAll('.result-card div').forEach(div => {
            div.textContent = '加载中...';
        });

        // 请求后台进行八字分析
        fetch('http://127.0.0.1:5000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                sex: parseInt(formData.sex),
                type: parseInt(formData.type),
                year: parseInt(formData.year),
                month: parseInt(formData.month),
                day: parseInt(formData.day),
                hours: parseInt(formData.hours),
                minute: parseInt(formData.minute)
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.querySelectorAll('.result-card div').forEach(div => {
                    div.innerHTML = `<div class="error">错误: ${data.error}</div>`;
                });
            } else {
                handleAnalysisData(data);
            }
        })
        .catch(error => {
            console.error('错误:', error);
            document.querySelectorAll('.result-card div').forEach(div => {
                div.innerHTML = `<div class="error">请求失败: ${error.message}</div>`;
            });
        });
    }
});