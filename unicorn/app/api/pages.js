class Pages {
  constructor(express, next) {
    this.express = express;
    this.next = next;
  }

  init() {
    this.initGeneric();
  }

  initGeneric() {
    this.express.get('/', (req, res) => {
      return this.next.render(req, res, `/main`, req.query);
    });

    this.express.get('/health', (req, res) => {
      res.status(200).send('OK');
    });

    this.express.get('*', (req, res) => {
      return this.next.render(req, res, `/${req.path}`, req.query);
    });
  }
}

module.exports = Pages;
