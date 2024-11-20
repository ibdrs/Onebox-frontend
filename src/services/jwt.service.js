import CryptoJS from 'crypto-js';

const key = import.meta.env.VITE_JWT;

class JwtService {
  decode(token) {
    const regex = /^(?<header>.+)\.(?<payload>.+)\.(?<signature>.+)$/;
    const matches = token.match(regex);

    if (!matches) {
      throw new Error("Invalid token format");
    }

    const { header, payload, signature } = matches.groups;

    const computedSignature = CryptoJS.HmacSHA256(`${header}.${payload}`, key);
    const computedSignatureBase64 = CryptoJS.enc.Base64.stringify(computedSignature);
    const signatureFromTokenBase64 = this.base64URLToBase64(signature);

    if (computedSignatureBase64 !== signatureFromTokenBase64) {
      throw new Error("Signature doesn't match");
    }

    const decodedPayload = JSON.parse(this.base64URLDecode(payload));

    return decodedPayload;
  }

  base64URLDecode(base64Url) {
    const base64 = this.base64URLToBase64(base64Url);
    const decodedWordArray = CryptoJS.enc.Base64.parse(base64);
    return CryptoJS.enc.Utf8.stringify(decodedWordArray);
  }

  base64URLToBase64(base64Url) {
    return base64Url.replace(/-/g, "+").replace(/_/g, "/").padEnd(base64Url.length + (4 - (base64Url.length % 4)) % 4, "=");
  }
}

export default new JwtService();
