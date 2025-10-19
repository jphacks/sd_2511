import crypto from 'crypto';

// AES暗号化
export function encryptAES(key, data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return iv.toString('base64') + ':' + encrypted;
}

// AES復号化
export function decryptAES(key, encryptedData) {
  const parts = encryptedData.split(':');
  const iv = Buffer.from(parts.shift(), 'base64');
  const encryptedText = Buffer.from(parts.join(':'), 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// RSA鍵生成
export function generateRSAKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });
  return { publicKey: publicKey.export({ type: 'spki', format: 'pem' }), privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' }) };
}

// RSA暗号化
export function encryptRSA(publicKey, data) {
  return crypto.publicEncrypt(publicKey, Buffer.from(data)).toString('base64');
}

// RSA復号化
export function decryptRSA(privateKey, encryptedData) {
  return crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64')).toString('utf8');
}

// AES鍵生成
export function generateAESKey() {
  return crypto.randomBytes(32); // 256ビットのAES鍵
}