# MovieStream Pro

A beautiful, production-ready React-based movie streaming platform where users can discover, organize, and manage their favorite movies and TV shows. Built with modern web technologies and powered by the OMDB API.

![MovieStream Pro](https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🎬 Features

### Core Functionality
- **Advanced Movie Search**: Comprehensive search with filters (year, type, etc.)
- **Rich Movie Details**: Full information including plot, cast, ratings, and more
- **List Management**: Create unlimited public and private movie lists
- **Local Storage**: All data persists locally without requiring a database
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### User Experience
- **Beautiful UI**: Modern design with glass morphism effects and smooth animations
- **Dark Theme**: Eye-friendly dark interface with gradient backgrounds
- **Micro-interactions**: Hover effects, transitions, and visual feedback
- **Intuitive Navigation**: Clean, organized interface with contextual actions

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **Component Architecture**: Modular, reusable components
- **Performance Optimized**: Efficient API calls and state management
- **Error Handling**: Comprehensive error states and user feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moviestream-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Building for Production

```bash
npm run build
```

The build files will be generated in the `dist` directory.

## 🎯 Usage Guide

### Searching for Movies
1. Navigate to the **Search** tab
2. Enter a movie or TV show title in the search bar
3. Use filters to refine results by year or type
4. Browse through paginated results
5. Click on any movie card to view detailed information

### Managing Lists
1. Click **"New List"** to create a custom list
2. Choose between **Public** (visible to others) or **Private** (personal only)
3. Add movies to lists by clicking the **"+"** button on movie cards
4. View and manage your lists in the **"My Lists"** section
5. Edit or delete lists using the dropdown menu on each list card

### Viewing Movie Details
- Click the **eye icon** on any movie card
- View comprehensive information including:
  - Full plot synopsis
  - Cast and crew details
  - Ratings (IMDb, Metacritic)
  - Release information
  - Box office data
  - Awards and achievements

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── Home.tsx         # Landing page with featured content
│   ├── SearchMovies.tsx # Movie search interface
│   ├── MovieCard.tsx    # Individual movie card component
│   ├── MovieDetails.tsx # Detailed movie information modal
│   ├── Lists.tsx        # List management interface
│   └── ListManager.tsx  # Create/edit list modal
├── hooks/               # Custom React hooks
│   └── useLocalStorage.ts # Local storage state management
├── types/               # TypeScript type definitions
│   └── Movie.ts         # Movie and list interfaces
├── utils/               # Utility functions
│   └── omdb.ts          # OMDB API integration
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles (Tailwind CSS)
```

## 🔧 Technology Stack

### Frontend Framework
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Static typing for better code quality and developer experience
- **Vite**: Fast build tool and development server

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Custom Components**: Handcrafted UI components with smooth animations

### Data & Storage
- **OMDB API**: Comprehensive movie database
- **Local Storage**: Client-side data persistence
- **Custom Hooks**: Efficient state management

### Development Tools
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: CSS vendor prefixing

## 🌐 API Integration

### OMDB API Features
- **Search Movies**: Find movies, TV shows, and episodes
- **Detailed Information**: Complete movie metadata
- **High-Quality Posters**: Movie artwork and images
- **Ratings Integration**: IMDb and Metacritic scores

### API Usage
The application uses a free OMDB API key for demonstration purposes. For production use:

1. Sign up at [OMDB API](http://www.omdbapi.com/)
2. Get your API key
3. Replace the key in `src/utils/omdb.ts`

```typescript
const OMDB_API_KEY = 'your-api-key-here';
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 360px - 767px (Optimized for phones)
- **Tablet**: 768px - 1023px (Optimized for tablets)
- **Desktop**: 1024px+ (Optimized for larger screens)

### Adaptive Features
- Responsive grid layouts (2-8 columns based on screen size)
- Mobile-friendly navigation with bottom tabs
- Touch-optimized buttons and interactions
- Optimized image loading for different screen densities

## 🎨 Design System

### Color Palette
- **Primary**: Purple (`#8B5CF6`) - Main brand color
- **Secondary**: Blue (`#3B82F6`) - Accent and interaction color
- **Accent**: Gold (`#F59E0B`) - Highlights and ratings
- **Success**: Green (`#10B981`) - Positive actions
- **Warning**: Yellow (`#F59E0B`) - Caution states
- **Error**: Red (`#EF4444`) - Error states
- **Neutral**: Gray scale for backgrounds and text

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body Text**: Readable, accessible contrast ratios
- **Interactive Elements**: Medium weight, clear call-to-actions

### Spacing System
- Based on 8px grid system
- Consistent spacing throughout the application
- Responsive spacing that adapts to screen size

## 🔄 State Management

### Local Storage Strategy
- **Movie Lists**: Persisted as JSON in localStorage
- **User Preferences**: Theme and view preferences
- **Search History**: Recent searches (optional)

### Data Structure
```typescript
interface MovieList {
  id: string;
  name: string;
  description: string;
  movies: Movie[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 🚀 Performance Optimizations

### Loading Strategies
- **Lazy Loading**: Images load as they enter viewport
- **API Caching**: Reduce redundant API calls
- **Component Optimization**: Efficient re-rendering

### Bundle Optimization
- **Code Splitting**: Dynamic imports for better load times
- **Tree Shaking**: Remove unused code
- **Asset Optimization**: Compressed images and assets

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **ESLint**: Enforced code style and best practices
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain component modularity
- Write descriptive commit messages
- Test thoroughly across different devices
- Ensure accessibility standards are met

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OMDB API** for providing comprehensive movie data
- **Pexels** for placeholder images
- **Lucide React** for beautiful icons
- **Tailwind CSS** for the utility-first CSS framework
- **React Community** for excellent documentation and ecosystem

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

---

**MovieStream Pro** - Elevating your movie discovery and organization experience! 🎬✨