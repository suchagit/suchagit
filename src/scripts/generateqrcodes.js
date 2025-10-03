import QRCode from 'qrcode';

const url = `https://yourdomain.com/invite/${token}`;
const outputFile = `qrcodes/${guest.name}.png`;

QRCode.toFile(outputFile, url, function (err) {
  if (err) throw err;
  console.log('QR code saved for', guest.name);
});
