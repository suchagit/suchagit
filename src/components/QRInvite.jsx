import { QRCodeCanvas } from "qrcode.react";

export default function QRInvite({ token }) {
  const url = `${window.location.origin}/invite/${token}`;
  return (
    <div className="my-6 text-center">
      <p className="mb-2">
        Scan this QR code to return to your personal invitation:
      </p>
      <QRCodeCanvas value={url} size={128} className="mx-auto" />
    </div>
  );
}
