import { portableBatteries, portablePanels } from './landing';
export const portableCatalog = [...portableBatteries, ...portablePanels];
export const checkoutSettings = Object.freeze({
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '8f6534eb-cf53-4a79-b717-a137e19b8108',
  bank: 'Kasikornbank', holder: 'Supabizy Co., Ltd.', account: '1861831953',
  inbox: 'info@solvio.solar', policyVersion: 'TH-669abb986fd6_EN-0f1f62826037',
  maxQuantity: 99, maxModules: 100, timeoutMs: 15000,
});
export const checkoutCopy = {
 en: {
 title: 'Bank-transfer order request', subtotal: 'Product subtotal',
 addedVat: 'No VAT added', delivery: 'Free delivery within Thailand', payableTotal: 'Final payable total', countryOnly: 'Delivery within Thailand only', thailand: 'Thailand', transfer: 'Transfer 100% upfront of the final payable total:', pending: 'Payment pending manual verification by the Solvio team.',
 gate: 'Do not transfer until your order request is successfully submitted. Payment is 100% upfront of the displayed final payable total.',
 goods: 'Goods only / self-install. Solvio installation service is not included. For installation, contact our team for a separate consultation.',
 limits: 'Technical form limits: 99 units/sets and 100 modules per Balcony set; these are not stock or installation-suitability limits.',
 privacy: 'Your details are processed by Web3Forms and email for Solvio to handle your request and delivery. Do not include bank credentials or sensitive documents.',
 consent: 'I have read and accept the Return & Refund Policy.', prevails: 'The Thai policy prevails.',
 name: 'Full name', phone: 'Phone', email: 'Email', address: 'Street address / house / building', district: 'District / city', province: 'Province / state', postal: 'Postal code', country: 'Country',
 review: 'Review request', back: 'Back to details', send: 'Submit order request', sending: 'Submitting…',
 success: 'Order request submitted — payment pending manual verification', accepted: 'Web3Forms accepted this request. Inbox delivery and payment have not been verified. This reference is not a confirmed order number.',
 error: 'Submission could not be confirmed. Acceptance may be unknown. Do not transfer. Details are retained. Ask info@solvio.solar to check this reference before retrying or paying.',
 slip: 'After transferring, manually attach your slip to a separate email and send it to info@solvio.solar with this request reference. Opening email does not send it or attach a slip.',
 empty: 'No valid selection. Return to a product page and select your items.', qty: 'Quantity', reference: 'Request reference', bank: 'Bank details — 100% upfront transfer',
 },
 th: {
 title: 'คำขอสั่งซื้อชำระด้วยการโอนเงิน', subtotal: 'ยอดรวมเฉพาะสินค้า',
 addedVat: 'ไม่มีการบวกภาษีมูลค่าเพิ่ม', delivery: 'จัดส่งฟรีภายในประเทศไทย', payableTotal: 'ยอดชำระสุทธิ', countryOnly: 'จัดส่งภายในประเทศไทยเท่านั้น', thailand: 'ประเทศไทย', transfer: 'โอนชำระล่วงหน้า 100% ของยอดชำระสุทธิ:', pending: 'การชำระเงินรอเจ้าหน้าที่ Solvio ตรวจสอบด้วยตนเอง',
 gate: 'กรุณาอย่าโอนเงินจนกว่าจะส่งคำขอสั่งซื้อสำเร็จ ชำระล่วงหน้า 100% ของยอดชำระสุทธิที่แสดง',
 goods: 'เฉพาะสินค้า / ติดตั้งเอง ไม่รวมบริการติดตั้งโดย Solvio หากต้องการบริการติดตั้ง กรุณาติดต่อทีมงานเพื่อปรึกษาแยกต่างหาก',
 limits: 'ข้อจำกัดทางเทคนิคของแบบฟอร์ม: 99 ชิ้น/ชุด และ 100 แผงต่อชุดระเบียง ไม่ใช่ข้อจำกัดสต็อกหรือการรับรองความเหมาะสมในการติดตั้ง',
 privacy: 'ข้อมูลของคุณจะประมวลผลผ่าน Web3Forms และอีเมลเพื่อให้ Solvio จัดการคำขอและการจัดส่ง อย่ากรอกรหัสธนาคารหรือเอกสารอ่อนไหว',
 consent: 'ฉันได้อ่านและยอมรับนโยบายการคืนสินค้าและคืนเงิน', prevails: 'ให้ยึดนโยบายภาษาไทยเป็นหลัก',
 name: 'ชื่อและนามสกุล', phone: 'เบอร์โทรศัพท์', email: 'อีเมล', address: 'ที่อยู่ / บ้านเลขที่ / อาคาร / ถนน', district: 'อำเภอ / เขต / เมือง', province: 'จังหวัด / รัฐ', postal: 'รหัสไปรษณีย์', country: 'ประเทศ',
 review: 'ตรวจสอบคำขอ', back: 'กลับไปแก้ไขข้อมูล', send: 'ส่งคำขอสั่งซื้อ', sending: 'กำลังส่ง…',
 success: 'ส่งคำขอสั่งซื้อแล้ว — รอเจ้าหน้าที่ตรวจสอบการชำระเงิน', accepted: 'Web3Forms รับคำขอแล้ว ยังไม่ได้ยืนยันการรับอีเมลหรือการชำระเงิน รหัสนี้ไม่ใช่หมายเลขคำสั่งซื้อที่ยืนยันแล้ว',
 error: 'ยังยืนยันการส่งไม่ได้ อาจรับคำขอแล้วหรือยังไม่ได้รับ กรุณาอย่าโอนเงิน ข้อมูลยังอยู่ กรุณาให้ info@solvio.solar ตรวจสอบรหัสนี้ก่อนส่งซ้ำหรือชำระเงิน',
 slip: 'หลังโอนเงินแล้ว: แนบสลิปด้วยตนเองในอีเมลแยกต่างหากและส่งไปที่ info@solvio.solar พร้อมรหัสอ้างอิงคำขอนี้ การเปิดอีเมลไม่ได้เป็นการส่งหรือแนบสลิป',
 empty: 'ไม่มีรายการที่ถูกต้อง กรุณากลับไปเลือกสินค้าจากหน้าสินค้า', qty: 'จำนวน', reference: 'รหัสอ้างอิงคำขอ', bank: 'รายละเอียดธนาคาร — โอนชำระล่วงหน้า 100%',
 },
};
