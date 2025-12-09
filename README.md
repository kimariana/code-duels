# code-duels

**Code Duels**  
Senior Software Capstone Project – Team of 3 | Multiplayer competitive coding web application

- Designed real-time competitive gameplay mechanics including scoring logic, challenge delivery, and multiplayer synchronization.
- Developed core gameplay systems including dynamic problem generation and delivery.
- Built backend infrastructure using Python (Flask) and integrated with a React + TypeScript frontend for smooth player interaction.
- Applied game design principles to balance challenge difficulty, player progression, and competitive fairness.
- Focused on responsive gameplay and intuitive UX to support competitive engagement and replayability.

This repository contains a portion of the work I contributed to the Code Duels project. Included in this repo is a web application project with all of my files related to the challenge delivery of the game. The wiki contains documentation regarding this project.

[<img align="left" width="28" height="28" alt="Code Duels | Itch" src="https://github.com/user-attachments/assets/52a1560f-bec6-431c-a9d6-ccb2e89a5d88">Here is a link to the playable demo for the project Code Duels.](https://kimariana.itch.io/code-duels)


## Description
Code Duels is a website designed to help you hone your coding skills while battling against other players, colosseum style! Complete a randomized set of problems to whittle down your opponent's health. End up losing a battle? Use power-ups to even the playing field. The player who successfully completes 3 problems will claim victory!

## Features
- Problem generation with test cases and solutions 
- Round-based gameplay system
- Real-time multiplayer
- Room creation and joining
- In-browser coding editor with syntax highlighting, support, and security
- Player profiles with gameplay stats and Github account integration
- Unique powerups that disrupt or assist player action
- Unique colosseum theme

## Technologies
- Frontend: Next.js + React + Typescript
- Backend: Python + Flask + Docker
- Database: Supabase with PostgreSQL and Redis
- Hosting: Railway

## Architecture
- UI/API
  - Calls to API when it creates rooms, fetches problems, or makes code submissions
  - API acts as an event handler
  - Game data is stored in Redis cache
  - UI can emit and listen to game events such as joining and leaving the room, solution passes, and powerups
- Railway Architecture
  - Code-duels-web-app (frontend) → code-deuls-api (backend) → Redis cache
- Game states
  - Waiting for member join → waiting for passing submission → user wins or leaves
