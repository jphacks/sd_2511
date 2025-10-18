import crypto from 'crypto';

// AES鍵生成
export function generateAESKey() {
  return crypto.randomBytes(32); // 256bit
}

// AES暗号化
export function encryptAES(aesKey, plaintext) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return { iv: iv.toString('base64'), encrypted };
}

// AES復号
export function decryptAES(aesKey, encryptedObj) {
  const iv = Buffer.from(encryptedObj.iv, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
  let decrypted = decipher.update(encryptedObj.encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// RSA鍵ペア生成
export function generateRSAKeyPair() {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
}

// RSA暗号化
export function encryptRSA(publicKey, data) {
  return crypto.publicEncrypt(publicKey, Buffer.from(data)).toString('base64');
}

// RSA復号
export function decryptRSA(privateKey, encrypted) {
  return crypto.privateDecrypt(privateKey, Buffer.from(encrypted, 'base64')).toString();
}
