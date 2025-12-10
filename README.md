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
Code Duels is a competitive web-based programming arena where players challenge each other in real-time 1v1 coding battles. Solve algorithmic problems in Python as quickly and accurately as possible to defeat your opponent. Complete a randomized set of problems to whittle down your opponent's health. End up losing a battle? Use power-ups to even the playing field. The player who successfully completes 3 problems will claim victory!

Practice coding, sharpen your problem-solving skills, and challenge friends.

## Features
- Problem generation with test cases and solutions 
- Round-based gameplay system
- Real-time multiplayer
- Room creation and joining
- In-browser coding editor with syntax highlighting, support, and security
- Player profiles with gameplay stats and Github account integration
- Unique powerups that disrupt or assist player action
- Unique colosseum theme

## Contributions
- Problem generation and delivery
- Player profiles based on GitHub account
- Changing display names
- Database for problems, profiles, and game states using Supabase/PostgreSQL

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
  - code-duels-web-app (frontend) → code-duels-api (backend) → Redis cache
- Game states
  - Waiting for member to join → waiting for passing submission → user wins or leaves
 
## Screenshots
<img width="720" height="388" alt="CodeDuelsHome" src="https://github.com/user-attachments/assets/7903cbc7-7722-44a5-aa02-fce86ae77c35" />
<img width="720" height="388" alt="CodeDuelsScreenshot" src="https://github.com/user-attachments/assets/2d9bbaba-d5a4-4541-ab64-ef134ea97ece" />
<img width="720" height="388" alt="CodeDuelsPowerup" src="https://github.com/user-attachments/assets/840efeb3-4b79-4157-b159-061b7ad3df81" />
<img width="720" height="388" alt="CodeDuelsWon" src="https://github.com/user-attachments/assets/1006c0a2-d5ee-4f05-9201-bbc9446a8277" />
<img width="720" height="388" alt="CodeDuelsProfile" src="https://github.com/user-attachments/assets/14d9ac8b-4ab9-4bad-92c1-adca7d870663" />


