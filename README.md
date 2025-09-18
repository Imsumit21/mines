# Gems & Mines Game

A React/TypeScript implementation of a minesweeper-style betting game with modern UI and comprehensive state management.

## 🏗️ Architecture Overview

The application follows a modular, component-based architecture with clear separation of concerns:

```
src/app/
├── components/
│   ├── game/           # Game-specific components
│   ├── modals/         # Modal components
│   ├── controls/       # Game control components
│   └── layout/         # Layout and navigation components
├── hooks/              # Custom React hooks
└── page.tsx           # Main application component
```

## 📁 Component Structure

### Game Components (`components/game/`)
- **Cell.tsx** - Individual game cell with animations
- **GameGrid.tsx** - 5x5 grid container
- **GameStats.tsx** - Game statistics display
- **PatternPreview.tsx** - Mine pattern preview component

### Modal Components (`components/modals/`)
- **AddFundsModal.tsx** - Wallet funding interface
- **ResultsModal.tsx** - Game results display
- **RulesModal.tsx** - Game rules and instructions
- **PatternInfoModal.tsx** - Mine pattern information
- **HistoryModal.tsx** - Betting history table
- **HomeModal.tsx** - Welcome screen
- **LoadingScreen.tsx** - Loading animation

### Control Components (`components/controls/`)
- **BetControls.tsx** - Bet amount management
- **MinesControls.tsx** - Mine count management
- **ManualControls.tsx** - Manual game controls
- **AutoControls.tsx** - Auto-play controls (placeholder)

### Layout Components (`components/layout/`)
- **Header.tsx** - Top navigation bar
- **Sidebar.tsx** - Control panel sidebar
- **Footer.tsx** - Application footer
- **MobileNavigation.tsx** - Mobile bottom navigation
- **GameArea.tsx** - Main game area container

## 🎣 Custom Hooks (`hooks/`)

### useGameState
**Purpose**: Core game state management and logic
**Features**:
- Game state management (betting, grid, wallet, history)
- Grid generation with different mine patterns
- Winnings calculation and game progression
- Local storage persistence
- Game actions (start, reveal, cash out, reset)

### useModalState
**Purpose**: Modal visibility and state management
**Features**:
- Modal open/close state management
- Body overflow handling for modals
- Loading state management
- Results message handling

### useUIState
**Purpose**: UI-specific state management
**Features**:
- Tab state management (manual/auto)
- Fullscreen toggle functionality
- Dropdown state management
- Click outside handlers

### useAutoplay
**Purpose**: Autoplay game logic
**Features**:
- Complex autoplay game progression
- Timer management for autoplay rounds
- State updates during autoplay
- Round completion handling

## 🎮 Game Features

### Core Gameplay
- **5x5 Grid**: 25 cells with hidden gems and mines
- **Betting System**: Configurable bet amounts with presets
- **Mine Patterns**: 6 different mine placement patterns
- **Multiplier System**: Dynamic winnings calculation
- **History Tracking**: Persistent betting history

### Game Modes
- **Manual Mode**: Player-controlled cell revelation
- **Auto Mode**: Automated gameplay (coming soon)

### UI Features
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Modern dark UI with green accents
- **Animations**: Smooth transitions and micro-interactions
- **Fullscreen Support**: Immersive gaming experience

## 🛠️ Technical Stack

- **React 18** - Component-based UI library
- **TypeScript** - Type-safe development
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📊 State Management

The application uses a combination of React hooks and custom hooks for state management:

- **Local State**: Component-specific state using `useState`
- **Custom Hooks**: Reusable state logic and side effects
- **Local Storage**: Persistent data (wallet, betting history)
- **Event Handlers**: User interaction management

## 🎯 Key Benefits of Refactoring

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components and hooks can be reused
3. **Maintainability**: Clear separation of concerns
4. **Testability**: Isolated logic for easier testing
5. **Performance**: Optimized re-renders with proper memoization
6. **Scalability**: Easy to add new features and components

## 🔧 Development Guidelines

### Component Structure
```tsx
// Component with proper TypeScript interfaces
interface ComponentProps {
  // Define props with clear types
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  return <div>JSX</div>
}

export default Component
```

### Hook Usage
```tsx
// Use custom hooks for state management
const { gameState, startGame, revealCell } = useGameState()
const { showModal, setShowModal } = useModalState()
```

### Styling
- Use Tailwind CSS classes for styling
- Follow mobile-first responsive design
- Maintain consistent color scheme and spacing

## 📝 Future Enhancements

- [ ] Auto-play mode implementation
- [ ] Sound effects and audio
- [ ] Advanced statistics and analytics
- [ ] Multiplayer support
- [ ] Additional game modes
- [ ] Progressive Web App (PWA) features

## 🤝 Contributing

1. Follow the established component structure
2. Use TypeScript for type safety
3. Implement proper error handling
4. Add comprehensive comments for complex logic
5. Test components thoroughly before submission

---

**Built with ❤️ using React, TypeScript, and Next.js**
