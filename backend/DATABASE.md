# TaxEase AI - Database Documentation

## Database Schema

The application uses **SQLite** by default (can be configured to use PostgreSQL).

### Tables

#### 1. **sessions**
Stores user consultation sessions.

```sql
CREATE TABLE sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. **messages**
Stores conversation messages (user and assistant).

```sql
CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER REFERENCES sessions(id),
    role VARCHAR (user/assistant),
    content TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. **summaries**
Stores parsed CSV financial summaries per session.

```sql
CREATE TABLE summaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER UNIQUE REFERENCES sessions(id),
    data TEXT (JSON string),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Database Operations

### Initialize Database
```bash
python init_db.py
```

### Reset Database (WARNING: Deletes all data)
```bash
python init_db.py --reset
```

### Check Database
```bash
sqlite3 taxease.db ".tables"
sqlite3 taxease.db "SELECT COUNT(*) FROM sessions;"
```

### View Sessions
```bash
sqlite3 taxease.db "SELECT * FROM sessions;"
```

### View Messages
```bash
sqlite3 taxease.db "SELECT session_id, role, content FROM messages ORDER BY timestamp DESC LIMIT 10;"
```

## Switching to PostgreSQL

1. Install psycopg2:
```bash
pip install psycopg2-binary
```

2. Update `.env`:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/taxease
```

3. Initialize:
```bash
python init_db.py
```

## Data Flow

1. **Upload CSV** → Creates/updates Session → Stores Summary
2. **Chat** → Retrieves Session + Summary → Stores Message (user) → Calls LLM → Stores Message (assistant)
3. **Session Memory** → All messages linked to session_id for conversation context

## Backup

```bash
# Backup SQLite database
cp taxease.db taxease_backup_$(date +%Y%m%d).db

# Export to SQL
sqlite3 taxease.db .dump > backup.sql

# Restore
sqlite3 new_taxease.db < backup.sql
```
