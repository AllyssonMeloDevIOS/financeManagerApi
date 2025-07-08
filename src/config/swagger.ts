// src/config/swagger.ts

import path from 'path';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Versão da especificação OpenAPI
        info: {
            title: 'Finance Manager API', // Título da sua API
            version: '1.0.0',           // Versão da sua API
            description: 'API para gerenciamento financeiro pessoal, permitindo controle de transações e categorias.', // Descrição da API
            contact: {
                name: 'Allysson Melo', // Seu nome
                email: 'allyssonmelo.dev@example.com', // Seu email
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/api', // URL base da sua API em desenvolvimento
                description: 'Servidor de Desenvolvimento Local',
            },
            // Você pode adicionar mais servidores para produção/homologação aqui
            // {
            //   url: 'https://sua-api-em-producao.com/api',
            //   description: 'Servidor de Produção',
            // },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Token JWT de autenticação (adicione "Bearer " antes do token)'
                }
            }
        },
        security: [ // Segurança global para todas as rotas (pode ser sobrescrito por rota)
            {
                bearerAuth: []
            }
        ]
    },
    // Caminhos para os arquivos onde o Swagger encontrará as definições da API
    apis: [
        path.resolve(__dirname, '../routes/*.ts'), // Rotas da API
        path.resolve(__dirname, '../controllers/*.ts'), // Controladores
        path.resolve(__dirname, '../dtos/*.ts'),      // DTOs
        path.resolve(__dirname, '../entities/*.ts'),  // Entidades (se tiver Schemas nelas)
        // path.resolve(__dirname, '..', 'dist', 'routes', '*.js'), // Para builds JS
        // path.resolve(__dirname, '..', 'dist', 'controllers', '*.js'), // Para builds JS
    ],
};

export default swaggerOptions;