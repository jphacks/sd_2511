import { BleManager } from 'react-native-ble-plx';
import { generateAESKey, encryptAES, encryptRSA } from '../cryptoUtils';

const manager = new BleManager();
const relayUUID = '中継機BのUUID';
const message = "Hello Relay B!";

function sendMessage(recipientPublicKey) {
  const aesKey = generateAESKey();
  const encrypted = encryptAES(aesKey, message);
  const encryptedAESKey = encryptRSA(recipientPublicKey, aesKey.toString('base64'));

  const payload = {
    encrypted_body: encrypted,
    encrypted_key: encryptedAESKey
  };

  manager.startDeviceScan(null, null, (error, device) => {
    if (error) return;
    if (device.id === relayUUID) {
      manager.stopDeviceScan();
      device.connect().then(() =>
        device.discoverAllServicesAndCharacteristics().then(() => {
          device.writeCharacteristicWithResponseForService(
            'serviceUUID',
            'characteristicUUID',
            Buffer.from(JSON.stringify(payload)).toString('base64')
          );
        })
      );
    }
  });
}

export default sendMessage;