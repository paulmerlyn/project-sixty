const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Read the original game.html file
const htmlContent = fs.readFileSync(path.join(__dirname, 'game.html'), 'utf8');

// Extract JavaScript from the HTML
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
const scriptMatches = [...htmlContent.matchAll(scriptRegex)];

if (scriptMatches.length === 0) {
  console.error('No JavaScript found in game.html');
  process.exit(1);
}

// Get the JavaScript content
const jsContent = scriptMatches[0][1];

// Obfuscate the JavaScript with balanced settings for functionality
// Focus on string obfuscation and identifier renaming rather than control flow
const obfuscationResult = JavaScriptObfuscator.obfuscate(jsContent, {
  compact: true,
  controlFlowFlattening: false, // Disabled to prevent breaking functionality
  deadCodeInjection: false, // Disabled to prevent breaking functionality
  debugProtection: false,
  debugProtectionInterval: 0,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: false, // Disabled for reliability
  renameGlobals: false,
  // Preserve function names called from HTML and critical variables
  reservedNames: [
    'startTimer',
    'stopTimer',
    'resetTimer',
    'add5',
    'sub5',
    'resumeTimer',
    'updateDisplay',
    'playCelebratorySound',
    'renderContestants',
    'renderScoreboard',
    'renderTopics',
    'addNewTopic',
    'ALL_TOPICS',
    'topics',
    'players',
    'deletedTopics',
    'timeLeft',
    'timerId',
    'isRunning'
  ],
  selfDefending: false, // Disabled to prevent breaking
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayCallsTransform: false, // Simplified
  stringArrayEncoding: ['base64'],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: false,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: 'variable',
  stringArrayThreshold: 0.75,
  transformObjectKeys: false, // Disabled to prevent breaking
  unicodeEscapeSequence: false
});

// Replace the JavaScript in the HTML
const obfuscatedHtml = htmlContent.replace(
  scriptRegex,
  `<script>${obfuscationResult.getObfuscatedCode()}</script>`
);

// Write the obfuscated version
fs.writeFileSync(
  path.join(__dirname, 'game.obfuscated.html'),
  obfuscatedHtml,
  'utf8'
);

console.log('✅ Obfuscation complete!');
console.log('📄 Original file: game.html');
console.log('🔒 Obfuscated file: game.obfuscated.html');
console.log('\nObfuscation features applied:');
console.log('  • String array encoding (Base64)');
console.log('  • Identifier renaming (hexadecimal)');
console.log('  • Split strings');
console.log('  • Code compaction');
console.log('\n⚠️  Note: Use game.obfuscated.html for production deployment');
console.log('⚠️  Keep game.html as your development version');
