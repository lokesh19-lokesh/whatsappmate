/* ===== WHATSAPPMATE JS ===== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile & Sidebar Navigation ---
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const navbar = document.getElementById('navbar');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.getElementById('navLinks');

    // Toggle Mobile Menu (Landing Page)
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            document.body.classList.toggle('mobile-menu-open');
            if (navLinks) {
                navLinks.style.display = document.body.classList.contains('mobile-menu-open') ? 'flex' : '';
            }
        });
    }

    // Toggle Sidebar (App Layout)
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }

    // --- 2. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove('active');
                });
                // Toggle current
                item.classList.toggle('active');
            });
        }
    });

    // --- 3. Number Counter Animation (Landing Page) ---
    const stats = document.querySelectorAll('.number');
    if (stats.length > 0) {
        const observerOptions = { threshold: 0.5 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        stats.forEach(stat => observer.observe(stat));
    }

    function animateValue(obj) {
        const end = parseInt(obj.getAttribute('data-count').replace(/,/g, ''));
        const duration = 2000;
        let startTimestamp = null;
        const start = 0;
        const suffix = obj.innerText.replace(/[0-9,\.]/g, '');

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);

            // Format number with commas
            obj.innerHTML = value.toLocaleString() + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- 4. Chat Interactions ---
    const chatContacts = document.querySelectorAll('.chat-contact');
    const chatLayout = document.getElementById('chatLayout');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.querySelector('.chat-messages');
    const chatBack = document.getElementById('chatBack');

    if (chatContacts.length > 0) {
        chatContacts.forEach(contact => {
            contact.addEventListener('click', function () {
                // Remove active from all
                chatContacts.forEach(c => c.classList.remove('active'));
                // Add active to current
                this.classList.add('active');

                // On mobile: show chat main
                if (window.innerWidth <= 768 && chatLayout) {
                    chatLayout.classList.add('chat-open');
                    if (chatBack) chatBack.style.display = 'flex';
                }

                // (Optional) Update header name based on clicked contact
                const name = this.querySelector('h5').textContent;
                const headerName = document.querySelector('.chat-header-left h5');
                const headerAvatar = document.querySelector('.chat-header-left .avatar');
                const clickedAvatar = this.querySelector('.avatar');

                if (headerName) headerName.textContent = name;
                if (headerAvatar && clickedAvatar) {
                    headerAvatar.textContent = clickedAvatar.textContent;
                    headerAvatar.style.background = clickedAvatar.style.background;
                }
            });
        });
    }

    // Mobile Back Button in Chat
    if (chatBack) {
        chatBack.addEventListener('click', () => {
            if (chatLayout) {
                chatLayout.classList.remove('chat-open');
                chatBack.style.display = 'none';
            }
        });
    }

    // Send Message Mock
    if (sendBtn && chatInput && chatMessages) {
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (text) {
            // Add User Message
            const msgDiv = document.createElement('div');
            msgDiv.className = 'message-bubble sent';
            msgDiv.innerHTML = `<div>${text}</div><div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ✓</div>`;
            chatMessages.appendChild(msgDiv);

            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Mock Reply after 1s
            setTimeout(() => {
                const replyDiv = document.createElement('div');
                replyDiv.className = 'message-bubble received';
                replyDiv.innerHTML = `<div>Got it! Thanks for your message. We'll get back to you shortly. 👍</div><div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>`;
                chatMessages.appendChild(replyDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    // --- 5. Campaign Wizard ---
    const stepItems = document.querySelectorAll('.step-item');
    if (stepItems.length > 0) {
        stepItems.forEach(step => {
            step.addEventListener('click', () => {
                // Just visual toggle for demo purpose
                // In real app, this would switch views
                const stepNum = parseInt(step.getAttribute('data-step'));

                // Reset all
                stepItems.forEach(s => {
                    const sNum = parseInt(s.getAttribute('data-step'));
                    s.classList.remove('active', 'done');
                    if (sNum < stepNum) s.classList.add('done');
                    if (sNum === stepNum) s.classList.add('active');
                });

                // Update connectors
                const connectors = document.querySelectorAll('.step-connector');
                connectors.forEach((conn, index) => {
                    if (index < stepNum - 1) conn.classList.add('active');
                    else conn.classList.remove('active');
                });
            });
        });
    }

    // --- 6. Template Selection ---
    const templateCards = document.querySelectorAll('.template-card');
    if (templateCards.length > 0) {
        templateCards.forEach(card => {
            card.addEventListener('click', () => {
                templateCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                // Update Preview Text (Mock)
                const previewMsg = document.querySelector('.phone-msg.green div:nth-child(2)'); // Target message body
                const templateText = card.querySelector('p').textContent;
                if (previewMsg) {
                    // Simple replacement of handlebars for demo
                    previewMsg.innerHTML = templateText
                        .replace('{{name}}', '<strong>Ankit</strong>')
                        .replace('{{order_id}}', '<strong>#12345</strong>')
                        .replace('{{link}}', '<a href="#" style="color:#039be5">track.ly/xyz</a>');
                }
            });
        });
    }

    // --- 7. Automation Node Drag (Mock) ---
    const nodes = document.querySelectorAll('.flow-node');
    if (nodes.length > 0) {
        nodes.forEach(node => {
            node.addEventListener('click', () => {
                // Highlight selected
                nodes.forEach(n => n.style.boxShadow = ''); // Reset check style more standard
                node.style.boxShadow = '0 0 0 2px var(--primary)';

                // Update Properties Panel Title
                const propsTitle = document.querySelector('.properties-panel .prop-group input');
                if (propsTitle) {
                    propsTitle.value = node.querySelector('.flow-node-label').textContent;
                }
            });
        });
    }

    // --- 8. Fade In Animation on Scroll ---
    const fadeElems = document.querySelectorAll('.fade-in');
    if (fadeElems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });


        fadeElems.forEach(elem => observer.observe(elem));
    }

    // --- 9. User Menu Toggle ---
    const userBtn = document.querySelector('.sidebar-user');
    const userMenu = document.getElementById('userMenu');

    if (userBtn && userMenu) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!userBtn.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.classList.remove('show');
            }
        });
    }

    // --- 10. Topbar Profile Menu Toggle ---
    const topbarProfile = document.querySelector('.topbar-profile');
    const profileMenu = document.getElementById('profileMenu');

    if (topbarProfile && profileMenu) {
        topbarProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!topbarProfile.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
            }
        });
    }

});
