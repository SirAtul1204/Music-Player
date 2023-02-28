# Music Player

Built using React on Frontend and Nest.js on Backend

## To test deployed version

The app is deployed on free-tier of Render.com due to which it can have **long first load wait time (around 5 minutes)**, kindly bear with it. 2nd load onwards is much faster until the app gets inactive again.

- Visit https://music-player-frontend.onrender.com

- If a loader is on the screen, it means the backend is waking up from sleep state, kindly wait for 3-4 minutes and refresh the page. All of this are Render's limitations

## To run locally

### Prerequisites

- Clone the repository by - `git clone https://github.com/SirAtul1204/Music-Player.git`

- Change directory to `Music-Player/backend`

- Create a `.env` file in `Music-Player/backend`, a `sample.env` file is attached for reference

- Run following commands to install packages -
  `yarn`

- Change directory to `Music-Player/frontend`

- Run following commands too install packages -
  `yarn`

### To run project

- `cd Music-Player`
- `yarn start:backend`
- create another terminal instance in the root directory `Music-Player` and run `yarn start:frontend`

### Stack

- React.js (Frontend)
- Nest.js (Backend)
- TypeORM
- PostgreSQL Database
- Firebase Cloud Storage
