const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({ logger: true, cors: true });
const routes = require('./routes.json');

const DELAY_MS = 200;

const computeStatus = (isoDate) => {
  const today = new Date();
  const due = new Date(isoDate);
  if (Number.isNaN(due.getTime())) return 'vencido';
  const diff = due.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  if (diff === 0) return 'hoje';
  if (diff < 0) return 'vencido';
  return 'a-vencer';
};

server.use(jsonServer.bodyParser);
server.use((req, res, next) => setTimeout(next, DELAY_MS));
server.use(middlewares);
server.use(jsonServer.rewriter(routes));

server.get('/api/debitos', (req, res) => {
  const renavam = (req.query.renavam || '').toString();
  const db = router.db.get('debitos');
  let items = db.value();

  if (!renavam || renavam.length < 9) {
    return res.status(400).json({ message: 'RENAVAM inválido.' });
  }

  items = items.filter((d) => d.renavam === renavam);

  if (!items.length) {
    return res.status(404).json({ message: 'Nenhum débito encontrado para este RENAVAM.' });
  }

  const sorted = items
    .map((d) => ({ ...d, status: computeStatus(d.vencimento) }))
    .sort((a, b) => new Date(a.vencimento) - new Date(b.vencimento));

  const total = sorted.reduce((acc, cur) => acc + (cur.valor || 0), 0);
  const vencidos = sorted.filter((d) => d.status === 'vencido').length;
  const vehicle = sorted[0];

  return res.json({
    renavam: vehicle.renavam,
    placa: vehicle.placa,
    modelo: vehicle.modelo,
    cor: vehicle.cor,
    ano: vehicle.ano,
    quantidade: sorted.length,
    total,
    vencidos,
    debitos: sorted
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
