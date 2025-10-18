import { BleManager } from 'react-native-ble-plx';
const manager = new BleManager();

manager.startDeviceScan(null, null, (error, device) => {
  if (error) return;
  if (device.name === 'SenderA') {
    manager.stopDeviceScan();
    device.connect().then(() => device.discoverAllServicesAndCharacteristics())
      .then(() => {
        device.monitorCharacteristicForService(
          'serviceUUID',
          'characteristicUUID',
          (error, characteristic) => {
            const msg = Buffer.from(characteristic.value, 'base64').toString();
            console.log("中継機B受信:", msg);
            // 受信者Cに転送
            forwardToRecipient(msg);
          }
        );
      });
  }
});

function forwardToRecipient(msg) {
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) return;
    if (device.name === 'RecipientC') {
      manager.stopDeviceScan();
      device.connect().then(() =>
        device.discoverAllServicesAndCharacteristics().then(() => {
          device.writeCharacteristicWithResponseForService(
            'serviceUUID',
            'characteristicUUID',
            Buffer.from(msg).toString('base64')
          );
        })
      );
    }
  });
}
