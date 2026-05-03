(function() {
    'use strict';

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
                html += '<div class="quote-title">' + section.title + '</div>';
                html += '<div class="long-text">' + section.content + '</div>';
                html += '</div>';
                break;
            case 'long-text':
                html += '<div class="long-text">' + section.content + '</div>';
                break;
            case 'terminal':
                html += '<div class="term-line mb">';
                html += '<span class="term-prompt">$</span>';
                html += '<span>' + section.command + '</span>';
                html += '</div>';
                break;
            case 'key-value':
                if (section.spaced) html += '<div class="card-line mt">';
                section.items.forEach(function(item) {
                    var valueClass = item.valueType === 'number' ? 'number' : 'string';
                    var comment = item.comment ? '<span class="comment">' + item.comment + '</span>' : '';
                    html += '<div class="card-line">';
                    html += '<span class="key">' + item.key + '</span>';
                    html += '<span class="colon">:</span>';
                    html += '<span class="' + valueClass + '">' + item.value + '</span>' + comment;
                    html += '</div>';
                });
                break;
        }
        return html;
    }

    function renderEntry(entry) {
        var html = '<div class="entry">';
        html += '<div class="bar">';
        html += '<span class="filename">' + entry.filename + '</span>';
        html += '<span class="status">' + entry.status + '</span>';
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
        var screensContainer = document.querySelector('.screen-container');

        if (!data.days || data.days.length === 0) {
            // Show placeholder
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
            var tabClass = isActive ? 'date-tab' : 'date-tab';
            var ariaSelected = isActive ? 'true' : 'false';
            var screenClass = isActive ? 'screen active' : 'screen';

            tabsHtml += '<button class="' + tabClass + '" role="tab" aria-selected="' + ariaSelected + '" data-date="' + day.date + '">📅 ' + day.date + '</button>';

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
    }

    function showDate(date) {
        document.querySelectorAll('.screen').forEach(function(s) {
            s.classList.remove('active');
        });
        setTimeout(function() {
            var selected = document.getElementById('screen-' + date);
            if (selected) selected.classList.add('active');
        }, 50);
        document.querySelectorAll('.date-tab').forEach(function(tab) {
            var isActive = tab.getAttribute('data-date') === date;
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }

    // --- Init ---
    function init() {
        initTheme();

        // Try inline data first (for file:// protocol), fallback to fetch
        var data = window.diaryData || null;
        if (data) {
            renderDiary(data);
        } else {
            fetch('diary-data.json')
                .then(function(res) { return res.json(); })
                .then(function(data) { renderDiary(data); })
                .catch(function() {
                    renderDiary({ days: [] });
                });
        }

        typeWriter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();