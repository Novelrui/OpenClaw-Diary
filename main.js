(function() {
    'use strict';

    // --- HTML Sanitizer ---
    var ALLOWED_TAGS = ['P', 'BR', 'UL', 'OL', 'LI', 'STRONG', 'EM', 'CODE', 'A', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'BLOCKQUOTE', 'PRE'];
    var ALLOWED_ATTRS = { 'A': ['href', 'title'], 'SPAN': ['class'], 'CODE': ['class'], 'PRE': ['class'] };

    function sanitizeHTML(html) {
        if (!html) return '';
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var body = doc.body;
        walkAndClean(body);
        return body.innerHTML;
    }

    function walkAndClean(node) {
        var child = node.firstChild;
        while (child) {
            var next = child.nextSibling;
            if (child.nodeType === 1) { // Element
                var tag = child.tagName;
                if (ALLOWED_TAGS.indexOf(tag) === -1) {
                    // Replace with text content or unwrap
                    while (child.firstChild) {
                        node.insertBefore(child.firstChild, child);
                    }
                    node.removeChild(child);
                } else {
                    // Clean attributes
                    var allowed = ALLOWED_ATTRS[tag] || [];
                    var attrs = Array.prototype.slice.call(child.attributes);
                    for (var i = 0; i < attrs.length; i++) {
                        if (allowed.indexOf(attrs[i].name) === -1) {
                            child.removeAttribute(attrs[i].name);
                        }
                    }
                    // Enforce safe links
                    if (tag === 'A') {
                        var href = child.getAttribute('href');
                        if (href && (href.indexOf('javascript:') === 0 || href.indexOf('data:') === 0)) {
                            child.removeAttribute('href');
                        }
                        child.setAttribute('rel', 'noopener noreferrer');
                        child.setAttribute('target', '_blank');
                    }
                    walkAndClean(child);
                }
            }
            child = next;
        }
    }

    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // --- Theme ---
    function initTheme() {
        var btn = document.getElementById('theme-toggle');
        if (!btn) return;
        var theme = document.documentElement.getAttribute('data-theme') || 'light';
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        btn.addEventListener('click', function() {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            btn.textContent = next === 'dark' ? '☀️' : '🌙';
        });
    }

    // --- Typewriter ---
    function typeWriter() {
        var elements = document.querySelectorAll('.typing');
        elements.forEach(function(el, index) {
            var text = el.getAttribute('data-text');
            if (!text) return;
            el.textContent = '';
            var i = 0;
            function type() {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100 + Math.random() * 50);
                }
            }
            setTimeout(type, index * 500);
        });
    }

    // --- Render sections ---
    function renderSection(section) {
        var html = '';
        switch (section.type) {
            case 'quote':
                html += '<div class="quote-box">';
                html += '<div class="quote-title">' + escapeHTML(section.title) + '</div>';
                html += '<div class="long-text">' + sanitizeHTML(section.content) + '</div>';
                html += '</div>';
                break;
            case 'long-text':
                html += '<div class="long-text">' + sanitizeHTML(section.content) + '</div>';
                break;
            case 'terminal':
                if (section.output) {
                    html += '<div class="term-block">';
                    html += '<div class="term-header">';
                    html += '<span>terminal</span>';
                    html += '<button class="term-copy-btn">copy</button>';
                    html += '</div>';
                    html += '<div class="term-body">';
                    html += '<div class="term-line">';
                    html += '<span class="term-prompt">$</span> ';
                    html += '<span>' + escapeHTML(section.command) + '</span>';
                    html += '</div>';
                    html += '<div class="term-output">' + sanitizeHTML(section.output) + '</div>';
                    html += '</div></div>';
                } else {
                    html += '<div class="term-line mb">';
                    html += '<span class="term-prompt">$</span>';
                    html += '<span>' + escapeHTML(section.command) + '</span>';
                    html += '</div>';
                }
                break;
            case 'key-value':
                if (section.spaced) html += '<div class="card-line mt">';
                section.items.forEach(function(item) {
                    var valueClass = item.valueType === 'number' ? 'number' : 'string';
                    var comment = item.comment ? '<span class="comment">' + escapeHTML(item.comment) + '</span>' : '';
                    html += '<div class="card-line">';
                    html += '<span class="key">' + escapeHTML(item.key) + '</span>';
                    html += '<span class="colon">:</span>';
                    html += '<span class="' + valueClass + '">' + escapeHTML(item.value) + '</span>' + comment;
                    html += '</div>';
                });
if (section.spaced) html += '</div>';
                break;
        }
        return html;
    }

    function renderEntry(entry) {
        var html = '<div class="entry">';
        html += '<div class="bar">';
        html += '<span class="filename">' + escapeHTML(entry.filename) + '</span>';
        html += '<span class="status">' + escapeHTML(entry.status) + '</span>';
        html += '</div>';
        html += '<div class="entry-body">';
        if (entry.sections) {
            entry.sections.forEach(function(section) {
                html += renderSection(section);
            });
        }
        html += '</div></div>';
        return html;
    }

    // --- Render diary ---
    function renderDiary(data) {
        var tabsContainer = document.querySelector('.date-tabs');
        var wrapper = document.querySelector('.date-tabs-wrapper');
        var screensContainer = document.querySelector('.screen-container');

        if (!data.days || data.days.length === 0) {
            var placeholderHtml = '<div class="screen active">';
            placeholderHtml += '<div class="entry">';
            placeholderHtml += '<div class="bar"><span class="filename">~/diary/placeholder.md</span><span class="status">ready</span></div>';
            placeholderHtml += '<div class="entry-body">';
            placeholderHtml += '<div class="placeholder-hint">';
            placeholderHtml += '<h2>📝 日记模板</h2>';
            placeholderHtml += '<p>OpenClaw 会自动在这里生成每日的学习记录</p>';
            placeholderHtml += '<p class="hint-note">提示：请 Fork 此模板并配置 GitHub Token，让 OpenClaw 自动更新</p>';
            placeholderHtml += '</div></div></div></div>';
            screensContainer.innerHTML = placeholderHtml;
            return;
        }

        var tabsHtml = '';
        var screensHtml = '';
        var sortedDays = data.days.slice().sort(function(a, b) {
            return b.date.localeCompare(a.date);
        });

        sortedDays.forEach(function(day, index) {
            var isActive = index === 0;
            var tabClass = 'date-tab';
            var tabIndex = isActive ? '0' : '-1';
            var ariaSelected = isActive ? 'true' : 'false';
            var screenClass = isActive ? 'screen active' : 'screen';

            tabsHtml += '<button class="' + tabClass + '" role="tab" tabindex="' + tabIndex + '" aria-selected="' + ariaSelected + '" data-date="' + day.date + '">📅 ' + day.date + '</button>';

            screensHtml += '<div class="' + screenClass + '" id="screen-' + day.date + '" role="tabpanel">';
            if (day.entries) {
                day.entries.forEach(function(entry) {
                    screensHtml += renderEntry(entry);
                });
            }
            screensHtml += '</div>';
        });

        tabsContainer.innerHTML = tabsHtml;
        screensContainer.innerHTML = screensHtml;

        // Bind tab clicks
        tabsContainer.querySelectorAll('.date-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                showDate(tab.getAttribute('data-date'));
            });
        });

        // Bind copy buttons via delegation
        screensContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('term-copy-btn')) {
                var termBody = e.target.closest('.term-block').querySelector('.term-output');
                if (termBody) {
                    var text = termBody.textContent;
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(text);
                    }
                    e.target.textContent = '✓ copied';
                    e.target.classList.add('copied');
                    setTimeout(function() {
                        e.target.textContent = 'copy';
                        e.target.classList.remove('copied');
                    }, 1500);
                }
            }
        });

        // Keyboard navigation for tabs
        tabsContainer.addEventListener('keydown', function(e) {
            var tabs = Array.prototype.slice.call(tabsContainer.querySelectorAll('.date-tab'));
            var currentIndex = tabs.indexOf(document.activeElement);
            if (currentIndex === -1) return;

            var newIndex = -1;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                newIndex = (currentIndex + 1) % tabs.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            } else if (e.key === 'Home') {
                e.preventDefault();
                newIndex = 0;
            } else if (e.key === 'End') {
                e.preventDefault();
                newIndex = tabs.length - 1;
            }

            if (newIndex >= 0) {
                tabs[newIndex].focus();
                tabs[newIndex].setAttribute('tabindex', '0');
                tabs[currentIndex].setAttribute('tabindex', '-1');
                showDate(tabs[newIndex].getAttribute('data-date'));
            }
        });

        // Scroll indicators
        if (wrapper) {
            initScrollIndicators(wrapper, tabsContainer);
        }
    }

    function initScrollIndicators(wrapper, tabs) {
        var leftArrow = wrapper.querySelector('.scroll-arrow.left');
        var rightArrow = wrapper.querySelector('.scroll-arrow.right');

        function updateScrollState() {
            var sl = tabs.scrollLeft;
            var maxScroll = tabs.scrollWidth - tabs.clientWidth;
            var atStart = sl <= 2;
            var atEnd = sl >= maxScroll - 2;

            wrapper.classList.toggle('scroll-start', atStart);
            wrapper.classList.toggle('scroll-end', atEnd);
            wrapper.classList.toggle('scroll-middle', !atStart || !atEnd);

            if (leftArrow) leftArrow.hidden = atStart;
            if (rightArrow) rightArrow.hidden = atEnd;
        }

        tabs.addEventListener('scroll', updateScrollState);
        window.addEventListener('resize', updateScrollState);
        setTimeout(updateScrollState, 100);

        if (leftArrow) {
            leftArrow.addEventListener('click', function() {
                tabs.scrollBy({ left: -150, behavior: 'smooth' });
            });
        }
        if (rightArrow) {
            rightArrow.addEventListener('click', function() {
                tabs.scrollBy({ left: 150, behavior: 'smooth' });
            });
        }
    }

    function showDate(date) {
        document.querySelectorAll('.screen').forEach(function(s) {
            s.classList.remove('active');
        });
        var selected = document.getElementById('screen-' + date);
        if (selected) {
            // Force reflow so the slideIn animation replays on re-activation
            void selected.offsetWidth;
            selected.classList.add('active');
        }
        document.querySelectorAll('.date-tab').forEach(function(tab) {
            var isActive = tab.getAttribute('data-date') === date;
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            tab.setAttribute('tabindex', isActive ? '0' : '-1');
        });
    }

    // --- Search ---
    var diaryData = null;
    var searchTimer = null;

    function initSearch() {
        var searchBar = document.getElementById('search-bar');
        var searchInput = document.getElementById('search-input');
        if (!searchBar || !searchInput) return;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimer);
            var query = searchInput.value.trim();
            searchBar.classList.toggle('searching', query.length > 0);
            searchTimer = setTimeout(function() {
                performSearch(query);
            }, 300);
        });

        // / shortcut to focus search, Esc to clear
        document.addEventListener('keydown', function(e) {
            if (e.key === '/' && document.activeElement !== searchInput) {
                e.preventDefault();
                searchInput.focus();
            }
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.value = '';
                searchBar.classList.remove('searching');
                performSearch('');
                searchInput.blur();
            }
        });
    }

    function performSearch(query) {
        if (!diaryData || !diaryData.days) return;
        var container = document.querySelector('.screen-container');
        var tabsWrapper = document.querySelector('.date-tabs-wrapper');

        if (!query) {
            // Show normal view
            tabsWrapper.style.display = '';
            if (document.getElementById('filter-chips')) {
                document.getElementById('filter-chips').style.display = '';
            }
            renderDiary(diaryData);
            return;
        }

        var lowerQuery = query.toLowerCase();
        var results = [];

        diaryData.days.forEach(function(day) {
            var matchingEntries = [];
            (day.entries || []).forEach(function(entry) {
                var matched = false;
                (entry.sections || []).forEach(function(section) {
                    var text = getSectionText(section).toLowerCase();
                    if (text.indexOf(lowerQuery) !== -1) matched = true;
                });
                if (matched) matchingEntries.push(entry);
            });
            if (matchingEntries.length > 0) {
                results.push({ date: day.date, entries: matchingEntries });
            }
        });

        // Hide tabs and filters during search
        tabsWrapper.style.display = 'none';
        if (document.getElementById('filter-chips')) {
            document.getElementById('filter-chips').style.display = 'none';
        }

        // Render results
        var html = '<div class="screen active">';
        if (results.length === 0) {
            html += '<div class="placeholder-hint">';
            html += '<h2>🔍 无结果</h2>';
            html += '<p>未找到匹配 "' + escapeHTML(query) + '" 的内容</p>';
            html += '</div>';
        } else {
            html += '<div class="search-results-info" style="padding:8px 16px;color:var(--muted);font-size:12px;">';
            html += '找到 ' + results.reduce(function(s, d) { return s + d.entries.length; }, 0) + ' 条匹配结果';
            html += '</div>';
            results.forEach(function(day) {
                day.entries.forEach(function(entry) {
                    html += renderEntry(entry);
                });
            });
        }
        html += '</div>';
        container.innerHTML = html;
    }

    function getSectionText(section) {
        var parts = [];
        if (section.title) parts.push(section.title);
        if (section.content) parts.push(stripHTML(section.content));
        if (section.command) parts.push(section.command);
        if (section.items) {
            section.items.forEach(function(item) {
                parts.push(item.key || '');
                parts.push(item.value || '');
                parts.push(item.comment || '');
            });
        }
        return parts.join(' ');
    }

    function stripHTML(html) {
        var tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    // --- Filter Chips ---
    var activeFilter = 'all';

    function initFilters() {
        if (!diaryData || !diaryData.days) return;
        var chipsContainer = document.getElementById('filter-chips');
        if (!chipsContainer) return;

        // Count entry types
        var counts = { all: 0, learning: 0, thinking: 0, plans: 0, messages: 0 };
        diaryData.days.forEach(function(day) {
            (day.entries || []).forEach(function(entry) {
                counts.all++;
                var type = getEntryType(entry.filename);
                if (counts[type] !== undefined) counts[type]++;
            });
        });

        if (counts.all <= 1) {
            chipsContainer.style.display = 'none';
            return;
        }

        var types = [
            { key: 'all', label: '全部' },
            { key: 'learning', label: '💡 学习' },
            { key: 'thinking', label: '🤔 思考' },
            { key: 'plans', label: '📋 计划' },
            { key: 'messages', label: '✉️ 消息' }
        ];

        var html = '';
        types.forEach(function(t) {
            if (counts[t.key] > 0) {
                var cls = t.key === activeFilter ? 'filter-chip active' : 'filter-chip';
                html += '<button class="' + cls + '" data-filter="' + t.key + '">' + t.label + '<span class="chip-count">' + counts[t.key] + '</span></button>';
            }
        });
        chipsContainer.innerHTML = html;

        chipsContainer.querySelectorAll('.filter-chip').forEach(function(chip) {
            chip.addEventListener('click', function() {
                activeFilter = chip.getAttribute('data-filter');
                chipsContainer.querySelectorAll('.filter-chip').forEach(function(c) {
                    c.classList.toggle('active', c.getAttribute('data-filter') === activeFilter);
                });
                applyFilter();
            });
        });
    }

    function getEntryType(filename) {
        if (!filename) return 'other';
        var lower = filename.toLowerCase();
        if (lower.indexOf('learn') !== -1) return 'learning';
        if (lower.indexOf('think') !== -1) return 'thinking';
        if (lower.indexOf('tomorrow') !== -1 || lower.indexOf('plan') !== -1 || lower.indexOf('todo') !== -1) return 'plans';
        if (lower.indexOf('message') !== -1 || lower.indexOf('msg') !== -1 || lower.indexOf('letter') !== -1) return 'messages';
        return 'learning';
    }

    function applyFilter() {
        document.querySelectorAll('.entry').forEach(function(entry) {
            if (activeFilter === 'all') {
                entry.style.display = '';
                return;
            }
            var filenameEl = entry.querySelector('.filename');
            var filename = filenameEl ? filenameEl.textContent : '';
            var type = getEntryType(filename);
            entry.style.display = type === activeFilter ? '' : 'none';
        });
    }

    // --- Init ---
    function init() {
        initTheme();

        var container = document.querySelector('.screen-container');
        container.innerHTML = '<div class="loading-hint"><span class="term-prompt">$</span> <span class="loading-text">loading diary...</span><span class="loading-cursor">_</span></div>';

        // Try inline data first (for file:// protocol from dist/), fallback to fetch
        var data = window.diaryData || null;
        if (data) {
            diaryData = data;
            renderDiary(data);
            initSearch();
            initFilters();
            typeWriter();
        } else {
            loadDiaryData().then(function(data) {
                diaryData = data;
                renderDiary(data);
                initSearch();
                initFilters();
                typeWriter();
            }).catch(function(err) {
                showLoadError(err);
            });
        }
    }

    function loadDiaryData() {
        var configData = null;
        return fetch('diary-data.json')
            .then(function(res) {
                if (!res.ok) throw new Error('无法加载配置 (diary-data.json)');
                return res.json();
            })
            .then(function(config) {
                configData = config;
                return fetch('diary/index.json');
            })
            .then(function(res) {
                if (!res.ok) throw new Error('无法加载日期索引 (diary/index.json)');
                return res.json();
            })
            .then(function(index) {
                var dateList = index.dates || [];
                var fetches = dateList.map(function(date) {
                    return fetch('diary/' + date + '.json')
                        .then(function(res) {
                            if (!res.ok) return null;
                            return res.json();
                        })
                        .catch(function() { return null; });
                });
                return Promise.all(fetches).then(function(days) {
                    var validDays = days.filter(function(d) { return d !== null; });
                    return { config: configData.config, days: validDays };
                });
            });
    }

    function showLoadError(err) {
        var container = document.querySelector('.screen-container');
        var isFileProtocol = window.location.protocol === 'file:';
        var msg = isFileProtocol
            ? 'file:// 协议不支持 fetch，请使用以下方式之一：'
            : (err.message || '无法加载日记数据');
        var hint = isFileProtocol
            ? '① 打开 dist/index.html（包含内联数据） ② 运行 npx serve . 启动本地服务器'
            : '请检查网络连接或刷新页面重试';

        container.innerHTML = '<div class="placeholder-hint">' +
            '<h2>⚠️ 加载失败</h2>' +
            '<p>' + escapeHTML(msg) + '</p>' +
            '<p class="hint-note">' + escapeHTML(hint) + '</p>' +
            '<button class="retry-btn" onclick="location.reload()">重试</button>' +
            '</div>';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();