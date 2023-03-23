# CS2 Beta Enroll Status

## About

This little script is meant to check your CS2 Beta Enrollment Status by reading messages from the CS:GO Game Coordinator.
In case you have received an invite, you should receive a message type `9217`

## How to use

- Clone the repository
- Run `npm install`
- Run `npm run login` in order to receive a refresh token from Steam. Follow the instructions by scanning the QR code with your steam mobile app and you're logged in.
- Run `npm run main` - if you see `[message] {userName} RECEIVED BETA INVITE` you should be in! Happy Fragging!

## Thanks

Thanks to the wonderful folks for providing awesome packages:

- [node-globaloffensive](https://github.com/DoctorMcKay/node-globaloffensive)
- [node-steam-session](https://github.com/DoctorMcKay/node-steam-session)
- [node-steam-user](https://github.com/DoctorMcKay/node-steam-user)
