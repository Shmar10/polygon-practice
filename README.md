# Polygon Practice App

A modern, interactive web application for practicing polygon angle and diagonal calculations. Built with React, Vite, and Tailwind CSS.

![Polygon Practice](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Two Practice Modes

#### Angle Practice
- **Sum of Interior Angles** - Calculate the total interior angle sum
- **Each Interior Angle** - Find individual angles in regular polygons
- **Find Sides from Angles** - Reverse calculations to find polygon sides
- **Sum of Exterior Angles** - Learn about exterior angle properties
- **Each Exterior Angle** - Calculate exterior angles in regular polygons
- **Algebra Problems** - Solve for missing angles and variables
- **10-Question Challenge Mode** - Timed challenge with score submission

#### Diagonal Practice
- **Calculate Total Diagonals** - Find the number of diagonals
- **Diagonals from a Vertex** - Learn about vertex diagonals
- **Multi-step Problems** - Combine angle and diagonal knowledge
- **Reverse Calculations** - Find sides from diagonal counts

### 📊 Additional Features
- **Real-time Score Tracking** - Monitor correct and incorrect answers
- **Step-by-Step Solutions** - Detailed explanations for every problem
- **Google Sheets Integration** - Automatic score submission (Challenge Mode)
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, intuitive interface with Tailwind CSS
- **Problem Type Selection** - Choose which types of problems to practice

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/polygon-practice-app.git
cd polygon-practice-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app running!

## 📦 Building for Production

```bash
# Build the app
npm run build

# Preview the production build locally
npm run preview
```

The built files will be in the `dist` folder, ready to deploy.

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions covering:
- GitHub Pages (with automatic CI/CD)
- Synology NAS
- Netlify
- Vercel
- Custom domains

### Quick Deploy to GitHub Pages

```bash
# Deploy to GitHub Pages
npm run deploy
```

## 🏗️ Project Structure

```
polygon-practice-app/
├── src/
│   ├── components/
│   │   └── shared/          # Reusable components
│   │       ├── Navigation.jsx
│   │       ├── ScoreBoard.jsx
│   │       ├── SolutionModal.jsx
│   │       └── ProblemTypeSelector.jsx
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── AnglesPage.jsx   # Angle practice
│   │   └── DiagonalsPage.jsx # Diagonal practice
│   ├── hooks/
│   │   └── useScore.js      # Score management hook
│   ├── utils/
│   │   ├── polygonHelpers.js    # Helper functions
│   │   ├── angleProblems.js     # Angle problem generator
│   │   ├── diagonalProblems.js  # Diagonal problem generator
│   │   └── googleSheets.js      # Score submission
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
└── package.json
```

## 🎨 Tech Stack

- **React 19** - UI library
- **React Router 7** - Client-side routing
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Google Apps Script** - Score submission backend (optional)

## 🔧 Configuration

### Google Sheets Integration

To enable score submission:

1. Create a Google Apps Script web app
2. Update the URL in `src/utils/googleSheets.js`:

```javascript
const GOOGLE_APP_SCRIPT_URL = 'YOUR_SCRIPT_URL_HERE';
```

### Customizing Problem Types

Edit the problem type arrays in:
- `src/utils/angleProblems.js` - For angle problems
- `src/utils/diagonalProblems.js` - For diagonal problems

### Styling

The app uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles

## 📖 Usage

### For Students

1. Choose between **Angle Practice** or **Diagonal Practice**
2. Select which problem types you want to practice
3. For Angle Practice, optionally enable **10-Question Challenge Mode**
4. Click **Start New Session** to begin
5. Answer problems and receive instant feedback
6. View step-by-step solutions for incorrect answers
7. Track your progress with the score counter

### For Teachers

The Challenge Mode allows students to submit their scores:
1. Students enter their name and class period
2. Enable "10-Question Challenge"
3. After completing 10 questions, scores are automatically submitted
4. View results in your connected Google Sheet

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Original HTML versions by [Your Name]
- Built with modern web technologies
- Inspired by the need for better geometry practice tools

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section

## 🎓 Learning Resources

This project demonstrates:
- **React Hooks** - State management with useState, useEffect
- **Custom Hooks** - Reusable logic with useScore
- **React Router** - Client-side routing
- **Component Architecture** - Modular, reusable components
- **Modern CSS** - Tailwind CSS utility classes
- **Build Tools** - Vite configuration and optimization
- **CI/CD** - Automated deployment with GitHub Actions

Perfect for learning modern web development! 🚀

---

Made with ❤️ for students learning geometry
