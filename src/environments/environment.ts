// Desenvolvimento local (ng serve): gateway no Docker e S3 no LocalStack.
// O Catalog persiste apenas a chave do objeto; a URL base fica aqui.
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  AwsS3ServiceUrl: 'http://localhost:4566/catalog/',
  useMockApi: false,
  apiAvailabilityNotice: 'Verifique se o gateway está rodando em http://localhost:8080 (docker compose up).',
};
