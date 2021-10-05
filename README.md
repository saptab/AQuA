# AQuA

AQuA (*/aqua/*, **A**utomated speech recognition in **Q****u**estion **A**nswering) is an interactive interface for pursuing question answering research including data collection based on audio files generated from the [QANTA QA dataset](https://s3-us-west-2.amazonaws.com/pinafore-us-west-2/qanta-jmlr-datasets/qanta.train.2018.04.18.json).

# Front-end

## Installation

1. `git clone https://github.com/saptab/AQuA`
2. `cd AQuA/browser-asr`
3. `npm install`
4. `npm run start`

For step, alternatively, you can run `yarn start`. This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# Common Solutions to Running Errors
- https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install

# File structure in browser-asr

Most files are in 3 folders: `assets`, `components`, and `styles`. More documentation is available inside each file.

## Assets

Contains images, svgs, sound effects, etc. 

## Components

Contains all of the react hooks. 

`AnimatedCard` - Legacy hook, not used in the current website. It displays a small tile with customizable image, title, and description that animates on hover

`AnswerBox` - Contains the answering hook used in all games (the textbox + toggles for voice controls + the voice controls)

`AudioRecorder` - Contains the hook for recording (and saving the recording) sentence-by-sentence in the shop.

`CreateAccount` - Contains the hook for the create account page displayed when a user logs in for the first time

`Dashboard` - Contains the hook for the dashboard page

`Game` - Contains the hook with socket integration for live gameplay

`Leaderboards` - Contains the hook for the leaderboards page

`Lobby` - Contains the hook for the lobby created upon lobby start (from the `Play` page)

`Play` - Contains the hook for the play page

`Player` - Legacy hook that played a VTT and Wav Audio in sync.

`Profile` - Contains the hook for the profile page

`Record` - Legacy hook that for recording a transcript

`Shop` - Contains the hook for the shop page

`StatsCardsAccordion` - Contains the hook for the stats cards (from the `Profile` page)

`Tooltip` - Legacy hook for putting a tooltip on an element on hover

`WhitePanel` - Hook behind the entire app that encapsulates all the other hooks. 

## Styles

Contains all of the css files for the entire app. Files are named exactly the same as their corresponding hook except with the `.css` suffix replacing `.jsx`

# Back-end

## Installation and Usage

1. `ssh root@157.230.177.48 -L 2000:localhost:2000 -L 4000:localhost:4000 -L 5000:localhost:5000 -L 6000:localhost:6000 -L 7000:localhost:7000`
2. Use our password provided privately
3. Once logged in `cd umd`
4. `docker-compose up`