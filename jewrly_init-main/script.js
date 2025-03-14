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

// Form submission handler
document.getElementById('baziForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 获取表单输入数据
    const formData = {
        name: document.getElementById('name').value,
        sex: document.getElementById('sex').value,
        type: document.getElementById('type').value,
        year: document.getElementById('year').value,
        month: document.getElementById('month').value,
        day: document.getElementById('day').value,
        hours: document.getElementById('hours').value,
        minute: document.getElementById('minute').value
    };

    // 保存数据到 localStorage
    localStorage.setItem('baziFormData', JSON.stringify(formData));

    // 跳转到结果页面
    window.location.href = 'result.html';
});
