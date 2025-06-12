# InstaDish

A modern, responsive restaurant menu application built with Next.js featuring dynamic filtering, search functionality, and dark mode support.

## Features

- 🌓 Dark/Light mode with system preference detection
- 🔍 Real-time search across dishes, descriptions, and ingredients
- 🥗 Filter dishes by vegetarian/non-vegetarian options
- 📑 Category-based filtering
- 💰 Price-based sorting (high to low, low to high)
- 📱 Fully responsive design
- ⚡ Fast and optimized performance
- 🎨 Clean and modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 16.14 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/instadish.git
cd instadish
```

2. Install dependencies:
```bash
npm install
```

3. Create a `public/dishes.json` file with your menu data following this structure:
```json
{
  "menu": {
    "categories": [
      {
        "id": 1,
        "name": "Category Name"
      }
    ],
    "dishes": [
      {
        "id": 1,
        "name": "Dish Name",
        "description": "Dish Description",
        "price": 10.99,
        "category_id": 1,
        "veg": true,
        "ingredients": ["ingredient1", "ingredient2"]
      }
    ]
  }
}
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

Build the application:
```bash
npm run build
```

The static output will be generated in the `out` directory.

### Docker Support

Build the Docker image:
```bash
docker build -t instadish .
```

Run the container:
```bash
docker run -p 80:80 instadish
```

## Project Structure

```
instadish/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/         # React components
│   │   ├── menu/          # Menu-related components
│   │   └── ui/            # UI components
│   └── lib/               # Utility functions
├── public/                # Static files
│   └── dishes.json       # Menu data
└── ...configuration files
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React](https://reactjs.org/) - UI library
- [Geist Font](https://vercel.com/font) - Typography

## Configuration

The application can be configured through `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',  // Static HTML Export
  images: {
    unoptimized: true,
  },
  // Add other configurations as needed
};
```

## Deployment

### Cloudflare Pages Deployment

To deploy on Cloudflare Pages:

1. Push your code to a GitHub repository

2. Log in to your Cloudflare dashboard and navigate to Pages

3. Click "Create a project" and select your GitHub repository

4. Configure your build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment Variables:
     ```
     NODE_VERSION: 23.11.0
     ```

5. Click "Save and Deploy"

Your site will be deployed to a `.pages.dev` domain. You can also configure a custom domain in your Cloudflare Pages settings.

### Live Demo

Check out the live demo: [InstaDish Demo](https://instadish.pages.dev)

> Note: This is a sample implementation showcasing the features of InstaDish. Menu items and categories are for demonstration purposes only.