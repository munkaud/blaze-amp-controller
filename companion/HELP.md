# Bluesound B100 Module

A module for controlling a B100 streamer from Bluesound<https://bluesoundprofessional.com/product/b100s-network-music-player/>

## Below this line...
is stuff I haven't changed yet. Just trying to get my first test module up and running.

## Configuration

THis has not been edited by munkaud yet. And I'm not trying to get it all fixed just yet.

| Option                | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| Target IP             | Destination Host name / IP                                      |
| Target Port           | Destination port                                                |
| TCP/UDP               | Connection protocol to use                                      |
| Save TCP Response*    | Option to save the last response received via TCP               |
| Convert TCP Response* | Optionally convert response to 'String' or 'Hex' encoded string |

\* only available if protocol is set to TCP

## Actions

| Action           | Description                                                                   |
| ---------------- | ----------------------------------------------------------------------------- |
| Send Command     | Send printable characters, with optional termination sequence                 |
| Send HEX Command | Send a HEX encoded sequence of characters, with optional termination sequence |

## Variables

If enabled, the last response received via TCP will be stored in `$(NAME:tcp_response)`
