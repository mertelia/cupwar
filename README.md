# CupWar

**3D mini-game built with Three.js, R3F and Rapier for training purposes, inspired by a stylized visual style.**<br /><br />
![CupWar Gameplay](./public/cup1.png)

## About the Project

A hands-on project using React Three Fiber and Three.js in Next.js. <br />
It includes stylized 3D visuals, Rapier physics, and a persistent high-score system using Supabase and Drizzle.

## Demo
Play the game online:  
[https://cupwar.vercel.app](https://cupwar.vercel.app)  

## Tech Stack

- Next.js
- React Three Fiber 
- Drei helpers
- @react-three/rapier
- Three.js
- Drizzle ORM
- Supabase 
- Tailwind CSS
- TypeScript
- React Hook Form 
- Zod
- next-safe-action
- Zustand


## Installation & Development

1. Clone the repository and install dependencies
```bash
git clone https://github.com/mertelia/cupwar.git 
cd cupwar
npm install
```
3. Database Setup: Create a .env file and add your Supabase/Postgres URL
```bash
echo "DATABASE_URL=your_database_url_here" > .env
```
5. Sync database schema & start development
```bash
npx drizzle-kit push && npm run dev
```
