# Reference

## interactions

<details><summary><code>client.interactions.<a href="/src/api/resources/interactions/client/Client.ts">list</a>({ ...params }) -> core.Page<Corti.ResponseInteraction></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Lists all existing interactions. Results can be filtered by encounter status and patient identifier.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.interactions.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.interactions.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Corti.InteractionsListRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Interactions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.interactions.<a href="/src/api/resources/interactions/client/Client.ts">create</a>({ ...params }) -> Corti.ResponseInteractionCreate</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a new interaction.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.interactions.create({
    encounter: {
        identifier: "identifier",
        status: "planned",
        type: "first_consultation",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Corti.RequestInteractionCreate`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Interactions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.interactions.<a href="/src/api/resources/interactions/client/Client.ts">get</a>(id) -> Corti.ResponseInteraction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves a previously recorded interaction by its unique identifier (interaction ID).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.interactions.get("f47ac10b-58cc-4372-a567-0e02b2c3d479");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `Corti.Uuid` — The unique identifier of the interaction to retrieve. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Interactions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.interactions.<a href="/src/api/resources/interactions/client/Client.ts">delete</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes an existing interaction.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.interactions.delete("f47ac10b-58cc-4372-a567-0e02b2c3d479");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `Corti.Uuid` — The unique identifier of the interaction to delete. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Interactions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.interactions.<a href="/src/api/resources/interactions/client/Client.ts">update</a>(id, { ...params }) -> Corti.ResponseInteraction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Modifies an existing interaction by updating specific fields without overwriting the entire record.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.interactions.update("f47ac10b-58cc-4372-a567-0e02b2c3d479");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `Corti.Uuid` — The unique identifier of the interaction to update. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Corti.RequestInteractionUpdate`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Interactions.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## recordings

<details><summary><code>client.recordings.<a href="/src/api/resources/recordings/client/Client.ts">list</a>(id) -> Corti.ResponseRecordingList</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a list of recordings for a given interaction.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.recordings.list("f47ac10b-58cc-4372-a567-0e02b2c3d479");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `Corti.Uuid` — The unique identifier of the interaction for which recordings should be retrieved. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Recordings.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.recordings.<a href="/src/api/resources/recordings/client/Client.ts">delete</a>(id, recordingId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a specific recording for a given interaction.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.recordings.delete("f47ac10b-58cc-4372-a567-0e02b2c3d479", "f47ac10b-58cc-4372-a567-0e02b2c3d479");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `Corti.Uuid` — The unique identifier of the interaction for which the recording should be deleted from. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**recordingId:** `Corti.Uuid` — The unique identifier of the recording to be deleted. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Recordings.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## transcripts

<details><summary><code>client.transcripts.<a href="/src/api/resources/transcripts/client/Client.ts">list</a>(id, { ...params }) -> core.Page<Corti.ResponseTranscriptListAllTranscriptsItem></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves a list of transcripts for a given interaction.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.transcripts.list("f47ac10b-58cc-4372-a567-0e02b2c3d479");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.transcripts.list("f47ac10b-58cc-4372-a567-0e02b2c3d479");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `Corti.Uuid` — The unique identifier of the interaction for which transcripts should be retrieved. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Corti.TranscriptsListRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Transcripts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.transcripts.<a href="/src/api/resources/transcripts/client/Client.ts">create</a>(id, { ...params }) -> Corti.ResponseTranscriptCreate</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a new transcript for an interaction.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.transcripts.create("f47ac10b-58cc-4372-a567-0e02b2c3d479", {
    recordingId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    primaryLanguage: "en",
    modelName: "premier",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `Corti.Uuid` — The unique identifier of the interaction for which the transcript is created. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Corti.TranscriptCreate`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Transcripts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.transcripts.<a href="/src/api/resources/transcripts/client/Client.ts">get</a>(id, transcriptId) -> Corti.ResponseTranscriptCreate</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves the transcript for a specific interaction.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.transcripts.get("f47ac10b-58cc-4372-a567-0e02b2c3d479", "f47ac10b-58cc-4372-a567-0e02b2c3d479");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `Corti.Uuid` — The unique identifier of the interaction containing the transcript. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**transcriptId:** `Corti.Uuid` — The unique identifier of the transcript to retrieve. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Transcripts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.transcripts.<a href="/src/api/resources/transcripts/client/Client.ts">delete</a>(id, transcriptId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a specific transcript associated with an interaction.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.transcripts.delete("f47ac10b-58cc-4372-a567-0e02b2c3d479", "f47ac10b-58cc-4372-a567-0e02b2c3d479");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `Corti.Uuid` — The unique identifier of the interaction to which the transcript belongs. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**transcriptId:** `Corti.Uuid` — The unique identifier of the transcript to delete. Must be a valid UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Transcripts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Auth

<details><summary><code>client.auth.<a href="/src/api/resources/auth/client/Client.ts">getToken</a>({ ...params }) -> Corti.GetTokenResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Obtain an OAuth2 access token using client credentials

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.auth.getToken({
    clientId: "client_id",
    clientSecret: "client_secret",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Corti.AuthGetTokenRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Auth.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
