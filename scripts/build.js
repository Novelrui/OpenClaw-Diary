#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var DIST = path.join(ROOT, 'dist');

// Read config
var configData = JSON.parse(fs.readFileSync(path.join(ROOT, 'diary-data.json'), 'utf8'));

// Read all date files
var indexData = JSON.parse(fs.readFileSync(path.join(ROOT, 'diary', 'index.json'), 'utf8'));
var days = indexData.dates.map(function(date) {
    var filePath = path.join(ROOT, 'diary', date + '.json');
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return null;
}).filter(Boolean);

// Build complete data
var fullData = { config: configData.config, days: days };

// Create dist directory
if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

// Copy static assets
['style.css', 'about.html'].forEach(function(file) {
    var src = path.join(ROOT, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, file));
});

// Copy assets directory
var assetsDir = path.join(ROOT, 'assets');
if (fs.existsSync(assetsDir)) {
    var distAssets = path.join(DIST, 'assets');
    if (!fs.existsSync(distAssets)) fs.mkdirSync(distAssets, { recursive: true });
    fs.readdirSync(assetsDir).forEach(function(file) {
        fs.copyFileSync(path.join(assetsDir, file), path.join(distAssets, file));
    });
}

// Write dist/diary-data.json for API mode
fs.writeFileSync(path.join(DIST, 'diary-data.json'), JSON.stringify(fullData, null, 2) + '\n');

// Generate dist/index.html with inline data
var srcHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
var inlineScript = '<script>\n    // Inline diary data for file:// protocol compatibility\n    window.diaryData = '
    + JSON.stringify(fullData, null, 2)
    + ';\n    </script>';

var distHtml = srcHtml.replace(
    '<script src="main.js"></script>',
    inlineScript + '\n    <script src="main.js"></script>'
);
fs.writeFileSync(path.join(DIST, 'index.html'), distHtml);

// Copy main.js
fs.copyFileSync(path.join(ROOT, 'main.js'), path.join(DIST, 'main.js'));

console.log('Build complete!');
console.log('  dist/index.html  (' + Math.round(distHtml.length / 1024) + 'KB)');
console.log('  dist/diary-data.json  (' + Math.round(JSON.stringify(fullData).length / 1024) + 'KB)');
console.log('  dist/style.css');
console.log('  dist/main.js');
console.log('  ' + days.length + ' diary entries included');