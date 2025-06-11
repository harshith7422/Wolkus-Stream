# Wolkus Stream

A beautiful, production-ready React-based movie streaming platform where users can discover, organize, and manage their favorite movies and TV shows. Built with modern web technologies and powered by the OMDB API.

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

### API Usage
The application uses a free OMDB API key for demonstration purposes. For production use:

1. Sign up at [OMDB API](http://www.omdbapi.com/)
2. Get your API key
3. Replace the key in `src/utils/omdb.ts`

```typescript
const OMDB_API_KEY = 'your-api-key-here';
```
### Results
![image](https://github.com/user-attachments/assets/aac7125f-65bd-4712-94b4-90c48dff1297)

![image](https://github.com/user-attachments/assets/4ffaf742-355a-42a0-9a69-8f9fc65e6f29)

![image](https://github.com/user-attachments/assets/6262822e-467b-426b-bd29-20bd0c91557f)
