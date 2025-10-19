#!/usr/bin/env python3
"""
Database initialization script for TaxEase AI
Run this to create/reset the database tables
"""
import os
from db import engine, Base
from models import Session, Message, Summary

def init_database():
    """Create all database tables"""
    print("Initializing database...")
    print(f"Database URL: {os.getenv('DATABASE_URL', 'sqlite:///./taxease.db')}")
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    print("✅ Database tables created successfully!")
    print("\nTables:")
    for table in Base.metadata.sorted_tables:
        print(f"  - {table.name}")

def reset_database():
    """Drop and recreate all tables (WARNING: deletes all data)"""
    print("⚠️  WARNING: This will delete all existing data!")
    confirm = input("Type 'yes' to continue: ")
    
    if confirm.lower() == 'yes':
        print("Dropping all tables...")
        Base.metadata.drop_all(bind=engine)
        print("Creating fresh tables...")
        Base.metadata.create_all(bind=engine)
        print("✅ Database reset complete!")
    else:
        print("❌ Reset cancelled")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == '--reset':
        reset_database()
    else:
        init_database()
