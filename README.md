# companion-module-blaze-amp-controller

| Version | Notes| 
| ---------- | -----------------------------------|
| **V0.0.2** | Borrowed the generic module from Bitfocus at https://github.com/bitfocus/companion-template. Just getting started making changes, and re-working the module to control [Blaze Amplifiers](www.blaze-audio.com). I've always thought about building my own companion module - and well - here goes.|
| **V0.0.3** | Built first presets to control amp power on and off. Buttons have a  dynamic background color based on the state of the amplifier, which is triggered by the API response from a status request. this version also features refactored code, in anticipation of more presets being added as development continues.|
| **V0.0.5** |Power On and Off work., Input polling works and dynamically builds the presets that are available on the amp. Whether this is 2,4 or 8 inputs. Still working on the feedback for the power buttons, was working and then I broke it somehow.|
| **V0.0.6** |Power On and Off working with color feedback and greyed out text to indicate amp state. Poll amp to see what inputs are available, determine if mono inputs are paired into stereo - treat as one input. Whether this is 2,4 or 8 input model, need to test on Dante model in future. Input sensitivity available for inputs, with drop-down menu to pick from legal settings, per API. Custom range on Trim for Digital Inputs, and Generator which has a one-off range.|
| **V0.0.7** | WEnt back to the API located here: [Blaze Audio | API](https://blaze-audio.com/wp-content/uploads/2024/01/Blaze-Open-API-for-Installers-v8.pdf) After building out a fair number of buttons that I use in my work, it dawned on me that I could build those in Companion with components, rather than trying to build "Super" buttons that could do a LOT of powerful things without much warning to users. With that in mind, it's on to the third (at least) file structure for the module. Refactoring existing code to better segregate buttons from actions from feedbacks. Still need to address the main.js - it's getting pretty long. working thru the API commands in section 5.2.1, 5.2.2, 5.2.3, 5.2.4, 5.2.5, 5.2.6 and 5.2.7. Got stuck on some RegEx tuning. Will move on to 5.2.8 in next session.|


See [HELP.md](./companion/HELP.md) and [LICENSE](../LICENSE)
