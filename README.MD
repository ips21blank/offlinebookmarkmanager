# Offline Bookmark Manager

This is a project for chrome extension and is available on chrome webstore.
<br>
**Build folder should not be deleted as it contains manifest files which is required when browser loads the extension (you can do it in developer mode)**.
<br>
Just run the appropriate npm script to save the project in build folder. Then load it as unpacked in dev mode in chrome extensions. After that you should be able to view/edit your bookmarks in a new tab using this extension.

## Technologies used

The project is written in TypeScript and uses React with React-Redux and sass for styles.
This is transpiled using webpack and the output is saved in build folder.

## Structure

The project is contained in ./src folder. Overall structure of the project is self-explanatory. But the naming of some files and code cleanup is required.

## Code Cleanup

It was a project meant for learning and things were added incrementally which affected code organisation in some cases such as in case of scripts for drag and drop.

## Link

The extension can be installed from chrome webstore here : [Offline Bookmark Manager](https://chrome.google.com/webstore/detail/offline-bookmark-manager/mapbjomepcjikhdlcpipcpkeembagldp?hl=en)
