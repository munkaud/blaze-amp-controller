# companion-module-bluesound-b100

If you are using this plugin,
I'm likely not done yet. And, this is just an experiment. So, you have been warned.

## Anything below this line...
has not yet been edited properly. It's all from the module I borrowed to get started. 
| Version    | Notes                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------- |
| **V0.0.1** | Borrowed the generic module from Bitfocus at https://github.com/bitfocus/companion-module-generic-tcp-udp/releases/tag/v2.1.3. Just getting started making changes, and re-working the module to control Bluesound B100 Streamer. I've always thought about building my own companion module - and well - here goes.
|
| **V1.0.1** | Fixed errors in HELP.md file                                                                                |
| **V1.0.2** | Added the option to choose the end characters: \r, \n, \r\n, \n\r or none at all.                             |
| **V1.0.5** | Added the option to insert hex codes using the %hh format.                                                  |
| **V1.0.6** | pre-encode send buffer as 'latin1' (binary) to prevent 'utf8' escape of 8bit characters                     |
| **V1.0.7** | re-write to ES6                                                                                             |
| **V2.0.0** | Update for Companion 3.0                                                                                    |
| **V2.1.0** | Add Send Hex action to replace deprecated `unescape` function<br>Allow host names as well as IP numbers |
