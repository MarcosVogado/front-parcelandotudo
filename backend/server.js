const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const dbFile = path.join(__dirname, 'db.json');
const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults({ logger: true, cors: true });

const DELAY_MS = 200;

const computeStatusByDate = (isoDate) => {
  const today = new Date();
  const due = new Date(isoDate);
  if (Number.isNaN(due.getTime())) return 'vencido';
  const diff = due.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  if (diff === 0) return 'hoje';
  if (diff < 0) return 'vencido';
  return 'a-vencer';
};

const mapStatusCode = (code) => {
  if (!code) return 'a-vencer';
  const c = String(code).toUpperCase();
  if (['VENC', 'VCD', 'VENCIDO'].includes(c)) return 'vencido';
  if (['HOJE'].includes(c)) return 'hoje';
  // PCR e demais: a vencer
  return 'a-vencer';
};

server.use(jsonServer.bodyParser);
server.use((req, res, next) => setTimeout(next, DELAY_MS));
server.use(middlewares);
server.get('/api/debitos', (req, res) => {
  const renavam = (req.query.renavam || '').toString();
  if (!renavam || renavam.length < 9) {
    return res.status(400).json({ message: 'RENAVAM inválido.' });
  }

  const state = router.db.getState();
  const all = Array.isArray(state.debtList) ? state.debtList : [];
  const meta = state.meta || {};
  const filtered = all.filter((item) => !item.renavam || String(item.renavam) === renavam);

  if (!filtered.length) {
    return res.status(404).json({ message: 'Nenhum débito encontrado para este RENAVAM.' });
  }

  const mapped = filtered.map((d) => ({
    debitId: d.debitId,
    itemDescription: d.itemDescription,
    year: d.year,
    dueDate: d.dueDate,
    paymentDueDate: d.paymentDueDate,
    total: d.total,
    statusCode: d.statusCode,
    status: mapStatusCode(d.statusCode) || computeStatusByDate(d.dueDate),
    renavam: d.renavam || renavam,
    plate: d.plate,
    model: d.model,
    vehicleYear: d.vehicleYear,
    color: d.color
  }));

  const totalAmount = meta.totalAmount ?? mapped.reduce((acc, cur) => acc + (cur.total || 0), 0);
  const vencidos = mapped.filter((d) => d.status === 'vencido').length;
  const first = mapped[0];

  return res.json({
    debtList: mapped,
    itemCount: meta.itemCount ?? mapped.length,
    totalAmount,
    protocol: meta.protocol || 'PROTO-MOCK',
    referenceId: meta.referenceId || 'REF-MOCK',
    plate: first?.plate || '',
    model: first?.model || '',
    vehicleYear: first?.vehicleYear || new Date().getFullYear(),
    color: first?.color || '',
    renavam
  });
});

server.post('/api/parcelar', (req, res) => {
  const { ids, renavam } = req.body || {};
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'Selecione ao menos um débito.' });
  }
  if (!renavam) {
    return res.status(400).json({ message: 'RENAVAM não informado.' });
  }

  return res.json({
    message: 'Parcelamento criado com sucesso.',
    protocolo: `P-${Math.floor(Math.random() * 900000 + 100000)}`
  });
});

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock API rodando em http://localhost:${PORT}/api`);
});
