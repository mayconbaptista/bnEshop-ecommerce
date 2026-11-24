// Build para a AWS (ng build --configuration staging).
// CloudFront serve Angular, API e imagens na MESMA origem:
//   /        -> S3 (SPA)
//   /api/*   -> EC2 (Traefik -> Ocelot)
//   /media/* -> S3 do catalogo (via OAC)
// Por isso as URLs sao relativas: sem CORS, sem dominio hardcoded no bundle.
// O mesmo artefato atende o dominio proprio (Cloudflare DNS -> CloudFront) e
// o *.cloudfront.net.
export const environment = {
  production: true,
  apiUrl: '',
  AwsS3ServiceUrl: '/media/',
  useMockApi: false,
  // Mantenha em sincronia com var.power_schedule no Terraform do backend.
  apiAvailabilityNotice:
    'O backend deste projeto fica ligado em dias úteis, das 8h às 20h (horário de Brasília), para economizar custos de nuvem.',
};
