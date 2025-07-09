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
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    // Caminhos para os arquivos onde o Swagger encontrará as definições da API
    apis: [
        // APONTE PARA OS ARQUIVOS .JS DENTRO DA PASTA 'dist' RELATIVO À ONDE O ARQUIVO SWAGGER.JS ESTARÁ
        // Quando compilado, swagger.js estará em dist/config/swagger.js
        // Então, para acessar dist/routes, precisamos de '../../routes/*.js'
        path.resolve(__dirname, '../../dist/routes/*.js'),       // <-- Mude para .js e ajuste o caminho
        path.resolve(__dirname, '../../dist/controllers/*.js'),  // <-- Mude para .js e ajuste o caminho
        path.resolve(__dirname, '../../dist/dtos/*.js'),         // <-- Mude para .js e ajuste o caminho
        path.resolve(__dirname, '../../dist/entities/*.js'),     // <-- Mude para .js e ajuste o caminho
        path.resolve(__dirname, '../../dist/docs/*.js'),
    ],
};

export default swaggerOptions;