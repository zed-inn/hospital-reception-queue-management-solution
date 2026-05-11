CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT UUIDV7(),
    queue_id UUID NOT NULL REFERENCES queue_details(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone JSONB NOT NULL CHECK (
        (phone ? 'number') AND (phone ? 'country_code') AND
        jsonb_typeof(phone->'number') = 'string' AND
        jsonb_typeof(phone->'country_code') = 'number' AND
        (phone->>'country_code')::int BETWEEN 1 AND 1000
    ),
    status SMALLINT NOT NULL DEFAULT 1 CHECK (status > 0),
    type SMALLINT NOT NULL DEFAULT 1 CHECK (type > 0),
    position TEXT DEFAULT NULL,
    token_number INTEGER NOT NULL DEFAULT 1 CHECK (token_number > 0),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);