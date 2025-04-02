# companion-module-blaze-amp-controller

| Version | Notes| 
| ---------- | -----------------------------------|
| **V0.0.2** | Borrowed the generic module from Bitfocus at https://github.com/bitfocus/companion-template. Just getting started making changes, and re-working the module to control [Blaze Amplifiers](www.blaze-audio.com). I've always thought about building my own companion module - and well - here goes.|
| **V0.0.3** | Built first presets to control amp power on and off. Buttons have a  dynamic background color based on the state of the amplifier, which is triggered by the API response from a status request. this version also features refactored code, in anticipation of more presets being added as development continues.|
| **V0.0.5** |Power On and Off work., Input polling works and dynamically builds the presets that are available on the amp. Whether this is 2,4 or 8 inputs. Still working on the feedback for the power buttons, was working and then I broke it somehow.|
| **V0.0.6** |Power On and Off working with color feedback and greyed out text to indicate amp state. Poll amp to see what inputs are available, determine if mono inputs are paired into stereo - treat as one input. Whether this is 2,4 or 8 input model, need to test on Dante model in future. Input sensitivity available for inputs, with drop-down menu to pick from legal settings, per API. Custom range on Trim for Digital Inputs, and Generator which has a one-off range.|


See [HELP.md](./companion/HELP.md) and [LICENSE](../LICENSE)
