# 🧪 Testes Automatizados – Demonstração com Cypress e Pytest

Este repositório tem como objetivo demonstrar minha experiência com testes automatizados, utilizando as ferramentas **Cypress** para testes de interface  e **Pytest** para testes de API/backend em aplicações web.

## 🔍 Visão Geral

Antes da automação, foi realizado um **processo de planejamento de testes**, seguindo boas práticas de QA:


- 🧠 Criação de **cenários de teste** com base nas funcionalidades da aplicação
- 📝 Desenvolvimento de **casos de teste detalhados**
- 💬 Aplicação da técnica **BDD (Behavior-Driven Development)** para descrever comportamentos esperados em linguagem natural
- 🧪 Execução dos testes automatizados com Cypress (frontend) e Pytest (backend/API)

## 📁 Estrutura dos testes incluídos

Por questões de confidencialidade, este repositório contém apenas **alguns exemplos representativos**, com dados sensíveis removidos ou generalizados.

### ✅ Pytest
- `test_sector.py`: testes de API para o módulo de setores, cobrindo operações de **criação**, **validação**, **edição**, **deleção** e **filtros**.
- Uso do `APIClient` (Django REST Framework)
- Estrutura de testes com `@pytest.mark.django_db`
- Planejamento baseado em **cenários descritos previamente com BDD**

> ⚠️ No projeto original foi utilizado outro arquivo de teste com **fixtures reutilizáveis**  e os arquivos de teste de cada funcionalidade. Para fins de demonstração, mantive apenas este arquivo público.

### ✅ Cypress
- Testes end-to-end em sistema web
- Automação de fluxos como cadastro, edição, listagem, filtros e exclusão
- Validações de formulário e mensagens de sucesso/erro
- Cobertura de múltiplos cenários de UI

## 🧠 Conhecimentos aplicados


- Escrita de testes utilizando **Pytest**, com validações de status HTTP, dados retornados e filtros
- Escrita de testes E2E com **Cypress**, interagindo com componentes da UI (Angular Material)
- Aplicação de **BDD** para definição de comportamento esperado antes da automação


## 🚧 Observações

- Todos os dados visíveis nos testes foram adaptados para fins didáticos.
- Nenhuma informação real de produção foi incluída neste repositório.

---

