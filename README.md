# UNLOCKABLE

## Contents
- [UNLOCKABLE](#unlockable)
  - [Contents](#contents)
  - [DISCLAIMER](#disclaimer)
  - [Description](#description)
  - [GitLab-GitHub Mirroring](#gitlab-github-mirroring)
  - [Installation](#installation)

## DISCLAIMER
This application is provided strictly for experimental and educational purposes only. By using this application, you acknowledge and agree; (1) that this is an experimental tool intended solely for educational and learning purposes. Any use of this application beyond experimental and educational purposes is entirely at your own risk and liability; (2) that this application is not designed, intended, or warranted to be a substitute for or replacement of any existing functionalities, tools, or systems that it may experiment with or demonstrate. It should not be relied upon for any professional, commercial, or production use; (3) that the user assumes full responsibility for any consequences, damages, or losses that may arise from using this application for purposes other than education and experimentation. The creators and distributors of this application bear no liability for any misuse or inappropriate application of this tool. By proceeding to use this application, you confirm your understanding and acceptance of these terms.


## Description
Unlockable is a browser extension that allows users to unlock content on websites like blogs, news sites, forums, articles, etc. Currently supported websites are:
- 🇰🇪 [Nation Africa](https://nation.africa)
- 🇰🇪 [Business Daily Africa](https://www.businessdailyafrica.co.ke)
- 🇰🇪 [The Standard](https://www.standardmedia.co.ke)
- 🇺🇬 [Daily Monitor](https://www.monitor.co.ug)
- 🇺🇬 [New Vision](https://www.newvision.co.ug)
- 🇹🇿 [The Citizen](https://www.thecitizen.co.tz)
- 🇹🇿 [Mwananchi](https://www.mwananchi.co.tz)
- 🇹🇿 [Mwanaspoti](https://www.mwanaspoti.co.tz)
- 🌍 [The East African](https://www.theeastafrican.co.ke)

## GitLab-GitHub Mirroring
This repository is mirrored on GitLab and GitHub. You can clone it from either platform. The GitLab repository is the primary repository, and the GitHub repository is a mirror. You can find the GitLab repository [here](https://gitlab.com/tuskerlager/unlockable) and the GitHub repository [here](https://github.com/tuskrlager/unlockable).
Learn more about GitLab-GitHub mirroring here: [Repository Mirroring](https://docs.gitlab.com/ee/user/project/repository/mirror/).

## Installation
1. Install [NodeJS](https://nodejs.org/en/download/)
  - (preferrably) using [`nvm`](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating))
  - (preferrably) the LTS version
2. Clone the repository
3. `cd unlockable`
4. `npm install` to install the package and dependencies
5. `npm run build:chromium` for chromium-based browsers (Chrome, Edge, Brave, Opera) or `npm run build:firefox` (for Firefox, Tor, LibreWolf) to build the package.
6. The unpacked extension will be in the `dist` directory i.e `dist/chromium` and `dist/firefox`
7. Load the unpacked extension (or compress to .xpi for Firefox)


