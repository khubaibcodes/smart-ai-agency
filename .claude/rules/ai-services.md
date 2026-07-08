# AI Services Rules — Smart AI Agency

## RAG Agent Patterns
- Always use LangChain as the orchestration layer
- Vector store preference: Chroma (local) or Pinecone (cloud)
- Chunk size: 512 tokens, overlap: 64 tokens (default — adjust per use case)
- Retrieval: top-k=5 with MMR reranking
- All RAG responses must include source citations
- Private deployment by default — no data to third-party LLMs unless client explicitly approves

## Voice AI Patterns
- STT: OpenAI Whisper (local) or Deepgram (cloud, lower latency)
- TTS: ElevenLabs for high quality, pyttsx3 for offline/local
- Always stream responses for <500ms perceived latency
- Voice agents must handle: silence detection, interruption, fallback to text

## n8n Automation Patterns
- Prefer n8n self-hosted for client data privacy
- Every workflow must have: error branch, retry logic (max 3), notification on failure
- Use webhook triggers for real-time, cron for scheduled
- Credentials stored in n8n vault — never in workflow JSON exported files
- Document every workflow with a sticky note explaining its purpose

## Chat Agents for Local Business
- Use Claude API (claude-sonnet-4-6) as default model
- System prompt must include: business name, hours, services, escalation path
- Always provide a human handoff option ("speak to a person")
- Response length: concise (under 150 words) for customer-facing bots
- Maintain conversation history (last 10 turns minimum)

## SharePoint Integration
- Use Microsoft Graph API for all SharePoint operations
- Auth: OAuth 2.0 with app registration (never username/password)
- Batch API calls where possible to respect rate limits
- Index documents incrementally — full re-index only on schema change

## General AI Security Rules
- Never log user messages or PII to console or files
- All API keys via environment variables only
- Rate-limit all public-facing AI endpoints
- Add content moderation layer on customer-facing chat agents
