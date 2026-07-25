<!--
name: 'Data: Streaming reference (Ruby)'
description: Ruby streaming code sample in the Claude API reference skill
ccVersion: 2.1.219
-->
# Streaming — Ruby

## Streaming

```ruby
stream = client.messages.stream(
  model: :"{{OPUS_ID}}",
  max_tokens: 64000,
  messages: [{ role: "user", content: "Write a haiku" }]
)

stream.text.each { |text| print(text) }
```

---

