# Just-a-Minute Topic Generator

A comprehensive web application for playing the Just-a-Minute speaking game with player management, scoring, and custom topic features.

## How to Run

1. Open [`index.html`](index.html) in your web browser.
2. Click the "Generate Random Topic" button to display a random topic.
3. Use the topic for your 1-minute speech following the rules: no hesitation, deviation, or repetition.

## Features

### Player Registration

- Add multiple players to track participation
- Manage player list with easy add/remove functionality
- Player names persist between game sessions using local storage

### Scoreboard

- Track scores for all registered players
- Increment (+1) or decrement (-1) scores with simple button clicks
- Scores are automatically saved and restored between sessions
- Real-time score updates during gameplay

### Topic Management

- Extensive built-in topic library with diverse categories
- Add custom topics to personalize your game experience
- Remove unwanted topics from the rotation
- Topic changes persist across sessions

### Timer System

- Built-in 60-second timer with start/stop/reset controls
- Visual countdown display
- Celebratory sound effect when time completes
- Manual time adjustment (+5/-5 seconds)

### Game Rules

Contestants must speak for 1 minute without:

- Hesitation
- Deviation
- Repetition

#### Scoring System

1. One point for speaking on the one-minute mark
2. One point to the challenger for a correct challenge
3. One point to the speaker for an incorrect challenge
4. One point to a speaker who completes an entire minute

## Technical Details

- **Storage**: Uses browser localStorage to persist player data, scores, and custom topics
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Clean, readable interface with proper contrast
- **No Dependencies**: Pure HTML, CSS, and JavaScript - no external libraries required
- **Single File Design**: The entire application is contained in a single HTML file for maximum portability and simplicity

### Design Philosophy

The game is implemented as a single HTML file that can be opened directly in any browser via **File > Open File...**. This design choice was made specifically to:

1. **Maximize Portability**: The single file can be easily shared as an email attachment, copied to USB drives, or transferred between devices without requiring any installation process.

2. **Simplify Usage**: Targeting an older, less technologically sophisticated audience, the single-file approach eliminates complex setup procedures, dependency management, or server requirements.

3. **Ensure Accessibility**: Users can simply double-click the file or use their browser's file open dialog - no command line, no package managers, no configuration needed.

4. **Maintain Compatibility**: Works consistently across different operating systems and devices without requiring specific software installations beyond a modern web browser.

## Browser Compatibility

The game works in modern browsers including:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome for Android)

## Development

This application is built with:

- HTML5
- CSS3 with Flexbox and modern styling
- Vanilla JavaScript (ES6+)
- Web Audio API for sound effects
- Local Storage API for data persistence

## Future Enhancements

Potential features for future versions:

- Multiplayer online mode
- Game history and statistics
- Customizable timer durations
- Themes and visual customization
- Export/import game data
- Mobile app version

test commit 1

