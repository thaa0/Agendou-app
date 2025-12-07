# Endpoints Públicos Necessários para Agendamento

Para que o formulário de agendamento público funcione corretamente, o backend precisa disponibilizar os seguintes endpoints **SEM autenticação** (públicos):

## 1. Dados Públicos da Profissional

### Endpoint Sugerido
```
GET /v1/profissional/publico/{usuarioId}
```

### Resposta Esperada
```json
{
  "nomeFantasia": "TaLinda",
  "descricao": "Sou nail designer artistica"
}
```

### Observações
- Este endpoint retorna apenas dados públicos da profissional
- NÃO deve retornar dados sensíveis (email, senha, etc.)
- Necessário para exibir o nome da profissional no formulário de agendamento

---

## 2. Serviços da Profissional

### Endpoint Sugerido
```
GET /v1/servico/publico/{usuarioId}
```

### Resposta Esperada
```json
[
  {
    "id": "uuid",
    "nome": "Esmaltação em Gel",
    "descricao": "Aplicação de esmalte em gel",
    "duracaoMin": 60
  },
  {
    "id": "uuid",
    "nome": "Alongamento",
    "descricao": null,
    "duracaoMin": 120
  }
]
```

### Observações
- Lista todos os serviços **ativos** da profissional
- Necessário para o cliente escolher o serviço ao agendar
- Deve filtrar apenas serviços da profissional específica (usuarioId)

---

## Implementação no Backend

### Spring Boot - Controller Exemplo

```java
@RestController
@RequestMapping("/v1/profissional")
public class ProfissionalPublicoController {
    
    @Autowired
    private ProfissionalService profissionalService;
    
    @GetMapping("/publico/{usuarioId}")
    @ResponseStatus(HttpStatus.OK)
    public ProfissionalPublicoResponse obterDadosPublicos(@PathVariable UUID usuarioId) {
        log.info("[start] ProfissionalPublicoController - obterDadosPublicos");
        ProfissionalPublicoResponse response = profissionalService.obterDadosPublicos(usuarioId);
        log.debug("[finish] ProfissionalPublicoController - obterDadosPublicos");
        return response;
    }
}

@RestController
@RequestMapping("/v1/servico")
public class ServicoPublicoController {
    
    @Autowired
    private ServicoService servicoService;
    
    @GetMapping("/publico/{usuarioId}")
    @ResponseStatus(HttpStatus.OK)
    public List<ServicoResponse> listarServicosPorProfissional(@PathVariable UUID usuarioId) {
        log.info("[start] ServicoPublicoController - listarServicosPorProfissional");
        List<ServicoResponse> response = servicoService.listarPorProfissional(usuarioId);
        log.debug("[finish] ServicoPublicoController - listarServicosPorProfissional");
        return response;
    }
}
```

### DTOs de Resposta

```java
@Value
@AllArgsConstructor
public class ProfissionalPublicoResponse {
    String nomeFantasia;
    String descricao;
    
    public ProfissionalPublicoResponse(Profissional profissional) {
        this.nomeFantasia = profissional.getUsuario().getNomeFantasia();
        this.descricao = profissional.getDescricao();
    }
}
```

---

## Segurança

### Considerações Importantes

1. **Endpoints Públicos**: Não exigem autenticação (sem @AuthenticationPrincipal)
2. **Dados Expostos**: Apenas dados não sensíveis
3. **Rate Limiting**: Considerar implementar limite de requisições
4. **CORS**: Garantir que o frontend possa acessar

### Spring Security Config

```java
@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/v1/profissional/publico/**").permitAll()
                .requestMatchers("/v1/servico/publico/**").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
```

---

## Testando os Endpoints

### cURL - Dados da Profissional
```bash
curl -X GET http://localhost:8080/agendou/api/v1/profissional/publico/bfcbd3f4-b5ca-42ea-bb16-250a3b627d42
```

### cURL - Serviços
```bash
curl -X GET http://localhost:8080/agendou/api/v1/servico/publico/bfcbd3f4-b5ca-42ea-bb16-250a3b627d42
```

---

## Frontend - Uso

Os endpoints são consumidos automaticamente pelo serviço:
- `lib/services/public-profissional-service.ts`
- Usado em: `app/agendar/[designerId]/page.tsx`

O frontend já está preparado para consumir esses endpoints quando estiverem disponíveis no backend! 🚀
