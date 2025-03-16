# CPU Scheduling Simulator

![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

A modern web application built with Next.js, featuring a visual simulator for CPU scheduling algorithms including FCFS, SJF, Round Robin, and Priority Scheduling.

## 📋 Features

- **Next.js 13+** - Utilizing the latest features including the App Router
- **React 18+** - Taking advantage of concurrent rendering and other new features
- **TypeScript** - Type-safe code for better developer experience
- **Tailwind CSS** - For styling and responsive design
- **Framer Motion** - For animations
- **Interactive Simulations** - Visualize CPU scheduling algorithms
- **Performance Metrics** - Display average waiting time, turnaround time, and CPU utilization

## Demo

https://github.com/user-attachments/assets/b767e280-b6d3-448e-8919-62876ac4445d




## 🚀 Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/yourusername/cpusche.git
    cd cpusche
    ```

2. Install dependencies

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3. Start the development server

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## 🧰 Project Structure

```
├── src/                  # Source directory
│   ├── app/              # App Router directory
│   │   ├── docs/         # Documentation pages
│   │   ├── simulator/    # Simulator page
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # Shared components
│   ├── context/          # Context providers
│   ├── lib/              # Library functions and utilities
│   ├── styles/           # Global styles
│   └── types/            # TypeScript types
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🛠️ Development

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
