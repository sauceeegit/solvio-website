import { portableCatalog, checkoutSettings as settings } from '../data/checkout';
import { locations, panelOptions, storageOptions, cableOptions, computeConfig } from '../data/product';

function count(value, max) {
  if (!/^[1-9]\d*$/.test(String(value)) || !Number.isSafeInteger(Number(value)) || Number(value) > max) throw new Error('Invalid technical quantity');
  return Number(value);
}
export function resolveCart(search) {
  if (!search || search === '?') return null;
  if (search.length > 1024) throw new Error('Selection too long');
  const p = new URLSearchParams(search);
  const type = p.get('type');
  const fields = type === 'portable' ? ['v', 'type', 'model', 'qty'] : ['v', 'type', 'location', 'panel', 'modules', 'storage', 'cable', 'qty'];
  if (!['portable', 'balcony'].includes(type) || p.get('v') !== '1' || [...p.keys()].length !== fields.length || fields.some(k => p.getAll(k).length !== 1) || [...p.keys()].some(k => !fields.includes(k))) throw new Error('Invalid selection');
  const quantity = count(p.get('qty'), settings.maxQuantity);
  if (type === 'portable') {
    const model = portableCatalog.find(m => m.id === p.get('model'));
    if (!model) throw new Error('Unknown model');
    return { type, id: model.id, name: model.name, configuration: model.id, quantity, unitPrice: model.price, subtotal: model.price * quantity };
  }
  const config = { modules: count(p.get('modules'), settings.maxModules) };
  for (const [key, options] of Object.entries({location: locations, panel: panelOptions, storage: storageOptions, cable: cableOptions})) {
    if (!options.some(o => o.id === p.get(key))) throw new Error('Unknown option');
    config[key] = p.get(key);
  }
  const d = computeConfig(config);
  return { type, id: 'balcony', name: 'Solvio Balcony Solar', config, configuration: `${config.modules} × ${d.panel.label}; ${d.location.label}; ${d.storage.label}; ${d.cable.label}`, quantity, unitPrice: d.total, subtotal: d.total * quantity };
}
export function cartTotals(cart) {
  if (!cart) return null;
  return { subtotal: cart.subtotal, addedVat: 0, delivery: 0, payableTotal: cart.subtotal };
}
export function checkoutUrl(type, selection, qty = 1) {
  const p = new URLSearchParams({v: '1', type, ...selection, qty: String(qty)});
  resolveCart(`?${p}`);
  return `/checkout?${p}`;
}
export function validateBuyer(buyer) {
  const fields = ['name', 'phone', 'email', 'address', 'district', 'province', 'postal', 'country'];
  const clean = Object.fromEntries(fields.map(k => [k, String(buyer[k] ?? '').trim()]));
  // Syntax only, not ownership/reachability: retain international separators.
  const phoneDigits = clean.phone.replace(/\D/g, '').length;
  if (fields.some(k => !clean[k] || clean[k].length > (k === 'address' ? 500 : 120) || [...clean[k]].some(char => char.charCodeAt(0) < 32)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) || !/^[+\d() .-]{7,30}$/.test(clean.phone) || phoneDigits < 7 || phoneDigits > 15) throw new Error('Check required buyer details');
  if (clean.country !== 'Thailand') throw new Error('Delivery is available within Thailand only');
  return clean;
}
export function buildPayload({cart, buyer, lang, reference, consent, acceptedAt, botcheck = ''}) {
  if (!consent || !acceptedAt || !cart || botcheck) throw new Error('Consent or validation missing');
  const totals = cartTotals(cart);
  return {
    access_key: settings.accessKey, subject: 'New Solvio Checkout Order', from_name: 'Solvio Website',
    ...validateBuyer(buyer), locale: lang, request_reference: reference,
    item_id: cart.id, category: cart.type, configuration: cart.configuration,
    quantity: String(cart.quantity), unit_price_thb: String(cart.unitPrice), catalog_subtotal_thb: String(cart.subtotal),
    added_vat_thb: String(totals.addedVat), delivery_fee_thb: String(totals.delivery), payable_total_thb: String(totals.payableTotal),
    payment_due_percent: '100', payment_status: 'pending_manual_verification',
    final_total_pending_confirmation: 'false', payment_unverified: 'true', goods_only: 'true', installation_included: 'false',
    policy_accepted: 'true', policy_version: settings.policyVersion, policy_accepted_client_timestamp: acceptedAt,
    botcheck: '',
  };
}
export async function submitRequest(payload, fetcher = fetch, timeoutMs = settings.timeoutMs) {
  const controller = new AbortController();
  let timer;
  const body = new FormData();
  Object.entries(payload).forEach(([key, value]) => body.append(key, value));
  try {
    return await Promise.race([
      (async () => {
        const response = await fetcher(settings.endpoint, {method: 'POST', body, signal: controller.signal});
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        if (result.success !== true) throw new Error('Provider rejected request');
        return true;
      })(),
      new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error('timeout')); }, timeoutMs); }),
    ]);
  } finally { clearTimeout(timer); }
}
