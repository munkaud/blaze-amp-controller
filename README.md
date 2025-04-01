# companion-module-bluesound-b100

## bluesound-b100 module works with [BluOS](https://www.bluesoundprofessional.com)

If you are using this plugin - it is a 0. version. That means I'm not done building yet, but will be adding stuff that is working (usually...) as I go. This is an experiment to get my chops up in VSCode; and to explore the power of Companion by making a custom module, for my own education. You have been warned.

| Version | Notes| 
| ---------- | -----------------------------------|
| **V0.0.1** | Borrowed the generic module from Bitfocus at https://github.com/bitfocus/companion-module-generic-tcp-udp/releases/tag/v2.1.3. Just getting started making changes, and re-working the module to control Bluesound B100 Streamer. I've always thought about building my own companion module - and well - here goes.|
| **V0.2.0** | Deleted entire generic tcp structure and started from scratch. There were piles of errors in the code that I did not know how to trace, so I kept the files themselves, but blanked out the code. From there I got my first preset button built and tested that, then added a couple more preset buttons, and now it is off to the races, I hope.
| **V0.2.1** | Added attribution per the acceptable use notes kept [here](https://www.bluesoundprofessional.com/wp-content/uploads/2022/10/BluOS-Custom-Integration-API-v1.5.pdf) to readme file.
| **V0.3.1** | Fixed the new file structure so that functionality has been restored. Added VOlume up and Down buttons with option to set the number of db per increment. Default value is 3, but isn't showing up in the input box properly (yet!).
| **V0.3.2** | Implemented Mute on and Off buttons in the presets. Implemented a setVolume function to set eh player to a particular integer value in the range of 0-100. Still having trouble with seeing the default values in teh input boxes. They show up as zeroes in red. Dear Google...
| **V0.3.3** | Edit this when I get there!