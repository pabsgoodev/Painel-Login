# Painel de Login Avançado — Versão 1

Este projeto é um painel de login com foco em **segurança básica**, desenvolvido para estudo e aplicação de boas práticas em autenticação de usuários.  
A versão 1 implementa mecanismos essenciais para proteger o processo de login contra ataques comuns.

## Objetivo

Fornecer um sistema de autenticação seguro, organizado e fortemente tipado, servindo como base para evoluções futuras como autenticação em dois fatores, controle de sessões e permissões.

## Principais recursos de segurança

- Proteção contra **força bruta** (controle de tentativas de login)
- Prevenção contra **SQL Injection** (queries parametrizadas)
- Validação e tipagem forte em todas as camadas
- Registro de **logs detalhados** para auditoria e rastreio de eventos
- Separação clara entre backend e frontend

## Tecnologias utilizadas

### Backend
- Node.js  
- Express  
- TypeScript (tipagem forte e segurança estrutural)  
- MariaDB  
- JSON para comunicação entre cliente e servidor  

### Frontend
- HTML  
- CSS  

### Segurança e controle
- Logs de autenticação e eventos do sistema
- Boas práticas de tratamento de erros
- Estrutura preparada para escalabilidade e melhorias futuras

## Status do projeto

- Versão: **1.0**
- Foco: segurança básica no processo de login
- Projeto em evolução
