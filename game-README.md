# Project 60

A comprehensive white-label representation of the BBC's Just-a-Minute game formulated as a digital family and friends edition. Features in-built player registration, topic management, timer, rules, and scoreboard.

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
- **Single File Design**: The entire application is contained in a single file for maximum portability, offline functionality, and reliability

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
- Multilingual support
- Themes and visual customization
- Export/import game data
- Mobile app versions

