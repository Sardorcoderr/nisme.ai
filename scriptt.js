
// At the top of your script.js
let currentChatId = Date.now(); // Unique ID for each chat

// Modify the startNewChat function
function startNewChat() {
    // Save current chat before clearing (if you want history)
    if (chatContainer.children.length > 1 || 
        (chatContainer.children.length === 1 && !welcomeMessage.style.display !== 'none')) {
        saveCurrentChat();
    }
    
    // Clear chat
    chatContainer.innerHTML = '';
    
    // Show welcome message
    if (welcomeMessage) {
        welcomeMessage.style.display = 'block';
    }
    
    // Reset input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Generate new chat ID
    currentChatId = Date.now();
    
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
    }
    
    // Scroll to top
    chatContainer.scrollTop = 0;
}

function saveCurrentChat() {
    // Get all messages except welcome message
    const messages = Array.from(chatContainer.children)
        .filter(child => !child.classList.contains('welcome-message'))
        .map(message => ({
            text: message.textContent,
            type: message.classList.contains('user-message') ? 'user' : 'ai',
            timestamp: new Date().toLocaleString()
        }));
    
    if (messages.length > 0) {
        // Save to localStorage or your backend
        const chatData = {
            id: currentChatId,
            title: messages[0].text.substring(0, 30) + (messages[0].text.length > 30 ? '...' : ''),
            messages: messages,
            timestamp: new Date()
        };
        
        // Here you would add to your chat history UI
        addToChatHistory(chatData);
    }
}

function addToChatHistory(chatData) {
    // Implement this based on how you want to display history
    const chatHistory = document.querySelector('.chat-history');
    const chatElement = document.createElement('div');
    chatElement.className = 'chat-history-item';
    chatElement.innerHTML = `
        <div class="chat-history-title">${chatData.title}</div>
        <div class="chat-history-time">${chatData.timestamp.toLocaleTimeString()}</div>
    `;
    chatElement.addEventListener('click', () => loadChat(chatData.id));
    chatHistory.prepend(chatElement);
}

function loadChat(chatId) {
    // Implement loading chat from history
    // This would fetch the chat data and populate the chat container
}
document.addEventListener('DOMContentLoaded', function() {
    // Existing variable declarations...
    const newChatBtn = document.querySelector('.new-chat-btn');
    
    // ... existing code ...

    // New chat function
    function startNewChat() {
        // Clear all messages from chat container
        chatContainer.innerHTML = '';
        
        // Show welcome message again
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
        }
        
        // Reset textarea
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
        
        // Scroll to top
        chatContainer.scrollTop = 0;
        
        // Optional: Add to chat history (you can implement this later)
        // addToChatHistory("Yangi suhbat");
    }

    // New chat button click
    newChatBtn.addEventListener('click', startNewChat);

    // ... rest of your existing code ...
});
document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message-input');
    const chatContainer = document.getElementById('chat-container');
    const welcomeMessage = document.querySelector('.welcome-message');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && e.target !== mobileMenuBtn) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Auto-resize textarea with mobile improvements
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        const maxHeight = window.innerHeight * 0.3; // Limit height on mobile
        const newHeight = Math.min(this.scrollHeight, maxHeight);
        this.style.height = newHeight + 'px';
        
        // Scroll to bottom on mobile when typing long messages
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 100);
        }
    });

    // Rest of your existing JavaScript...
    
    // Add touch event for send button for better mobile response
    sendBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.classList.add('active');
    });
    
    sendBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.classList.remove('active');
        sendMessage();
    });

    // Prevent keyboard from pushing content up on mobile
    if (window.innerWidth <= 768) {
        messageInput.addEventListener('focus', function() {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 300);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('send-btn');
    const messageInput = document.getElementById('message-input');
    const chatContainer = document.getElementById('chat-container');
    const welcomeMessage = document.querySelector('.welcome-message');

    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Foydalanuvchi xabarini qo'shish
    function addUserMessage(text) {
        if (welcomeMessage) welcomeMessage.style.display = 'none';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        chatContainer.appendChild(messageDiv);
        
        return messageDiv;
    }

    // AI xabarini qo'shish
    function addAiMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        
        // Simulate typing animation
        messageDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        chatContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Simulate AI response delay
        setTimeout(() => {
            messageDiv.innerHTML = text;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1000 + Math.random() * 2000);
        
        return messageDiv;
    }

    // Send message function
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
        
        addUserMessage(message);
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Simulate AI response
        setTimeout(() => {
            addAiMessage("Bu sizning xabaringizga javob. Haqiqiy loyihada bu OpenAI API orqali ishlaydi.");
        }, 500);
    }

    // Send button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Enter key press
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            messageInput.value = this.textContent;
            messageInput.focus();
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Asosiy elementlar
    const newChatBtn = document.querySelector('.new-chat-btn');
    const chatContainer = document.getElementById('chat-container');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    
    // Asl welcome HTML
    const originalWelcomeHTML = `
        <div class="welcome-message">
            <div class="avatar-large">
                <div class="avatar-inner">N</div>
            </div>
            <h1>Salom, men Nisme</h1>
            <p>Sizga qanday yordam bera olaman?</p>
            <div class="welcome-suggestions">
                <button class="suggestion-btn">YouTube video tarjimasi</button>
                <button class="suggestion-btn">Matn tarjima qilish</button>
               
            </div>
        </div>
    `;
    
    // Chatni qayta boshlash
    function resetChat() {
        // Animatsiya boshlanishi
        chatContainer.style.opacity = '0';
        
        // 300ms kutib turish (animatsiya uchun)
        setTimeout(() => {
            // Chatni tozalash
            chatContainer.innerHTML = originalWelcomeHTML;
            
            // Inputni tozalash
            messageInput.value = '';
            messageInput.style.height = 'auto';
            
            // Yangi elementlarga event listenerlar qo'shish
            setupEventListeners();
            
            // Animatsiya tugashi
            chatContainer.style.opacity = '1';
        }, 300);
    }
    
    // Xabar qo'shish
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message ai-message';
        messageDiv.textContent = text;
        chatContainer.appendChild(messageDiv);
        
        // Scroll pastga
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Event listenerlarni sozlash
    function setupEventListeners() {
        // Taklif tugmalari
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                messageInput.value = this.textContent;
                messageInput.focus();
            });
        });
        
        // Xabar yuborish
        sendBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Input o'lchamini o'zgartirish
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    // Xabar yuborish
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
        
        // Foydalanuvchi xabarini qo'shish
        addMessage(message, true);
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Welcome xabarini yashirish
        const welcomeMsg = document.querySelector('.welcome-message');
        if (welcomeMsg) welcomeMsg.style.display = 'none';
        
        // AI javobi (simulyatsiya)
        setTimeout(() => {
            addMessage("Bu sizning xabaringizga javob. Haqiqiy loyihada bu OpenAI API orqali ishlaydi.", false);
        }, 1000);
    }
    
    // Yangi suhbat tugmasi
    newChatBtn.addEventListener('click', resetChat);
    
    // Dastlabki sozlash
    resetChat();
});