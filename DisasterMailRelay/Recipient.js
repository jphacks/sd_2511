import { BleManager } from 'react-native-ble-plx';
import { decryptAES, decryptRSA, generateRSAKeyPair } from './cryptoUtils';

const manager = new BleManager();
const { publicKey, privateKey } = generateRSAKeyPair();

manager.startDeviceScan(null, null, (error, device) => {
  if (error) return;
  if (device.name === 'RelayB') {
    manager.stopDeviceScan();
    device.connect().then(() => device.discoverAllServicesAndCharacteristics())
      .then(() => {
        device.monitorCharacteristicForService(
          'serviceUUID',
          'characteristicUUID',
          (error, characteristic) => {
            const payload = JSON.parse(Buffer.from(characteristic.value, 'base64').toString());
            const aesKeyBase64 = decryptRSA(privateKey, payload.encrypted_key);
            const aesKey = Buffer.from(aesKeyBase64, 'base64');
            const message = decryptAES(aesKey, payload.encrypted_body);
            console.log("受信者C受信:", message);
          }
        );
      });
  }
});

// 初回のみ送信者Aに publicKey を渡す
export { publicKey };
