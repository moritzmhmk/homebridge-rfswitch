# homebridge-rfswitch
control RF outlets with homebridge

## Installation

1. Install homebridge: `npm install -g homebridge`
2. Install homebridge-rfswitch: `npm install -g
   homebridge-rfswitch`
3. Update your `config.json`

Make sure that `/dev/gpiomem` exists and is writeable by you (usually by adding yourself to the `gpio` group).

If `/dev/gpiomem` exists but is not owned by the group `gpio` (e.g. on Arch Linux) see [here](https://github.com/jperkin/node-rpio/blob/master/README.md#install).

## Configuration

Configuration sample:

```json
{
  "bridge": {...},
  "description": "...",
  "accessories": [
    {
      "accessory": "RFSwitch",
      "name": "Switch C",
      "onCode": "0F00FFF0FF0F",
      "offCode": "0F00FFF0FF0F",
    }
  ]
}
```
The `accessory` must be `RFSwitch` and `name` can be anything.

Every [rfswitch option](https://github.com/moritzmhmk/node-rfswitch#options) is valid and at least `onCode` and `offCode` must be provided.
