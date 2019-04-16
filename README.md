This project was developped using React and Electron.

To download the dependencies, while in the project directory, run:
### `npm install`

To start the project (React part), while in the project directory, run:
### `npm start`

Open a second command prompt and, while in the project directory, run:
### `npm run electron`

Create a new folder named "FHIR" on your computer, following this path:
`C:\Users\[user's name]\Documents\FHIR`


Functionnalities:
1. The user can upload files to the API by dropping them to the drop zone or by clicking "select" and selecting them
2. The user can also add files to a folder on his/her computer in order to upload them
3. This folder should be named "FHIR" and located on his/her "Documents", as in: `C:\Users\[user's name]\Documents\FHIR`
4. The user can add send multiple files at once (by either dropping them, selecting them or adding them to the FHIR folder)
5. An error message is displayed if the document is not uploaded
6. After every upload, the number of Binary on the server is retrieved and displayed on the page

dependencies:
axios: using axios instead of fetch for simplicity reasons
chokidar: using chokidar instead of fs.watch for consistency reasons ; see https://nodejs.org/docs/latest/api/fs.html#fs_fs_watch_filename_options_listener

sources:
upload icon: https://www.flaticon.com/free-icon/cloud-storage-uploading-option_25399#term=upload&page=1&position=10
checked: https://www.flaticon.com/free-icon/checked_291201#term=check&page=1&position=2
warning: https://www.flaticon.com/free-icon/warning_196759#term=error&page=1&position=18
