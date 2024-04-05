import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import Router from 'express';

import swaggerSchemas from './swaggerSchemas.js';

const router = Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PublicTenderAPI',
      version: '1.0.0',
    },
    components: {
      schemas: swaggerSchemas,
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
      {
        url: `${process.env.URL}/api/v1`,
        description: 'Production server',
      }
    ],
  },
  apis: ['./src/v1/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

router.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'PublicTenderAPI',
  })
);
router.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export default router;
