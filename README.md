# companion-module-blaze-amp-controller

| Version | Notes| 
| ---------- | -----------------------------------|
| **V0.0.2** | Borrowed the generic module from Bitfocus at https://github.com/bitfocus/companion-template. Just getting started making changes, and re-working the module to control [Blaze Amplifiers](www.blaze-audio.com). I've always thought about building my own companion module - and well - here goes.|
| **V0.0.3** | Built first presets to control amp power on and off. Buttons have a  dynamic background color based on the state of the amplifier, which is triggered by the API response from a status request. this version also features refactored code, in anticipation of more presets being added as development continues.|
| **V0.0.5** |Power on and Off work., Input polling works and dynamically builds the presets that are available on the amp. Whether this is 2,4 or 8 inputs. Still working on the feedback for the power buttons, was working and then I broke it somehow.|


See [HELP.md](./companion/HELP.md) and [LICENSE](../LICENSE)
