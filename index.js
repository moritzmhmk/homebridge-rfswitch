const RFSwitch = require('rfswitch')

let Service, Characteristic

module.exports = function (homebridge) {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic
  homebridge.registerAccessory('homebridge-rfswitch', 'RFSwitch', Switch)
}

class Switch {
  constructor (log, config) {
    if (config.name === undefined) { return log('Name missing from configuration.') }
    if (config.onCode === undefined) { return log('onCode missing from configuration.') }
    if (config.offCode === undefined) { return log('offCode missing from configuration.') }

    this.switch = new RFSwitch(config)

    var informationService = new Service.AccessoryInformation()
    informationService
      .setCharacteristic(Characteristic.Name, 'node-rfswitch')
      .setCharacteristic(Characteristic.Manufacturer, 'moritzmhmk')
      .setCharacteristic(Characteristic.Model, 'v0.0.1')
      .setCharacteristic(Characteristic.SerialNumber, '0000000001')

    var switchService = new Service.Switch(config.name)
    switchService.getCharacteristic(Characteristic.On).on('set', (value, callback) => {
      this.isOn = value
      if (value) { this.switch.switchOn() } else { this.switch.switchOff() }
      callback()
    })

    switchService.getCharacteristic(Characteristic.On).on('get', (callback) => { callback(null, this.isOn) })
    this.services = [ informationService, switchService ]
  }
  getServices () {
    return this.services
  }
}

