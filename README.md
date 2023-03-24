# CS2 Beta Enroll Status

## About

This little script is meant to check your CS2 Beta Enrollment Status by reading messages from the CS:GO Game Coordinator.
In case you have received an invite, you should receive a message type `9217`.
It's meant as an alternative to starting CS:GO over and over again.

## How to use

- Clone the repository
- Run `npm install`
- Run `npm run login` in order to receive a refresh token from Steam. Follow the instructions by scanning the QR code with your steam mobile app and you're logged in.
- Run `npm run start` - if you see `[message] {userName} RECEIVED BETA INVITE` you should be in! Happy Fragging!

## !!!WARNING!!!

The script creates a temp file: `temp/token.json`. NEVER EVER give this to someone else as he'll be able to access your steam account! Keep it secret!
It's used to store your `refreshToken` for subsuquent runs, this way you don't have to login again if you rerun the script.

## Thanks

Thanks to [DoctorMcKay](https://github.com/DoctorMcKay) for these awesome node packages which basically do 99% of the job!

- [node-globaloffensive](https://github.com/DoctorMcKay/node-globaloffensive)
- [node-steam-session](https://github.com/DoctorMcKay/node-steam-session)
- [node-steam-user](https://github.com/DoctorMcKay/node-steam-user)
